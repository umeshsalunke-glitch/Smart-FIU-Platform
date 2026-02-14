import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Screen, BankAccount } from '../types';
import { MOCK_BANKS } from '../constants';

interface BankSelectionScreenProps {
  onNavigate: (screen: Screen) => void;
  setSelectedBank: (bank: BankAccount) => void;
}

export const BankSelectionScreen: React.FC<BankSelectionScreenProps> = ({ onNavigate, setSelectedBank }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch time
    const timer = setTimeout(() => {
      setIsFetching(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    const bank = MOCK_BANKS.find(b => b.id === selectedId);
    if (bank) {
      setSelectedBank(bank);
      onNavigate(Screen.CONSENT);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold text-slate-900">Select Bank Account</h1>
        <p className="text-sm text-slate-500">Choose the account to share statements from</p>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {isFetching ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
             <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
             <p className="text-sm font-medium text-slate-600">Discovering linked accounts...</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Found {MOCK_BANKS.filter(b => b.isLinked).length} Linked Accounts
            </p>
            
            {MOCK_BANKS.map((bank) => (
              <div 
                key={bank.id}
                onClick={() => bank.isLinked && setSelectedId(bank.id)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4
                  ${!bank.isLinked ? 'opacity-60 bg-slate-100 border-transparent grayscale' : ''}
                  ${selectedId === bank.id 
                    ? 'bg-primary-50 border-primary-600 shadow-sm' 
                    : 'bg-white border-transparent shadow-sm hover:border-slate-200'}
                `}
              >
                <div className="w-10 h-10 bg-white rounded-full p-1 border border-slate-100 flex items-center justify-center">
                  {/* Fallback for logo */}
                  <div className="font-bold text-[10px] text-slate-700">{bank.id.toUpperCase()}</div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{bank.bankName}</h3>
                  <p className="text-sm text-slate-500">{bank.accountType} •••• {bank.mask}</p>
                </div>

                {bank.isLinked ? (
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${selectedId === bank.id ? 'border-primary-600 bg-primary-600' : 'border-slate-300'}
                  `}>
                    {selectedId === bank.id && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-2 py-1 rounded">
                    Unlinked
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
         <Button 
           fullWidth 
           disabled={!selectedId || isFetching} 
           onClick={handleContinue}
         >
           Continue
         </Button>
      </div>
    </div>
  );
};