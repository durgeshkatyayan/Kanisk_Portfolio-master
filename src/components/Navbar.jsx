import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { close, menu, logo, logotext } from '../assets';

/*
 * ─── INJECT ONCE ────────────────────────────────────────
 * Enhanced styles with battery indicator and improved responsiveness
 * ─────────────────────────────────────────────────────────
 */
const NAVBAR_STYLES = `
  /* ── Glassmorphism navbar base ── */
  .navbar-glass {
    background: rgba(250, 250, 250, 0.55);
    backdrop-filter: blur(16px) saturate(1.4);
    -webkit-backdrop-filter: blur(16px) saturate(1.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    transition: box-shadow 0.35s ease, background 0.35s ease;
  }

  .navbar-scrolled {
    box-shadow:
      0  4px 24px rgba(0, 0, 0, 0.08),
      0  1px  3px rgba(0, 0, 0, 0.04);
    background: rgba(250, 250, 250, 0.75);
  }

  /* ── Desktop nav-link hover / active ── */
  .nav-links {
    position: relative;
    transition: color 0.3s ease;
  }
  .nav-links::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    translate: -50% 0;
    width: 0;
    height: 2.5px;
    border-radius: 9999px;
    background: currentColor;
    transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .nav-links:hover::after,
  .nav-links.active::after {
    width: 100%;
  }

  /* ── Battery Indicator Styles ── */
  .battery-container {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(8px);
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .battery-container:hover {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  .battery-icon {
    position: relative;
    width: 28px;
    height: 14px;
    border: 2px solid #333;
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 2px;
  }

  .battery-icon::after {
    content: '';
    position: absolute;
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 6px;
    background: #333;
    border-radius: 0 2px 2px 0;
  }

  .battery-level {
    height: 100%;
    border-radius: 1px;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  /* Battery level colors */
  .battery-high { background: linear-gradient(135deg, #10b981, #059669); }
  .battery-medium { background: linear-gradient(135deg, #f59e0b, #d97706); }
  .battery-low { background: linear-gradient(135deg, #ef4444, #dc2626); }
  .battery-charging { 
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    animation: charging-pulse 2s ease-in-out infinite;
  }

  /* Charging animation */
  @keyframes charging-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  /* Shimmer effect for battery when charging */
  .battery-level::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  .battery-text {
    font-size: 13px;
    font-weight: 600;
    color: #333;
    min-width: 38px;
    text-align: right;
  }

  .charging-icon {
    animation: bolt-flash 1.5s ease-in-out infinite;
  }

  @keyframes bolt-flash {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* ── Mobile full-screen menu slide ── */
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background: rgba(250, 250, 250, 0.97);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    overflow: hidden;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                opacity  0.35s ease;
    opacity: 0;
  }
  .mobile-menu.open {
    transform: translateX(0);
    opacity: 1;
  }

  .mobile-menu .mobile-link {
    opacity: 0;
    transform: translateX(40px);
    transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .mobile-menu.open .mobile-link {
    opacity: 1;
    transform: translateX(0);
  }
  .mobile-menu.open .mobile-link:nth-child(1) { transition-delay: 0.08s; }
  .mobile-menu.open .mobile-link:nth-child(2) { transition-delay: 0.14s; }
  .mobile-menu.open .mobile-link:nth-child(3) { transition-delay: 0.20s; }
  .mobile-menu.open .mobile-link:nth-child(4) { transition-delay: 0.26s; }
  .mobile-menu.open .mobile-link:nth-child(5) { transition-delay: 0.32s; }

  .close-icon {
    transition: transform 0.25s ease, opacity 0.25s ease;
  }
  .close-icon:hover {
    transform: rotate(90deg);
    opacity: 0.6;
  }

  .menu-icon {
    transition: transform 0.2s ease;
  }
  .menu-icon:hover {
    transform: scale(1.1);
  }

  /* ── Responsive adjustments ── */
  @media (max-width: 640px) {
    .battery-container {
      padding: 4px 10px;
      gap: 6px;
    }
    .battery-icon {
      width: 24px;
      height: 12px;
    }
    .battery-text {
      font-size: 11px;
      min-width: 32px;
    }
  }

  /* Logo animation on hover */
  .logo-container {
    transition: transform 0.3s ease;
  }
  .logo-container:hover {
    transform: scale(1.05);
  }

  /* Navbar entrance animation */
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .navbar-animated {
    animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

let stylesInjected = false;
function useInjectStyles() {
  useEffect(() => {
    if (stylesInjected) return;
    const tag = document.createElement('style');
    tag.textContent = NAVBAR_STYLES;
    document.head.appendChild(tag);
    stylesInjected = true;
  }, []);
}

/* ─────────────────────────────────────────────────────── */

const Navbar = () => {
  useInjectStyles();

  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [battery, setBattery] = useState({ level: 100, charging: false });
  const [batterySupported, setBatterySupported] = useState(true);

  /* Battery API integration */
  useEffect(() => {
    const updateBattery = (batteryObj) => {
      setBattery({
        level: Math.round(batteryObj.level * 100),
        charging: batteryObj.charging
      });
    };

    if ('getBattery' in navigator) {
      navigator.getBattery().then((batteryObj) => {
        updateBattery(batteryObj);

        batteryObj.addEventListener('levelchange', () => updateBattery(batteryObj));
        batteryObj.addEventListener('chargingchange', () => updateBattery(batteryObj));
      }).catch(() => {
        setBatterySupported(false);
      });
    } else {
      setBatterySupported(false);
    }
  }, []);

  /* Listen for scroll → add shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = toggle ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [toggle]);

  /* Get battery level class */
  const getBatteryClass = () => {
    if (battery.charging) return 'battery-charging';
    if (battery.level > 50) return 'battery-high';
    if (battery.level > 20) return 'battery-medium';
    return 'battery-low';
  };

  return (
    <nav
      className={`
        ${styles.paddingX}
        w-full flex items-center py-2 fixed top-0 z-20
        navbar-glass navbar-animated
        ${scrolled ? 'navbar-scrolled' : ''}
        sm:opacity-100 xxs:h-[10vh]
      `}>

      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2 logo-container"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}>
          <img
            src={logo}
            alt="logo"
            className="sm:w-[50px] sm:h-[50px] w-[45px] h-[45px] object-contain mix-blend-multiply"
          />
          <img
            src={logotext}
            alt="logo"
            className="sm:w-[190px] sm:h-[90px] w-[85px] h-[85px] -ml-[0.6rem] object-contain"
          />
        </Link>

        {/* ── Center: Desktop links ── */}
        <ul className="list-none hidden sm:flex flex-row gap-8 lg:gap-14 mt-2">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`
                ${active === nav.title ? 'text-french' : 'text-eerieBlack'}
                hover:text-taupe text-[18px] lg:text-[21px] font-medium font-mova
                uppercase tracking-[2px] lg:tracking-[3px] cursor-pointer
                nav-links
                ${active === nav.title ? 'active' : ''}
              `}
              onClick={() => setActive(nav.title)}>
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* ── Right: Battery Indicator (Desktop & Mobile) ── */}
        <div className="flex items-center gap-4">
          {batterySupported && (
            <div className="battery-container">
              <div className="battery-icon">
                <div 
                  className={`battery-level ${getBatteryClass()}`}
                  style={{ width: `${battery.level}%` }}
                />
              </div>
              <span className="battery-text">{battery.level}%</span>
              {battery.charging && (
                <svg 
                  className="charging-icon w-4 h-4 text-blue-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572L6.694 16.596a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0016.25 6H9.678l2.628-4.596z" />
                </svg>
              )}
            </div>
          )}

          {/* ── Mobile Menu Toggle ── */}
          <div className="sm:hidden flex items-center">
            <img
              src={menu}
              alt="menu"
              className={`w-[34px] h-[34px] object-contain cursor-pointer menu-icon ${toggle ? 'opacity-0' : 'opacity-100'}`}
              style={{ transition: 'opacity 0.2s ease' }}
              onClick={() => setToggle(true)}
            />
          </div>
        </div>

        {/* ── Mobile full-screen overlay menu ── */}
        <div className={`mobile-menu ${toggle ? 'open' : ''}`}>

          {/* Close button */}
          <div className="flex justify-end p-6">
            <img
              src={close}
              alt="close"
              className="w-[22px] h-[22px] object-contain cursor-pointer close-icon"
              onClick={() => setToggle(false)}
            />
          </div>

          {/* Battery info in mobile menu */}
          {batterySupported && (
            <div className="flex justify-center mb-8">
              <div className="battery-container scale-125">
                <div className="battery-icon">
                  <div 
                    className={`battery-level ${getBatteryClass()}`}
                    style={{ width: `${battery.level}%` }}
                  />
                </div>
                <span className="battery-text">{battery.level}%</span>
                {battery.charging && (
                  <svg 
                    className="charging-icon w-5 h-5 text-blue-600" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572L6.694 16.596a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0016.25 6H9.678l2.628-4.596z" />
                  </svg>
                )}
              </div>
            </div>
          )}

          {/* Links */}
          <ul className="flex flex-col items-start justify-end mt-[6rem] -ml-[35px] px-6">
            {navLinks.map((nav) => (
              <li
                id={nav.id}
                key={nav.id}
                className={`
                  mobile-link
                  ${active === nav.title ? 'text-french' : 'text-eerieBlack'}
                  text-[64px] sm:text-[88px] font-bold font-arenq
                  uppercase tracking-[1px] cursor-pointer
                  hover:text-taupe
                `}
                style={{ transition: 'color 0.25s ease' }}
                onClick={() => {
                  setToggle(false);
                  setActive(nav.title);
                }}>
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;