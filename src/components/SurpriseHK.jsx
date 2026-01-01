import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Penguin({ setPage, theme }) {
  const [showGift, setShowGift] = useState(false);
  const [penguinMessage, setPenguinMessage] = useState("Click the gift, Moti! 🎁");

  const deepMessage = "In 2026, I wish for you to be as fearless as Jennie and as happy as Jisoo. No matter how many ribbons you tie or how many times I call you Moto, you'll always be my number one. Let's make this year ours. 💗";

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className={`min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center p-6
        ${theme === 'kitty' ? 'bg-[#f0f9ff]' : 'bg-[#050505]'}
      `}
    >
      {/* Falling Snow/Hearts Effect */}
      <Snow theme={theme} />

      {/* The Penguin */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="z-10 cursor-pointer text-9xl mb-8"
        onClick={() => setPenguinMessage("Waddle waddle... Love you! 🐧")}
      >
        🐧
      </motion.div>

      {/* Penguin Speech Bubble */}
      <div className={`mb-10 p-4 rounded-2xl border-2 backdrop-blur-md z-10
        ${theme === 'kitty' ? 'bg-white border-pink-200 text-pink-600' : 'bg-black/50 border-bp-pink text-bp-pink'}
      `}>
        <p className="font-bold text-lg italic tracking-wide">{penguinMessage}</p>
      </div>

      {/* The Magical Gift Box */}
      {!showGift ? (
        <motion.div
          whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
          className="text-8xl cursor-pointer z-10"
          onClick={() => setShowGift(true)}
        >
          🎁
        </motion.div>
      ) : (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`max-w-md p-8 rounded-[3rem] shadow-2xl z-20 text-center border-4
            ${theme === 'kitty' ? 'bg-white border-hk-pink text-gray-700' : 'bg-[#121212] border-bp-pink text-white'}
          `}
        >
          <h3 className="text-2xl font-bold mb-4">A Message from My Heart 💗</h3>
          <p className="leading-relaxed italic font-serif text-lg">
            "{deepMessage}"
          </p>
          <button 
            onClick={() => setShowGift(false)}
            className="mt-6 text-sm underline opacity-50 hover:opacity-100"
          >
            Close Gift
          </button>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="fixed bottom-10 flex gap-4 z-50">
        <button 
          onClick={() => setPage('hub')}
          className="bg-white/20 backdrop-blur-lg px-6 py-2 rounded-full border border-white/30 font-bold text-gray-500 hover:text-pink-500 transition-all"
        >
          ← Back
        </button>
      </div>
    </motion.div>
  );
}

function Snow({ theme }) {
  const particles = theme === 'kitty' ? ['❄️', '💗', '🎀'] : ['❄️', '🖤', '💖'];
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -50, x: Math.random() * 100 + 'vw', opacity: 0 }}
          animate={{ y: '110vh', opacity: [0, 1, 1, 0] }}
          transition={{ 
            duration: Math.random() * 5 + 5, 
            repeat: Infinity, 
            delay: Math.random() * 5 
          }}
          className="absolute text-xl"
        >
          {particles[i % particles.length]}
        </motion.div>
      ))}
    </div>
  );
}