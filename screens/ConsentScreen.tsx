import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, X, FileText, ArrowLeft, Building2, Calendar, Info, Lock } from 'lucide-react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Screen, BankAccount } from '../types';
import { CONSENT_INFO } from '../constants';

interface ConsentScreenProps {
  onNavigate: (screen: Screen) => void;
  selectedBank: BankAccount | null;
}

export const ConsentScreen: React.FC<ConsentScreenProps> = ({ onNavigate, selectedBank }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  if (!selectedBank) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#f8fafc]"
    >
      <div className="bg-white p-6 pb-4 shadow-sm z-10">
        <div className="flex items-center gap-3 mb-2">
            <button onClick={() => onNavigate(Screen.BANK_SELECTION)} className="p-2 -ml-2 rounded-full hover:bg-slate-100">
              <ArrowLeft className="w-6 h-6 text-slate-900" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Review Data Access</h1>
        </div>
        <p className="text-sm text-slate-500 pl-2">
          Please review the permissions requested by QuickLoan.
        </p>
      </div>

      <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
        {/* Smart Consent Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100 relative">
           {/* Top Notch / Badge */}
           <div className="absolute top-0 right-0">
             <div className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
               <Shield className="w-3 h-3" /> Verified Partner
             </div>
           </div>

           {/* Card Header */}
           <div className="p-6 pb-0">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200">
                    <span className="text-white font-bold text-lg">QL</span>
                 </div>
                 <div>
                    <h2 className="font-bold text-lg text-slate-900">QuickLoan</h2>
                    <p className="text-xs text-slate-500 font-medium">Lending Service Provider</p>
                 </div>
              </div>
              <div className="h-px bg-slate-100 w-full mb-6"></div>
           </div>

           {/* Card Body - Grid Layout */}
           <div className="px-6 pb-6 space-y-6">
              
              {/* Section 1: Source */}
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-blue-600" />
                 </div>
                 <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Source</p>
                    <p className="text-sm font-bold text-slate-900">{selectedBank.bankName}</p>
                    <p className="text-xs text-slate-500">{selectedBank.accountType} •••• {selectedBank.mask}</p>
                 </div>
              </div>

              {/* Section 2: Data */}
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-purple-600" />
                 </div>
                 <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">We Need</p>
                    <p className="text-sm font-bold text-slate-900">12 Months Statement</p>
                    <p className="text-xs text-slate-500">To analyze income trends</p>
                 </div>
              </div>

               {/* Section 3: Duration */}
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-orange-600" />
                 </div>
                 <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Duration</p>
                    <p className="text-sm font-bold text-slate-900">One-time Access</p>
                    <p className="text-xs text-slate-500">Valid for 30 days only</p>
                 </div>
              </div>

              {/* Trust Box */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mt-2">
                 <div className="flex items-start gap-2 mb-3">
                    <Lock className="w-4 h-4 text-green-600 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-snug">
                       Your data is encrypted. We <b>cannot</b> see your netbanking password, UPI PIN, or move money.
                    </p>
                 </div>
                 <button 
                   onClick={() => setIsDetailsOpen(true)}
                   className="text-xs font-bold text-primary-600 flex items-center hover:underline"
                 >
                   See full details <Info className="w-3 h-3 ml-1" />
                 </button>
              </div>

           </div>
        </div>
        
        <p className="text-center text-[10px] text-slate-400 mt-6 mx-8 leading-relaxed">
           By approving, you authorize the Account Aggregator to fetch data from your bank and share it with QuickLoan for loan processing.
        </p>
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex gap-3">
           <Button 
             fullWidth 
             variant="secondary" 
             onClick={() => onNavigate(Screen.BANK_SELECTION)}
           >
             Deny
           </Button>
           <Button 
             fullWidth 
             onClick={() => onNavigate(Screen.BANK_OTP)}
             className="bg-slate-900 hover:bg-black shadow-slate-900/20"
           >
             Approve Access
           </Button>
        </div>
      </div>

      {/* Details Modal */}
      <Modal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)}
        title="Privacy Details"
      >
        <div className="space-y-6">
          <div className="space-y-3">
             <div className="flex items-center gap-2 text-green-700 font-bold text-sm bg-green-50 p-3 rounded-lg">
                <Check className="w-4 h-4" />
                <span>What we WILL see</span>
             </div>
             <ul className="pl-4 space-y-3 text-sm text-slate-600 border-l-2 border-slate-100 ml-4">
                <li className="flex flex-col">
                   <span className="font-semibold text-slate-900">Transaction History</span>
                   <span className="text-xs">Credits and debits for income verification.</span>
                </li>
                <li className="flex flex-col">
                   <span className="font-semibold text-slate-900">Account Summary</span>
                   <span className="text-xs">Current balance and account type.</span>
                </li>
             </ul>
          </div>

          <div className="space-y-3">
             <div className="flex items-center gap-2 text-red-700 font-bold text-sm bg-red-50 p-3 rounded-lg">
                <X className="w-4 h-4" />
                <span>What we CANNOT see</span>
             </div>
             <ul className="pl-4 space-y-3 text-sm text-slate-600 border-l-2 border-slate-100 ml-4">
                <li className="flex items-center gap-2">❌ Netbanking Password / PIN</li>
                <li className="flex items-center gap-2">❌ UPI PIN or OTPs</li>
                <li className="flex items-center gap-2">❌ Personal Messages</li>
             </ul>
          </div>

          <Button fullWidth onClick={() => setIsDetailsOpen(false)}>
             I Understand
          </Button>
        </div>
      </Modal>

    </motion.div>
  );
};