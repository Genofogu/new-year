import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// --- UPDATED IMPORTS (Because they are in the same folder now) ---
import Hub from './Hub';
import Cats from './Cats';
import GreetingHK from './GreetingHK';
import GreetingBP from './GreetingBP';
import PhotosHK from './PhotosHK';
import PhotosBP from './PhotosBP';
import SurpriseHK from './SurpriseHK';
import SurpriseBP from './SurpriseBP';

export default function NewYearPage() {
  const [theme, setTheme] = useState('kitty');
  const [currentPage, setCurrentPage] = useState('hub');

  const toggleTheme = () => setTheme(prev => prev === 'kitty' ? 'blackpink' : 'kitty');

  return (
    <div className={`min-h-screen transition-all duration-1000 ${theme === 'kitty' ? 'bg-[#ffeaf2]' : 'bg-black'}`}>
      
      {/* Theme Switcher */}
      <button onClick={toggleTheme} className="fixed top-6 right-6 z-[200] p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 font-black text-[10px] uppercase text-pink-500 shadow-xl">
        {theme === 'kitty' ? '🖤 BP MODE' : '🎀 HK MODE'}
      </button>

      <AnimatePresence mode="wait">
        {currentPage === 'hub' && <Hub key="hub" setPage={setCurrentPage} theme={theme} />}

        {currentPage === 'greeting' && (
          theme === 'kitty' ? <GreetingHK setPage={setCurrentPage} /> : <GreetingBP setPage={setCurrentPage} />
        )}

        {currentPage === 'photos' && (
          theme === 'kitty' ? <PhotosHK setPage={setCurrentPage} /> : <PhotosBP setPage={setCurrentPage} />
        )}

        {currentPage === 'penguin' && (
          theme === 'kitty' ? <SurpriseHK setPage={setCurrentPage} /> : <SurpriseBP setPage={setCurrentPage} />
        )}

        {currentPage === 'cats' && <Cats setPage={setCurrentPage} theme={theme} />}
      </AnimatePresence>

      <footer className="fixed bottom-4 left-0 w-full text-center z-[250] pointer-events-none opacity-40">
        <p className={`text-[8px] font-bold tracking-[0.5em] uppercase ${theme === 'kitty' ? 'text-[#ff006e]' : 'text-white'}`}>
          © 2026 BY GENOFOGU | ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}