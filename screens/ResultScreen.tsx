import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, Check, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { Button } from '../components/Button';
import { Screen, LoanState } from '../types';

interface ResultScreenProps {
  loanState: LoanState;
  onNavigate: (screen: Screen) => void;
  onShowNotification: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ loanState, onNavigate, onShowNotification }) => {
  const [accepted, setAccepted] = useState(false);

  const finalAmount = loanState.amount; 
  const emi = Math.round((finalAmount * 0.012 * Math.pow(1.012, loanState.tenure)) / (Math.pow(1.012, loanState.tenure) - 1));

  const handleAccept = () => {
    setAccepted(true);
    // Simulate notification trigger after a moment
    setTimeout(() => {
      onShowNotification();
    }, 1000);
  };

  if (accepted) {
     return (
        <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           className="flex flex-col h-full bg-green-600 text-white p-6 justify-center items-center text-center relative overflow-hidden"
        >
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay filter blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
           </div>

           <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl z-10">
              <Check className="w-10 h-10 text-green-600" />
           </div>
           <h1 className="text-3xl font-bold mb-4 z-10">Money on the way!</h1>
           <p className="text-green-100 mb-10 z-10 max-w-xs">The amount of ₹{finalAmount.toLocaleString()} will be credited to your account shortly.</p>
           
           <Button 
             variant="secondary" 
             className="w-full max-w-xs text-green-700 font-bold z-10"
             onClick={() => onNavigate(Screen.TRUST_CENTER)}
           >
             View Data Permissions
           </Button>
        </motion.div>
     )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full bg-slate-50"
    >
      {/* Confetti / Celebration Header */}
      <div className="bg-white p-8 pb-12 rounded-b-[3rem] shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
        <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-full mb-4">
           <PartyPopper className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Loan Approved!</h1>
        <p className="text-slate-500">Based on your bank statement analysis</p>
      </div>

      <div className="flex-1 p-6 -mt-8">
        {/* Offer Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-100 relative z-10">
           <div className="text-center mb-8">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Approved Amount</p>
              <p className="text-4xl font-bold text-slate-900">₹{finalAmount.toLocaleString()}</p>
           </div>
           
           <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl mb-6">
              <div>
                 <p className="text-xs text-slate-500 mb-1">Monthly EMI</p>
                 <p className="font-bold text-slate-900">₹{emi.toLocaleString()}</p>
              </div>
              <div>
                 <p className="text-xs text-slate-500 mb-1">Tenure</p>
                 <p className="font-bold text-slate-900">{loanState.tenure} Months</p>
              </div>
              <div>
                 <p className="text-xs text-slate-500 mb-1">Interest Rate</p>
                 <p className="font-bold text-slate-900">{loanState.interestRate}% p.a.</p>
              </div>
              <div>
                 <p className="text-xs text-slate-500 mb-1">Processing Fee</p>
                 <p className="font-bold text-slate-900">₹999</p>
              </div>
           </div>

           <Button fullWidth onClick={handleAccept} className="mb-3">
             Accept Offer <ArrowRight className="w-5 h-5 ml-2" />
           </Button>
           
           <p className="text-center text-xs text-slate-400">
             Disbursal to HDFC Bank •••• 4582
           </p>
        </div>

        {/* Trust Link */}
        <button 
           onClick={() => onNavigate(Screen.TRUST_CENTER)}
           className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100 group hover:bg-slate-50 transition-colors"
        >
           <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <div className="text-left">
                 <p className="text-sm font-bold text-slate-900">Data Access Active</p>
                 <p className="text-xs text-slate-500">Your data is protected. Manage anytime.</p>
              </div>
           </div>
           <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};