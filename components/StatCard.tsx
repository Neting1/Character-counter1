
import React from 'react';

interface StatCardProps {
  label: string;
  value: number;
  variant: 'purple' | 'orange' | 'coral';
  isDarkMode: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, variant, isDarkMode }) => {
  const variants = {
    purple: {
      bg: isDarkMode ? 'bg-[#3b2d5a]' : 'bg-[#f5f0ff]',
      text: isDarkMode ? 'text-[#e9d5ff]' : 'text-[#6b21a8]',
      border: isDarkMode ? 'border-purple-500/20' : 'border-purple-200/50'
    },
    orange: {
      bg: isDarkMode ? 'bg-[#5a422d]' : 'bg-[#fff9f0]',
      text: isDarkMode ? 'text-[#fed7aa]' : 'text-[#9a3412]',
      border: isDarkMode ? 'border-orange-500/20' : 'border-orange-200/50'
    },
    coral: {
      bg: isDarkMode ? 'bg-[#5a2d2d]' : 'bg-[#fff5f5]',
      text: isDarkMode ? 'text-[#fecaca]' : 'text-[#991b1b]',
      border: isDarkMode ? 'border-red-500/20' : 'border-red-200/50'
    }
  };

  const style = variants[variant];

  return (
    <div className={`relative overflow-hidden p-8 rounded-[2.5rem] border-2 transition-all duration-500 hover:-translate-y-1 cursor-default group
      ${style.bg} ${style.text} ${style.border}
      ${!isDarkMode ? 'shadow-lg shadow-gray-100' : 'shadow-2xl shadow-black/10'}
    `}>
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none transition-transform duration-700 group-hover:rotate-12 group-hover:scale-125">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
          <circle cx="80" cy="20" r="30" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M0 100 L100 0" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>
      
      <div className="relative z-10 flex flex-col gap-1">
        <span className="text-6xl font-black tabular-nums tracking-tighter">
          {value.toLocaleString().padStart(2, '0')}
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">{label}</span>
      </div>
    </div>
  );
};

export default StatCard;
