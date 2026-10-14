export type ProduceStatus = 
  | 'Fresh today'
  | 'Available today'
  | 'Low inventory'
  | 'Out of stock'
  | 'Coming into season';

export type ProduceCategory = 
  | 'Leafy'
  | 'Roots'
  | 'Fruiting'
  | 'Alliums'
  | 'Herbs & Catnip';

export interface ProduceItem {
  id: string;
  name: string;
  afrikaansName?: string;
  category: ProduceCategory;
  status: ProduceStatus;
  description: string;
  image: string;
  isSeasonalBoxFeatured: boolean;
  harvestNote?: string;
  unit: string;
  updatedAt: string;
}

export interface FarmSettings {
  boxPrice: number;
  currency: string;
  tagline: string;
  subTagline: string;
  whatsAppNumber: string; // e.g. placeholder "[WHATSAPP NUMBER]" or editable number
  emailAddress: string;   // e.g. placeholder "[EMAIL ADDRESS]"
  pickupLocation: string; // "Noordhoek Farm Stand / Direct arrangement"
  googleDocId?: string;
  googleDocUrl?: string;
  autoSyncEnabled: boolean;
  lastSyncedAt?: string;
}

export interface SyncLogEntry {
  id: string;
  timestamp: string;
  action: 'PUSH_TO_DOC' | 'PULL_FROM_DOC' | 'DOC_CREATED' | 'STATUS_CHANGE';
  details: string;
  success: boolean;
}
