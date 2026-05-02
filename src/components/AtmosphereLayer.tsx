/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function AtmosphereLayer() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Misty top glow */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-cream/5 to-transparent" />
      
      {/* Floating particles/mist simulation */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(244, 236, 225, 0.1) 0%, transparent 50%)',
          filter: 'blur(100px)'
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
