import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hub from './components/Hub';
import Cats from './components/Cats';

// Import HK Versions
import GreetingHK from './components/GreetingHK';
import PhotosHK from './components/PhotosHK';
import SurpriseHK from './components/SurpriseHK';

// Import BP Versions
import GreetingBP from './components/GreetingBP';
import PhotosBP from './components/PhotosBP';
import SurpriseBP from './components/SurpriseBP';

export default function App() {
  const [theme, setTheme] = useState('kitty');
  const [currentPage, setCurrentPage] = useState('hub');

  const toggleTheme = () => setTheme(prev => prev === 'kitty' ? 'blackpink' : 'kitty');

  return (
    <div className={`min-h-screen transition-all duration-1000 ${theme === 'kitty' ? 'bg-[#ffeaf2]' : 'bg-black'}`}>

      {/* Theme Switcher */}
      <button onClick={toggleTheme} className="fixed top-6 right-6 z-[200] p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 font-black text-[10px] uppercase tracking-widest text-pink-500 shadow-xl">
        {theme === 'kitty' ? '🖤 Switch to BP' : '🎀 Switch to HK'}
      </button>

      <AnimatePresence mode="wait">
        {currentPage === 'hub' && <Hub key="hub" setPage={setCurrentPage} theme={theme} />}

        {/* LOGIC: Load different files based on theme */}

        {/* 1. Letter Page */}
        {currentPage === 'greeting' && (
          theme === 'kitty'
            ? <GreetingHK key="ghk" setPage={setCurrentPage} />
            : <GreetingBP key="gbp" setPage={setCurrentPage} />
        )}

        {/* 2. Camera Page */}
        {currentPage === 'photos' && (
          theme === 'kitty'
            ? <PhotosHK key="phk" setPage={setCurrentPage} />
            : <PhotosBP key="pbp" setPage={setCurrentPage} />
        )}

        {/* 3. Surprise Page */}
        {currentPage === 'penguin' && (
          theme === 'kitty'
            ? <SurpriseHK key="shk" setPage={setCurrentPage} />
            : <SurpriseBP key="sbp" setPage={setCurrentPage} />
        )}

        {/* 4. Shared Arcade Game */}
        {currentPage === 'cats' && <Cats key="cats" setPage={setCurrentPage} theme={theme} />}

      </AnimatePresence>
      <footer className="fixed bottom-4 left-0 w-full flex flex-col items-center justify-center z-[250] pointer-events-none px-6">



        {/* Your Signature Tag */}
        <p className={`mt-1 text-[8px] font-bold tracking-[0.5em] uppercase opacity-40
    ${theme === 'kitty' ? 'text-[#ff006e]' : 'text-white'}`}
        >
          © COPYRIGHT 2026 BY GENOFOGU |  ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}