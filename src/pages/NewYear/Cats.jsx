import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimationFrame, AnimatePresence } from 'framer-motion';

// --- ASSET IMPORTS ---
import defaultCat from '../../Elements/PNGs/Node_cat.png';
import hkPink from '../../Elements/PNGs/hellokittymain.png';
import hkRed from '../../Elements/PNGs/hello_kitty_withStrawberry.png';
import hkBlack from '../../Elements/PNGs/blackkitty_main.webp';
import roseImg from '../../Elements/PNGs/rose.png';
import lisaImg from '../../Elements/PNGs/lisa_fingure.png';
import jisooImg from '../../Elements/PNGs/jisso.png';
import jennieImg from '../../Elements/PNGs/Jennie.png';
import bpLogo from "../../Elements/PNGs/blackpink_logo.png";
import itemHeart from '../../Elements/PNGs/blackkitty_heart.png';
import itemDrawing from '../../Elements/PNGs/Drawing.png';

const MISSIONS = [
  { id: 'cat', name: "CAT", img: defaultCat, req: "DEFAULT", s: 0, c: 0 },
  { id: 'hkp', name: "HK PINK", img: hkPink, req: "SCORE 30", s: 30, c: 0 },
  { id: 'rose', name: "ROSÉ", img: roseImg, req: "COMBO 50", s: 0, c: 50 },
  { id: 'lisa', name: "LISA", img: lisaImg, req: "COMBO 100", s: 0, c: 100 },
  { id: 'hkr', name: "HK RED", img: hkRed, req: "SCORE 500", s: 500, c: 0 },
  { id: 'jisoo', name: "JISOO", img: jisooImg, req: "COMBO 500", s: 0, c: 500 },
  { id: 'hkb', name: "HK BLACK", img: hkBlack, req: "SCORE 1000", s: 1000, c: 0 },
  { id: 'jennie', name: "JENNIE", img: jennieImg, req: "COMBO 1000", s: 0, c: 1000 },
];

// --- 1. FANCY BUBBLE MILESTONE ---
const BubbleMilestone = ({ text }) => (
  <div className="absolute inset-0 flex items-center justify-center z-[100] pointer-events-none p-6">
    <motion.div initial={{ scale: 0 }} animate={{ scale: 6, opacity: 0 }} transition={{ duration: 0.4 }} className="absolute w-10 h-10 border-[10px] border-white rounded-full" />
    <motion.div
      initial={{ scale: 0, rotate: -20, y: 100 }}
      animate={{ scale: [0, 1.2, 1], rotate: [0, 5, 0], y: 0 }}
      exit={{ scale: 2, opacity: 0 }}
      className="bg-white border-[8px] border-black rounded-[4rem] px-10 py-6 shadow-[15px_15px_0px_0px_#ff006e] border-double"
    >
      <p className="text-[#ff006e] font-black italic uppercase text-3xl md:text-5xl tracking-tighter text-center leading-none drop-shadow-[3px_3px_0px_#000]">
        {text}
      </p>
    </motion.div>
  </div>
);

// --- 2. COMPRESSED PUNCH STICKER ---
const ComboSticker = ({ text, styles }) => (
  <motion.div
    initial={{ x: -100, opacity: 0, scale: 0.5 }}
    animate={{ x: 0, opacity: 1, scale: 1 }}
    exit={{ x: 100, opacity: 0 }}
    transition={{ duration: 0.12, ease: "backOut" }}
    className="absolute inset-0 flex items-center justify-center z-[80] pointer-events-none"
  >
    <div className={`border-[6px] border-black px-6 py-2 shadow-[8px_8px_0px_0px_#000] -rotate-3`}
         style={{ backgroundColor: styles.bg, color: styles.text }}>
      <p className="font-black italic uppercase text-2xl md:text-3xl tracking-tighter">{text}</p>
    </div>
  </motion.div>
);

