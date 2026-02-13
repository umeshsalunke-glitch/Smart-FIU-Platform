import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Info, Check, X, FileText, ChevronDown } from 'lucide-react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Screen, ConsentDetails } from '../types';
import { CONSENT_INFO } from '../constants';

interface ConsentScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const ConsentScreen: React.FC<ConsentScreenProps> = ({ onNavigate }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAllow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onNavigate(Screen.SUCCESS);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-slate-50 p-6"
    >
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-slate-900">Review Data Access</h1>
        <p className="text-sm text-slate-500">QuickLoan needs your permission</p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Header of Card */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
               <span className="text-white font-bold text-xs">QL</span>
            </div>
            <div className="flex flex-col">
               <span className="font-bold text-sm text-slate-900">QuickLoan</span>
               <div className="flex items-center gap-1">
                 <Shield className="w-3 h-3 text-green-600 fill-current" />
                 <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wide">Verified Partner</span>
               </div>
            </div>
          </div>
        </div>

        {/* Consent Body */}
        <div className="p-5 space-y-6 flex-1 overflow-y-auto">
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">We will access</label>
            <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <FileText className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 text-sm">Bank Statements</p>
                <p className="text-xs text-slate-500">Last 12 months • HDFC Bank • Saving • **4582</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Why</label>
                <p className="text-sm font-medium text-slate-900">{CONSENT_INFO.purpose}</p>
             </div>
             <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">For how long</label>
                <p className="text-sm font-medium text-slate-900">{CONSENT_INFO.duration}</p>
             </div>
          </div>

          <div className="space-y-1">
             <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Access Type</label>
             <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                Read-only
             </div>
          </div>
        </div>

        {/* Trust Footer inside Card */}
        <div className="bg-slate-50 p-3 border-t border-slate-100 flex justify-center items-center gap-2">
          <Shield className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Powered by {CONSENT_INFO.partner}</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex gap-3">
           <Button 
             fullWidth 
             variant="secondary" 
             onClick={() => setIsDetailsOpen(true)}
           >
             Learn Details
           </Button>
           <Button 
             fullWidth 
             onClick={handleAllow}
             isLoading={isProcessing}
           >
             Allow Access
           </Button>
        </div>
        <p className="text-center text-xs text-slate-400">
           By clicking Allow, you agree to the <span className="underline decoration-slate-300">Terms of Service</span>
        </p>
      </div>

      {/* Details Modal */}
      <Modal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)}
        title="What data is shared?"
      >
        <div className="space-y-6">
          <div className="space-y-3">
             <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                   <Check className="w-3 h-3" />
                </div>
                <span>We WILL see:</span>
             </div>
             <ul className="pl-9 space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">Transaction credits & debits</li>
                <li className="flex items-center gap-2">Account balance history</li>
                <li className="flex items-center gap-2">Account holder name</li>
             </ul>
          </div>

          <div className="space-y-3">
             <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                   <X className="w-3 h-3" />
                </div>
                <span>We will NOT see:</span>
             </div>
             <ul className="pl-9 space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">Netbanking Password / PIN</li>
                <li className="flex items-center gap-2">UPI PIN</li>
                <li className="flex items-center gap-2">OTP / 2FA codes</li>
                <li className="flex items-center gap-2">Personal messages / Remarks</li>
             </ul>
          </div>

          <div className="pt-4 border-t border-slate-100">
             <p className="text-xs font-semibold text-slate-400 mb-2 uppercase">Sample Data View</p>
             <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 relative overflow-hidden">
                <div className="blur-[2px] opacity-60 select-none space-y-2 text-xs font-mono text-slate-400">
                   <div className="flex justify-between"><span>01/01/24</span><span>TRF/883/ZOMA..</span><span className="text-red-400">-450.00</span></div>
                   <div className="flex justify-between"><span>02/01/24</span><span>UPI/992/SWIG..</span><span className="text-red-400">-320.00</span></div>
                   <div className="flex justify-between"><span>05/01/24</span><span>SALARY/CRED..</span><span className="text-green-500">+85000.00</span></div>
                   <div className="flex justify-between"><span>06/01/24</span><span>ATM/WDL/HDFC..</span><span className="text-red-400">-5000.00</span></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-600">ENCRYPTED VIEW</span>
                   </div>
                </div>
             </div>
          </div>

          <Button fullWidth onClick={() => setIsDetailsOpen(false)}>
             Got It
          </Button>
        </div>
      </Modal>

    </motion.div>
  );
};