/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Map as MapIcon, Mountain, Feather, PlayCircle } from 'lucide-react';
import { useJourneyStore } from '../store/journeyStore';

export default function Controls() {
  const { language, setIsCinematicMode, isCinematicMode } = useJourneyStore();
  const isEn = language === 'en';

  const modes = [
    { 
      id: 'map', 
      label: isEn ? 'Map Mode' : '地图模式', 
      icon: MapIcon,
      active: !isCinematicMode,
      action: () => setIsCinematicMode(false) 
    },
    { 
      id: 'journey', 
      label: isEn ? 'Journey Mode' : '旅程模式', 
      icon: PlayCircle,
      active: isCinematicMode,
      action: () => setIsCinematicMode(true) 
    },
  ];

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-40">
      <div className="flex flex-col gap-4">
        {modes.map((item) => (
          <button 
            key={item.id}
            onClick={item.action}
            className={`group relative w-12 h-12 flex items-center justify-center rounded-full border glass-panel transition-all duration-300 ${item.active ? 'border-gold bg-gold/10' : 'border-white/10 hover:border-gold/50'}`}
            title={item.label}
          >
            <item.icon size={18} className={`${item.active ? 'text-gold' : 'text-cream/60 group-hover:text-gold'} transition-colors`} />
            
            <span className="absolute left-16 px-3 py-1 text-[11px] font-chinese tracking-widest bg-black/90 border border-gold/20 text-gold opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap translate-x-2 group-hover:translate-x-0">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
