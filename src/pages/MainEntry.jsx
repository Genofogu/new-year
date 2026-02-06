import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarPopup from '../components/CalendarPopup';
import bpLogo from '../Elements/PNGs/blackpink_logo.png';
import kittyMain from '../Elements/PNGs/hellokittymain.png';

export default function MainEntry() {
  const [isCalOpen, setIsCalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#ffeaf2] flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      
      {/* --- BACKGROUND DECOR --- */}
      <div className="fixed inset-0 pointer-events-none opacity-20 flex justify-around items-center z-0">
         <motion.img animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }} src={kittyMain} className="w-40 h-40 grayscale" />
         <motion.img animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5 }} src={bpLogo} className="w-40 h-40 grayscale" />
      </div>

      {/* --- HERO SECTION (Set to z-10) --- */}
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 relative">
        <h1 className="text-6xl md:text-8xl font-black text-[#ff006e] italic uppercase tracking-tighter drop-shadow-xl leading-[0.9]">
          JANVI'S <br/> WORLD 💗
        </h1>
        <p className="mt-4 text-pink-400 font-black italic uppercase tracking-widest text-sm">
          Everything for my Moti in one place...
        </p>
      </motion.div>

      <div className="mt-12 space-y-4 z-10 relative">
          <p className="text-gray-500 font-bold italic max-w-xs mx-auto">
            "I built this hub to store every special day we share. Click the diary to explore!"
          </p>
      </div>

      {/* --- 📅 THE FLOATING CALENDAR ICON (Set to z-50) --- */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCalOpen(true)}
        className="fixed bottom-10 right-10 z-50 w-20 h-20 md:w-24 md:h-24 bg-white border-8 border-black rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center cursor-pointer group"
      >
        <span className="text-4xl md:text-5xl group-hover:animate-bounce">📅</span>
        <span className="text-[8px] font-black uppercase mt-1">Diary</span>
      </motion.button>

      {/* --- CALENDAR POPUP --- */}
      <AnimatePresence>
        {isCalOpen && (
          <CalendarPopup onClose={() => setIsCalOpen(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}