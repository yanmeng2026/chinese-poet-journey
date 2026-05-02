/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useJourneyStore } from '../store/journeyStore';
import { liBaiJourney } from '../data/liBaiJourney';

// Tuning constants for visual refinement
const BASE_PAPER_OPACITY = 0.10; 
const LANDFORM_SHADE_OPACITY = 0.22;
const RIDGE_LINE_OPACITY = 0.28;
const RIVER_OPACITY = 0.32;
const LOCAL_SPOTLIGHT_OPACITY = 0.18;
const MAP_SILHOUETTE_OPACITY = 0.40;
const MAP_EDGE_OPACITY = 0.38;

export default function JourneyMap() {
  const { currentStopIndex, setCurrentStopIndex, language, isPlaying, setIsPlaying } = useJourneyStore();
  const currentStop = liBaiJourney[currentStopIndex];

  const isEn = language === 'en';

  // Detect if this is a new phase
  const isPhaseEntry = currentStopIndex === 0 || currentStop.phaseId !== liBaiJourney[currentStopIndex - 1].phaseId;

  // Helper to generate a smooth curved path between two points
  const getCurvePath = (x1: number, y1: number, x2: number, y2: number) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    // Add a slight offset to the midpoint for a poetic arc
    const cpX = midX + (y2 - y1) * 0.1;
    const cpY = midY - (x2 - x1) * 0.1;
    return `M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`;
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-neutral-950">
      {/* Visual Title */}
      <div className="absolute top-32 left-0 right-[620px] flex flex-col items-center justify-center z-20 pointer-events-none text-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-4xl lg:text-6xl font-light tracking-[0.4em] uppercase text-cream/90 text-gold-shadow italic ${!isEn ? 'font-calligraphy not-italic text-3xl lg:text-5xl tracking-[0.2em] opacity-90' : ''}`}
        >
          {isEn ? "Li Bai’s Journey" : "李白的人生足迹"}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`text-[10px] lg:text-xs tracking-[0.5em] uppercase text-gold/50 mt-6 font-light ${!isEn ? 'font-chinese' : ''}`}
        >
          {isEn ? "Follow the footsteps of the Immortal Poet" : "跟随诗仙的脚步，重走万里河山"}
        </motion.p>
      </div>

      {/* Abstract Map Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-10 mix-blend-overlay" />
        
        {/* Real China Map Silhouette with Topographic Detail */}
        <svg className="absolute inset-x-0 inset-y-0 w-full h-full" style={{ opacity: MAP_SILHOUETTE_OPACITY }} viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            {/* Dynamic Spotlight following the selected city */}
            <radialGradient id="spotlightGradient" cx={`${currentStop.x}%`} cy={`${currentStop.y}%`} r="28%">
              <stop offset="0%" stopColor="#d4af37" stopOpacity={LOCAL_SPOTLIGHT_OPACITY} />
              <stop offset="50%" stopColor="#c5a059" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#c5a059" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="landGradient" cx="45%" cy="55%" r="70%">
              <stop offset="0%" stopColor="#3d2f1f" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#2a2015" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1a140d" stopOpacity="0.4" />
            </radialGradient>
            
            {/* Very Subtle Paper Grain - Fine texture, not stone */}
            <filter id="paperGrain" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="5" result="noise" />
              <feComponentTransfer in="noise">
                <feFuncA type="linear" slope="0.05" />
              </feComponentTransfer>
              <feBlend in="SourceGraphic" mode="multiply" />
            </filter>

            {/* River Soft Glow */}
            <filter id="riverGlow">
              <feGaussianBlur stdDeviation="0.5" result="blur" />
              <feComponentTransfer in="blur">
                <feFuncA type="linear" slope="1.2" />
              </feComponentTransfer>
            </filter>
          </defs>
          
          {/* Geographic Relief Base - Soft Tone */}
          <path 
            d="M 12,90 Q 28,60 48,42 T 88,28 L 92,68 Q 72,78 52,82 T 16,98 Z"
            fill="#3a2e1f"
            opacity={BASE_PAPER_OPACITY * 1.5}
            filter="blur(30px)"
          />
          
          {/* Active Area Geographic Spotlight */}
          <rect width="100" height="100" fill="url(#spotlightGradient)" opacity="0.6" className="mix-blend-screen" />

          {/* Regional Landform Shading - Tonal Topography */}
          <g opacity={LANDFORM_SHADE_OPACITY} fill="#c5a059" className="mix-blend-overlay">
            {/* Sichuan Basin Upland */}
            <path d="M 18,75 Q 28,60 38,75 T 48,70 T 55,80 L 50,85 Q 35,90 20,85 Z" filter="blur(12px)" opacity="0.7" />
            {/* Central Qinling Ridge Shading */}
            <path d="M 32,45 Q 48,35 65,45 T 82,42 L 80,48 Q 50,52 30,48 Z" filter="blur(10px)" opacity="0.5" />
            {/* Jiangnan Hills Soft Shade */}
            <ellipse cx="78" cy="68" rx="15" ry="10" filter="blur(15px)" opacity="0.4" />
            {/* North Borderland Shade */}
            <path d="M 40,25 Q 55,18 75,25" stroke="#c5a059" strokeWidth="2" filter="blur(8px)" opacity="0.2" fill="none" />
          </g>

          {/* China Mainland Silhouette - Poetic Foundation */}
          <path 
            id="china-silhouette"
            d="M 78.6 26.6 L 82.2 24.1 L 86.4 23.3 L 89.8 24.5 L 91.5 27.8 L 91.4 31.7 L 89.2 35.1 L 86.6 37.9 L 85.3 41.6 L 86.1 45.4 L 88.5 48.7 L 91.8 51 L 93.3 54.7 L 91.7 58.4 L 88.3 61 L 85.4 64.1 L 84.4 67.9 L 85.8 71.5 L 88.5 74.4 L 86.9 78.1 L 83.1 80.2 L 79.1 80.6 L 75.3 80.7 L 71.5 81.3 L 67.8 82.4 L 64.2 84.1 L 61 86.3 L 58.1 89.1 L 55 91.6 L 51.3 93 L 47.4 93.3 L 43.6 92.5 L 40 91 L 36.6 88.9 L 33.5 86.3 L 30.2 83.4 L 26.3 81.7 L 22.3 81.3 L 18.5 80.5 L 14.8 79.2 L 12.1 76.5 L 11.4 72.7 L 13.1 69.1 L 16 66.5 L 17.6 63 L 17.5 59.2 L 15.1 56.4 L 11.9 54.3 L 10.3 50.8 L 11.6 47.1 L 14.7 44.4 L 17 41 L 17.5 37.2 L 16.3 33.5 L 17.9 29.8 L 21.2 27.6 L 25.1 26.8 L 29 27.1 L 32.8 24.7 L 36.3 22 L 40.2 20.3 L 44.1 20.1 L 48 21.2 L 51.6 23.2 L 55.4 24.4 L 59.2 24 L 62.8 22.4 L 66.5 21 L 70.4 20.6 L 74.2 21.3 L 77.6 23.9 Z" 
            fill="url(#landGradient)" 
            opacity={BASE_PAPER_OPACITY}
            filter="url(#paperGrain)"
          />

          {/* Elegant Land Boundary Outline */}
          <path 
            d="M 78.6 26.6 L 82.2 24.1 L 86.4 23.3 L 89.8 24.5 L 91.5 27.8 L 91.4 31.7 L 89.2 35.1 L 86.6 37.9 L 85.3 41.6 L 86.1 45.4 L 88.5 48.7 L 91.8 51 L 93.3 54.7 L 91.7 58.4 L 88.3 61 L 85.4 64.1 L 84.4 67.9 L 85.8 71.5 L 88.5 74.4 L 86.9 78.1 L 83.1 80.2 L 79.1 80.6 L 75.3 80.7 L 71.5 81.3 L 67.8 82.4 L 64.2 84.1 L 61 86.3 L 58.1 89.1 L 55 91.6 L 51.3 93 L 47.4 93.3 L 43.6 92.5 L 40 91 L 36.6 88.9 L 33.5 86.3 L 30.2 83.4 L 26.3 81.7 L 22.3 81.3 L 18.5 80.5 L 14.8 79.2 L 12.1 76.5 L 11.4 72.7 L 13.1 69.1 L 16 66.5 L 17.6 63 L 17.5 59.2 L 15.1 56.4 L 11.9 54.3 L 10.3 50.8 L 11.6 47.1 L 14.7 44.4 L 17 41 L 17.5 37.2 L 16.3 33.5 L 17.9 29.8 L 21.2 27.6 L 25.1 26.8 L 29 27.1 L 32.8 24.7 L 36.3 22 L 40.2 20.3 L 44.1 20.1 L 48 21.2 L 51.6 23.2 L 55.4 24.4 L 59.2 24 L 62.8 22.4 L 66.5 21 L 70.4 20.6 L 74.2 21.3 L 77.6 23.9 Z" 
            fill="none"
            stroke="#c5a059"
            strokeWidth="0.12"
            strokeOpacity={MAP_EDGE_OPACITY}
            style={{ filter: 'drop-shadow(0 0 1.5px rgba(197,160,89,0.2))' }}
          />
          
          {/* Poetic Ridge Lines - Directional Rhythm */}
          <g opacity={RIDGE_LINE_OPACITY} stroke="#c5a059" strokeWidth="0.12" fill="none" strokeLinecap="round">
             {/* Bashu / Sichuan Corrugated Ridges */}
             <path d="M22,72 Q26,66 30,75 S36,68 42,78" />
             <path d="M24,78 Q30,72 36,82" strokeWidth="0.18" opacity="0.6" />
             
             {/* Qinling Range (The Spine) */}
             <path d="M32,45 C45,35 60,50 78,42" strokeWidth="0.22" strokeOpacity="0.7" />
             <path d="M35,42 L55,36" strokeWidth="0.08" opacity="0.4" />
             <path d="M62,40 L75,38" strokeWidth="0.1" opacity="0.3" />
             
             {/* Jiangnan / Southeast Rolling Hills */}
             <path d="M65,75 Q75,70 85,78" strokeWidth="0.1" />
             <path d="M62,82 Q72,78 82,85" strokeWidth="0.08" opacity="0.5" />
             
             {/* Northern Desolate Ranges */}
             <path d="M42,28 Q52,24 65,30" strokeWidth="0.12" opacity="0.3" />
          </g>

          {/* Majestic Rivers - Geographic Lifelines */}
          <g stroke="#c5a059" fill="none" strokeLinecap="round" strokeOpacity={RIVER_OPACITY}>
            {/* The Yangtze River (Long River) */}
            <path 
              d="M24,68 C32,64 45,82 58,70 S72,55 86,58" 
              strokeWidth="0.28" 
              filter="url(#riverGlow)"
            />
            {/* Tributaries */}
            <path d="M58,70 Q62,75 65,85" strokeWidth="0.1" strokeOpacity="0.4" />
            <path d="M35,66 L38,60" strokeWidth="0.08" strokeOpacity="0.3" />
            
            {/* The Yellow River (Mother River) */}
            <path 
              d="M32,32 C40,30 50,48 65,35 S80,22 88,28" 
              strokeWidth="0.22" 
              strokeOpacity="0.8"
              filter="url(#riverGlow)"
            />
          </g>

          {/* Floating Mist Layers */}
          <motion.path 
            animate={{ x: [-3, 3, -3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            d="M10,85 Q30,78 50,85 T90,78" 
            stroke="#f5f5f5" 
            strokeWidth="0.1" 
            opacity="0.12" 
            fill="none" 
          />
        </svg>

        {/* Global Glow Centers */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gold/5 blur-[200px] rounded-full pointer-events-none" />
      </div>

      {/* Phase Entry Overlay */}

      <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center z-[100] pointer-events-none">
        <AnimatePresence mode="wait">
          {isPhaseEntry && isPlaying && (
            <motion.div
              key={currentStop.phaseId}
              initial={{ opacity: 0, letterSpacing: '1em', scale: 1.1 }}
              animate={{ opacity: 1, letterSpacing: '0.4em', scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              transition={{ 
                duration: 1.5,
                opacity: { duration: 0.5 },
                exit: { duration: 0.8 }
              }}
              className="flex flex-col items-center"
            >
              <div className="relative text-center px-12 py-8">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gold/40"
                />
                <h2 className={`text-4xl lg:text-6xl font-black text-gold/90 uppercase tracking-[0.4em] text-shadow-gold ${!isEn ? 'font-chinese' : ''}`}>
                  {isEn ? currentStop.phaseTitleEn : currentStop.phaseTitleZh}
                </h2>
                <p className={`text-xs lg:text-sm text-gold/60 mt-4 tracking-[0.8em] uppercase ${!isEn ? 'font-chinese' : ''}`}>
                  {isEn ? currentStop.emotionalToneEn : currentStop.emotionalToneZh}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative w-full h-full max-w-7xl mx-auto overflow-hidden">
        {/* Main Map Content Area (Restricted by Sidebar) */}
        <motion.div 
          className="absolute top-[60px] bottom-[var(--timeline-safe-bottom)] left-0 right-[620px]"
          animate={{
            x: isPlaying ? `${(45 - currentStop.x) * 0.15}%` : 0,
            y: isPlaying ? `${(45 - currentStop.y) * 0.15}%` : 0,
            scale: isPlaying ? 1.05 : 1
          }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          {/* Journey-Focused Corridor Glow (Dynamic) */}
          <svg className="absolute inset-x-0 inset-y-0 w-full h-full opacity-30 mix-blend-screen pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
             <defs>
                <filter id="corridorGlow">
                   <feGaussianBlur stdDeviation="15" />
                </filter>
             </defs>
             {/* A soft glowing area that follows the general Li Bai journey belt */}
             <path 
                d="M 15,90 Q 30,65 50,45 T 88,32 L 95,65 Q 75,75 55,85 T 18,95 Z" 
                fill="#c5a059" 
                opacity="0.15"
                filter="url(#corridorGlow)"
              />
          </svg>

          <svg className="absolute inset-0 w-full h-full overflow-visible z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id="routeGlow">
                <feGaussianBlur stdDeviation="0.4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="activeGlow">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Render Route Segments */}
            {liBaiJourney.slice(0, -1).map((stop, i) => {
              const nextStop = liBaiJourney[i + 1];
              const isPassed = i < currentStopIndex;
              const isLeadToCurrent = i === currentStopIndex - 1;
              const isFuture = i >= currentStopIndex;
              const isCurrentForward = i === currentStopIndex && isPlaying;

              return (
                <g key={`segment-${i}`}>
                   {/* Background Shadow Line */}
                   <motion.path
                    d={getCurvePath(stop.x, stop.y, nextStop.x, nextStop.y)}
                    fill="none"
                    stroke="black"
                    strokeWidth="0.6"
                    opacity="0.3"
                  />
                  
                  {/* Outer Glow */}
                  <motion.path
                    d={getCurvePath(stop.x, stop.y, nextStop.x, nextStop.y)}
                    fill="none"
                    stroke="#c5a059"
                    strokeWidth={isLeadToCurrent ? "0.8" : "0.4"}
                    strokeOpacity={isPassed ? "0.2" : isFuture ? "0.05" : "0.3"}
                    style={{ filter: 'blur(3px)' }}
                  />

                  {/* Progressive Flow Effect for Lead-to Segment */}
                  {isLeadToCurrent && isPlaying && (
                    <motion.path
                      d={getCurvePath(stop.x, stop.y, nextStop.x, nextStop.y)}
                      fill="none"
                      stroke="#c5a059"
                      strokeWidth="0.8"
                      strokeOpacity="0.5"
                      strokeDasharray="2 4"
                      animate={{ strokeDashoffset: [20, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      style={{ filter: 'blur(1px)' }}
                    />
                  )}

                  {/* Progressive Flow Effect for Current Forward Segment (Next step hint) */}
                  {isCurrentForward && (
                    <motion.path
                      d={getCurvePath(stop.x, stop.y, nextStop.x, nextStop.y)}
                      fill="none"
                      stroke="#c5a059"
                      strokeWidth="1"
                      strokeOpacity="0.8"
                      strokeDasharray="4 8"
                      animate={{ strokeDashoffset: [40, 0], strokeOpacity: [0.3, 0.8, 0.3] }}
                      transition={{ 
                        strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
                        strokeOpacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                      }}
                      style={{ filter: 'blur(1.5px)' }}
                    />
                  )}

                  {/* Main Visible Path */}
                  <motion.path
                    d={getCurvePath(stop.x, stop.y, nextStop.x, nextStop.y)}
                    fill="none"
                    stroke="#c5a059"
                    strokeWidth={isLeadToCurrent ? "0.3" : "0.15"}
                    strokeOpacity={isPassed ? "0.8" : isFuture ? "0.1" : (isLeadToCurrent && isPlaying ? 1 : 0.6)}
                    strokeDasharray={isFuture ? "1 2" : "none"}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: i * 0.1 }}
                    filter="url(#routeGlow)"
                  />
                </g>
              );
            })}
          </svg>

          {/* City Nodes */}
          {liBaiJourney.map((stop, index) => {
            const isActive = index === currentStopIndex;
            const isPassed = index < currentStopIndex;
            
            return (
              <div 
                key={stop.id}
                className="absolute z-20 group cursor-pointer"
                style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                onClick={() => {
                  setCurrentStopIndex(index);
                  setIsPlaying(false);
                }}
              >
                {/* Node Circle */}
                <motion.div 
                  animate={isActive 
                    ? (isPhaseEntry && isPlaying 
                      ? { scale: [1, 2.5, 1], boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 50px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0)"] }
                      : { scale: [1, 1.3, 1], boxShadow: ["0 0 0px rgba(197,160,89,0)", "0 0 30px rgba(212,175,55,0.6)", "0 0 0px rgba(197,160,89,0)"] }
                    ) 
                    : { scale: 1, opacity: isPassed ? 0.5 : 0.3 }}
                  transition={isPhaseEntry && isActive && isPlaying ? { duration: 1.2, ease: "easeOut" } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className={`relative w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-700 flex items-center justify-center ${
                    isActive 
                      ? 'border-gold-bright bg-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] z-30' 
                      : isPassed 
                        ? 'border-gold/40 bg-black/90' 
                        : 'border-white/10 bg-black/60 hover:border-gold/40'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-gold/50" 
                    />
                  )}
                  {/* Center dot */}
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                    isActive ? 'bg-white' : isPassed ? 'bg-gold/40' : 'bg-white/10'
                  }`} />
                </motion.div>

                {/* Label */}
                <div 
                  className={`absolute transition-all duration-700 p-2 rounded backdrop-blur-[2px] ${
                    isActive ? 'opacity-100 scale-110 z-30' : 'opacity-20 group-hover:opacity-100 group-hover:translate-x-0'
                  } ${
                    // Refined Manual Per-Node Positioning to prevent overlap
                    stop.id === 'birth' ? 'right-8 top-8' :        // Jiangyou: label left-bottom
                    stop.id === 'changan' ? 'right-8 bottom-8' :   // Chang'an: label top-left
                    stop.id === 'yangzhou' ? 'left-8 -translate-y-1/2' : // Yangzhou: label right
                    stop.id === 'nanjing' ? 'left-8 -translate-y-[150%]' : // Jinling: label right-top
                    stop.id === 'lushan' ? 'right-8 top-8' :       // Lushan: label left-bottom
                    stop.id === 'xuancheng' ? 'left-8 top-8' :      // Xuancheng: label right-bottom
                    stop.id === 'baidi' ? '-translate-x-1/2 top-8' : // Baidi: label center-bottom (to avoid Jiangyou)
                    'left-6 -translate-y-1/2' // default
                  }`}
                >
                  <div className={`flex flex-col ${
                    ['changan', 'lushan', 'baidi', 'birth'].includes(stop.id) ? 'items-end' : 
                    'items-start'
                  }`}>
                    <div className="flex items-center gap-2">
                       {/* City Name - brightens on group hover */}
                      <span className={`text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-500 whitespace-nowrap ${!isEn ? 'font-chinese tracking-[0.1em]' : ''} ${
                        isActive ? 'text-gold-bright font-bold' : 'text-cream/70 group-hover:text-gold'
                      }`}>
                        {isEn ? stop.cityEn : stop.cityZh}
                      </span>
                      {stop.poems.length > 1 && (
                        <span className={`text-[8px] border px-1.5 py-0.5 rounded-full font-mono transition-all duration-500 ${
                          isActive ? 'bg-gold/20 border-gold/40 text-gold-bright' : 'bg-gold/5 border-gold/10 text-gold/40 group-hover:border-gold/30 group-hover:text-gold/80'
                        }`}>
                          {stop.poems.length}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Map Fog/Mist */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 pointer-events-none z-30" />
    </main>
  );
}
