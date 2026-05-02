/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Book, Music, Menu } from 'lucide-react';
import { useJourneyStore } from '../store/journeyStore';

const poets = [
  { name: 'Li Bai', nameZh: '李白', active: true },
  { name: 'Du Fu', nameZh: '杜甫', active: false },
  { name: 'Su Shi', nameZh: '苏轼', active: false },
  { name: 'Wang Wei', nameZh: '王维', active: false },
];

export default function TopBar() {
  const { selectedPoet, language, toggleLanguage } = useJourneyStore();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 px-8 flex items-center justify-between z-50 bg-gradient-to-b from-black to-transparent">
      {/* Left: Logo */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold tracking-widest text-gold uppercase">{language === 'zh' ? '诗旅图' : 'Poem Atlas'}</h1>
        <span className="text-[10px] uppercase tracking-[0.2em] text-cream/50 ml-1">{language === 'zh' ? '文思地理实景图' : 'Journey Through Poetry'}</span>
      </div>

      {/* Center: Poet Selector */}
      <nav className="flex items-center gap-8">
        {poets.map((poet) => (
          <div 
            key={poet.name}
            className={`group relative cursor-pointer flex flex-col items-center`}
          >
            <span className={`text-sm tracking-wide transition-colors ${
              poet.name === selectedPoet 
                ? 'text-gold font-medium' 
                : 'text-cream/40 group-hover:text-cream/80'
            }`}>
              {language === 'zh' ? poet.nameZh : poet.name}
            </span>
            {!poet.active && (
              <span className="absolute -bottom-4 text-[8px] uppercase tracking-tighter text-cream/20 whitespace-nowrap">
                {language === 'zh' ? '即将开放' : 'Coming Soon'}
              </span>
            )}
            {poet.name === selectedPoet && (
              <div className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(197,160,89,1)]" />
            )}
          </div>
        ))}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1 border border-gold/20 rounded-sm hover:border-gold/60 transition-all group"
        >
          <span className={`text-[10px] font-mono tracking-wider transition-colors ${language === 'en' ? 'text-gold' : 'text-cream/40'}`}>EN</span>
          <div className="w-[1px] h-3 bg-white/10" />
          <span className={`text-[10px] font-chinese transition-colors ${language === 'zh' ? 'text-gold' : 'text-cream/40'}`}>中文</span>
        </button>
        <button className="text-cream/60 hover:text-gold transition-colors">
          <Book size={20} />
        </button>
        <button className="text-cream/60 hover:text-gold transition-colors">
          <Music size={20} />
        </button>
        <button className="text-cream/60 hover:text-gold transition-colors">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
