import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Lock } from 'lucide-react';
import { Button } from '../components/Button';
import { Screen, BankAccount } from '../types';

interface BankOtpScreenProps {
  onNavigate: (screen: Screen) => void;
  selectedBank: BankAccount | null;
}

export const BankOtpScreen: React.FC<BankOtpScreenProps> = ({ onNavigate, selectedBank }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 digit bank OTP
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      onNavigate(Screen.SUCCESS);
    }, 2000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      document.getElementById(`bank-otp-${index + 1}`)?.focus();
    }
  };

  if (!selectedBank) return null;

  return (
    <div className="flex flex-col h-full bg-slate-50">
       {/* Bank Header Mock */}
       <div className="bg-[#004c8f] text-white p-4 shadow-md">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-[#004c8f] font-bold text-xs">
                   BANK
                </div>
                <span className="font-bold">{selectedBank.bankName}</span>
             </div>
             <div className="flex items-center gap-1 opacity-80">
                <Lock className="w-3 h-3" />
                <span className="text-[10px] uppercase">Secure Page</span>
             </div>
          </div>
       </div>

       <div className="flex-1 p-6 flex flex-col justify-center items-center max-w-sm mx-auto w-full">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 w-full">
             <h2 className="text-xl font-bold text-slate-900 mb-2">Authorize Request</h2>
             <p className="text-sm text-slate-500 mb-6">
                Enter the OTP sent to your mobile registered with {selectedBank.bankName} to approve data sharing with <b>QuickLoan</b>.
             </p>

             <div className="flex justify-between gap-2 mb-6">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <input
                    key={idx}
                    id={`bank-otp-${idx}`}
                    type="tel"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-10 h-12 text-center text-xl font-bold bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent"
                  />
                ))}
             </div>

             <div className="flex justify-between items-center mb-6">
                <span className="text-xs text-slate-400">Ref: AA-REQ-8821</span>
                {timeLeft > 0 ? (
                   <span className="text-xs text-slate-500">Resend in {timeLeft}s</span>
                ) : (
                   <button 
                     onClick={() => setTimeLeft(30)}
                     className="text-xs font-bold text-[#004c8f]"
                   >
                      Resend OTP
                   </button>
                )}
             </div>

             <Button 
               fullWidth 
               onClick={handleVerify}
               isLoading={isLoading}
               disabled={otp.some(d => !d)}
               style={{ backgroundColor: '#004c8f' }} // Override to match bank color
             >
               Verify & Submit
             </Button>

             <button 
                onClick={() => onNavigate(Screen.CONSENT)}
                className="w-full mt-4 text-xs text-slate-400 hover:text-slate-600"
             >
                Cancel Request
             </button>
          </div>
          
          <div className="mt-8 text-center">
             <p className="text-xs text-slate-400">
                This screen is simulating the bank's secure authorization page.
             </p>
          </div>
       </div>
    </div>
  );
};