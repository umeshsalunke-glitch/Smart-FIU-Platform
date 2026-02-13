import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex justify-center items-start lg:items-center p-0 lg:p-8">
      <div className="relative w-full max-w-md bg-white lg:rounded-[2.5rem] lg:shadow-2xl overflow-hidden min-h-[100vh] lg:min-h-[850px] lg:h-[850px] flex flex-col border-0 lg:border-8 border-slate-900">
        
        {/* Dynamic Island / Notch Placeholder for Desktop Look */}
        <div className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-50"></div>
        
        {/* Status Bar Mock */}
        <div className="w-full h-12 bg-white flex justify-between items-center px-6 pt-2 z-40 select-none">
          <span className="text-sm font-semibold text-slate-900">9:41</span>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-slate-900 rounded-full opacity-20"></div>
            <div className="w-4 h-4 bg-slate-900 rounded-full opacity-20"></div>
            <div className="w-6 h-3 border-2 border-slate-300 rounded-[4px] relative">
              <div className="absolute top-[2px] left-[2px] bottom-[2px] w-[70%] bg-slate-800 rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative overflow-y-auto no-scrollbar bg-slate-50">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-300 rounded-full mb-2 hidden lg:block"></div>
      </div>
    </div>
  );
};