import React, { useState } from 'react';
import { motion } from 'framer-motion';
import bpLogo from "../../Elements/PNGs/blackpink_logo.png";
import lisa from "../../Elements/PNGs/lisa_fingure.png";
export default function SurpriseBP({ setPage }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <img src={bpLogo} className="w-40 mb-20 opacity-50" />

      {!isOpen ? (
        <motion.div 
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer text-9xl filter drop-shadow-[0_0_30px_#f8a5c2]"
        >
          🎁
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center bg-pink-600/20 p-12 rounded-[4rem] border-4 border-[#f8a5c2] relative">
          <motion.img 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} 
            transition={{ repeat: Infinity, duration: 3 }}
            src={lisa} 
            className="w-48 h-48 mx-auto mb-6 drop-shadow-xl" 
          />
          <h2 className="text-4xl font-black text-white italic uppercase tracking-widest mb-4">SURPRISE JAANU!</h2>
          <p className="text-[#f8a5c2] font-black text-xl">LISA IS SENDING YOU A BIG HUG! 💖</p>
          <p className="mt-4 text-white/60 italic font-bold">"You are my number one Moti!"</p>
          <button onClick={() => setIsOpen(false)} className="mt-8 text-white/40 text-xs underline">RE-CLOSE BOX</button>
        </motion.div>
      )}

      <button onClick={() => setPage('hub')} className="fixed bottom-10 text-white/50 font-black underline decoration-pink-500 uppercase tracking-widest">Back</button>
    </motion.div>
  );
}