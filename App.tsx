
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header.tsx';
import StatCard from './components/StatCard.tsx';
import LetterDensity from './components/LetterDensity.tsx';
import { TextStats, AppConfig } from './types.ts';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [config, setConfig] = useState<AppConfig>({
    excludeSpaces: false,
    setCharacterLimit: false,
    limitValue: 280,
  });

  // Theme state with local storage persistence and system preference check
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply theme classes to body for global styling
    if (isDarkMode) {
      document.body.classList.add('bg-[#121417]', 'text-gray-100');
      document.body.classList.remove('bg-gray-50', 'text-gray-900');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('bg-[#121417]', 'text-gray-100');
      document.body.classList.add('bg-gray-50', 'text-gray-900');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const stats: TextStats = useMemo(() => {
    const trimmedText = text.trim();
    
    const charCount = config.excludeSpaces 
      ? text.replace(/\s/g, '').length 
      : text.length;

    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
    const readingTime = Math.ceil(words / 200);

    const lettersOnly = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    const charMap: Record<string, number> = {};
    for (const char of lettersOnly) {
      charMap[char] = (charMap[char] || 0) + 1;
    }

    const totalLetters = lettersOnly.length;
    const density = Object.entries(charMap)
      .map(([char, count]) => ({
        char: char.toUpperCase(),
        count,
        percentage: totalLetters ? (count / totalLetters) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      characters: charCount,
      words,
      lines,
      readingTime,
      letterDensity: density,
    };
  }, [text, config]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (config.setCharacterLimit && newText.length > config.limitValue) {
      // Allow backspace/delete even if at limit
      if (newText.length < text.length) {
        setText(newText);
      }
      return;
    }
    setText(newText);
  };

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const isAtLimit = config.setCharacterLimit && text.length >= config.limitValue;

  return (
    <div className={`min-h-screen transition-colors duration-500 ease-in-out p-6 md:p-12 lg:p-16`}>
      <div className="max-w-5xl mx-auto space-y-10">
        
        <Header 
          isDarkMode={isDarkMode} 
          onToggleTheme={toggleTheme} 
        />

        <main className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Analyze your text <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                instantly.
              </span>
            </h1>
            <p className={`text-lg max-w-2xl mx-auto font-medium opacity-70 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              The ultimate real-time text analysis tool for writers, students, and professionals.
            </p>
          </div>

          <section className="relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-15 group-hover:opacity-25 transition duration-1000 group-hover:duration-200`}></div>
            <div className="relative">
              <textarea
                className={`w-full h-56 md:h-72 p-8 rounded-2xl border-2 transition-all duration-300 outline-none resize-none shadow-2xl font-medium text-lg
                  ${isDarkMode 
                    ? 'bg-[#1e2126]/90 border-[#2d3139] focus:border-purple-500/50 text-gray-100' 
                    : 'bg-white border-gray-200 focus:border-purple-500 text-gray-800'}
                  ${isAtLimit ? 'ring-2 ring-orange-500 border-orange-500/50' : ''}
                `}
                placeholder="Paste your content or start typing to see the magic happen..."
                value={text}
                onChange={handleTextChange}
              />
              {isAtLimit && (
                <div className="absolute top-4 right-8 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest animate-bounce shadow-lg">
                  Limit Reached
                </div>
              )}
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all
                  ${config.excludeSpaces ? 'bg-purple-600 border-purple-600' : 'border-gray-400 group-hover:border-purple-400'}`}>
                  {config.excludeSpaces && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={config.excludeSpaces}
                    onChange={(e) => setConfig({ ...config, excludeSpaces: e.target.checked })}
                  />
                </div>
                <span className="font-semibold text-sm group-hover:text-purple-500 transition-colors uppercase tracking-wider">Exclude Spaces</span>
              </label>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all
                    ${config.setCharacterLimit ? 'bg-purple-600 border-purple-600' : 'border-gray-400 group-hover:border-purple-400'}`}>
                    {config.setCharacterLimit && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={config.setCharacterLimit}
                      onChange={(e) => setConfig({ ...config, setCharacterLimit: e.target.checked })}
                    />
                  </div>
                  <span className="font-semibold text-sm group-hover:text-purple-500 transition-colors uppercase tracking-wider">Set Limit</span>
                </label>
                {config.setCharacterLimit && (
                  <div className="relative">
                    <input 
                      type="number"
                      className={`w-20 px-3 py-1.5 rounded-lg border-2 font-bold text-center transition-all outline-none
                        ${isDarkMode ? 'bg-[#2d3139] border-[#3e4450] focus:border-purple-500' : 'bg-gray-100 border-gray-200 focus:border-purple-400'}`}
                      value={config.limitValue}
                      onChange={(e) => setConfig({ ...config, limitValue: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-colors
              ${isDarkMode ? 'bg-[#1e2126] text-purple-400 border border-[#2d3139]' : 'bg-purple-50 text-purple-700 border border-purple-100'}`}>
              Reading: ~{stats.readingTime} min
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard 
              label="Characters" 
              value={stats.characters} 
              variant="purple" 
              isDarkMode={isDarkMode}
            />
            <StatCard 
              label="Words" 
              value={stats.words} 
              variant="orange" 
              isDarkMode={isDarkMode}
            />
            <StatCard 
              label="Lines" 
              value={stats.lines} 
              variant="coral" 
              isDarkMode={isDarkMode}
            />
          </section>

          <section className={`p-8 md:p-12 rounded-[2rem] border-2 transition-all duration-300
            ${isDarkMode ? 'bg-[#1e2126] border-[#2d3139]' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'}
          `}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Letter Density</h2>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            {stats.letterDensity.length > 0 ? (
              <div className="space-y-6">
                {stats.letterDensity.map((item) => (
                  <LetterDensity 
                    key={item.char} 
                    char={item.char} 
                    count={item.count} 
                    percentage={item.percentage}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-500 text-lg font-medium italic">Ready for your input... </p>
                <p className="text-sm opacity-50">Type something above to analyze character distribution</p>
              </div>
            )}
          </section>
        </main>

        <footer className="pt-12 pb-8 text-center text-sm font-medium opacity-40 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Analyze Your Text • Fast • Private • Precise
        </footer>
      </div>
    </div>
  );
};

export default App;
