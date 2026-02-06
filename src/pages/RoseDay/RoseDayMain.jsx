import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Assets (Using your established paths)
import kittyMain from '../../Elements/PNGs/hellokittymain.png';
import jennieImg from '../../Elements/PNGs/Jennie.png';
import jisooImg from '../../Elements/PNGs/jisso.png';
import bpLogo from '../../Elements/PNGs/blackpink_logo.png';

export default function RoseDayMain() {
  const [bloom, setBloom] = useState(null); // null, 'pink', 'red', 'black'
  const navigate = useNavigate();

  const roseData = {
    pink: {
      title: "CUTE ROSE 🎀",
      msg: "A soft pink rose for my sweet Jaanu. May your year be as cute as Hello Kitty!",
      img: kittyMain,
      color: "bg-[#ffeaf2]",
      textColor: "text-[#ff006e]"
    },
    red: {
      title: "QUEEN ROSE 👑",
      msg: "A royal red rose for my Moti. You have the style of Jennie and the heart of Jisoo!",
      img: jennieImg,
      color: "bg-[#fff0f3]",
      textColor: "text-[#ff4d6d]"
    },
    black: {
      title: "APT. ROSE 🎸",
      msg: "The ultimate rose for the ultimate girl! Stay punk, stay cool, stay mine. Love you Moto!",
      img: bpLogo,
      color: "bg-[#0a0a0a]",
      textColor: "text-[#f8a5c2]"
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 overflow-hidden flex flex-col items-center justify-center p-6
      ${bloom ? roseData[bloom].color : 'bg-[#fff5f8]'}
    `}>
      
      <AnimatePresence mode="wait">
        {!bloom ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }}
            className="text-center z-10"
          >
            <h1 className="text-5xl md:text-7xl font-black text-[#ff006e] italic uppercase tracking-tighter mb-4 drop-shadow-md">
              PICK A ROSE, JAANU 🌹
            </h1>
            <p className="text-pink-400 font-bold italic mb-12 uppercase tracking-widest text-xs">For every side of my Moti...</p>

            <div className="flex flex-wrap justify-center gap-8">
              {['pink', 'red', 'black'].map((type) => (
                <motion.div
                  key={type}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setBloom(type)}
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className={`w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-7xl md:text-8xl bg-white border-8 border-black rounded-[3rem] shadow-[12px_12px_0px_0px_#000]`}>
                    {type === 'pink' ? '🌸' : type === 'red' ? '🌹' : '🥀'}
                  </div>
                  <p className="mt-4 font-black uppercase text-xs tracking-widest text-black bg-white px-3 py-1 border-2 border-black rounded-full shadow-[4px_4px_0px_0px_#000]">
                    {type} Rose
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="bloom"
            initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ opacity: 0 }}
            className="max-w-xl w-full text-center relative"
          >
            {/* STICKER STACK EFFECT */}
            <div className="bg-white border-[10px] border-black p-8 md:p-12 rounded-[4rem] shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
               <motion.img 
                initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                src={roseData[bloom].img} 
                className="w-40 h-40 mx-auto mb-6 object-contain drop-shadow-xl" 
               />
               
               <h2 className={`text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 ${roseData[bloom].textColor}`}>
                 {roseData[bloom].title}
               </h2>
               
               <p className="text-gray-700 text-lg md:text-2xl font-bold leading-relaxed italic border-t-4 border-black pt-6">
                 "{roseData[bloom].msg}"
               </p>

               <button 
                onClick={() => setBloom(null)}
                className="mt-10 bg-black text-white px-8 py-3 rounded-full font-black uppercase italic tracking-widest text-xs hover:scale-110 transition-all"
               >
                 Re-pick a Rose 🌹
               </button>
            </div>

            {/* Floating Background Icons */}
            <motion.div 
              animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 text-6xl opacity-20"
            >
              💖
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => navigate('/')}
        className="fixed bottom-20 font-black text-black underline decoration-pink-500 decoration-4 underline-offset-8 uppercase text-xs tracking-widest"
      >
        Back to Hub
      </button>
    </div>
  );
}