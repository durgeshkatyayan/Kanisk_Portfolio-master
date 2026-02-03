import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { shaq, bwmap, worldmap } from '../assets';

/* ─────────────────────────────────────────────────────────
 *  TINY SVG ICONS  (no extra package needed)
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
 *  POPUP CONFIG  — edit these values
 * ───────────────────────────────────────────────────────── */
const CONFIG = {
  whatsappNumber  : '919696010729',          
  resumePdfUrl    : 'https://drive.google.com/file/d/1lxKVcfSuIFSz9ONs-dW_AdxnZc826Bdq/view?usp=drive_link',  
  popupDelayMs    : 3000,                    
  defaultMessage  : "Hi, I'd like to discuss an opportunity with you.",
  yourName        : 'Durgesh Katyayan',
  yourTitle       : 'Full Stack & Android Developer',
};

/* ─────────────────────────────────────────────────────────
 *  POPUP  (glassmorphism card styled with your project colours)
 * ───────────────────────────────────────────────────────── */
const Popup = ({ onClose }) => {
  const [showWA, setShowWA]   = useState(false);
  const [msg,   setMsg]       = useState(CONFIG.defaultMessage);
  const [sent,  setSent]      = useState(false);
  const inputRef              = useRef(null);

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

  const viewResume     = () => window.open(CONFIG.resumePdfUrl, '_blank');
  const downloadResume = () => {
    const a       = document.createElement('a');
    a.href        = CONFIG.resumePdfUrl;
    a.download    = '../assets/Durgesh.pdf';
    a.click();
  };

  /* card enters from bottom-right with a spring */
  const cardVariants = {
    hidden : { opacity: 0, y: 48, scale: 0.88 },
    visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } },
    exit   : { opacity: 0, y: 36, scale: 0.9,  transition: { duration: 0.3  } },
  };

  /* stagger children */
  const childVariants = {
    hidden : { opacity: 0, y: 14 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' } }),
  };

  return (
    <>
      {/* ── backdrop ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[998]"
        style={{ background: 'rgba(10,10,10,0.40)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
        onClick={onClose}
      />

      {/* ── card ── */}
      <motion.div
        variants={cardVariants} initial="hidden" animate="visible" exit="exit"
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[999] w-[340px] max-w-[92vw]"
        style={{
          background      : 'rgba(250,250,250,0.82)',
          backdropFilter  : 'blur(18px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.3)',
          border          : '1px solid rgba(255,255,255,0.7)',
          borderRadius    : '22px',
          boxShadow       : '0 20px 56px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.06)',
        }}>

        {/* header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-3">
            {/* avatar circle — uses french + taupe gradient */}
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

        {/* thin divider */}
        <div className="mx-5" style={{ height: 1, background: 'rgba(0,0,0,0.08)' }} />

        {/* body */}
        <div className="px-5 pt-4 pb-5">
          <motion.p custom={0} variants={childVariants} initial="hidden" animate="visible"
            className="text-eerieBlack font-poppins text-[13px] mb-4" style={{ opacity: 0.6 }}>
            👋 Let's <span className="text-french font-semibold">connect</span> or grab my resume!
          </motion.p>

          {/* ── WhatsApp row ── */}
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

          {/* expandable message box */}
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

          {/* ── Resume row ── */}
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

          {/* View / Download pills */}
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
 *  MINI REOPEN PILL  (bottom-right, after popup is closed)
 * ───────────────────────────────────────────────────────── */
const ReopenPill = ({ onClick }) => (
  <motion.button
    initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    onClick={onClick}
    className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[999] flex items-center gap-2.5 text-eerieBlack font-poppins font-medium text-[13px] hover:text-french transition-colors duration-200"
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
 *  HERO  (original layout — cleaned up + responsive tweaks
 *         + popup wired in)
 * ───────────────────────────────────────────────────────── */
const Hero = () => {
  /* popup state */
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPopupVisible(true), CONFIG.popupDelayMs);
    return () => clearTimeout(t);
  }, []);

  const closePopup = () => { setPopupVisible(false); setPopupDismissed(true); };

  const fadeUp = (delay = 0) => ({
    initial  : { opacity: 0, y: 28 },
    animate  : { opacity: 1, y: 0  },
    transition: { duration: 0.1, delay, ease: [0.2, 0, 0.1, 1] },
  });

  return (
    <div className="relative">
 
      <div className="absolute top-0 left-0 z-0 h-[100vh] w-screen">
        <img src={bwmap} alt="world map" className="w-full h-full sm:block hidden object-cover" />
      </div>
      <div className="absolute top-0 left-0 z-0 h-[100vh] w-screen">
        <img src={worldmap} alt="world map" className="w-full h-full sm:hidden block object-cover" />
      </div>

      <section className="relative flex sm:flex-row flex-col w-full h-screen mx-auto sm:bg-hero bg-hero-mobile overflow-hidden">

        <div className={`absolute inset-0 sm:top-[250px] top-[140px] lg:top-[150px] xl:top-[250px] ${styles.paddingX} max-w-7xl mx-auto flex flex-row items-start justify-between gap-3`}>

          <div className="flex flex-col justify-center items-center mt-5 ml-1 sm:ml-3">
            <motion.div {...fadeUp(0.1)} className="w-4 h-4 rounded-full bg-[#0a0a0a] sm:hidden" />
            <motion.div {...fadeUp(0.2)} className="w-1 sm:h-80 h-36 bw-gradient sm:hidden" />
          </div>

          <div className="flex-1 max-w-2xl">
            <motion.h1 {...fadeUp(0)} className={`${styles.heroHeadText} text-eerieBlack font-poppins uppercase`}>
              Hi, I'm{' '}
              <span className="sm:text-battleGray sm:text-[90px] text-eerieBlack text-[48px] font-mova font-extrabold uppercase">
                {CONFIG.yourName}
              </span>
            </motion.h1>

            <motion.p {...fadeUp(0.12)} className={`${styles.heroSubText} mt-2 text-eerieBlack mb-2`}>
              Full Stack and Android Developer, problem-solver — building efficient{' '}
              <span className="sm:inline hidden">user-friendly applications with innovative solutions.</span>
            </motion.p>

            <motion.p {...fadeUp(0.18)} className="sm:hidden text-eerieBlack font-poppins text-[14px] leading-relaxed -mt-1">
              user-friendly applications with innovative solutions.
            </motion.p>

            <motion.p {...fadeUp(0.24)} className="mt-3">
              <a href="https://wakatime.com/@6a35f861-13f5-4e6b-ab4a-96a684032fce" target="_blank" rel="noreferrer">
                <img
                  src="https://wakatime.com/badge/user/6a35f861-13f5-4e6b-ab4a-96a684032fce.svg"
                  alt="Total time coded since Aug 28 2024"
                  className="h-[20px] sm:h-[24px]"
                />
              </a>
            </motion.p>
          </div>
          <div className="hidden sm:block w-screen" />
          <div />
        </div>

        <div className="absolute xs:bottom-10 bottom-28 w-full flex justify-center items-center z-10">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-french border-dim flex justify-center items-start p-2">
              <motion.div
                animate={{ y: [0, 24, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                className="w-3 h-3 rounded-full bg-taupe"
              />
            </div>
          </a>
        </div>

        {/* ── hero image (uncomment src when ready) ── */}
        <div>
          <img
            className="absolute bottom-0 ml-[50vw] lg:ml-[75vw] md:ml-[60vw] xmd:ml-[60vw] 2xl:ml-[83vw] sm:h-[90vh] md:h-[70vh] xl:h-[80vh]"
            // src={shaq}
            alt="Durgesh Katyayan"
          />
        </div>
      </section>

      {/* ─── POPUP / REOPEN PILL ─── */}
      <AnimatePresence>
        {popupVisible && <Popup onClose={closePopup} />}
      </AnimatePresence>
      <AnimatePresence>
        {popupDismissed && !popupVisible && <ReopenPill onClick={() => { setPopupVisible(true); setPopupDismissed(false); }} />}
      </AnimatePresence>
    </div>
  );
};

export default Hero;