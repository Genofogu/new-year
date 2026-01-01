import React from 'react';
import { motion } from 'framer-motion';

// Replace with your actual photo URLs or paths
const PHOTOS = [
  { url: 'https://i.pinimg.com/736x/91/9d/2d/919d2d09995133642398555e7f12e022.jpg', caption: 'My Love 💗' },
  { url: 'https://i.pinimg.com/736x/8e/31/53/8e315357997a48d356891a27e0258102.jpg', caption: 'So Pretty ✨' },
];

export default function Photos({ setPage, theme }) {
  const isBP = theme === 'blackpink';

  return (
    <motion.div className={`min-h-screen p-8 flex flex-col items-center ${isBP ? 'bg-[#0a0a0a]' : 'bg-[#fff0f6]'}`}>
      <h2 className={`text-5xl font-black italic mb-10 ${isBP ? 'text-[#f8a5c2] drop-shadow-[0_0_10px_#f8a5c2]' : 'text-[#ff006e]'}`}>
        {isBP ? "BLACKPINK DIARIES 📸" : "KITTY MEMORIES 🎀"}
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        {PHOTOS.map((p, i) => (
          <motion.div
            key={i} drag
            whileHover={{ scale: 1.05, rotate: 0 }}
            initial={{ rotate: i % 2 === 0 ? -5 : 5 }}
            className={`p-4 pb-12 shadow-2xl cursor-grab active:cursor-grabbing border-2
              ${isBP ? 'bg-[#1a1a1a] border-pink-500 shadow-pink-500/20' : 'bg-white border-pink-100'}
            `}
          >
            <img src={p.url} className="w-60 h-60 object-cover grayscale-[20%] hover:grayscale-0 transition-all" />
            <p className={`mt-4 text-center font-black italic ${isBP ? 'text-pink-400' : 'text-pink-600'}`}>{p.caption}</p>
          </motion.div>
        ))}
      </div>

      <button onClick={() => setPage('hub')} className="mt-16 font-black text-gray-500 hover:text-pink-500 underline">BACK</button>
    </motion.div>
  );
}