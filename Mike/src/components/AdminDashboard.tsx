import React, { useState, useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import { ProduceStatus, ProduceCategory, ProduceItem } from '../types/produce';
import { 
  X, 
  FileText, 
  Upload, 
  Download, 
  ExternalLink, 
  Check, 
  Plus, 
  Trash2, 
  Settings, 
  ListOrdered, 
  LogOut, 
  AlertCircle,
  Clock,
  CheckCircle2,
  Lock,
  Save,
  KeyRound
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    produce,
    settings,
    syncLogs,
    isGoogleAuthenticated,
    googleUser,
    googleDocInfo,
    isSyncing,
    syncNotification,
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
  } = useFarm();

  // Authentication State: username "Mike", password "Cunt!"
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('farmer_mike_admin_auth') === 'true';
  });
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'inventory' | 'googledoc' | 'settings' | 'logs'>('inventory');
  
  // State for adding a new crop
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<ProduceCategory>('Leafy');
  const [newStatus, setNewStatus] = useState<ProduceStatus>('Fresh today');
  const [newDescription, setNewDescription] = useState('');
  const [newHarvestNote, setNewHarvestNote] = useState('');
  const [newUnit, setNewUnit] = useState('bunch');
  const [newImage, setNewImage] = useState('');

  // Editable settings fields
  const [boxPriceInput, setBoxPriceInput] = useState(settings.boxPrice.toString());
  const [whatsAppInput, setWhatsAppInput] = useState(settings.whatsAppNumber || '+27 72 488 6140');
  const [emailInput, setEmailInput] = useState(settings.emailAddress);
  
  // Settings save indication state
  const [isSettingsSaved, setIsSettingsSaved] = useState(false);

  useEffect(() => {
    setBoxPriceInput(settings.boxPrice.toString());
    setWhatsAppInput(settings.whatsAppNumber || '+27 72 488 6140');
    setEmailInput(settings.emailAddress);
  }, [settings]);

  if (!isAdminOpen) return null;

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = loginUsername.trim().toLowerCase();
    const cleanPass = loginPassword.trim();

    if (cleanUser === 'mike' && cleanPass === 'Cunt!') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('farmer_mike_admin_auth', 'true');
      setLoginError('');
      setLoginPassword('');
    } else {
      setLoginError('Invalid credentials. Please check your username and password.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('farmer_mike_admin_auth');
    setLoginUsername('');
    setLoginPassword('');
    setLoginError('');
  };

  const statuses: ProduceStatus[] = [
    'Fresh today',
    'Available today',
    'Low inventory',
    'Out of stock',
    'Coming into season',
  ];

  const categories: ProduceCategory[] = [
    'Leafy',
    'Roots',
    'Fruiting',
    'Alliums',
    'Herbs & Catnip',
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addNewProduceItem({
      name: newName.trim(),
      category: newCategory,
      status: newStatus,
      description: newDescription.trim() || 'Freshly grown in Noordhoek beds.',
      harvestNote: newHarvestNote.trim(),
      unit: newUnit.trim() || 'bunch',
      image: newImage.trim() || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      isSeasonalBoxFeatured: true,
    });

    setNewName('');
    setNewDescription('');
    setNewHarvestNote('');
    setShowAddForm(false);
  };

  const handleSaveSettings = () => {
    updateSettings({
      boxPrice: Number(boxPriceInput) || 200,
      whatsAppNumber: whatsAppInput,
      emailAddress: emailInput,
    });
    setIsSettingsSaved(true);
  };

  // Revert saved state as soon as any input changes
  const handlePriceChange = (val: string) => {
    setBoxPriceInput(val);
    setIsSettingsSaved(false);
  };

  const handleWhatsAppChange = (val: string) => {
    setWhatsAppInput(val);
    setIsSettingsSaved(false);
  };

  const handleEmailChange = (val: string) => {
    setEmailInput(val);
    setIsSettingsSaved(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-4xl max-h-[92vh] bg-[#FAF7F2] rounded-3xl border border-[#4D685A]/30 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#EAE4D7] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A2B] text-[#FAF7F2] flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E3A2B]">
                  Farmer Mike’s Dashboard
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#1E3A2B] text-white">
                  Owner Admin
                </span>
              </div>
              <p className="text-xs text-[#654E38] mt-0.5">
                Real-time produce status tags • Bi-directional Google Doc sync
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={handleAdminLogout}
                className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white/70 hover:bg-white text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Lock admin session"
              >
                <Lock className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )}

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sync notification banner */}
        {syncNotification && (
          <div className={`px-4 py-2.5 text-xs flex items-center justify-between border-b ${
            syncNotification.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
              : syncNotification.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-stone-100 text-stone-800 border-stone-200'
          }`}>
            <div className="flex items-center gap-2">
              {syncNotification.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              {syncNotification.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
              <span>{syncNotification.message}</span>
            </div>
            <button 
              onClick={clearSyncNotification}
              className="text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* VIEW 1: ADMIN LOGIN SCREEN (IF NOT AUTHENTICATED) */}
        {!isAdminAuthenticated ? (
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#1E3A2B] text-[#FAF7F2] flex items-center justify-center mx-auto mb-4 shadow-sm">
                <KeyRound className="w-7 h-7 text-[#E8B042]" />
              </div>

              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1E3A2B] mb-1">
                Farmer Admin Access
              </h4>
              <p className="text-xs text-stone-500 mb-6">
                Please sign in to update live crop tags and manage Google Doc inventory.
              </p>

              {loginError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Mike"
                    autoFocus
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A2B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#1E3A2B] hover:bg-[#14281E] text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
                >
                  Log In to Dashboard
                </button>
              </form>

              <p className="text-[11px] text-stone-400 mt-5">
                Protected area for Farmer Mike's Produce
              </p>
            </div>
          </div>
        ) : (
          /* VIEW 2: AUTHENTICATED DASHBOARD */
          <>
            {/* Tabs Bar with generous vertical height to prevent cutting off */}
            <div className="flex items-center min-h-[64px] border-b border-stone-200 bg-[#FAF7F2] px-4 sm:px-6 overflow-x-auto no-scrollbar gap-2 py-2.5">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`py-2 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'inventory'
                    ? 'bg-[#1E3A2B] text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/80'
                }`}
              >
                <ListOrdered className="w-4 h-4" />
                <span>Produce Tags & Harvest ({produce.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('googledoc')}
                className={`py-2 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'googledoc'
                    ? 'bg-[#1E3A2B] text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/80'
                }`}
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Google Doc Sync</span>
                {isGoogleAuthenticated && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'settings'
                    ? 'bg-[#1E3A2B] text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/80'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Farm Settings</span>
              </button>

              <button
                onClick={() => setActiveTab('logs')}
                className={`py-2 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'logs'
                    ? 'bg-[#1E3A2B] text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/80'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Sync Activity ({syncLogs.length})</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* TAB 1: INVENTORY & TAGS */}
              {activeTab === 'inventory' && (
                <div className="space-y-4">
                  
                  {/* Quick toolbar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#F3EDE2] p-3.5 rounded-2xl border border-[#4D685A]/15">
                    <div className="text-xs text-stone-700">
                      <span className="font-semibold text-[#1E3A2B]">Quick Tap Tagging: </span>
                      Tap any status below to immediately update that crop on the live website and prepare for Google Doc sync.
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="px-3 py-1.5 rounded-xl bg-[#1E3A2B] text-[#FAF7F2] text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-[#14281E]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{showAddForm ? 'Close Form' : 'Add New Crop'}</span>
                      </button>

                      <button
                        onClick={pushToGoogleDocWithAuth}
                        disabled={isSyncing}
                        className="px-3 py-1.5 rounded-xl bg-[#4D685A] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-[#3D5347]"
                        title="Push current tags to Google Doc"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Push to Doc</span>
                      </button>
                    </div>
                  </div>

                  {/* Add New Crop Expandable Form */}
                  {showAddForm && (
                    <form onSubmit={handleAddSubmit} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3 animate-in fade-in duration-150">
                      <h4 className="font-serif font-bold text-sm text-[#1E3A2B]">
                        Add New Crop to Harvest Board
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-stone-600 block mb-1">Crop Name</label>
                          <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="e.g. Crisp Kale"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-[#1E3A2B]"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-stone-600 block mb-1">Category</label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value as ProduceCategory)}
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-[#1E3A2B]"
                          >
                            {categories.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-stone-600 block mb-1">Initial Status</label>
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value as ProduceStatus)}
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-[#1E3A2B]"
                          >
                            {statuses.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-stone-600 block mb-1">Harvest Note / Timing</label>
                          <input
                            type="text"
                            value={newHarvestNote}
                            onChange={(e) => setNewHarvestNote(e.target.value)}
                            placeholder="e.g. Pulled this morning, sweet and tender"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-[#1E3A2B]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-stone-600 block mb-1">Unit</label>
                          <input
                            type="text"
                            value={newUnit}
                            onChange={(e) => setNewUnit(e.target.value)}
                            placeholder="e.g. bunch, kg, pair"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-[#1E3A2B]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-600 text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-[#1E3A2B] text-white text-xs font-semibold cursor-pointer"
                        >
                          Save Crop
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Produce Rows with One-Click Status Switching */}
                  <div className="space-y-3">
                    {produce.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-[#1E3A2B]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
                      >
                        {/* Item Info */}
                        <div className="flex items-center gap-3 min-w-[220px]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif font-bold text-sm text-stone-900 leading-snug">
                                {item.name}
                              </h4>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1 italic">
                              {item.harvestNote || item.description}
                            </p>
                          </div>
                        </div>

                        {/* Status Pill Selectors */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {statuses.map((status) => {
                            const isSelected = item.status === status;
                            let btnStyle = 'bg-stone-100 text-stone-600 hover:bg-stone-200 border-stone-200';
                            if (isSelected) {
                              if (status === 'Fresh today') btnStyle = 'bg-emerald-600 text-white font-bold shadow-xs';
                              else if (status === 'Available today') btnStyle = 'bg-[#1E3A2B] text-white font-bold shadow-xs';
                              else if (status === 'Low inventory') btnStyle = 'bg-amber-600 text-white font-bold shadow-xs';
                              else if (status === 'Out of stock') btnStyle = 'bg-stone-600 text-white font-bold shadow-xs';
                              else if (status === 'Coming into season') btnStyle = 'bg-sky-600 text-white font-bold shadow-xs';
                            }

                            return (
                              <button
                                key={status}
                                type="button"
                                onClick={() => updateProduceStatus(item.id, status)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] transition-all cursor-pointer border ${btnStyle}`}
                              >
                                {status}
                              </button>
                            );
                          })}
                        </div>

                        {/* Seasonal Box Toggle & Delete */}
                        <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                          <button
                            type="button"
                            onClick={() =>
                              updateProduceItem({
                                ...item,
                                isSeasonalBoxFeatured: !item.isSeasonalBoxFeatured,
                              })
                            }
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors cursor-pointer ${
                              item.isSeasonalBoxFeatured
                                ? 'bg-[#EAE4D7] border-[#4D685A]/30 text-[#1E3A2B]'
                                : 'bg-stone-50 border-stone-200 text-stone-400'
                            }`}
                            title="Include in R200 Seasonal Box highlights"
                          >
                            {item.isSeasonalBoxFeatured ? '★ In Box' : 'Not in Box'}
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteProduceItem(item.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete crop"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 2: GOOGLE DOC SYNC */}
              {activeTab === 'googledoc' && (
                <div className="space-y-6">
                  
                  {/* Google Auth Status Card */}
                  <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#EAE4D7] text-[#1E3A2B] flex items-center justify-center shrink-0">
                          <FileText className="w-6 h-6 text-[#1E3A2B]" />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-lg text-stone-900">
                            Google Docs Integration
                          </h4>
                          <p className="text-xs text-stone-500">
                            Bi-directional real-time sync with Mike's Google Drive & Docs.
                          </p>
                        </div>
                      </div>

                      {/* Official Google Sign-In Button */}
                      {!isGoogleAuthenticated ? (
                        <button
                          type="button"
                          onClick={loginGoogle}
                          disabled={isSyncing}
                          className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center gap-2.5 shadow-xs cursor-pointer transition-all"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                          </svg>
                          <span>Sign in with Google</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-xs font-semibold text-stone-900 block">
                              {googleUser?.displayName || 'Connected'}
                            </span>
                            <span className="text-[10px] text-stone-500 font-mono">
                              {googleUser?.email}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={logoutGoogle}
                            className="p-2 rounded-xl border border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
                            title="Sign out of Google"
                          >
                            <LogOut className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Document Information & Quick Link */}
                    {googleDocInfo && (
                      <div className="mt-6 p-4 rounded-2xl bg-[#F3EDE2] border border-[#4D685A]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A2B]">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Connected Google Doc:</span>
                          </div>
                          <p className="font-serif text-sm font-semibold text-stone-900 mt-0.5">
                            {googleDocInfo.title}
                          </p>
                          <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                            ID: {googleDocInfo.id}
                          </p>
                        </div>

                        <a
                          href={googleDocInfo.webViewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-700 hover:text-[#1E3A2B] text-xs font-semibold shadow-2xs transition-all"
                        >
                          <span>Open in Google Docs</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Sync Actions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Push to Google Doc */}
                    <div className="p-5 rounded-2xl bg-white border border-stone-200 flex flex-col justify-between">
                      <div>
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1E3A2B] flex items-center justify-center mb-3">
                          <Upload className="w-4 h-4" />
                        </div>
                        <h5 className="font-serif font-bold text-base text-stone-900">
                          Push to Google Doc
                        </h5>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                          Writes current inventory statuses and tags from this website to your Google Doc.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={pushToGoogleDocWithAuth}
                        disabled={isSyncing}
                        className="mt-4 w-full py-2.5 rounded-xl bg-[#1E3A2B] hover:bg-[#14281E] text-[#FAF7F2] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all disabled:opacity-50"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isSyncing ? 'Synchronizing...' : 'Push Statuses to Google Doc'}</span>
                      </button>
                    </div>

                    {/* Pull from Google Doc */}
                    <div className="p-5 rounded-2xl bg-white border border-stone-200 flex flex-col justify-between">
                      <div>
                        <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-3">
                          <Download className="w-4 h-4" />
                        </div>
                        <h5 className="font-serif font-bold text-base text-stone-900">
                          Pull from Google Doc
                        </h5>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                          Reads edits you made directly in the Google Doc and updates the farm harvest board live on the website.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={pullFromGoogleDocWithAuth}
                        disabled={isSyncing}
                        className="mt-4 w-full py-2.5 rounded-xl bg-[#4D685A] hover:bg-[#3D5347] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all disabled:opacity-50"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isSyncing ? 'Reading Doc...' : 'Pull Statuses from Google Doc'}</span>
                      </button>
                    </div>

                  </div>

                  {/* Auto-Sync Toggle */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-xs text-stone-900 block">
                        Automatic Background Sync (Every 30 seconds)
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Continuously checks your Google Doc for status changes made outside this dashboard.
                      </span>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoSyncEnabled}
                        onChange={(e) => updateSettings({ autoSyncEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E3A2B]"></div>
                    </label>
                  </div>

                  {/* Instructions on how bi-directional works */}
                  <div className="p-4 rounded-2xl bg-[#EAE4D7] border border-[#4D685A]/15 text-xs text-stone-700 space-y-2">
                    <span className="font-serif font-bold text-[#1E3A2B] block text-sm">
                      How Bi-Directional Sync Works:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-stone-600">
                      <li><strong>Editing on Website:</strong> Tap any tag (e.g., "Fresh today", "Out of stock") and click "Push to Google Doc". The document updates instantly.</li>
                      <li><strong>Editing in Google Docs:</strong> Open your Google Doc on your phone or laptop. Change any row's status tag. Tap "Pull from Google Doc" (or let auto-sync run), and the website board updates in real time!</li>
                    </ul>
                  </div>

                </div>
              )}

              {/* TAB 3: FARM SETTINGS WITH SAVE INDICATION */}
              {activeTab === 'settings' && (
                <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
                  <h4 className="font-serif font-bold text-lg text-stone-900">
                    Farm Information & Contact
                  </h4>
                  <p className="text-xs text-stone-500">
                    Adjust box pricing and editable contact details.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Seasonal Box Price (ZAR)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs font-bold text-stone-500">R</span>
                        <input
                          type="number"
                          value={boxPriceInput}
                          onChange={(e) => handlePriceChange(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-300 text-sm focus:ring-1 focus:ring-[#1E3A2B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        WhatsApp Ordering Number (Active)
                      </label>
                      <input
                        type="text"
                        value={whatsAppInput}
                        onChange={(e) => handleWhatsAppChange(e.target.value)}
                        placeholder="+27 72 488 6140"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:ring-1 focus:ring-[#1E3A2B]"
                      />
                      <span className="text-[10px] text-stone-500 block mt-1">
                        Mike's cell: +27 72 488 6140
                      </span>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address / Placeholder
                      </label>
                      <input
                        type="text"
                        value={emailInput}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        placeholder="[EMAIL ADDRESS] or mike@..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:ring-1 focus:ring-[#1E3A2B]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-xs text-stone-500">
                      {isSettingsSaved ? 'All changes saved.' : 'Unsaved changes pending.'}
                    </span>

                    <button
                      type="button"
                      onClick={handleSaveSettings}
                      className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                        isSettingsSaved 
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                          : 'bg-[#1E3A2B] hover:bg-[#14281E] text-white'
                      }`}
                    >
                      {isSettingsSaved ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>✓ Changes Saved Successfully</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 text-white" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: SYNC ACTIVITY LOG */}
              {activeTab === 'logs' && (
                <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-stone-900">
                        Sync Activity Log
                      </h4>
                      <p className="text-xs text-stone-500">
                        History of recent inventory status changes and Google Doc synchronisations.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {syncLogs.length === 0 ? (
                      <div className="p-8 text-center text-xs text-stone-400 italic">
                        No sync activity recorded yet. Changes will appear here.
                      </div>
                    ) : (
                      syncLogs.map((log) => (
                        <div
                          key={log.id}
                          className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`w-2 h-2 rounded-full ${log.success ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            <div>
                              <span className="font-semibold text-stone-900 mr-2">
                                {log.action}
                              </span>
                              <span className="text-stone-600 font-mono text-[11px]">
                                {log.details}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] text-stone-400 font-mono shrink-0 ml-2">
                            {log.timestamp}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};
