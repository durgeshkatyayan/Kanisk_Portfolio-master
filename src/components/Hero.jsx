import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { shaq, bwmap, worldmap } from '../assets';

/* ─────────────────────────────────────────────────────────
 *  TINY SVG ICONS
 * ───────────────────────────────────────────────────────── */
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.01 4.99C17.85 2.83 14.98 1.5 11.82 1.5 5.69 1.5.78 6.41.78 12.54c0 1.92.5 3.71 1.45 5.31L.5 23.5l5.86-1.54a10.67 10.67 0 005.06 1.29h.37c6.13 0 11.03-4.91 11.03-11.04 0-3.15-1.33-6.03-3.61-8.18z"/>
    <path d="M11.82 21.33h-.34a8.89 8.89 0 01-4.53-1.23l-.33-.2-3.47.91.9-3.28-.21-.34A8.88 8.88 0 012.57 12.54c0-4.86 3.96-8.82 9.25-8.82 2.47 0 4.77.95 6.5 2.67 1.73 1.72 2.68 4.02 2.67 6.47 0 4.86-3.95 8.81-9.17 8.81z" fill="white"/>
    <path d="M16.2 14.94c-.25-.13-.16-.08-2.6-1.21-.1-.04-.2-.08-.31-.08s-.21.04-.31.08l-.99 1.67c-.09.15-.22.18-.36.12-1.27-.59-2.26-1.53-3.21-2.77-.15-.18-.28-.35-.12-.46l1.09-.81c.14-.1.18-.24.12-.38l-.62-1.4c-.06-.14-.14-.19-.24-.19-.29 0-.72.04-.95.04-1.15 0-1.87.83-1.87 2.04 0 1.4 1.04 2.73 2.67 3.87 1.54 1.1 3.41 1.75 5.28 1.75.73 0 1.22-.07 1.6-.22.79-.35 1.28-.94 1.28-1.84 0-.11-.06-.18-.16-.23z" fill="white"/>
  </svg>
);
const ResumeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────
 *  POPUP CONFIG
 * ───────────────────────────────────────────────────────── */
const CONFIG = {
  whatsappNumber  : '919696010729',          
  resumePdfUrl    : 'https://drive.google.com/file/d/1lxKVcfSuIFSz9ONs-dW_AdxnZc826Bdq/view?usp=drive_link',  
  popupDelayMs    : 3000,                    
  defaultMessage  : "Hi, I'd like to discuss an opportunity with you.",
  yourName        : 'Durgesh Katyayan',
  yourTitle       : 'Full Stack & Android Developer',
  roles           : [
    'Full Stack Developer',
    'Android Developer',
    'Problem Solver',
    'UI/UX Enthusiast',
    'Tech Innovator'
  ],
};

/* ─────────────────────────────────────────────────────────
 *  TYPING ANIMATION HOOK
 * ───────────────────────────────────────────────────────── */
const useTypingEffect = (texts, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
};

/* ─────────────────────────────────────────────────────────
 *  FLOATING PARTICLES COMPONENT
 * ───────────────────────────────────────────────────────── */
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-french to-taupe"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
 *  POPUP COMPONENT
 * ───────────────────────────────────────────────────────── */
