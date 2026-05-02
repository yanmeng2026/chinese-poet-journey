/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import TopBar from './components/TopBar';
import JourneyMap from './components/JourneyMap';
import StoryPanel from './components/StoryPanel';
import Timeline from './components/Timeline';
import Controls from './components/Controls';
import AtmosphereLayer from './components/AtmosphereLayer';
import PoemDetailView from './components/PoemDetailView';
import { useJourneyStore } from './store/journeyStore';
import { liBaiJourney } from './data/liBaiJourney';

export default function App() {
  const { isDetailOpen, isPlaying, currentStopIndex, setCurrentStopIndex, setIsPlaying } = useJourneyStore();

  useEffect(() => {
    let timer: number | undefined;
    if (isPlaying) {
      timer = window.setInterval(() => {
        if (currentStopIndex < liBaiJourney.length - 1) {
          setCurrentStopIndex(currentStopIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, 10000); // 10 seconds per stage for slow cinematic flow
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentStopIndex, setCurrentStopIndex, setIsPlaying]);

  return (
    <div className="relative w-full h-screen font-sans selection:bg-gold/30 selection:text-gold overflow-hidden">
      <div className={`transition-all duration-700 h-full w-full ${isDetailOpen ? 'blur-sm scale-[0.98] brightness-50' : ''}`}>
        {/* Background & Atmosphere Layer */}
        <AtmosphereLayer />
        
        {/* Top Navigation */}
        <TopBar />
        
        {/* Left Map Controls */}
        <Controls />
        
        {/* Main Map View */}
        <JourneyMap />
        
        {/* Right Content Panel */}
        <StoryPanel />
        
        {/* Bottom Timeline */}
        <Timeline />
      </div>

      {/* Full Screen Overlays */}
      <PoemDetailView />
    </div>
  );
}
