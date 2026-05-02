import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Feather, ChevronRight } from 'lucide-react';
import { useJourneyStore } from '../store/journeyStore';
import { liBaiJourney } from '../data/liBaiJourney';

const RELATION_MAP: Record<string, { en: string, zh: string }> = {
  'written_here': { en: 'Written Here', zh: '作于此地' },
  'about_place': { en: 'About Place', zh: '咏此地' },
  'associated': { en: 'Associated', zh: '关联此地' },
  'phase_work': { en: 'Phase Gem', zh: '阶段代表作' }
};

export default function PoemDetailView() {
  const { currentStopIndex, language, isDetailOpen, setIsDetailOpen, setIsPlaying, isPlaying, selectedPoemIndex, setSelectedPoemIndex } = useJourneyStore();

  React.useEffect(() => {
    if (isDetailOpen && isPlaying) {
      setIsPlaying(false);
    }
  }, [isDetailOpen, isPlaying, setIsPlaying]);

  if (!isDetailOpen) return null;

  const currentStop = liBaiJourney[currentStopIndex];
  const isEn = language === 'en';

  // Sort poems: hero first, then weight, then relation priority
  const sortedPoems = [...currentStop.poems].sort((a, b) => {
    if (a.id === currentStop.heroPoemId) return -1;
    if (b.id === currentStop.heroPoemId) return 1;

    if ((b.sortWeight || 0) !== (a.sortWeight || 0)) {
      return (b.sortWeight || 0) - (a.sortWeight || 0);
    }

    const priority: Record<string, number> = {
      'written_here': 1,
      'about_place': 2,
      'associated': 3,
      'phase_work': 4
    };
    const pA = priority[a.relationType] || 99;
    const pB = priority[b.relationType] || 99;
    if (pA !== pB) return pA - pB;

    return a.titleZh.localeCompare(b.titleZh);
  });

  const currentPoem = sortedPoems[selectedPoemIndex] || sortedPoems[0];

  const t = {
    close: isEn ? "Close" : "关闭",
    poet: isEn ? "Li Bai" : "李白",
    locationPoems: isEn ? "Poems from this location" : "此地诗作",
    chapter: isEn ? "Chapter" : "第",
    chapterSuffix: isEn ? "" : "章",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 lg:p-20 !pb-[var(--timeline-safe-bottom)]"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setIsDetailOpen(false)}
        />

        {/* Content Container: Museum-like Improved Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-7xl h-full bg-[#0a0a0a] border border-gold/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle Texture/Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

          {/* Left Side: Metadata & Poem List */}
          <div className="w-full md:w-[32%] border-b md:border-b-0 md:border-r border-gold/5 flex flex-col relative z-10 bg-black/40 h-[400px] md:h-auto">
            {/* Sticky Header within the Left Panel */}
            <div className="p-6 lg:p-8 pb-4 lg:pb-5 bg-black/60 backdrop-blur-md border-b border-gold/5 z-20">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-gold font-mono tracking-[0.4em] uppercase opacity-60">
                    {t.chapter} {currentStop.chapterNumber} {t.chapterSuffix}
                  </span>
                  <span className="text-[9px] text-gold/40 font-mono tracking-widest">{currentStop.year} AD</span>
                </div>
                
                <h1 className={`text-2xl lg:text-3xl font-light text-cream tracking-tight ${!isEn ? 'font-calligraphy' : 'italic'}`}>
                  {isEn ? currentStop.cityEn : currentStop.cityZh}
                </h1>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cream/30 text-[9px] tracking-[0.2em] uppercase">
                    <MapPin size={9} className="text-gold/40" />
                    <span className="text-gold/60 font-bold">{isEn ? currentStop.phaseTitleEn : currentStop.phaseTitleZh}</span>
                  </div>
                  <div className="px-2 py-0.5 rounded-full border border-gold/20 bg-gold/5">
                    <span className="text-[9px] text-gold/60 uppercase tracking-widest font-mono">
                      {isEn ? `${sortedPoems.length} Works` : `${sortedPoems.length} 首诗`}
                    </span>
                  </div>
                </div>

                <div className="pt-2 space-y-2 border-t border-gold/5 mt-2">
                  <p className={`text-[11px] text-cream/40 leading-relaxed italic ${!isEn ? 'font-chinese not-italic' : ''}`}>
                    {isEn ? currentStop.phaseDescriptionEn : currentStop.phaseDescriptionZh}
                  </p>
                  <p className={`text-[10px] text-gold/30 tracking-widest uppercase font-semibold flex items-center gap-2 ${!isEn ? 'font-chinese' : ''}`}>
                    <span className="w-1 h-3 bg-gold/20" />
                    {isEn ? currentStop.emotionalToneEn : currentStop.emotionalToneZh}
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable List Section */}
            <div className="flex-1 overflow-y-auto scrollbar-custom p-6 lg:p-8 pt-4 lg:pt-5 bg-black/20">
              <div className="space-y-6">
                {/* Poem List Selector */}
                {sortedPoems.length > 1 ? (
                  <div className="space-y-3">
                    <h3 className="text-[9px] font-black text-gold/30 uppercase tracking-[0.4em] mb-3 flex items-center gap-2">
                       <Feather size={10} />
                       {t.locationPoems}
                    </h3>
                    <div className="space-y-2">
                      {sortedPoems.map((poem, idx) => (
                        <button
                          key={poem.id}
                          onClick={() => setSelectedPoemIndex(idx)}
                          className={`w-full flex flex-col items-start p-3.5 rounded-md transition-all duration-500 group border text-left ${
                            selectedPoemIndex === idx 
                              ? 'bg-gold/10 border-gold/30 text-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                              : 'hover:bg-white/5 border-white/5 text-cream/40 hover:text-cream/80'
                          }`}
                        >
                          <div className="w-full flex items-center justify-between gap-3">
                            <span className={`text-sm tracking-wide leading-tight ${!isEn ? 'font-chinese' : 'font-serif italic'}`}>
                              {isEn ? poem.titleEn : `《${poem.titleZh}》`}
                            </span>
                            <ChevronRight 
                              size={14} 
                              className={`shrink-0 transition-transform duration-500 ${
                                selectedPoemIndex === idx ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-40'
                              }`} 
                            />
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm bg-white/5 border border-white/10 opacity-60">
                              {isEn ? RELATION_MAP[poem.relationType].en : RELATION_MAP[poem.relationType].zh}
                            </span>
                            {poem.id === currentStop.heroPoemId && (
                               <span className="text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm bg-gold/10 border border-gold/20 text-gold/60">
                                 {isEn ? "Featured" : "主打作品"}
                               </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Scroll Hint if many poems */}
                    {sortedPoems.length > 2 && (
                      <div className="flex justify-center pt-3 opacity-30">
                        <div className="text-[8px] text-gold uppercase tracking-[0.3em] flex flex-col items-center gap-1">
                          <div className="w-px h-3 bg-gold/20" />
                          <span>{isEn ? "Scroll" : "下一首"}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Single Poem Info */
                  <div className="space-y-4">
                    <h3 className="text-[9px] font-black text-gold/30 uppercase tracking-[0.4em] mb-4">
                      {isEn ? 'Current Work' : '本站作品'}
                    </h3>
                    <div className="p-4 rounded-md border border-gold/10 bg-gold/5">
                      <p className={`text-lg text-gold ${!isEn ? 'font-chinese' : 'font-serif italic'}`}>
                        {isEn ? sortedPoems[0].titleEn : `《${sortedPoems[0].titleZh}》`}
                      </p>
                      <p className="mt-2 text-[9px] text-gold/40 uppercase tracking-widest">
                        {isEn ? RELATION_MAP[sortedPoems[0].relationType].en : RELATION_MAP[sortedPoems[0].relationType].zh}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions Area */}
            <div className="p-8 lg:p-10 pt-4 pb-6 border-t border-gold/5 bg-black/40">
              <button 
                onClick={() => setIsDetailOpen(false)}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-5 rounded-full border border-white/5 hover:border-gold/30 hover:bg-gold/5 text-cream/30 hover:text-gold transition-all group"
              >
                <X size={12} className="group-hover:rotate-90 transition-transform duration-500" />
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold">{t.close}</span>
              </button>
            </div>
          </div>

          {/* Right Side: Poem Reading Area */}
          <div className="flex-1 overflow-y-auto scrollbar-custom bg-black/20 relative z-10 p-8 lg:p-16 pt-6 lg:pt-8 flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentStop.id}-${selectedPoemIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl w-full"
              >
                {/* Visual Accent */}
                <div className="mb-6 lg:mb-8 flex flex-col items-center gap-2">
                  <Feather size={16} className="text-gold/20" />
                  <div className="h-8 w-[1px] bg-gradient-to-b from-gold/20 to-transparent" />
                </div>

                {/* Poem Reading Content */}
                <div className="space-y-10 lg:space-y-12 text-center">
                  <div className="space-y-3">
                    <h2 className={`text-gold/90 text-2xl lg:text-3xl tracking-[0.1em] ${!isEn ? 'font-chinese' : 'font-serif italic'}`}>
                      {isEn ? `《 ${currentPoem.titleEn} 》` : `《${currentPoem.titleZh}》`}
                    </h2>
                    <p className="text-[10px] text-gold/30 uppercase tracking-[0.5em]">{t.poet}</p>
                  </div>

                  <div className="space-y-8 lg:space-y-10">
                    <div className={`flex flex-col items-center gap-3 ${!isEn ? 'font-calligraphy' : 'font-serif'}`}>
                       {currentPoem.fullPoemZh.map((line, i) => (
                         <div 
                           key={i} 
                           className={`text-cream/90 text-shadow-gold text-center px-4 transition-all duration-700
                             ${!isEn 
                               ? 'text-[clamp(28px,2.2vw,48px)] leading-[1.6] tracking-[0.05em]' 
                               : 'text-xl lg:text-2xl leading-relaxed italic'
                             }`}
                         >
                           {line}
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* English Translation Toggle or Inclusion */}
                  {isEn && currentPoem.translationEn && (
                    <div className="pt-20 border-t border-gold/5 space-y-6">
                      <p className="text-[10px] text-gold/30 uppercase tracking-[0.4em] font-bold">English Translation</p>
                      <div className="space-y-3 font-serif text-lg lg:text-xl text-cream/40 italic leading-relaxed">
                        {currentPoem.translationEn.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Short Note */}
                  {(isEn ? currentPoem.noteEn : currentPoem.noteZh) && (
                    <div className="pt-12 flex flex-col items-center gap-4 max-w-lg mx-auto">
                      <div className="w-8 h-px bg-gold/20" />
                      <p className={`text-xs text-cream/30 italic leading-relaxed ${!isEn ? 'font-chinese not-italic' : ''}`}>
                        {isEn ? currentPoem.noteEn : currentPoem.noteZh}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-24 h-16 w-[1px] bg-gradient-to-t from-gold/20 to-transparent mx-auto" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
