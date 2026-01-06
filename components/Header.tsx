
import React from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleTheme }) => {
  return (
    <header className="flex justify-between items-center px-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-500/20">
          A
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl leading-none tracking-tight">Analyzer</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Studio</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-bold uppercase tracking-widest hidden sm:block ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
        <button 
          onClick={onToggleTheme}
          className={`p-2.5 rounded-2xl border-2 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg
            ${isDarkMode 
              ? 'bg-[#1e2126] border-[#2d3139] hover:bg-[#2d3139] shadow-black/20' 
              : 'bg-white border-gray-100 hover:bg-gray-50 shadow-gray-200/50'}
          `}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <svg className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-indigo-900" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
