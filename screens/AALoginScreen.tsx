import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Smartphone, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { Screen } from '../types';

interface AALoginScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const AALoginScreen: React.FC<AALoginScreenProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<'MOBILE' | 'OTP'>('MOBILE');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = () => {
    if (mobile.length < 10) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('OTP');
    }, 1000);
  };

  const handleVerifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      onNavigate(Screen.BANK_SELECTION);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full bg-slate-50"
    >
      <div className="bg-white p-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => step === 'OTP' ? setStep('MOBILE') : onNavigate(Screen.EDUCATION)} className="p-2 -ml-2 rounded-full hover:bg-slate-100">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="font-bold text-sm text-slate-700">Secure AA Network</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {step === 'MOBILE' ? 'Verify your Identity' : 'Enter OTP'}
        </h1>
        <p className="text-slate-500">
          {step === 'MOBILE' 
            ? 'Enter the mobile number linked to your bank accounts.' 
            : `We sent a code to +91 ${mobile}`
          }
        </p>
      </div>

      <div className="flex-1 p-6">
        {step === 'MOBILE' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <span className="text-slate-500 font-bold">+91</span>
                </div>
                <input 
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full bg-white border border-slate-300 rounded-xl py-4 pl-14 pr-4 font-bold text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="98765 43210"
                />
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-blue-600 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed">
                We will use this to discover bank accounts linked to your phone number securely.
              </p>
            </div>

            <Button 
              fullWidth 
              onClick={handleSendOtp} 
              disabled={mobile.length !== 10}
              isLoading={isLoading}
            >
              Get OTP
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
             <div className="flex justify-between gap-4">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="tel"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-16 h-16 text-center text-2xl font-bold bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent caret-primary-500"
                  />
                ))}
             </div>

             <div className="text-center">
                <p className="text-sm text-slate-500 mb-2">Didn't receive code?</p>
                <button className="text-sm font-bold text-primary-600 hover:text-primary-700">Resend in 20s</button>
             </div>

             <Button 
               fullWidth 
               onClick={handleVerifyOtp}
               disabled={otp.some(d => !d)}
               isLoading={isLoading}
             >
               Verify & Discover Accounts
             </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};