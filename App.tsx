import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { MobileFrame } from './components/MobileFrame';
import { HomeScreen } from './screens/HomeScreen';
import { EducationScreen } from './screens/EducationScreen';
import { AALoginScreen } from './screens/AALoginScreen';
import { BankSelectionScreen } from './screens/BankSelectionScreen';
import { ConsentScreen } from './screens/ConsentScreen';
import { BankOtpScreen } from './screens/BankOtpScreen';
import { SuccessScreen } from './screens/SuccessScreen';
import { ProcessingScreen } from './screens/ProcessingScreen';
import { ResultScreen } from './screens/ResultScreen';
import { TrustCenterScreen } from './screens/TrustCenterScreen';
import { Screen, LoanState, BankAccount } from './types';
import { INITIAL_LOAN_STATE } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [loanState, setLoanState] = useState<LoanState>(INITIAL_LOAN_STATE);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null);

  // Notification Handler
  const triggerNotification = () => {
    setShowNotification(true);
    // Auto hide after 5 seconds
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleNotificationClick = () => {
    setShowNotification(false);
    setCurrentScreen(Screen.TRUST_CENTER);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.HOME:
        return <HomeScreen loanState={loanState} setLoanState={setLoanState} onNavigate={setCurrentScreen} />;
      case Screen.EDUCATION:
        return <EducationScreen onNavigate={setCurrentScreen} />;
      case Screen.AA_LOGIN:
        return <AALoginScreen onNavigate={setCurrentScreen} />;
      case Screen.BANK_SELECTION:
        return <BankSelectionScreen onNavigate={setCurrentScreen} setSelectedBank={setSelectedBank} />;
      case Screen.CONSENT:
        return <ConsentScreen onNavigate={setCurrentScreen} selectedBank={selectedBank} />;
      case Screen.BANK_OTP:
        return <BankOtpScreen onNavigate={setCurrentScreen} selectedBank={selectedBank} />;
      case Screen.SUCCESS:
        return <SuccessScreen onNavigate={setCurrentScreen} />;
      case Screen.PROCESSING:
        return <ProcessingScreen onNavigate={setCurrentScreen} />;
      case Screen.RESULT:
        return <ResultScreen loanState={loanState} onNavigate={setCurrentScreen} onShowNotification={triggerNotification} />;
      case Screen.TRUST_CENTER:
        return <TrustCenterScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen loanState={loanState} setLoanState={setLoanState} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <MobileFrame>
      <div className="h-full relative font-sans text-slate-900">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        {/* Mock System Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              onClick={handleNotificationClick}
              className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200 z-[100] cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <div className="w-6 h-6 bg-primary-600 rounded-md flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">QL</span>
                  </div>
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-center mb-1">
                      <p className="font-bold text-sm text-slate-900">QuickLoan • Now</p>
                      <Bell className="w-3 h-3 text-slate-400" />
                   </div>
                   <p className="text-sm text-slate-600 leading-tight">
                     QuickLoan accessed your bank data today at 2:15 PM to verify your loan. <span className="text-primary-600 font-semibold">View details.</span>
                   </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileFrame>
  );
};

export default App;