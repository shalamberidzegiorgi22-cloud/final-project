import { useState } from 'react';
import { Shield, CheckCircle2, Lock, UserCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/useTheme';
import { useLanguage } from '../../context/useLanguage';
import { PruffoLogo } from '../../components/PruffoLogo';
import './contract.css';

export default function Contract({ activeTab, onTabChange }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const copy = t.contract;
  
  // Buyer state
  const [selectedCity, setSelectedCity] = useState('Berlin');
  const [sellerUrl, setSellerUrl] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  // Inspector state
  const [inspectorForm, setInspectorForm] = useState({
    fullName: '',
    qualification: 'Zweiradmechaniker-Meister (HWK)',
    certNumber: '',
    city: 'Berlin',
    experience: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cities = ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'];

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-clip p-4 transition-colors duration-300 sm:p-6 lg:p-8 ${isDark ? 'bg-[#0a0a0a] text-zinc-100' : 'bg-[#f8f9fa] text-zinc-900'}`}>
      <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/40 pb-5 sm:pb-6">
          <div className="flex items-center gap-3">
            <PruffoLogo className="h-8 w-auto shrink-0 object-contain" />
            <span className="font-bold tracking-widest text-base bg-gradient-to-r from-[#d4af37] to-amber-200 bg-clip-text text-transparent">{copy.brand}</span>
          </div>
          
        </div>

        {/* Navigation Switcher between Buyer & Inspector */}
        <div className="blue-glass-card mx-auto flex w-full max-w-md rounded-2xl p-1.5">
          <button 
            onClick={() => onTabChange('buyer')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'buyer' ? 'bg-[#d4af37] text-black shadow-lg' : 'text-zinc-400 hover:text-white'}`}
          >
            <Shield size={16} />
            <span className="min-w-0">{copy.buyerTab}</span>
          </button>
          <button 
            onClick={() => onTabChange('inspector')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'inspector' ? 'bg-[#d4af37] text-black shadow-lg' : 'text-zinc-400 hover:text-white'}`}
          >
            <UserCheck size={16} />
            <span className="min-w-0">{copy.inspectorTab}</span>
          </button>
        </div>

        {/* TAB 1: BUYER CONTRACT */}
        {activeTab === 'buyer' && (
          <div className="blue-glass-card space-y-6 rounded-3xl p-4 sm:p-6 md:p-8">
            {!isPaid ? (
              <>
                <div className="space-y-2">
                  <h2 className="text-xl font-serif font-bold leading-tight sm:text-2xl">{copy.buyerTitle}</h2>
                  <p className="text-sm opacity-70">{copy.buyerDescription}</p>
                </div>

                <div className="space-y-4 pt-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase opacity-80">{copy.cityLabel}</label>
                    <select 
                      value={selectedCity} 
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-amber-500/50 bg-slate-900 text-sm text-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.12)] outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40"
                    >
                      {cities.map((city, idx) => <option className="bg-slate-900 text-amber-400" key={idx} value={city}>{city}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase opacity-80">{copy.sellerLabel}</label>
                    <input 
                      type="text" 
                      placeholder="https://www.kleinanzeigen.de/s-anzeige/..." 
                      value={sellerUrl} 
                      onChange={(e) => setSellerUrl(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-amber-500/50 bg-slate-900 text-sm text-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.12)] outline-none transition placeholder:text-amber-400/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/10 flex items-center gap-3 text-xs text-amber-300">
                  <Lock size={18} className="shrink-0" />
                  <span>{copy.escrow}</span>
                </div>

                <button 
                  onClick={() => setIsPaid(true)} 
                  className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-amber-500 text-black font-bold rounded-xl shadow-lg hover:from-amber-400 hover:to-amber-600 transition-all flex items-center justify-center gap-2"
                >
                  <span>{copy.confirmOrder}</span>
                  <ArrowRight size={18} />
                </button>
              </>
            ) : (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 size={56} className="text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold">{copy.confirmedTitle}</h3>
                <p className="text-sm opacity-80 max-w-md mx-auto">{copy.confirmedDescription(selectedCity)}</p>
                <button onClick={() => setIsPaid(false)} className="px-6 py-2.5 bg-zinc-800 text-xs font-bold rounded-xl hover:bg-zinc-700">{copy.bookAnother}</button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INSPECTOR REGISTRATION */}
        {activeTab === 'inspector' && (
          <div className="blue-glass-card space-y-6 rounded-3xl p-4 sm:p-6 md:p-8">
            {!isSubmitted ? (
              <>
                <div className="space-y-2">
                  <h2 className="text-xl font-serif font-bold leading-tight sm:text-2xl">{copy.inspectorTitle}</h2>
                  <p className="text-sm opacity-70">{copy.inspectorDescription}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase opacity-80">{copy.fullName}</label>
                    <input 
                      type="text" 
                      placeholder={copy.namePlaceholder}
                      value={inspectorForm.fullName}
                      onChange={(e) => setInspectorForm({...inspectorForm, fullName: e.target.value})}
                      className="w-full p-3.5 rounded-xl border border-amber-500/50 bg-slate-900 text-sm text-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.12)] outline-none transition placeholder:text-amber-400/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase opacity-80">{copy.primaryCity}</label>
                    <select 
                      value={inspectorForm.city}
                      onChange={(e) => setInspectorForm({...inspectorForm, city: e.target.value})}
                      className="w-full p-3.5 rounded-xl border border-amber-500/50 bg-slate-900 text-sm text-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.12)] outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40"
                    >
                      {cities.map((city, idx) => <option className="bg-slate-900 text-amber-400" key={idx} value={city}>{city}</option>)}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold mb-2 uppercase opacity-80">{copy.qualification}</label>
                    <select 
                      value={inspectorForm.qualification}
                      onChange={(e) => setInspectorForm({...inspectorForm, qualification: e.target.value})}
                      className="w-full p-3.5 rounded-xl border border-amber-500/50 bg-slate-900 text-sm text-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.12)] outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40"
                    >
                      <option className="bg-slate-900 text-amber-400">Zweiradmechaniker-Meister (HWK)</option>
                      <option className="bg-slate-900 text-amber-400">Diplom-Ingenieur (Fahrzeugtechnik)</option>
                      <option className="bg-slate-900 text-amber-400">OEM Certified E-Bike Specialist (Bosch/Shimano)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold mb-2 uppercase opacity-80">{copy.certificate}</label>
                    <input 
                      type="text" 
                      placeholder={copy.certificatePlaceholder}
                      value={inspectorForm.certNumber}
                      onChange={(e) => setInspectorForm({...inspectorForm, certNumber: e.target.value})}
                      className="w-full p-3.5 rounded-xl border border-amber-500/50 bg-slate-900 text-sm text-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.12)] outline-none transition placeholder:text-amber-400/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setIsSubmitted(true)} 
                  className="w-full py-4 bg-[#d4af37] text-black font-bold rounded-xl hover:bg-amber-400 transition-all"
                >
                  {copy.submitApplication}
                </button>
              </>
            ) : (
              <div className="text-center py-10 space-y-4">
                <AlertCircle size={56} className="text-[#d4af37] mx-auto animate-pulse" />
                <h3 className="text-2xl font-bold">{copy.applicationTitle}</h3>
                <p className="text-sm opacity-80 max-w-md mx-auto">{copy.applicationDescription(inspectorForm.city)}</p>
                <button onClick={() => setIsSubmitted(false)} className="px-6 py-2.5 bg-zinc-800 text-xs font-bold rounded-xl hover:bg-zinc-700">{copy.backToForm}</button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}