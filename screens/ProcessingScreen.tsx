import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Lock, Server, FileSearch } from 'lucide-react';
import { Screen } from '../types';

interface ProcessingScreenProps {
  onNavigate: (screen: Screen) => void;
}

const steps = [
  { icon: Lock, label: 'Connecting securely...' },
  { icon: Server, label: 'Fetching statements...' },
  { icon: FileSearch, label: 'Analyzing income...' },
];

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepDuration = 1500;
    const totalSteps = steps.length;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < totalSteps - 1) return prev + 1;
        return prev;
      });
    }, stepDuration);

    const finishTimeout = setTimeout(() => {
      onNavigate(Screen.RESULT);
    }, stepDuration * totalSteps + 500);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimeout);
    };
  }, [onNavigate]);

  return (
    <div className="flex flex-col h-full bg-white p-6 justify-center items-center text-center">
       <div className="relative mb-12">
          {/* Central Pulse */}
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
          <div className="relative w-24 h-24 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center shadow-xl z-10">
             <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
       </div>

       <h2 className="text-2xl font-bold text-slate-900 mb-2">Verifying Your Income</h2>
       <p className="text-slate-500 text-sm mb-10">This usually takes under 30 seconds</p>

       <div className="w-full max-w-xs space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isPending = index > currentStep;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0.5, x: -10 }}
                animate={{ 
                  opacity: isActive || isCompleted ? 1 : 0.4,
                  x: 0
                }}
                className="flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300
                  ${isActive ? 'border-blue-500 bg-blue-50 text-blue-600' : ''}
                  ${isCompleted ? 'border-green-500 bg-green-50 text-green-600' : ''}
                  ${isPending ? 'border-slate-200 bg-white text-slate-300' : ''}
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-medium text-sm transition-colors duration-300
                    ${isActive ? 'text-blue-900' : ''}
                    ${isCompleted ? 'text-slate-900' : ''}
                    ${isPending ? 'text-slate-300' : ''}
                  `}>{step.label}</p>
                  {isActive && (
                    <div className="h-1 w-full bg-blue-100 rounded-full mt-2 overflow-hidden">
                       <motion.div 
                         className="h-full bg-blue-500" 
                         initial={{ width: "0%" }}
                         animate={{ width: "100%" }}
                         transition={{ duration: 1.5, ease: "linear" }}
                       />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
       </div>
    </div>
  );
};