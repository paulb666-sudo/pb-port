import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ProduceItem, ProduceStatus, FarmSettings, SyncLogEntry } from '../types/produce';
import { INITIAL_PRODUCE, INITIAL_SETTINGS } from '../data/initialProduce';
import { User } from 'firebase/auth';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  getAccessToken 
} from '../services/firebaseAuth';
import { 
  findOrCreateProduceDoc, 
  pushProduceToGoogleDoc, 
  pullProduceFromGoogleDoc,
  GoogleDocInfo 
} from '../services/googleDocsSync';

interface FarmContextType {
  produce: ProduceItem[];
  settings: FarmSettings;
  syncLogs: SyncLogEntry[];
  isAdminOpen: boolean;
  isOrderModalOpen: boolean;
  orderModalMode: 'box' | 'catnip';
  orderPrefilledMessage: string;
  isGoogleAuthenticated: boolean;
  googleUser: User | null;
  googleDocInfo: GoogleDocInfo | null;
  isSyncing: boolean;
  syncNotification: { type: 'success' | 'error' | 'info'; message: string } | null;
  
  // Actions
  setIsAdminOpen: (open: boolean) => void;
  openOrderModal: (customNote?: string, mode?: 'box' | 'catnip') => void;
  closeOrderModal: () => void;
  updateProduceStatus: (id: string, status: ProduceStatus) => void;
  updateProduceItem: (updated: ProduceItem) => void;
  addNewProduceItem: (item: Omit<ProduceItem, 'id' | 'updatedAt'>) => void;
  deleteProduceItem: (id: string) => void;
  updateSettings: (newSettings: Partial<FarmSettings>) => void;
  loginGoogle: () => Promise<void>;
  logoutGoogle: () => Promise<void>;
  pushToGoogleDocWithAuth: () => Promise<void>;
  pullFromGoogleDocWithAuth: () => Promise<void>;
  clearSyncNotification: () => void;

