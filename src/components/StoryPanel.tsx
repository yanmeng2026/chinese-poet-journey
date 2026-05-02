/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useJourneyStore } from '../store/journeyStore';
import { liBaiJourney } from '../data/liBaiJourney';

export default function StoryPanel() {
  const { currentStopIndex, language, setIsDetailOpen, isCinematicMode, isDetailOpen, setIsCinematicMode, selectedPoemIndex } = useJourneyStore();
  const currentStop = liBaiJourney[currentStopIndex];
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isEn = language === 'en';

  // Sort poems: hero first, then weight, then relation priority (Same as Detail View)
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

  const isShowCompact = isCinematicMode && !isDetailOpen;

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (scrollRef.current) {
      scrollRef.current.scrollTop += e.deltaY;
    }
  }

  const t = {
    chapter: isEn ? "CHAPTER" : "第",
    chapterSuffix: isEn ? "" : "章",
    atmosphere: isEn ? "ATMOSPHERE" : "氛围",
    historicalContext: isEn ? "Historical Context" : "历史语境",
    morePoems: currentStop.poems.length > 1 
      ? (isEn ? `Discover more (${currentStop.poems.length})` : `查看此地诗作 · ${currentStop.poems.length} 首`)
      : (isEn ? "View poem details" : "查看诗作详情"),
    poet: isEn ? "Li Bai" : "李白",
    narration: isEn ? "Narration" : "叙述",
    verse: isEn ? "The Verse" : "诗意"
  };

  return (
    <aside className={`story-panel ${isCinematicMode ? 'cinematic-panel' : ''}`} data-story-panel>
      {isCinematicMode && (
        <button 
          onClick={() => setIsCinematicMode(false)}
          className="absolute top-8 right-8 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-gold/20 bg-black/40 text-gold hover:bg-gold hover:text-black transition-all duration-300"
          title={isEn ? "Exit Journey" : "退出旅程"}
        >
          <ChevronRight className="rotate-180" size={20} />
        </button>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentStop.id}-${isCinematicMode}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full relative overflow-hidden"
        >
          {/* Atmosphere Background Layer */}
          <div className="story-atmosphere-bg">
            <motion.div 
              key={`${currentStop.id}-viz`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 opacity-20 mix-blend-color-dodge bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_70%)]" />
              <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] pointer-events-none" />
            </motion.div>
            <div className={`absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/95 z-10 ${isCinematicMode ? 'opacity-90' : 'opacity-70'}`} />
          </div>

          <div 
            ref={scrollRef}
            className="story-scroll-root scrollbar-custom"
            onWheel={handleWheel}
            onWheelCapture={(e) => e.stopPropagation()}
            onPointerDownCapture={(e) => e.stopPropagation()}
          >
            <div className={`story-main-content ${isCinematicMode ? '!pt-4 pb-32' : '!pt-10 pb-20'}`}>
              
              {/* HEADER: Shared style but cleaner */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase tracking-[0.4em] text-gold font-black ${!isEn ? 'font-chinese' : ''}`}>
                    {isEn ? `${t.chapter} ${currentStop.chapterNumber}` : `${t.chapter}${currentStop.chapterNumber}${t.chapterSuffix}`}
                    <span className="mx-2 opacity-30">|</span>
                    {isEn ? currentStop.chapterTitleEn : currentStop.chapterTitleZh}
                  </span>
                  <span className="px-2 py-0.5 bg-gold/5 rounded-sm text-[9px] text-gold/60 font-mono border border-gold/10">{currentStop.year} AD</span>
                </div>
                
                <div className="space-y-1">
                  <h2 className={`font-light text-cream tracking-tight leading-tight text-shadow-gold italic transition-all duration-700 
                    ${isCinematicMode ? 'text-4xl' : 'text-5xl'} 
                    ${!isEn ? 'font-calligraphy not-italic' : ''}`}>
                    {isEn ? currentStop.cityEn : currentStop.cityZh}
                  </h2>
                  
                  {/* Journey Sentence */}
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`sentence-${currentStop.id}`}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className={`text-gold font-light italic tracking-wide leading-relaxed border-l-2 border-gold/30 pl-4 my-4
                      ${isCinematicMode ? 'text-lg' : 'text-sm'}
                      ${!isEn ? 'font-chinese not-italic' : ''}`}
                  >
                    {isEn ? currentStop.journeySentenceEn : currentStop.journeySentenceZh}
                  </motion.p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <p className={`uppercase tracking-[0.4em] text-gold/60 font-bold ${isCinematicMode ? 'text-[9px]' : 'text-[10px]'} ${!isEn ? 'font-chinese' : ''}`}>
                      {isEn ? currentStop.phaseTitleEn : currentStop.phaseTitleZh}
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/20" />
                    <p className={`italic tracking-widest text-cream/30 ${isCinematicMode ? 'text-[9px]' : 'text-[10px]'} ${!isEn ? 'font-chinese not-italic' : ''}`}>
                      {isEn ? currentStop.emotionalToneEn : currentStop.emotionalToneZh}
                    </p>
                  </div>
                </div>
              </div>

              {/* MODE SPECIFIC CONTENT */}
              {isCinematicMode ? (
                /* JOURNEY MODE: Cinematic Focus on Poem */
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8 pt-8 border-t border-gold/10"
                >
                  {/* Stop Summary */}
                  <div className={`text-[13px] text-cream/70 leading-[1.8] font-light tracking-wide border-l border-gold/20 pl-4 py-1 italic ${!isEn ? 'font-chinese not-italic text-sm' : ''}`}>
                    {isEn ? currentStop.stopSummaryEn : currentStop.stopSummaryZh}
                  </div>

                  <div className="relative">
                    <div className="absolute -top-6 -left-6 text-7xl text-gold/5 font-serif italic pointer-events-none">“</div>
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-[11px] font-black text-gold/70 tracking-[0.2em] uppercase ${!isEn ? 'font-chinese' : ''}`}>
                          {isEn ? currentPoem.titleEn : `《${currentPoem.titleZh}》`}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full border border-gold/20 bg-gold/5 text-[9px] text-gold/60 font-bold tracking-wider">
                          {isEn 
                            ? (currentPoem.relationType === 'written_here' ? 'Written Here' 
                              : currentPoem.relationType === 'about_place' ? 'About Place'
                              : currentPoem.relationType === 'phase_work' ? 'Phase Gem'
                              : 'Associated')
                            : (currentPoem.relationType === 'written_here' ? '作于此地' 
                              : currentPoem.relationType === 'about_place' ? '咏此地'
                              : currentPoem.relationType === 'phase_work' ? '阶段代表作'
                              : '关联此地')
                          }
                        </span>
                      </div>
                      <div className={`text-gold-bright transition-all duration-1000 whitespace-pre-line space-y-4
                        ${!isEn 
                          ? `font-calligraphy text-shadow-gold tracking-[0.05em] text-[clamp(26px,2vw,36px)] leading-[1.7]` 
                          : `font-serif italic tracking-wide text-[clamp(18px,1.4vw,24px)] leading-[1.6]`
                        }`}>
                        {(isEn ? currentPoem.translationEn : currentPoem.fullPoemZh).map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-10">
                    <button 
                      onClick={() => setIsDetailOpen(true)}
                      className="group flex flex-col items-start gap-2 pt-4 border-t border-gold/5"
                    >
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gold/40 group-hover:text-gold transition-colors font-bold">
                        {t.morePoems}
                      </span>
                      <div className="h-px w-8 bg-gold/20 group-hover:w-16 transition-all duration-500" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* MAP MODE: Concise Information */
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-10"
                >
                  {/* Hero Poem Excerpt */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gold/10 pb-2">
                      <h3 className={`text-[10px] font-black text-gold/60 tracking-[0.2em] uppercase ${!isEn ? 'font-chinese' : ''}`}>
                        {isEn ? currentPoem.titleEn : currentPoem.titleZh}
                      </h3>
                      <span className="text-[9px] text-gold/40 border border-gold/10 px-1.5 rounded uppercase tracking-tighter">
                        {isEn 
                            ? (currentPoem.relationType === 'written_here' ? 'Written Here' 
                              : currentPoem.relationType === 'about_place' ? 'About Place'
                              : currentPoem.relationType === 'phase_work' ? 'Phase Gem'
                              : 'Associated')
                            : (currentPoem.relationType === 'written_here' ? '作于此地' 
                              : currentPoem.relationType === 'about_place' ? '咏此地'
                              : currentPoem.relationType === 'phase_work' ? '阶段代表作'
                              : '关联此地')
                          }
                      </span>
                    </div>
                    <div className={`text-gold-bright/90 space-y-2 ${!isEn ? 'font-calligraphy text-xl leading-relaxed' : 'font-serif italic text-base leading-relaxed'}`}>
                      {(isEn ? currentPoem.translationEn.slice(0, 4) : currentPoem.fullPoemZh.slice(0, 4)).map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>

                  {/* Concise Context */}
                  <div className="space-y-4">
                    <p className={`text-[13px] text-cream/60 leading-relaxed font-light tracking-wide italic ${!isEn ? 'font-chinese not-italic text-sm' : ''}`}>
                      {isEn 
                        ? currentStop.summaryEn 
                        : currentStop.summaryZh}
                    </p>
                    
                    <button 
                      onClick={() => setIsDetailOpen(true)}
                      className="group flex flex-col items-start gap-2 w-full pt-4 border-t border-gold/5"
                    >
                      <span className="text-[9px] uppercase tracking-[0.3em] text-gold/40 group-hover:text-gold transition-colors">
                        {t.morePoems}
                      </span>
                      <div className="h-px w-8 bg-gold/20 group-hover:w-16 transition-all duration-500" />
                    </button>
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
