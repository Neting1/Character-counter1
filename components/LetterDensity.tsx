
import React from 'react';

interface LetterDensityProps {
  char: string;
  count: number;
  percentage: number;
  isDarkMode: boolean;
}

const LetterDensity: React.FC<LetterDensityProps> = ({ char, count, percentage, isDarkMode }) => {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs font-medium uppercase tracking-wide">
        <span>{char}</span>
        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {count} ({percentage.toFixed(2)}%)
        </span>
      </div>
      <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-[#2d3139]' : 'bg-gray-100'}`}>
        <div 
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default LetterDensity;
