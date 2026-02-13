import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  suffix?: string;
  onChange: (val: number) => void;
  formatValue?: (val: number) => string;
}

export const Slider: React.FC<SliderProps> = ({ 
  label, 
  value, 
  min, 
  max, 
  step, 
  unit = '',
  suffix = '',
  onChange,
  formatValue
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-end mb-4">
        <label className="text-slate-500 font-medium text-sm tracking-wide uppercase">{label}</label>
        <div className="text-2xl font-bold text-slate-900">
          {unit}{formatValue ? formatValue(value) : value.toLocaleString()}{suffix}
        </div>
      </div>
      
      <div className="relative w-full h-8 flex items-center">
        <input 
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full absolute z-20 opacity-0 cursor-pointer h-full"
        />
        
        {/* Track Background */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-slate-200 rounded-full -translate-y-1/2 overflow-hidden">
          {/* Active Track */}
          <div 
            className="h-full bg-primary-600 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Thumb (Visual Only) */}
        <div 
          className="absolute top-1/2 w-7 h-7 bg-white border-2 border-primary-600 rounded-full shadow-md -translate-y-1/2 transition-all duration-150 ease-out pointer-events-none z-10"
          style={{ left: `calc(${percentage}% - 14px)` }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
        <span>{unit}{formatValue ? formatValue(min) : min.toLocaleString()}{suffix}</span>
        <span>{unit}{formatValue ? formatValue(max) : max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
};