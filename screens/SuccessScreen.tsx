import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { Screen } from '../types';

interface SuccessScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onNavigate }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate(Screen.PROCESSING);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full bg-white p-6 text-center"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </motion.div>

      <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Granted</h1>
      <p className="text-slate-500 mb-8">Your data has been securely linked.</p>

      <div className="bg-slate-50 rounded-2xl p-6 w-full max-w-xs mb-8 space-y-4 border border-slate-100">
        <div className="flex items-start gap-3 text-left">
           <ShieldCheck className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
           <div>
              <p className="text-sm font-semibold text-slate-900">Verification active</p>
              <p className="text-xs text-slate-500">Valid until 15 March 2026</p>
           </div>
        </div>
        <div className="flex items-start gap-3 text-left">
           <div className="w-5 h-5 rounded-full border-2 border-primary-600 flex items-center justify-center shrink-0 mt-0.5">
             <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
           </div>
           <div>
              <p className="text-sm font-semibold text-slate-900">You remain in control</p>
              <p className="text-xs text-slate-500">Manage permissions anytime</p>
           </div>
        </div>
      </div>

      <div className="w-full space-y-3">
        <Button fullWidth variant="secondary" onClick={() => onNavigate(Screen.TRUST_CENTER)}>
          Manage Permissions
        </Button>
      </div>

      <p className="absolute bottom-10 text-xs text-slate-400 animate-pulse">
        Redirecting to loan processing...
      </p>
    </motion.div>
  );
};