import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Clock, Ban, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { Screen } from '../types';

interface EducationScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const EducationScreen: React.FC<EducationScreenProps> = ({ onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col h-full bg-white p-6 pt-4"
    >
      <div className="flex items-center mb-6">
        <button onClick={() => onNavigate(Screen.HOME)} className="p-2 -ml-2 rounded-full hover:bg-slate-100">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </button>
      </div>

      <motion.h1 variants={itemVariants} className="text-2xl font-bold text-slate-900 mb-2">
        How We Verify Your Income
      </motion.h1>
      <motion.p variants={itemVariants} className="text-slate-500 mb-8">
        We use a government-backed framework to securely view your bank statements instantly.
      </motion.p>

      {/* Illustration Area */}
      <motion.div variants={itemVariants} className="flex-1 flex flex-col items-center justify-center mb-8 relative">
        <div className="w-full h-48 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center relative overflow-hidden">
          {/* Simple Diagram */}
          <div className="flex items-center gap-2 z-10">
            <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-100">
                    <span className="text-2xl">👤</span>
                </div>
                <span className="text-xs font-medium text-slate-500">You</span>
            </div>
            <div className="w-12 h-[2px] bg-slate-200 relative">
               <motion.div 
                 animate={{ x: [0, 48, 0] }} 
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-primary-500 rounded-full"
               />
            </div>
             <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-blue-50 rounded-full shadow-inner flex items-center justify-center border border-blue-100">
                   <Lock className="w-6 h-6 text-blue-500" />
                </div>
                <span className="text-xs font-medium text-blue-600">Secure AA</span>
            </div>
            <div className="w-12 h-[2px] bg-slate-200 relative">
               <motion.div 
                 animate={{ x: [0, 48, 0] }} 
                 transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1 }}
                 className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-primary-500 rounded-full"
               />
            </div>
             <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-100">
                    <span className="text-2xl">🏦</span>
                </div>
                <span className="text-xs font-medium text-slate-500">Bank</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent opacity-50"></div>
        </div>
      </motion.div>

      {/* Value Props */}
      <div className="space-y-6 mb-8">
        <motion.div variants={itemVariants} className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Your data is encrypted</h3>
            <p className="text-sm text-slate-500 leading-relaxed">We only see read-only data. We can never move your money.</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Access is time-limited</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Permission automatically expires after 30 days. No hidden renewals.</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
            <Ban className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">You can stop anytime</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Revoke access instantly from your dashboard or bank app.</p>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mt-auto space-y-3">
        <Button fullWidth onClick={() => onNavigate(Screen.CONSENT)}>
          Continue Securely
        </Button>
        <Button fullWidth variant="ghost" onClick={() => {}}>
          Learn More
        </Button>
      </motion.div>
    </motion.div>
  );
};