export default function Cats({ setPage }) {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [items, setItems] = useState([]);
  const [basketX, setBasketX] = useState(50);
  const [speech, setSpeech] = useState("");
  const [sticker, setSticker] = useState({ text: "", styles: {}, id: 0 });
  const [bomb, setBomb] = useState("");
  const [watermark, setWatermark] = useState("");
  const [activeChar, setActiveChar] = useState(MISSIONS[0]);
  const [bgClass, setBgClass] = useState("bg-[#ffeaf2]");
  const [motivationalLine, setMotivationalLine] = useState("READY JAANU? 🎀");
  const [showMissions, setShowMissions] = useState(false);

  const basketRef = useRef(50);
  const itemsRef = useRef([]);
  const gameAreaRef = useRef(null);
  const lastSpawnTime = useRef(0);
  const milestoneLock = useRef(0); // CRITICAL: Fixes the 50-score freeze
  const unlockedRef = useRef([]);

  const cuteQuotes = [
    "Jaanu, Moti number one! 💗", "Moti is a Pro Player! 🎮", "Jisoo vibes only! 👑",
    "Moto is fast like Rosé! 🚀", "I love you Janvi! 🎀", "Janvi is a Legend! 🎆",
    "Go Moti Go! 📣", "My Moto is the best! 💖", "Perfect Catch, Jaan! 🎸"
  ];

  const getComboStyles = (c) => {
    const mod = c % 100;
    if (mod >= 1 && mod <= 10) return { bg: "#ffb7d5", text: "#ff006e" };
    if (mod >= 11 && mod <= 30) return { bg: "#fff3b0", text: "#000000" };
    if (mod >= 31 && mod <= 50) return { bg: "#ff4d4d", text: "#ffffff" };
    if (mod >= 51 && mod <= 99) return { bg: "#87ceeb", text: "#ffffff" };
    const hue = (Math.floor(c / 100) * 137.5) % 360;
    return { bg: `hsl(${hue}, 80%, 60%)`, text: "#ffffff" };
  };

  useEffect(() => {
    if (score < 20) setBgClass("bg-[#ffeaf2]");
    else if (score < 50) setBgClass("bg-[#e0f2ff]");
    else if (score < 100) setBgClass("bg-[#f3e8ff]");
    else setBgClass("bg-[#0a0a0a]");

    let nextChar = MISSIONS[0];
    MISSIONS.forEach(m => { if (score >= m.s && combo >= m.c) nextChar = m; });
    if (nextChar.id !== activeChar.id) {
      setActiveChar(nextChar);
      if (nextChar.req.includes("COMBO") && !unlockedRef.current.includes(nextChar.id)) {
        unlockedRef.current.push(nextChar.id);
        setLives(5);
        setSpeech(`${nextChar.name} UNLOCKED! ❤️`);
      }
    }
    if (score > 0 && score % 10 === 0) {
      setMotivationalLine(cuteQuotes[Math.floor(Math.random() * cuteQuotes.length)]);
    }
  }, [score, combo]);

  const handleMove = (e) => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = (((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) / rect.width) * 100;
    basketRef.current = Math.max(10, Math.min(90, x));
    setBasketX(basketRef.current);
  };

  useAnimationFrame((time) => {
    if (!gameStarted || gameOver) return;

    // Item Spawner
    const spawnRate = Math.max(260, 800 - (score * 4.5));
    if (time - lastSpawnTime.current > spawnRate) {
      itemsRef.current.push({ 
        id: Math.random(), 
        x: Math.random() * 80 + 10, 
        y: -10, 
        img: Math.random() > 0.94 ? itemHeart : itemDrawing, 
        type: Math.random() > 0.94 ? 'life' : 'point', 
        speed: 0.75 + (score * 0.015) 
      });
      lastSpawnTime.current = time;
    }

    // Physics Engine
    itemsRef.current = itemsRef.current.filter((item) => {
      item.y += item.speed;
      const hitX = Math.abs(item.x - basketRef.current) < 12;
      const hitY = item.y > 83 && item.y < 88;

      if (hitX && hitY) {
        if (item.type === 'life') {
          setLives(l => Math.min(5, l + 1));
          setSpeech("THX JAANU! ❤️");
        } else {
          const nc = combo + 1;
          setCombo(nc);
          setScore(s => s + 1);

          // MILESTONE TRIGGER (No-Freeze Logic)
          if (nc % 50 === 0 && milestoneLock.current !== nc) {
            milestoneLock.current = nc;
            setBomb(`COOL 😎 ${nc} STREAK DONE!`);
            setWatermark(`${nc} STREAK`);
            setTimeout(() => setBomb(""), 2500);
          } 
          // COMBO STICKER TRIGGER
          else if ([1, 2, 3, 10, 30].includes(nc % 100) || nc % 10 === 0) {
            setSticker({ text: `${nc}X PERFECT!`, styles: getComboStyles(nc), id: Math.random() });
            setTimeout(() => setSticker({ text: "", styles: {}, id: 0 }), 800);
          }
        }
        return false;
      }
      if (item.y > 102) {
        if (item.type === 'point') {
          setCombo(0);
          setLives(l => { if (l <= 1) setGameOver(true); return l - 1; });
        }
        return false;
      }
      return true;
    });
    setItems([...itemsRef.current]);
  });

  return (
    <motion.div className={`min-h-screen w-full flex flex-col lg:flex-row items-center justify-center select-none touch-none ${bgClass} transition-colors duration-1000 p-2 overflow-hidden`}>
      <div className="flex flex-col items-center w-full max-w-md">
        
        {/* HUD */}
        <div className="w-full flex justify-between items-center mb-3 px-2 z-20">
          <div className="flex gap-1">{[...Array(5)].map((_, i) => (<span key={i} className={`text-xl transition-all ${i < lives ? "scale-110" : "opacity-20 grayscale"}`}>❤️</span>))}</div>
          <div className="text-right leading-none text-black">
            <h2 className="text-3xl font-black italic">SCORE: {score}</h2>
            <p className="bg-black text-white px-2 text-[10px] font-black uppercase tracking-widest mt-1">STREAK: {combo}</p>
          </div>
        </div>

        {/* GAME SCREEN */}
        <div ref={gameAreaRef} onPointerMove={handleMove} onTouchMove={handleMove} className="relative w-full h-[65vh] bg-white/40 backdrop-blur-lg border-[8px] border-black rounded-[50px] overflow-hidden shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
          
          <AnimatePresence>
            {watermark && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <h1 className="text-7xl md:text-9xl font-black text-black italic -rotate-12 uppercase">{watermark}</h1>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>{bomb && <BubbleMilestone key="bomb" text={bomb} />}</AnimatePresence>
          <AnimatePresence>{sticker.text && <ComboSticker key={sticker.id} text={sticker.text} styles={sticker.styles} />}</AnimatePresence>

          {/* MOTIVATION BUBBLE */}
          <div className="absolute top-[18%] w-full flex justify-center z-10 pointer-events-none px-4">
            <motion.div key={motivationalLine} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="bg-white/95 border-[3px] border-pink-400 px-6 py-2 rounded-full shadow-[0_10px_25px_rgba(255,105,180,0.3)]"
            >
              <p className="text-[#ff006e] font-black italic text-sm md:text-lg uppercase tracking-widest text-center">{motivationalLine}</p>
            </motion.div>
          </div>

          {items.map(item => (<div key={item.id} className="absolute z-20" style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translate(-50%, -50%)' }}><img src={item.img} className="w-10 h-10 object-contain" /></div>))}
          
          <div className="absolute bottom-6 flex flex-col items-center z-30" style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}>
            <AnimatePresence>{speech && (<motion.div initial={{ scale: 0 }} animate={{ scale: 1.1, y: -20 }} exit={{ scale: 0 }} onAnimationComplete={() => setTimeout(() => setSpeech(""), 1500)} className="bg-white border-[3px] border-black px-3 py-1 rounded-xl whitespace-nowrap shadow-[4px_4px_0px_0px_#000] z-50 text-black font-black text-[10px] uppercase italic">{speech}<div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-[3px] border-r-[3px] border-black rotate-45"></div></motion.div>)}</AnimatePresence>
            <img src={activeChar.img} className="w-24 h-24 object-contain drop-shadow-xl" />
          </div>

          {(!gameStarted || gameOver) && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#ff006e] p-10 text-center">
                <img src={bpLogo} className="w-40 mb-6 drop-shadow-xl" alt="BP" />
                <h1 className="text-5xl font-black text-white italic -rotate-6 mb-8 drop-shadow-[5px_5px_0px_#000]">JANNU'S ARCADE 🕹️</h1>
                <button onClick={() => {setGameOver(false); setGameStarted(true); setScore(0); setCombo(0); setLives(5); itemsRef.current=[]; unlockedRef.current=[]; setWatermark(""); milestoneLock.current=0;}} className="bg-white text-black text-2xl font-black px-12 py-5 border-4 border-black shadow-[10px_10px_0px_0px_#000]">PLAY 🎀</button>
            </div>
          )}
        </div>
        <button onClick={() => setPage('hub')} className="mt-6 font-black underline decoration-4 underline-offset-4 text-xs tracking-widest uppercase">BACK TO HUB</button>
      </div>

      {/* MISSION BOARD */}
      <AnimatePresence>
        {(showMissions || window.innerWidth > 1024) && (
          <motion.div initial={window.innerWidth < 1024 ? { y: 100, opacity: 0 } : {}} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            className={`${showMissions ? 'fixed inset-x-4 bottom-10 z-[110]' : 'hidden lg:flex flex-col ml-12'} p-6 bg-white border-[8px] border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] max-w-[240px]`}
          >
            <div className="flex justify-between items-center mb-4 text-black uppercase font-black text-xs italic">MISSIONS 🎯 {showMissions && <button onClick={() => setShowMissions(false)} className="text-red-500 ml-4 px-2">X</button>}</div>
            <div className="space-y-3 overflow-y-auto max-h-[45vh] pr-2">
              {MISSIONS.map((m) => {
                const u = score >= m.s && combo >= m.c;
                return (
                  <div key={m.id} className={`flex items-center gap-3 p-2 border-[3px] transition-all ${u ? 'border-green-500 bg-green-50' : 'border-black opacity-30 grayscale'}`}>
                    <img src={m.img} className="w-10 h-10 object-contain" />
                    <div className="leading-tight text-black"><p className="text-[10px] font-black uppercase">{m.name}</p><p className="text-[8px] font-bold">{u ? "OK ✅" : m.req}</p></div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setShowMissions(true)} className="lg:hidden mt-4 bg-black text-white px-5 py-2 rounded-full font-black text-[10px] tracking-widest uppercase shadow-lg">MISSIONS 🎯</button>
      {showMissions && <div className="fixed inset-0 bg-black/50 z-[105]" onClick={() => setShowMissions(false)} />}
    </motion.div>
  );
}