const Popup = ({ onClose }) => {
  const [showWA, setShowWA] = useState(false);
  const [msg, setMsg] = useState(CONFIG.defaultMessage);
  const [sent, setSent] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (showWA && inputRef.current) inputRef.current.focus();
  }, [showWA]);

  const fireWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=${encodeURIComponent(msg)}`,
      '_blank'
    );
    setSent(true);
    setTimeout(() => { setSent(false); setShowWA(false); }, 2200);
  };

  const viewResume = () => window.open(CONFIG.resumePdfUrl, '_blank');
  const downloadResume = () => {
    const a = document.createElement('a');
    a.href = CONFIG.resumePdfUrl;
    a.download = '../assets/Durgesh.pdf';
    a.click();
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 48, scale: 0.88 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } },
    exit: { opacity: 0, y: 36, scale: 0.9, transition: { duration: 0.3 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' } }),
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(10,10,10,0.40)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
        onClick={onClose}
      />

      <motion.div
        variants={cardVariants} initial="hidden" animate="visible" exit="exit"
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[999] w-[340px] max-w-[92vw]"
        style={{
          background: 'rgba(250,250,250,0.82)',
          backdropFilter: 'blur(18px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.3)',
          border: '1px solid rgba(255,255,255,0.7)',
          borderRadius: '22px',
          boxShadow: '0 20px 56px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.06)',
        }}>

        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center text-white font-mova font-bold text-lg"
              style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--french, #5b5ea6), var(--taupe, #b08968))',
                boxShadow: '0 3px 12px rgba(91,94,166,0.4)',
              }}>
              {CONFIG.yourName[0]}
            </div>
            <div>
              <p className="text-eerieBlack font-poppins font-semibold text-sm leading-tight">{CONFIG.yourName}</p>
              <p className="text-taupe font-poppins text-[11px] mt-0.5">{CONFIG.yourTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-eerieBlack hover:text-french transition-colors duration-200"
            style={{ background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: 10, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <CloseIcon />
          </button>
        </div>

        <div className="mx-5" style={{ height: 1, background: 'rgba(0,0,0,0.08)' }} />

        <div className="px-5 pt-4 pb-5">
          <motion.p custom={0} variants={childVariants} initial="hidden" animate="visible"
            className="text-eerieBlack font-poppins text-[13px] mb-4" style={{ opacity: 0.6 }}>
            👋 Let's <span className="text-french font-semibold">connect</span> or grab my resume!
          </motion.p>

          <motion.div custom={1} variants={childVariants} initial="hidden" animate="visible">
            <button
              onClick={() => setShowWA(s => !s)}
              className="w-full flex items-center gap-3 text-left transition-all duration-200"
              style={{
                background: 'rgba(37,211,102,0.07)', border: '1px solid rgba(37,211,102,0.22)',
                borderRadius: 15, padding: '12px 14px', cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.13)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.07)'; }}>
              <div className="flex items-center justify-center text-white flex-shrink-0"
                style={{ width: 40, height: 40, borderRadius: 11, background: 'linear-gradient(135deg,#25d366,#1faa52)', boxShadow: '0 3px 10px rgba(37,211,102,0.35)' }}>
                <WhatsAppIcon />
              </div>
              <div>
                <p className="text-eerieBlack font-poppins font-medium text-[13.5px]">Message on WhatsApp</p>
                <p className="text-taupe font-poppins text-[11px] mt-0.5">Send me a quick message</p>
              </div>
            </button>
          </motion.div>

          <AnimatePresence>
            {showWA && !sent && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: 'hidden', marginTop: 8 }}>
                <div style={{ background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.18)', borderRadius: 13, padding: 14 }}>
                  <p className="text-eerieBlack font-poppins text-[10.5px] uppercase tracking-widest mb-2" style={{ opacity: 0.5 }}>Your message</p>
                  <textarea
                    ref={inputRef}
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    placeholder="Type your message…"
                    className="w-full text-eerieBlack font-poppins text-[13px] resize-none outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: 9, padding: '9px 11px', minHeight: 58,
                    }}
                  />
                  <button
                    onClick={fireWhatsApp}
                    className="mt-2 w-full flex items-center justify-center gap-2 text-white font-poppins font-semibold text-[13px]"
                    style={{
                      background: 'linear-gradient(135deg,#25d366,#1faa52)', border: 'none',
                      borderRadius: 10, padding: '10px 0', cursor: 'pointer',
                      boxShadow: '0 3px 12px rgba(37,211,102,0.3)',
                    }}>
                    <SendIcon /> Open in WhatsApp
                  </button>
                </div>
              </motion.div>
            )}
            {sent && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center font-poppins text-[13px] font-medium mt-2" style={{ color: '#25d366' }}>
                ✅ Opening WhatsApp…
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div custom={2} variants={childVariants} initial="hidden" animate="visible" className="mt-2.5">
            <div
              className="flex items-center gap-3"
              style={{
                background: 'rgba(91,94,166,0.07)', border: '1px solid rgba(91,94,166,0.2)',
                borderRadius: 15, padding: '12px 14px',
              }}>
              <div className="flex items-center justify-center text-white flex-shrink-0"
                style={{ width: 40, height: 40, borderRadius: 11, background: 'linear-gradient(135deg, var(--french, #5b5ea6), var(--taupe, #b08968))', boxShadow: '0 3px 10px rgba(91,94,166,0.35)' }}>
                <ResumeIcon />
              </div>
              <div>
                <p className="text-eerieBlack font-poppins font-medium text-[13.5px]">My Resume</p>
                <p className="text-taupe font-poppins text-[11px] mt-0.5">View or download PDF</p>
              </div>
            </div>
          </motion.div>

          <motion.div custom={3} variants={childVariants} initial="hidden" animate="visible" className="flex gap-2 mt-2.5">
            <button
              onClick={viewResume}
              className="flex-1 flex items-center justify-center gap-1.5 text-eerieBlack font-poppins font-medium text-[12px] hover:text-french transition-colors duration-200"
              style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 10, padding: '9px 0', cursor: 'pointer' }}>
              <EyeIcon /> View
            </button>
            <button
              onClick={downloadResume}
              className="flex-1 flex items-center justify-center gap-1.5 text-eerieBlack font-poppins font-medium text-[12px] hover:text-french transition-colors duration-200"
              style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 10, padding: '9px 0', cursor: 'pointer' }}>
              <DownloadIcon /> Download
            </button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

/* ─────────────────────────────────────────────────────────
 *  REOPEN PILL
 * ───────────────────────────────────────────────────────── */
const ReopenPill = ({ onClick }) => (
  <motion.button
    initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    onClick={onClick}
    className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[999] flex items-center gap-2.5 text-eerieBlack font-poppins font-medium text-[13px] hover:text-french transition-colors duration-200"
    style={{
      background: 'rgba(250,250,250,0.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(255,255,255,0.7)', borderRadius: 16, padding: '10px 16px',
      boxShadow: '0 8px 28px rgba(0,0,0,0.14)', cursor: 'pointer',
    }}>
    <div className="flex items-center justify-center text-white flex-shrink-0"
      style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#25d366,#1faa52)' }}>
      <WhatsAppIcon />
    </div>
    <div className="text-left">
      <p className="font-semibold text-[12.5px] leading-tight">Get in Touch</p>
      <p className="text-taupe text-[10.5px] mt-0.5">Tap to reopen</p>
    </div>
  </motion.button>
);

/* ─────────────────────────────────────────────────────────
 *  HERO COMPONENT
 * ───────────────────────────────────────────────────────── */
const Hero = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const typingText = useTypingEffect(CONFIG.roles, 100, 50, 2000);

  useEffect(() => {
    const t = setTimeout(() => setPopupVisible(true), CONFIG.popupDelayMs);
    return () => clearTimeout(t);
  }, []);

  const closePopup = () => { setPopupVisible(false); setPopupDismissed(true); };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.2, 0, 0.1, 1] },
  });

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Background Maps */}
      <div className="absolute top-0 left-0 z-0 h-full w-full">
        <img src={bwmap} alt="world map" className="w-full h-full hidden sm:block object-cover opacity-40" />
        <img src={worldmap} alt="world map" className="w-full h-full sm:hidden block object-cover opacity-40" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-transparent via-transparent to-french/10" />

      <section className="relative z-10 flex flex-col lg:flex-row w-full h-full mx-auto overflow-hidden">

        {/* Left Content */}
        <div className={`relative flex-1 flex flex-col justify-center ${styles.paddingX} max-w-7xl mx-auto pt-20 sm:pt-24 lg:pt-0`}>

          {/* Decorative Line (Mobile) */}
          <div className="flex flex-col justify-center items-center mt-5 sm:hidden absolute left-4 top-32">
            <motion.div {...fadeUp(0.1)} className="w-4 h-4 rounded-full bg-french shadow-lg" />
            <motion.div {...fadeUp(0.2)} className="w-1 h-24 bg-gradient-to-b from-french to-taupe mt-2" />
          </div>

          {/* Main Content */}
          <div className="max-w-3xl ml-0 sm:ml-0">
            
            {/* Greeting */}
            <motion.div {...fadeUp(0)} className="mb-4">
              <p className="text-taupe font-poppins text-base sm:text-lg font-medium tracking-wider uppercase">
                Welcome to my portfolio
              </p>
            </motion.div>

            {/* Name */}
            <motion.h1 {...fadeUp(0.1)} className={`${styles.heroHeadText} mb-4`}>
              Hi, I'm{' '}
              <span className="block sm:inline bg-gradient-to-r from-french via-battleGray to-taupe bg-clip-text text-transparent font-extrabold">
                {CONFIG.yourName}
              </span>
            </motion.h1>

            {/* Typing Animation Role */}
            <motion.div {...fadeUp(0.2)} className="mb-6">
              <p className="text-eerieBlack font-poppins text-xl sm:text-2xl md:text-3xl font-bold">
                <span className="text-french">{'<'}</span>
                <span className="inline-block min-w-[300px] sm:min-w-[400px]">{typingText}</span>
                <span className="text-french animate-pulse">|</span>
                <span className="text-french">{'/>'}</span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p {...fadeUp(0.3)} className={`${styles.heroSubText} max-w-2xl`}>
              Full Stack and Android Developer, problem-solver — building efficient, 
              user-friendly applications with innovative solutions.
            </motion.p>

            {/* WakaTime Badge */}
            <motion.div {...fadeUp(0.4)} className="mt-6 flex flex-wrap gap-4 items-center">
              <a 
                href="https://wakatime.com/@6a35f861-13f5-4e6b-ab4a-96a684032fce" 
                target="_blank" 
                rel="noreferrer"
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src="https://wakatime.com/badge/user/6a35f861-13f5-4e6b-ab4a-96a684032fce.svg"
                  alt="Total time coded"
                  className="h-6 sm:h-7 shadow-lg rounded-md"
                />
              </a>
              
              {/* Quick CTA Buttons */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-2.5 bg-gradient-to-r from-french to-taupe text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Work
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div {...fadeUp(0.5)} className="mt-8 flex gap-4">
              <a 
                href="https://github.com/durgeshkatyayan" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-eerieBlack/10 hover:bg-french/20 flex items-center justify-center transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-eerieBlack group-hover:text-french transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/durgesh-katyayan-653a572b1/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-eerieBlack/10 hover:bg-french/20 flex items-center justify-center transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-eerieBlack group-hover:text-french transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Image with Animations */}
        <div className="relative flex-1 flex items-end justify-center lg:justify-end">
          
          {/* Animated Rings Behind Image */}
          <div className="absolute bottom-0 right-0 lg:right-20 pointer-events-none">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 rounded-full border-4 border-french/20"
            />
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.15, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 right-20 w-72 h-72 sm:w-[28rem] sm:h-[28rem] rounded-full border-4 border-taupe/20"
            />
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Uncomment when image is ready */}
            <img
              src={shaq}
              alt="Durgesh Katyayan"
              className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] object-contain filter drop-shadow-2xl"
            />
            
            {/* Placeholder for image */}
            <div className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] w-64 sm:w-80 md:w-96 bg-gradient-to-br from-french/20 to-taupe/20 rounded-t-full backdrop-blur-sm border-4 border-white/30 shadow-2xl flex items-center justify-center">
              <p className="text-eerieBlack/40 font-poppins text-center px-4">
                Your Image Here
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <a href="#about">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="w-[32px] h-[56px] rounded-3xl border-4 border-french flex justify-center items-start p-2 cursor-pointer hover:border-taupe transition-colors duration-300"
            >
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                className="w-2.5 h-2.5 rounded-full bg-french"
              />
            </motion.div>
          </a>
        </div>

      </section>

      {/* Popup & Reopen Button */}
      <AnimatePresence>
        {popupVisible && <Popup onClose={closePopup} />}
      </AnimatePresence>
      <AnimatePresence>
        {popupDismissed && !popupVisible && (
          <ReopenPill onClick={() => { setPopupVisible(true); setPopupDismissed(false); }} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;