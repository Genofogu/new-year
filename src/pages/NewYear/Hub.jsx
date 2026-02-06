import React from 'react';
import { motion } from 'framer-motion';

// --- IMAGE IMPORTS (Linking to your PNG folder) ---
import kittyMain from '../../Elements/PNGs/hellokittymain.png';
import bpLogo from '../../Elements/PNGs/blackpink_logo.png';
import jennie from '../../Elements/PNGs/Jennie.png';
import jisoo from '../../Elements/PNGs/jisso.png';
import rose from '../../Elements/PNGs/rose.png';
import lisa from '../../Elements/PNGs/lisa_fingure.png';
import kittyStrawberry from '../../Elements/PNGs/hello_kitty_withStrawberry.png';
import drawingIcon from '../../Elements/PNGs/Drawing.png';
import heartIcon from '../../Elements/PNGs/blackkitty_heart.png';

export default function Hub({ setPage, theme }) {
  
  // Logic to decide which images to show based on the theme
  const isKitty = theme === 'kitty';

  const icons = [
    { 
      id: 'greeting', 
      img: isKitty ? kittyStrawberry : rose, 
      label: 'My Letter' 
    },
    { 
      id: 'photos', 
      img: isKitty ? drawingIcon : jennie, 
      label: 'Camera' 
    },
    { 
      id: 'penguin', 
      img: isKitty ? heartIcon : jisoo, 
      label: 'Surprise' 
    },
    { 
      id: 'cats', 
      img: isKitty ? kittyMain : lisa, 
      label: "Jannu's Arcade" 
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center min-h-screen text-center p-6 relative"
    >
      {/* --- HERO SECTION --- */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="mb-8 flex flex-col items-center"
      >
        <img 
          src={isKitty ? kittyMain : bpLogo} 
          className={`w-40 md:w-56 mb-4 drop-shadow-2xl ${!isKitty ? 'animate-pulse' : ''}`} 
          alt="Main Logo" 
        />
        
        <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter italic
          ${isKitty ? 'text-[#ff006e] drop-shadow-[2px_2px_0px_#fff]' : 'text-white drop-shadow-[3px_3px_0px_#ff006e]'}
        `}>
          HAPPY 2026, JANVI!
        </h1>
        <p className={`mt-2 font-bold italic ${isKitty ? 'text-pink-400' : 'text-gray-400'}`}>
          Welcome to your world, my Moti... 💗
        </p>
      </motion.div>

      {/* --- NAVIGATION GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 z-10 max-w-4xl">
        {icons.map((icon) => (
          <motion.div
            key={icon.id}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setPage(icon.id)}
            className="flex flex-col items-center cursor-pointer group"
          >
            {/* The Icon Container */}
            <div className={`w-28 h-28 md:w-36 md:h-36 flex items-center justify-center p-4 
              bg-white/40 backdrop-blur-xl border-[4px] rounded-[2.5rem] shadow-xl 
              transition-all duration-300 group-hover:shadow-[#ff006e]/40
              ${isKitty ? 'border-[#ffb7d5]' : 'border-black'}
            `}>
              <img 
                src={icon.img} 
                className="w-full h-full object-contain drop-shadow-md" 
                alt={icon.label} 
              />
            </div>
            
            {/* The Label */}
            <span className={`mt-4 font-black uppercase italic tracking-widest text-[10px] md:text-xs
              ${isKitty ? 'text-[#ff006e]' : 'text-white bg-black px-3 py-1 rounded-full shadow-lg'}
            `}>
              {icon.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* --- CUTE DECORATIONS --- */}
      <div className="absolute bottom-10 opacity-30 pointer-events-none w-full flex justify-around">
         <motion.img 
          animate={{ y: [0, -20, 0] }} 
          transition={{ repeat: Infinity, duration: 4 }}
          src={isKitty ? kittyStrawberry : jennie} 
          className="w-16 h-16 md:w-24 md:h-24 grayscale-[50%]"
        />
         <motion.img 
          animate={{ y: [0, 20, 0] }} 
          transition={{ repeat: Infinity, duration: 5 }}
          src={isKitty ? heartIcon : jisoo} 
          className="w-16 h-16 md:w-24 md:h-24 grayscale-[50%]"
        />
      </div>

      <footer className="mt-16 opacity-50">
        <p className={`text-[10px] font-bold ${isKitty ? 'text-pink-600' : 'text-white'}`}>
          CREATED WITH LOVE FOR MY MOTO 🎀
        </p>
      </footer>
    </motion.div>
  );
}