import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainEntry from './pages/MainEntry';
import NewYearPage from './pages/NewYear/NewYearPage';
import RoseDayMain from './pages/RoseDay/RoseDayMain';

// Placeholder for Rose Day - We will build this next!
const RoseDay = () => (
  <div className="min-h-screen bg-red-100 flex items-center justify-center">
    <h1 className="text-4xl font-black text-red-600 italic animate-pulse uppercase">
      🌹 Rose Day Project Loading... 🌹
    </h1>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main Entry (Calendar) */}
        <Route path="/" element={<MainEntry />} />

        {/* Existing Projects */}
        <Route path="/new-year" element={<NewYearPage />} />
        
        {/* New Projects */}
        <Route path="/rose-day" element={<RoseDayMain />} />
      </Routes>

      {/* Global Footer */}
      <footer className="fixed bottom-4 left-0 w-full text-center z-[500] pointer-events-none opacity-40">
        <p className="text-[8px] md:text-[10px] font-black text-pink-600 uppercase tracking-[0.5em]">
          © 2026 BY GENOFOGU | ALL RIGHTS RESERVED
        </p>
      </footer>
    </Router>
  );
}