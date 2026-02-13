import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Zap } from 'lucide-react';
import { Slider } from '../components/Slider';
import { Button } from '../components/Button';
import { LoanState, Screen } from '../types';

interface HomeScreenProps {
  loanState: LoanState;
  setLoanState: React.Dispatch<React.SetStateAction<LoanState>>;
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ loanState, setLoanState, onNavigate }) => {
  const calculateEMI = () => {
    const principal = loanState.amount;
    const ratePerMonth = loanState.interestRate / 12 / 100;
    const months = loanState.tenure;
    const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) / (Math.pow(1 + ratePerMonth, months) - 1);
    return Math.round(emi);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-slate-50"
    >
      <div className="bg-white px-6 pt-6 pb-8 rounded-b-[2.5rem] shadow-sm z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">QuickLoan</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
            <img src="https://picsum.photos/100/100" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Apply for Personal Loan</h1>
        <p className="text-slate-500 text-sm mb-8">Get instant approval in minutes.</p>

        <div className="space-y-8">
          <Slider 
            label="I want to borrow"
            value={loanState.amount}
            min={10000}
            max={loanState.maxAmount}
            step={5000}
            unit="₹"
            onChange={(val) => setLoanState(prev => ({ ...prev, amount: val }))}
          />

          <Slider 
            label="For a duration of"
            value={loanState.tenure}
            min={3}
            max={36}
            step={1}
            suffix=" Months"
            onChange={(val) => setLoanState(prev => ({ ...prev, tenure: val }))}
          />
        </div>
      </div>

      <div className="flex-1 px-6 py-6 flex flex-col justify-between">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center mb-6">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Estimated EMI</p>
            <p className="text-2xl font-bold text-slate-900">₹{calculateEMI().toLocaleString()}<span className="text-sm font-normal text-slate-400">/mo</span></p>
          </div>
          <div className="text-right">
             <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Interest Rate</p>
             <p className="text-lg font-bold text-primary-600">{loanState.interestRate}%</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-primary-50 p-4 rounded-xl border border-primary-100">
            <ShieldCheck className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-primary-800">Instant approval using secure bank verification</h4>
              <p className="text-xs text-primary-600 mt-1">We use the Account Aggregator framework to safely verify your income without paperwork.</p>
            </div>
          </div>

          <Button 
            fullWidth 
            onClick={() => onNavigate(Screen.EDUCATION)}
            className="shadow-primary-500/20"
          >
            Continue <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};