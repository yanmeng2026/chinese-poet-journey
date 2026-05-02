/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Play, Pause } from 'lucide-react';
import { useJourneyStore } from '../store/journeyStore';
import { liBaiJourney } from '../data/liBaiJourney';
import { motion, AnimatePresence } from 'motion/react';

export default function Timeline() {
  const { currentStopIndex, isPlaying, setIsPlaying, setCurrentStopIndex, language, isCinematicMode, setIsCinematicMode } = useJourneyStore();

  const isEn = language === 'en';

  return (
    <div className="fixed bottom-0 left-0 right-0 h-36 px-12 z-50 bg-gradient-to-t from-black via-black/90 to-transparent flex items-end pb-8">
      <div className="max-w-7xl mx-auto w-full flex items-center gap-16">
        {/* Play Control */}
        <div className="flex items-center gap-6 min-w-[160px]">
          <button 
            onClick={() => {
              if (!isCinematicMode) {
                setIsCinematicMode(true);
                setIsPlaying(true);
                return;
              }
              
              if (!isPlaying && currentStopIndex === liBaiJourney.length - 1) {
                setCurrentStopIndex(0);
              }
              setIsPlaying(!isPlaying);
            }}
            className={`group relative w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-500 shadow-[0_0_15px_rgba(197,160,89,0.2)] ${isPlaying ? 'bg-gold text-black border-gold' : 'text-gold border-gold/40 hover:bg-gold hover:text-black'}`}
            title={!isCinematicMode ? (isEn ? 'Enter Journey' : '进入旅程') : (isPlaying ? (isEn ? 'Pause playback' : '暂停播放') : (isEn ? 'Resume playback' : '继续播放'))}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            <div className="absolute inset-0 rounded-full border border-gold/0 group-hover:scale-125 group-hover:border-gold/20 transition-all duration-700" />
          </button>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-gold-bright tracking-wider">0{currentStopIndex + 1}:00</span>
            <span className="text-[11px] font-chinese text-cream/40 tracking-tighter uppercase whitespace-nowrap">
              {!isCinematicMode ? (isEn ? 'Enter Journey' : '进入旅程') : (isPlaying ? (isEn ? 'Playing' : '播放中') : (isEn ? 'Paused' : '已暂停'))} / 0{liBaiJourney.length + 1}:00
            </span>
          </div>
        </div>

        {/* Timeline Line */}
        <div className="flex-1 relative h-20 flex items-center">
          <div className="absolute w-full h-[1px] bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]" />
          
          <div className="w-full flex justify-between relative px-4">
            {liBaiJourney.map((stop, index) => {
              const isActive = index === currentStopIndex;
              const isPassed = index < currentStopIndex;
              const isPhaseStart = index === 0 || stop.phaseId !== liBaiJourney[index - 1].phaseId;
              
              return (
                <div 
                  key={stop.id}
                  onClick={() => {
                    setCurrentStopIndex(index);
                    setIsPlaying(false);
                  }}
                  className="flex flex-col items-center group cursor-pointer relative"
                >
                  {/* Phase Label (Subtle) */}
                  {isPhaseStart && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-16 left-0 flex flex-col items-start min-w-[120px]"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold/40 shadow-[0_0_8px_rgba(197,160,89,0.3)]" />
                        <span className={`text-[10px] font-bold tracking-[0.25em] text-gold/60 uppercase ${!isEn ? 'font-chinese' : ''}`}>
                          {isEn ? stop.phaseShortLabelEn : stop.phaseShortLabelZh}
                        </span>
                      </div>
                      <div className="h-[1px] w-full bg-gradient-to-r from-gold/20 to-transparent" />
                    </motion.div>
                  )}

                  {/* Vertical indicator line */}
                  <div className={`absolute top-0 w-[1px] h-4 -translate-y-full transition-all duration-700 ${isActive ? 'bg-gold h-8' : 'bg-white/10 group-hover:bg-white/40'}`} />

                  {/* Stop Point */}
                  <div className="relative">
                    <motion.div 
                      animate={isActive ? { scale: [1, 1.4, 1], rotate: [45, 135, 45] } : { rotate: 45 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className={`w-3 h-3 border transition-all duration-700 ${
                        isActive 
                          ? 'bg-gold-bright border-white glow-city-active scale-125' 
                          : isPassed 
                            ? 'bg-gold/30 border-gold/60'
                            : 'bg-transparent border-gold/20 group-hover:border-gold group-hover:scale-110'
                      }`} 
                    />
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 4 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute inset-0 bg-gold/10 rounded-full -z-10 blur-xl"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Label */}
                  <div className={`absolute top-10 flex flex-col items-center transition-all duration-700 pointer-events-none ${isActive ? 'opacity-100 translate-y-0 scale-110' : 'opacity-40 translate-y-2 group-hover:opacity-80 group-hover:translate-y-1'}`}>
                    <span className={`text-[12px] font-mono tracking-widest font-bold mb-1 ${isActive ? 'text-gold-bright' : 'text-cream'}`}>{stop.year}</span>
                    <span className={`text-[9px] uppercase tracking-[0.3em] whitespace-nowrap font-medium ${!isEn ? 'font-chinese text-[11px]' : ''} ${isActive ? 'text-gold' : 'text-cream/50 group-hover:text-gold/80'}`}>
                      {isEn ? stop.cityEn : stop.cityZh}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
