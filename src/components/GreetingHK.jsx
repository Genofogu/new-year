import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Greeting({ setPage, theme }) {
  
  useEffect(() => {
    // Fire confetti when the page opens
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: theme === 'kitty' ? ['#ffb7d5', '#ff0044'] : ['#f8a5c2', '#000000']
    });
  }, []);

  const playVoice = () => {
    const utterance = new SpeechSynthesisUtterance("Happy New Year my Jaanu Janvi! I love you so much Moti, you are my world.");
    utterance.pitch = 1.2;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 1.5 } // Slow, deep reveals
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen flex flex-center flex-col items-center justify-center p-8 text-center bg-white/10"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-xl space-y-8"
      >
        <motion.p variants={itemVariants} className="text-2xl italic font-serif text-gray-600">
          "Another year with you, Jaan..."
        </motion.p>
        <motion.p variants={itemVariants} className="text-3xl font-bold text-pink-500">
          To the girl who loves ribbons 🎀 and hearts 💗 more than anything.
        </motion.p>
        <motion.p variants={itemVariants} className="text-xl text-gray-500">
          Even though I call you Moti or Moto... you are the most beautiful part of my 2025.
        </motion.p>
        <motion.h2 variants={itemVariants} className="text-6xl font-black text-hkRed drop-shadow-lg">
          HAPPY 2026! 🎆
        </motion.h2>

        <motion.div variants={itemVariants} className="pt-10 flex flex-col gap-4">
          <button 
            onClick={playVoice}
            className="bg-hkPink hover:bg-pink-400 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all"
          >
            Click for a voice wish 🔊
          </button>
          
          <button 
            onClick={() => setPage('hub')}
            className="text-gray-400 hover:text-pink-500 transition-colors"
          >
            ← Back to your world
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}