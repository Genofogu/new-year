import React from 'react';
import { motion } from 'framer-motion';
import jennieSmile from '../../Elements/PNGs/Jennie_smile.png';
import jisoo from '../../Elements/PNGs/jisso.png';

export default function GreetingBP({ setPage }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-black flex flex-center items-center justify-center p-6 text-center">
      <div className="max-w-xl border-4 border-[#f8a5c2] p-10 rounded-[3rem] shadow-[0_0_50px_rgba(248,165,194,0.3)] bg-gradient-to-b from-gray-900 to-black">
        <div className="flex justify-center gap-6 mb-8">
            <motion.img animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }} src={jennieSmile} className="w-28 h-28 object-contain drop-shadow-[0_0_10px_#fff]" />
            <motion.img animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2.2 }} src={jisoo} className="w-28 h-28 object-contain drop-shadow-[0_0_10px_#f8a5c2]" />
        </div>
        
        <h1 className="text-5xl font-black text-[#f8a5c2] italic uppercase mb-6 tracking-tighter">VIP NEW YEAR! 🖤💖</h1>
        <p className="text-white text-xl font-bold leading-relaxed italic border-l-4 border-[#f8a5c2] pl-4">
          "Janvi! Our favorite Moti! Jennie and Jisoo are so excited for you to have the best 2026. 
          You're the most stylish, cutest Jaanu in the world. Shine like a BLACKPINK star today! 
          Love you 3000, Moto!"
        </p>

        <button onClick={() => setPage('hub')} className="mt-12 bg-[#f8a5c2] text-black px-10 py-3 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg">
          Back to Stage
        </button>
      </div>
    </motion.div>
  );
}