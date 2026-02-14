import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Shield, Download, History, LifeBuoy, Trash2, Check, AlertCircle } from 'lucide-react';
import { Screen } from '../types';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_CHART_DATA } from '../constants';

interface TrustCenterScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const TrustCenterScreen: React.FC<TrustCenterScreenProps> = ({ onNavigate }) => {
  const [activeConsent, setActiveConsent] = useState(true);
  const [showRevokeToast, setShowRevokeToast] = useState(false);

  const handleRevoke = () => {
    setActiveConsent(false);
    setShowRevokeToast(true);
    setTimeout(() => setShowRevokeToast(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-slate-50 relative"
    >
      <div className="bg-white p-6 border-b border-slate-100">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => onNavigate(Screen.HOME)} className="p-2 -ml-2 rounded-full hover:bg-slate-100">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">Trust Center</h1>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
           <Shield className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
           <div>
              <p className="text-sm font-bold text-blue-900">You are in control</p>
              <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                 QuickLoan is committed to data transparency. Monitor and control your shared data here.
              </p>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Active Consents */}
        <div>
           <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Active Consents</h2>
           
           <AnimatePresence mode='wait'>
             {activeConsent ? (
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
               >
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md shadow-primary-200">QL</div>
                        <div>
                           <p className="font-bold text-slate-900 text-sm">QuickLoan</p>
                           <p className="text-xs text-slate-500">Bank Statements</p>
                        </div>
                     </div>
                     <div className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Active
                     </div>
                  </div>
                  
                  <div className="p-4 grid grid-cols-2 gap-4 text-sm bg-slate-50/50">
                     <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Last Used</p>
                        <p className="font-semibold text-slate-900 text-xs">Today, 2:15 PM</p>
                     </div>
                     <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Expires</p>
                        <p className="font-semibold text-slate-900 text-xs">15 Mar 2026</p>
                     </div>
                  </div>

                  <div className="p-3 bg-white border-t border-slate-100 flex gap-3">
                     <button 
                       onClick={handleRevoke}
                       className="flex-1 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2 border border-red-100"
                     >
                        <Trash2 className="w-3.5 h-3.5" /> Revoke Access
                     </button>
                  </div>
               </motion.div>
             ) : (
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50"
               >
                  <Shield className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-500">No active data sharing consents.</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Audit Log / History */}
        <div>
           <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Access History</h2>
              <button className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md flex items-center hover:bg-primary-100">
                 <Download className="w-3 h-3 mr-1" /> Report
              </button>
           </div>
           
           <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-0 overflow-hidden">
              {[1, 2, 3].map((_, i) => (
                 <div key={i} className="flex items-start gap-3 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                       <History className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between">
                         <p className="text-xs font-bold text-slate-900">Data Fetch</p>
                         <p className="text-[10px] text-slate-400">{i === 0 ? 'Today' : `${i}d ago`}</p>
                       </div>
                       <p className="text-xs text-slate-500 mt-0.5">QuickLoan analyzed income summary.</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
        
        {/* Insights Visualization */}
        <div>
           <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">What QuickLoan Sees</h2>
           <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <p className="text-xs text-slate-500 mb-4">
                We aggregate your transaction data to calculate monthly income vs expenses.
              </p>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_CHART_DATA}>
                    <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                       contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                    />
                    <Bar dataKey="income" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Income" />
                    <Bar dataKey="expense" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Expense" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 text-center space-y-4 pb-8">
           <button className="flex items-center justify-center gap-2 text-slate-500 text-xs font-bold w-full p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <LifeBuoy className="w-4 h-4" /> Contact Privacy Officer
           </button>
           <div className="flex justify-center items-center gap-2 text-[10px] text-slate-400 uppercase tracking-wide">
              <Shield className="w-3 h-3" />
              <span>Powered by Account Aggregator Network</span>
           </div>
        </div>

      </div>

      {/* Revoke Toast */}
      <AnimatePresence>
        {showRevokeToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-6 right-6 bg-slate-900 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 z-50"
          >
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0">
               <Check className="w-4 h-4 text-white" />
            </div>
            <div>
               <p className="font-bold text-sm">Access Revoked</p>
               <p className="text-xs text-slate-400">QuickLoan can no longer access your data.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};