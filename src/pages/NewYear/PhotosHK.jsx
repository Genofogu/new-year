import React from 'react';
import { motion } from 'framer-motion';

export default function Photos({ setPage, theme }) {
  // 📸 ADD YOUR PHOTO LINKS HERE!
  // You can use local paths like "/janvi1.jpg" if they are in your 'public' folder
  const myPhotos = [
    { id: 1, url: 'https://i.pinimg.com/736x/91/9d/2d/919d2d09995133642398555e7f12e022.jpg', caption: 'Cute Moti 🎀' },
    { id: 2, url: 'https://i.pinimg.com/736x/8e/31/53/8e315357997a48d356891a27e0258102.jpg', caption: 'Jennie Vibes ✨' },
    { id: 3, url: 'https://i.pinimg.com/736x/2c/3e/2a/2c3e2a7e7e6e5e5e5e5e5e5e5e5e5e5e.jpg', caption: 'My World 💗' },
    { id: 4, url: 'https://i.pinimg.com/736x/0a/6e/b9/0a6eb9e19d7d3d3d3d3d3d3d3d3d3d3d.jpg', caption: 'Jisoo Style 👑' },
    { id: 5, url: 'https://i.pinimg.com/736x/5f/7b/0d/5f7b0d9124976c66d99723528b17169d.jpg', caption: 'Jaanu 🎀' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen w-full relative overflow-hidden p-10 flex flex-col items-center"
    >
      {/* Page Title */}
      <div className="z-20 text-center mb-10">
        <h2 className={`text-4xl font-bold ${theme === 'kitty' ? 'text-hk-red' : 'text-bp-pink'}`}>
          Our Polaroid Wall 📸
        </h2>
        <p className="text-gray-500 italic mt-2">Psst... you can drag these around, Moti! 😉</p>
      </div>

      {/* Back Button */}
      <button 
        onClick={() => setPage('hub')}
        className="fixed bottom-10 z-50 bg-white/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 text-gray-700 font-bold hover:scale-110 transition-all"
      >
        ← Back to Hub
      </button>

      {/* The Interactive Photo Wall */}
      <div className="relative w-full h-[70vh] flex items-center justify-center">
        {myPhotos.map((photo, index) => (
          <Polaroid 
            key={photo.id} 
            photo={photo} 
            index={index} 
            theme={theme}
          />
        ))}
      </div>
    </motion.div>
  );
}

function Polaroid({ photo, index, theme }) {
  // Random rotation for that "messy table" look
  const randomRotation = Math.random() * 20 - 10; 
  const randomX = Math.random() * 100 - 50;
  const randomY = Math.random() * 100 - 50;

  return (
    <motion.div
      drag
      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
      initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: randomRotation,
        x: randomX,
        y: randomY
      }}
      whileHover={{ scale: 1.1, zIndex: 50 }}
      whileDrag={{ scale: 1.2, zIndex: 100 }}
      className={`absolute w-48 p-3 pb-8 cursor-grab active:cursor-grabbing shadow-2xl transition-shadow
        ${theme === 'kitty' ? 'bg-white' : 'bg-[#1a1a1a]'}
      `}
      style={{
        border: theme === 'kitty' ? '1px solid #ffeaf2' : '1px solid #333'
      }}
    >
      <div className="w-full h-48 overflow-hidden bg-gray-200 pointer-events-none">
        <img 
          src={photo.url} 
          alt="Janvi" 
          className="w-full h-full object-cover"
        />
      </div>
      <p className={`mt-4 text-center font-handwriting text-sm 
        ${theme === 'kitty' ? 'text-pink-600' : 'text-bp-pink'}
      `}>
        {photo.caption}
      </p>
      
      {/* Little tape effect */}
      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 opacity-40
        ${theme === 'kitty' ? 'bg-pink-200' : 'bg-pink-900'}
      `} />
    </motion.div>
  );
}