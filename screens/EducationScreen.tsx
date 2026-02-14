import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Ban, ArrowLeft, ArrowRight, Lock } from 'lucide-react';
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
      className="flex flex-col h-full bg-white"
    >
      <div className="p-6 pb-2">
        <button onClick={() => onNavigate(Screen.HOME)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </button>
      </div>

      <div className="flex-1 px-6 flex flex-col overflow-y-auto no-scrollbar">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-3 leading-tight">
            Safe & Instant <br/>
            <span className="text-primary-600">Income Verification</span>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            We use the secure Account Aggregator (AA) network to verify your income without you uploading any PDFs.
          </p>
        </motion.div>

        {/* Animated Visual Story */}
        <motion.div variants={itemVariants} className="mb-10 w-full aspect-[2/1] bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#eff6ff,transparent)]"></div>
          
          <div className="relative z-10 flex items-center gap-4">
             {/* Bank */}
             <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center z-10">
                   <span className="text-2xl">🏦</span>
                </div>
                <span className="text-xs font-semibold text-slate-400 mt-2">Your Bank</span>
             </div>

             {/* Connection Line */}
             <div className="flex flex-col items-center justify-center w-20 relative">
                <div className="h-[2px] w-full bg-slate-200"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-full border border-slate-100 shadow-sm">
                   <Lock className="w-3 h-3 text-green-500" />
                </div>
                <motion.div 
                  className="absolute top-[calc(50%-2px)] left-0 w-1.5 h-1.5 bg-primary-500 rounded-full"
                  animate={{ x: [0, 80, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                />
             </div>

             {/* App */}
             <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-primary-600 rounded-2xl shadow-lg shadow-primary-200 flex items-center justify-center z-10">
                   <span className="text-white font-bold text-lg">QL</span>
                </div>
                <span className="text-xs font-semibold text-primary-600 mt-2">QuickLoan</span>
             </div>
          </div>
        </motion.div>

        {/* Trust Pillars */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-1">
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">100% Encrypted</h3>
              <p className="text-slate-500 leading-relaxed">
                Data flows directly from your bank to us. No one else can see or store it.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-1">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">One-time Access</h3>
              <p className="text-slate-500 leading-relaxed">
                 We only view data for 30 days to approve this loan. Permission expires automatically.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mt-1">
              <Ban className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Full Control</h3>
              <p className="text-slate-500 leading-relaxed">
                You can revoke access instantly at any time from the Trust Center.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <Button fullWidth onClick={() => onNavigate(Screen.AA_LOGIN)}>
          Connect Securely <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-center text-xs text-slate-400 mt-4">
          Powered by Government-regulated Account Aggregator Framework
        </p>
      </div>
    </motion.div>
  );
};