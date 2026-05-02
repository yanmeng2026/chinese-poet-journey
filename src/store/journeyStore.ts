/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { liBaiJourney } from '../data/liBaiJourney';

export type Language = 'en' | 'zh';
interface JourneyState {
  selectedPoet: string;
  currentStopIndex: number;
  isPlaying: boolean;
  language: Language;
  isDetailOpen: boolean;
  isCinematicMode: boolean;
  selectedPoemIndex: number;
  setSelectedPoet: (poet: string) => void;
  setCurrentStopIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setLanguage: (lang: Language) => void;
  setIsDetailOpen: (open: boolean) => void;
  setIsCinematicMode: (cinematic: boolean) => void;
  setSelectedPoemIndex: (index: number) => void;
  toggleLanguage: () => void;
  nextStop: () => void;
  prevStop: () => void;
}

export const useJourneyStore = create<JourneyState>((set, get) => ({
  selectedPoet: 'Li Bai',
  currentStopIndex: 0, // Default to Sichuan (index 0)
  isPlaying: false,
  language: 'zh',
  isDetailOpen: false,
  isCinematicMode: false,
  selectedPoemIndex: 0,
  
  setSelectedPoet: (poet) => set({ selectedPoet: poet }),
  
  setCurrentStopIndex: (index) => set({ currentStopIndex: index, selectedPoemIndex: 0 }),
  
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  setLanguage: (lang) => set({ language: lang }),

  setIsDetailOpen: (open) => set({ isDetailOpen: open }),
  setIsCinematicMode: (cinematic) => set((state) => ({ 
    isCinematicMode: cinematic,
    isPlaying: cinematic ? state.isPlaying : false 
  })),
  setSelectedPoemIndex: (index) => set({ selectedPoemIndex: index }),

  toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'zh' : 'en' })),
  
  nextStop: () => {
    const { currentStopIndex } = get();
    const nextIndex = (currentStopIndex + 1) % liBaiJourney.length;
    set({ currentStopIndex: nextIndex });
  },
  
  prevStop: () => {
    const { currentStopIndex } = get();
    const prevIndex = (currentStopIndex - 1 + liBaiJourney.length) % liBaiJourney.length;
    set({ currentStopIndex: prevIndex });
  },
}));