  // Confirmation Dialog request state
  pendingConfirmation: {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null;
  closeConfirmation: () => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

const PRODUCE_STORAGE_KEY = 'farmer_mikes_produce_data_v1';
const SETTINGS_STORAGE_KEY = 'farmer_mikes_settings_v1';
const LOGS_STORAGE_KEY = 'farmer_mikes_sync_logs_v1';

export const FarmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [produce, setProduce] = useState<ProduceItem[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load local produce data', e);
    }
    return INITIAL_PRODUCE;
  });

  const [settings, setSettings] = useState<FarmSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.whatsAppNumber || parsed.whatsAppNumber === '[WHATSAPP NUMBER]') {
          parsed.whatsAppNumber = '+27 72 488 6140';
        }
        return { ...INITIAL_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load settings', e);
    }
    return INITIAL_SETTINGS;
  });

  const [syncLogs, setSyncLogs] = useState<SyncLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(LOGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load sync logs', e);
    }
    return [];
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalMode, setOrderModalMode] = useState<'box' | 'catnip'>('box');
  const [orderPrefilledMessage, setOrderPrefilledMessage] = useState('');

  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [googleDocInfo, setGoogleDocInfo] = useState<GoogleDocInfo | null>(() => {
    if (settings.googleDocId) {
      return {
        id: settings.googleDocId,
        title: "Farmer Mike's Produce — Harvest & Inventory",
        webViewLink: settings.googleDocUrl,
      };
    }
    return null;
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotification, setSyncNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const [pendingConfirmation, setPendingConfirmation] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCE_STORAGE_KEY, JSON.stringify(produce));
    } catch (e) {
      console.warn('Failed to save produce', e);
    }
  }, [produce]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(syncLogs.slice(0, 30)));
    } catch (e) {
      console.warn('Failed to save logs', e);
    }
  }, [syncLogs]);

  const addLog = useCallback((action: SyncLogEntry['action'], details: string, success: boolean) => {
    const entry: SyncLogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      action,
      details,
      success,
    };
    setSyncLogs((prev) => [entry, ...prev.slice(0, 29)]);
  }, []);

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, _token) => {
        setIsGoogleAuthenticated(true);
        setGoogleUser(user);
      },
      () => {
        setIsGoogleAuthenticated(false);
        setGoogleUser(null);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const openOrderModal = (customNote?: string, mode: 'box' | 'catnip' = 'box') => {
    setOrderModalMode(mode);
    if (customNote) {
      setOrderPrefilledMessage(customNote);
    } else {
      setOrderPrefilledMessage('');
    }
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const clearSyncNotification = () => {
    setSyncNotification(null);
  };

  const closeConfirmation = () => {
    setPendingConfirmation(null);
  };

  const updateProduceStatus = (id: string, status: ProduceStatus) => {
    setProduce((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status, updatedAt: new Date().toISOString() }
          : item
      )
    );
    addLog('STATUS_CHANGE', `Updated status of item to "${status}"`, true);
  };

  const updateProduceItem = (updated: ProduceItem) => {
    setProduce((prev) =>
      prev.map((item) =>
        item.id === updated.id
          ? { ...updated, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const addNewProduceItem = (item: Omit<ProduceItem, 'id' | 'updatedAt'>) => {
    const newItem: ProduceItem = {
      ...item,
      id: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      updatedAt: new Date().toISOString(),
    };
    setProduce((prev) => [newItem, ...prev]);
    addLog('STATUS_CHANGE', `Added new crop: ${item.name}`, true);
  };

  const deleteProduceItem = (id: string) => {
    setProduce((prev) => prev.filter((item) => item.id !== id));
    addLog('STATUS_CHANGE', `Removed crop #${id}`, true);
  };

  const updateSettings = (newSettings: Partial<FarmSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Google sign in / out
  const loginGoogle = async () => {
    try {
      setIsSyncing(true);
      const res = await googleSignIn();
      if (res) {
        setIsGoogleAuthenticated(true);
        setGoogleUser(res.user);
        setSyncNotification({
          type: 'success',
          message: `Signed in as ${res.user.displayName || res.user.email}`,
        });

        // Auto locate or create doc
        try {
          const doc = await findOrCreateProduceDoc(res.accessToken);
          setGoogleDocInfo(doc);
          setSettings((prev) => ({
            ...prev,
            googleDocId: doc.id,
            googleDocUrl: doc.webViewLink,
          }));
          addLog('DOC_CREATED', `Connected to Google Doc: "${doc.title}"`, true);
        } catch (docErr: any) {
          console.error('Error connecting doc:', docErr);
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setSyncNotification({
        type: 'error',
        message: err.message || 'Google sign-in failed. Please try again.',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const logoutGoogle = async () => {
    await logout();
    setIsGoogleAuthenticated(false);
    setGoogleUser(null);
    setSyncNotification({
      type: 'info',
      message: 'Signed out of Google account.',
    });
  };

  // Real-time Push to Google Doc with explicit confirmation modal
  const executePush = async () => {
    closeConfirmation();
    setIsSyncing(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        throw new Error('Please sign in with Google to push to Google Docs.');
      }

      let currentDoc = googleDocInfo;
      if (!currentDoc) {
        currentDoc = await findOrCreateProduceDoc(token);
        setGoogleDocInfo(currentDoc);
      }

      const result = await pushProduceToGoogleDoc(token, currentDoc.id, produce);
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setSettings((prev) => ({
        ...prev,
        lastSyncedAt: timestamp,
        googleDocId: currentDoc!.id,
        googleDocUrl: currentDoc!.webViewLink,
      }));

      addLog('PUSH_TO_DOC', `Synced ${produce.length} produce statuses to Google Doc`, true);
      setSyncNotification({
        type: 'success',
        message: `Successfully updated Google Doc with ${produce.length} produce items!`,
      });
    } catch (err: any) {
      console.error('Push error:', err);
      addLog('PUSH_TO_DOC', err.message || 'Push failed', false);
      setSyncNotification({
        type: 'error',
        message: err.message || 'Failed to update Google Doc.',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const pushToGoogleDocWithAuth = async () => {
    if (!isGoogleAuthenticated) {
      await loginGoogle();
      return;
    }

    // MANDATORY Confirmation dialog before mutating user's Google Doc
    setPendingConfirmation({
      isOpen: true,
      title: "Update Google Doc with Current Harvest?",
      message: `This will update the live inventory board in Google Doc "${googleDocInfo?.title || "Farmer Mike's Produce — Harvest & Inventory"}" with current tags and statuses for ${produce.length} vegetables.`,
      onConfirm: executePush,
    });
  };

  // Pull from Google Doc
  const pullFromGoogleDocWithAuth = async () => {
    if (!isGoogleAuthenticated) {
      await loginGoogle();
      return;
    }

    setIsSyncing(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        throw new Error('Please sign in with Google to sync.');
      }

      let currentDoc = googleDocInfo;
      if (!currentDoc) {
        currentDoc = await findOrCreateProduceDoc(token);
        setGoogleDocInfo(currentDoc);
      }

      const result = await pullProduceFromGoogleDoc(token, currentDoc.id, produce);
      if (result.updatedProduce && result.itemsUpdated && result.itemsUpdated > 0) {
        setProduce(result.updatedProduce);
      }

      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setSettings((prev) => ({
        ...prev,
        lastSyncedAt: timestamp,
        googleDocId: currentDoc!.id,
        googleDocUrl: currentDoc!.webViewLink,
      }));

      addLog('PULL_FROM_DOC', result.message, true);
      setSyncNotification({
        type: 'success',
        message: result.message,
      });
    } catch (err: any) {
      console.error('Pull error:', err);
      addLog('PULL_FROM_DOC', err.message || 'Pull failed', false);
      setSyncNotification({
        type: 'error',
        message: err.message || 'Failed to sync from Google Doc.',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Periodic automatic sync if enabled
  useEffect(() => {
    if (!settings.autoSyncEnabled || !isGoogleAuthenticated || !googleDocInfo) {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const token = await getAccessToken();
        if (token && googleDocInfo.id) {
          const res = await pullProduceFromGoogleDoc(token, googleDocInfo.id, produce);
          if (res.itemsUpdated && res.itemsUpdated > 0 && res.updatedProduce) {
            setProduce(res.updatedProduce);
            addLog('PULL_FROM_DOC', `Auto-sync: updated ${res.itemsUpdated} item(s)`, true);
          }
        }
      } catch (err) {
        console.warn('Auto sync poll error', err);
      }
    }, 30000); // Poll every 30s

    return () => clearInterval(interval);
  }, [settings.autoSyncEnabled, isGoogleAuthenticated, googleDocInfo, produce, addLog]);

  return (
    <FarmContext.Provider
      value={{
        produce,
        settings,
        syncLogs,
        isAdminOpen,
        isOrderModalOpen,
        orderModalMode,
        orderPrefilledMessage,
        isGoogleAuthenticated,
        googleUser,
        googleDocInfo,
        isSyncing,
        syncNotification,
        setIsAdminOpen,
        openOrderModal,
        closeOrderModal,
        updateProduceStatus,
        updateProduceItem,
        addNewProduceItem,
        deleteProduceItem,
        updateSettings,
        loginGoogle,
        logoutGoogle,
        pushToGoogleDocWithAuth,
        pullFromGoogleDocWithAuth,
        clearSyncNotification,
        pendingConfirmation,
        closeConfirmation,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
