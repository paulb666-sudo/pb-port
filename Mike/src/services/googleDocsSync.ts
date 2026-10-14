import { ProduceItem, ProduceStatus } from '../types/produce';

export interface GoogleDocInfo {
  id: string;
  title: string;
  webViewLink?: string;
}

export interface SyncResult {
  success: boolean;
  message: string;
  itemsUpdated?: number;
  updatedProduce?: ProduceItem[];
  docInfo?: GoogleDocInfo;
}

const DOC_TITLE = "Farmer Mike's Produce — Harvest & Inventory";

/**
 * Searches user's Google Drive for existing harvest document
 */
export async function findOrCreateProduceDoc(accessToken: string): Promise<GoogleDocInfo> {
  // 1. Search existing files in Drive
  const query = encodeURIComponent(`name = '${DOC_TITLE}' and trashed = false`);
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)`;

  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (searchRes.ok) {
    const data = await searchRes.json();
    if (data.files && data.files.length > 0) {
      const file = data.files[0];
      return {
        id: file.id,
        title: file.name,
        webViewLink: file.webViewLink || `https://docs.google.com/document/d/${file.id}/edit`,
      };
    }
  }

  // 2. Create new Google Doc if none exists
  const createRes = await fetch('https://docs.googleapis.com/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: DOC_TITLE,
    }),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Failed to create Google Doc: ${errText}`);
  }

  const createdDoc = await createRes.json();
  return {
    id: createdDoc.documentId,
    title: createdDoc.title || DOC_TITLE,
    webViewLink: `https://docs.google.com/document/d/${createdDoc.documentId}/edit`,
  };
}

/**
 * Formats produce items into structured plain text representation for the Google Doc
 */
export function formatDocContent(produce: ProduceItem[]): string {
  const now = new Date().toLocaleString('en-ZA', { 
    timeZone: 'Africa/Johannesburg',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  let text = `FARMER MIKE'S PRODUCE — HARVEST & INVENTORY BOARD\n`;
  text += `Grown in Noordhoek, Cape Town • Live Farm Sync\n`;
  text += `Last Updated: ${now} (SAST)\n\n`;
  text += `========================================================\n`;
  text += `INSTRUCTIONS FOR MIKE:\n`;
  text += `You can edit the status tag for any item below right here in Google Docs!\n`;
  text += `Accepted tags: [Fresh today] | [Available today] | [Low inventory] | [Out of stock] | [Coming into season]\n`;
  text += `Format per item: * [Produce Name] | [Status] | [Harvest Notes / Details]\n`;
  text += `========================================================\n\n`;
  text += `--- LIVE HARVEST LIST ---\n\n`;

  produce.forEach((item) => {
    const note = item.harvestNote ? ` | ${item.harvestNote}` : '';
    text += `* ${item.name} | ${item.status}${note}\n`;
  });

  text += `\n--- END OF HARVEST INVENTORY ---\n`;
  text += `Any changes saved here will sync back to the website when you tap 'Pull from Google Doc' or during automatic periodic sync.\n`;

  return text;
}

/**
 * Pushes produce list into Google Doc via batchUpdate
 */
export async function pushProduceToGoogleDoc(
  accessToken: string,
  documentId: string,
  produce: ProduceItem[]
): Promise<SyncResult> {
  // 1. Get current document to find length
  const docRes = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!docRes.ok) {
    const err = await docRes.text();
    throw new Error(`Failed to read document before update: ${err}`);
  }

  const docData = await docRes.json();
  const endIndex = docData.body?.content?.slice(-1)[0]?.endIndex || 1;

  const requests: any[] = [];

  // Delete existing body content if it exists (index 1 to endIndex - 1)
  if (endIndex > 2) {
    requests.push({
      deleteContentRange: {
        range: {
          startIndex: 1,
          endIndex: endIndex - 1,
        },
      },
    });
  }

  // Insert fresh structured text
  const newText = formatDocContent(produce);
  requests.push({
    insertText: {
      location: {
        index: 1,
      },
      text: newText,
    },
  });

  const batchRes = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requests }),
  });

  if (!batchRes.ok) {
    const batchErr = await batchRes.text();
    throw new Error(`Failed to update Google Doc: ${batchErr}`);
  }

  return {
    success: true,
    message: `Successfully synchronized ${produce.length} produce statuses to Google Doc`,
    itemsUpdated: produce.length,
    docInfo: {
      id: documentId,
      title: docData.title || DOC_TITLE,
      webViewLink: `https://docs.google.com/document/d/${documentId}/edit`,
    },
  };
}

/**
 * Pulls produce tags and statuses from Google Doc and merges with local state
 */
export async function pullProduceFromGoogleDoc(
  accessToken: string,
  documentId: string,
  currentProduce: ProduceItem[]
): Promise<SyncResult> {
  const docRes = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!docRes.ok) {
    const err = await docRes.text();
    throw new Error(`Failed to read Google Doc: ${err}`);
  }

  const docData = await docRes.json();
  
  // Extract all text content from doc structure
  let fullText = '';
  if (docData.body && docData.body.content) {
    for (const element of docData.body.content) {
      if (element.paragraph && element.paragraph.elements) {
        for (const el of element.paragraph.elements) {
          if (el.textRun && el.textRun.content) {
            fullText += el.textRun.content;
          }
        }
      }
    }
  }

  // Parse lines: * [Name] | [Status] | [Note]
  const lines = fullText.split('\n');
  const validStatuses: ProduceStatus[] = [
    'Fresh today',
    'Available today',
    'Low inventory',
    'Out of stock',
    'Coming into season',
  ];

  let updatedCount = 0;
  const updatedList = currentProduce.map((item) => {
    // Look for matching line for this item
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('*')) continue;

      const parts = trimmed.substring(1).split('|').map((p) => p.trim());
      if (parts.length >= 2) {
        const parsedName = parts[0];
        const parsedStatus = parts[1];
        const parsedNote = parts[2];

        // Fuzzy/substring match on name
        if (
          parsedName.toLowerCase().includes(item.name.toLowerCase()) ||
          item.name.toLowerCase().includes(parsedName.toLowerCase()) ||
          (item.id && parsedName.toLowerCase().includes(item.id.toLowerCase()))
        ) {
          // Normalize status
          const matchedStatus = validStatuses.find(
            (s) => s.toLowerCase() === parsedStatus.toLowerCase()
          );

          if (matchedStatus) {
            let itemChanged = false;
            let newItem = { ...item };

            if (newItem.status !== matchedStatus) {
              newItem.status = matchedStatus;
              itemChanged = true;
            }
            if (parsedNote && parsedNote !== newItem.harvestNote) {
              newItem.harvestNote = parsedNote;
              itemChanged = true;
            }

            if (itemChanged) {
              newItem.updatedAt = new Date().toISOString();
              updatedCount++;
              return newItem;
            }
          }
        }
      }
    }
    return item;
  });

  return {
    success: true,
    message: updatedCount > 0 
      ? `Updated ${updatedCount} items from Google Doc` 
      : `Google Doc is up to date (no changes detected)`,
    itemsUpdated: updatedCount,
    updatedProduce: updatedList,
    docInfo: {
      id: documentId,
      title: docData.title || DOC_TITLE,
      webViewLink: `https://docs.google.com/document/d/${documentId}/edit`,
    },
  };
}
