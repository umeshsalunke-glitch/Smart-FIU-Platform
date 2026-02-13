import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Download, History, ChevronRight, LifeBuoy, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Screen } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_CHART_DATA } from '../constants';

interface TrustCenterScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const TrustCenterScreen: React.FC<TrustCenterScreenProps> = ({ onNavigate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-slate-50"
    >
      <div className="bg-white p-6 border-b border-slate-100">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => onNavigate(Screen.HOME)} className="p-2 -ml-2 rounded-full hover:bg-slate-100">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">My Data Access</h1>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
           <Shield className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
           <div>
              <p className="text-sm font-bold text-blue-900">You are in control</p>
              <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                 Review who has access to your financial data. You can revoke permission at any time.
              </p>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Active Consents */}
        <div>
           <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Active Consents</h2>
           <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700 font-bold">QL</div>
                    <div>
                       <p className="font-bold text-slate-900">QuickLoan</p>
                       <p className="text-xs text-slate-500">Bank Statements</p>
                    </div>
                 </div>
                 <div className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded">Active</div>
              </div>
              
              <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                 <div>
                    <p className="text-xs text-slate-400 mb-1">Last Used</p>
                    <p className="font-medium text-slate-900">Today, 2:15 PM</p>
                 </div>
                 <div>
                    <p className="text-xs text-slate-400 mb-1">Expires</p>
                    <p className="font-medium text-slate-900">15 Mar 2026</p>
                 </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 flex gap-3">
                 <button className="flex-1 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Trash2 className="w-3 h-3" /> Revoke
                 </button>
                 <button className="flex-1 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
                    View Details
                 </button>
              </div>
           </div>
        </div>

        {/* Audit Log / History */}
        <div>
           <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Access History</h2>
              <button className="text-xs text-primary-600 font-semibold flex items-center">
                 Download Report <Download className="w-3 h-3 ml-1" />
              </button>
           </div>
           
           <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-4">
              {[1, 2, 3].map((_, i) => (
                 <div key={i} className="flex items-start gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                       <History className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-medium text-slate-900">Data Fetch - Statement Analysis</p>
                       <p className="text-xs text-slate-500">QuickLoan • {i === 0 ? 'Today' : `${i} days ago`}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
        
        {/* Insights Visualization (Bonus) */}
        <div>
           <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Data Shared Summary</h2>
           <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_CHART_DATA}>
                  <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                     itemStyle={{ fontSize: '12px' }}
                  />
                  <Bar dataKey="income" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
           <p className="text-center text-xs text-slate-400 mt-2">Income vs Expense analysis shared with QuickLoan</p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 text-center space-y-4">
           <button className="flex items-center justify-center gap-2 text-slate-500 text-sm font-medium w-full p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <LifeBuoy className="w-4 h-4" /> Contact Privacy Support
           </button>
           <div className="flex justify-center items-center gap-2 text-xs text-slate-400">
              <Shield className="w-3 h-3" />
              <span>Powered by Account Aggregator Network</span>
           </div>
        </div>

      </div>
    </motion.div>
  );
};