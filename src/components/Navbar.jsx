import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { close, menu, logo, logotext } from '../assets';

/*
 * ─── INJECT ONCE ────────────────────────────────────────
 * Paste the <style> block below into your global CSS file
 * (e.g. index.css) OR keep it here via this tiny helper.
 * It only runs once on first render so there is zero cost.
 * ─────────────────────────────────────────────────────────
 */
const NAVBAR_STYLES = `
  /* ── Glassmorphism navbar base ── */
  .navbar-glass {
    background: rgba(250, 250, 250, 0.55);          /* flashWhite at 55 % */
    backdrop-filter: blur(16px) saturate(1.4);
    -webkit-backdrop-filter: blur(16px) saturate(1.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    transition: box-shadow 0.35s ease, background 0.35s ease;
  }

  /* shadow appears on scroll (toggled via .navbar-scrolled) */
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
    background: currentColor;             /* matches text color (french) */
    transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .nav-links:hover::after,
  .nav-links.active::after {
    width: 100%;
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

    /* slide from right */
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                opacity  0.35s ease;
    opacity: 0;
  }
  .mobile-menu.open {
    transform: translateX(0);
    opacity: 1;
  }

  /* stagger the mobile nav items */
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

  /* close-icon subtle hover */
  .close-icon {
    transition: transform 0.25s ease, opacity 0.25s ease;
  }
  .close-icon:hover {
    transform: rotate(90deg);
    opacity: 0.6;
  }

  /* menu-icon subtle scale */
  .menu-icon {
    transition: transform 0.2s ease;
  }
  .menu-icon:hover {
    transform: scale(1.1);
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

  const [active, setActive]     = useState('');
  const [toggle, setToggle]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* listen for scroll → add shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = toggle ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [toggle]);

  return (
    <nav
      className={`
        ${styles.paddingX}
        w-full flex items-center py-2 fixed top-0 z-20
        navbar-glass
        ${scrolled ? 'navbar-scrolled' : ''}
        sm:opacity-100 xxs:h-[12vh]
      `}>

      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2"
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

        {/* ── Desktop links ── */}
        <ul className="list-none hidden sm:flex flex-row gap-14 mt-2">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`
                ${active === nav.title ? 'text-french' : 'text-eerieBlack'}
                hover:text-taupe text-[21px] font-medium font-mova
                uppercase tracking-[3px] cursor-pointer
                nav-links
                ${active === nav.title ? 'active' : ''}
              `}
              onClick={() => setActive(nav.title)}>
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* ── Mobile ── */}
        <div className="sm:hidden flex flex-1 w-screen justify-end items-center">

          {/* hamburger icon (always rendered; menu overlays on top) */}
          <img
            src={menu}
            alt="menu"
            className={`w-[34px] h-[34px] object-contain cursor-pointer menu-icon ${toggle ? 'opacity-0' : 'opacity-100'}`}
            style={{ transition: 'opacity 0.2s ease' }}
            onClick={() => setToggle(true)}
          />

          {/* full-screen overlay menu */}
          <div className={`mobile-menu ${toggle ? 'open' : ''}`}>

            {/* close button */}
            <div className="flex justify-end p-6">
              <img
                src={close}
                alt="close"
                className="w-[22px] h-[22px] object-contain cursor-pointer close-icon"
                onClick={() => setToggle(false)}
              />
            </div>

            {/* links */}
            <ul className="flex flex-col items-start justify-end mt-[8rem] -ml-[35px] px-6">
              {navLinks.map((nav) => (
                <li
                  id={nav.id}
                  key={nav.id}
                  className={`
                    mobile-link
                    ${active === nav.title ? 'text-french' : 'text-eerieBlack'}
                    text-[88px] font-bold font-arenq
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
      </div>
    </nav>
  );
};

export default Navbar;