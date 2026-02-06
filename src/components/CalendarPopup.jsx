import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';

const SPECIAL_DAYS = [
  { date: new Date(2026, 0, 1), path: '/new-year', icon: '🎆', title: 'New Year' },
  { date: new Date(2026, 1, 7), path: '/rose-day', icon: '🌹', title: 'Rose Day' },
];

export default function CalendarPopup({ onClose }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));
  const navigate = useNavigate();

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      {/* Background Dimmer */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
      />

      {/* The Diary Card */}
      <motion.div 
        initial={{ scale: 0.7, y: 100, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.7, y: 100, opacity: 0 }}
        className="relative w-full max-w-4xl bg-white border-[8px] border-black rounded-[3rem] shadow-[20px_20px_0px_0px_#ff006e] overflow-hidden flex flex-col z-20"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="bg-black text-white p-4 md:p-6 flex justify-between items-center">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="w-10 h-10 bg-white/20 rounded-full hover:bg-white/40">◀</button>
            <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter">
                {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="w-10 h-10 bg-white/20 rounded-full hover:bg-white/40">▶</button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 bg-pink-100 border-b-4 border-black text-[10px] font-black uppercase text-center py-2">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d}>{d}</div>)}
        </div>

        {/* Days Grid - Scrollable if needed */}
        <div className="grid grid-cols-7 flex-1 overflow-y-auto min-h-[300px] md:min-h-[450px]">
          {/* Empty days */}
          {[...Array(startOfMonth(currentMonth).getDay())].map((_, i) => (
            <div key={`empty-${i}`} className="border-b border-r border-gray-100 bg-gray-50/10"></div>
          ))}

          {daysInMonth.map(day => {
            const project = SPECIAL_DAYS.find(s => isSameDay(s.date, day));
            return (
              <motion.div 
                key={day.toString()}
                onClick={() => project && navigate(project.path)}
                className={`h-20 md:h-32 border-b border-r border-pink-100 relative group
                  ${project ? 'bg-pink-100/50 cursor-pointer hover:bg-pink-200' : 'bg-white'}
                `}
              >
                <span className={`absolute top-1 left-2 text-[10px] md:text-sm font-black ${project ? 'text-[#ff006e]' : 'text-gray-200'}`}>
                  {format(day, 'd')}
                </span>

                {project && (
                  <div className="flex flex-col items-center justify-center h-full pt-2">
                    <span className="text-3xl md:text-5xl drop-shadow-md animate-bounce">{project.icon}</span>
                    <p className="hidden md:block text-[8px] font-black uppercase mt-1 text-[#ff006e]">{project.title}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Button */}
        <button 
          onClick={onClose}
          className="w-full bg-[#ff006e] py-4 text-white font-black uppercase tracking-widest text-sm hover:bg-black transition-colors"
        >
          Close Memory Diary 🎀
        </button>
      </motion.div>
    </div>
  );
}