import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { styles } from '../styles';
import { textVariant } from '../utils/motion';

/* ─────────────────────────────────────────────────────────
 *  INJECTED STYLES  (one-time, no extra CSS file)
 * ───────────────────────────────────────────────────────── */
const CSS = `
  /* dot-grid background pattern */
  .tech-section-bg {
    background-image: radial-gradient(circle, rgba(91,94,166,0.18) 1.2px, transparent 1.2px);
    background-size: 36px 36px;
  }

  /* filter pill active */
  .filter-pill {
    position: relative;
    transition: color 0.3s ease;
  }
  .filter-pill::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: rgba(91,94,166,0.15);   /* french @ 15% */
    z-index: -1;
    transform: scale(0.85);
    opacity: 0;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                opacity   0.3s ease;
  }
  .filter-pill.active::after,
  .filter-pill:hover::after {
    transform: scale(1);
    opacity: 1;
  }
  .filter-pill.active { color: #fff; }
  .filter-pill.active::after { background: rgba(91,94,166,0.55); }

  /* tech card */
  .tech-card {
    background: rgba(26,26,46,0.72);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1),
                box-shadow 0.3s ease,
                border-color 0.3s ease;
    cursor: default;
  }
  .tech-card:hover {
    transform: translateY(-6px) scale(1.03);
    border-color: rgba(91,94,166,0.5);          /* french glow */
    box-shadow: 0 12px 36px rgba(91,94,166,0.2),
                0  4px 12px rgba(0,0,0,0.3);
  }

  /* proficiency bar track */
  .prof-track {
    background: rgba(255,255,255,0.08);
    border-radius: 9999px;
    overflow: hidden;
    height: 4px;
  }
  .prof-fill {
    height: 100%;
    border-radius: 9999px;
    background: linear-gradient(90deg, rgba(91,94,166,0.9), rgba(176,137,104,0.9));
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* tooltip */
  .tech-tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    translate: -50% 0;
    white-space: nowrap;
    background: rgba(26,26,46,0.95);
    border: 1px solid rgba(91,94,166,0.3);
    border-radius: 10px;
    padding: 6px 12px;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    color: #e2e8f0;
    pointer-events: none;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.25s ease, transform 0.25s ease;
    z-index: 10;
  }
  .tech-card:hover .tech-tooltip {
    opacity: 1;
    transform: translateY(0);
  }

  /* section counter badge pulse */
  @keyframes badge-ping {
    0%  { box-shadow: 0 0 0 0 rgba(91,94,166,0.5); }
    70% { box-shadow: 0 0 0 6px rgba(91,94,166,0); }
    100%{ box-shadow: 0 0 0 0 rgba(91,94,166,0);   }
  }
  .badge-ping { animation: badge-ping 2.2s ease-in-out infinite; }
`;
let injected = false;
function useStyles() {
  if (!injected && typeof document !== 'undefined') {
    const t = document.createElement('style');
    t.textContent = CSS;
    document.head.appendChild(t);
    injected = true;
  }
}

/* ─────────────────────────────────────────────────────────
 *  CATEGORY MAP
 *  Each tech in your constants.js  technologies[]  should have
 *  { name, icon }.  We layer a `category` + `level` on top here.
 *  Add / remove entries freely — the filter tabs auto-generate.
 *
 *  level: 1-5  (drives the proficiency bar width)
 * ───────────────────────────────────────────────────────── */
const TECH_META = {
  // ── Frontend ──
  'React'         : { category: 'Frontend',  level: 5 },
  'JavaScript'    : { category: 'Frontend',  level: 5 },
  'TypeScript'    : { category: 'Frontend',  level: 4 },
  'HTML'          : { category: 'Frontend',  level: 5 },
  'CSS'           : { category: 'Frontend',  level: 4 },
  'Next.js'       : { category: 'Frontend',  level: 3 },
  'Tailwind CSS'  : { category: 'Frontend',  level: 4 },

  // ── Backend ──
  'Node.js'       : { category: 'Backend',   level: 4 },
  'Express'       : { category: 'Backend',   level: 4 },
  'Python'        : { category: 'Backend',   level: 3 },
  'MongoDB'       : { category: 'Backend',   level: 4 },
  'Firebase'      : { category: 'Backend',   level: 3 },
  'PostgreSQL'    : { category: 'Backend',   level: 3 },

  // ── Mobile ──
  'React Native'  : { category: 'Mobile',    level: 4 },
  'Android'       : { category: 'Mobile',    level: 4 },
  'Kotlin'        : { category: 'Mobile',    level: 3 },
  'Java'          : { category: 'Mobile',    level: 3 },

  // ── Tools ──
  'Git'           : { category: 'Tools',     level: 4 },
  'AWS'           : { category: 'Tools',     level: 3 },
  'Docker'        : { category: 'Tools',     level: 2 },
  'Figma'         : { category: 'Tools',     level: 3 },
};

/* merge meta into the technologies array from constants.js;
   techs NOT in TECH_META fall into "Other" at level 2 */
function enrichTechs(arr) {
  return arr.map((t) => {
    const meta = TECH_META[t.name] || { category: 'Other', level: 2 };
    return { ...t, ...meta };
  });
}

/* derive unique category labels in a stable order */
const CATEGORY_ORDER = ['All', 'Frontend', 'Backend', 'Mobile', 'Tools', 'Other'];
function getCategories(enriched) {
  const present = new Set(enriched.map((t) => t.category));
  return CATEGORY_ORDER.filter((c) => c === 'All' || present.has(c));
}

/* ─────────────────────────────────────────────────────────
 *  PROFICIENCY BAR  (animates width on scroll-enter)
 * ───────────────────────────────────────────────────────── */
const ProfBar = ({ level }) => {
  const ref    = useRef();
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const pct    = (level / 5) * 100;

  const labels = ['', 'Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];

  return (
    <div ref={ref} className="mt-2.5 px-1">
      <div className="prof-track">
        <div className="prof-fill" style={{ width: inView ? `${pct}%` : '0%' }} />
      </div>
      <p className="text-taupe font-poppins text-[10px] mt-1 text-center tracking-wide">
        {labels[level]}
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
 *  SINGLE TECH CARD
 * ───────────────────────────────────────────────────────── */
const TechCard = ({ technology, index, layoutId }) => {
  const ref    = useRef();
  const inView = useInView(ref, { once: true, margin: '0px 0px -30px 0px' });

  return (
    <motion.div
      ref={ref}
      layout
      layoutId={layoutId}
      initial={{ opacity: 0, scale: 0.82 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.82 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
      className="tech-card relative flex flex-col items-center p-4 pt-3"
      style={{ width: 130 }}
    >
      {/* tooltip on hover */}
      <div className="tech-tooltip">
        {technology.name} — {['','Beginner','Elementary','Intermediate','Advanced','Expert'][technology.level]}
      </div>

      {/* BallCanvas sphere */}
      <div className="w-[88px] h-[88px]">
        <BallCanvas icon={technology.icon} />
      </div>

      {/* name */}
      <p className="text-timberWolf font-poppins font-medium text-[13px] mt-1 text-center leading-tight">
        {technology.name}
      </p>

      {/* proficiency bar */}
      <ProfBar level={technology.level} />
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────
 *  MAIN COMPONENT
 * ───────────────────────────────────────────────────────── */
const Tech = () => {
  useStyles();

  const enriched  = enrichTechs(technologies);
  const categories = getCategories(enriched);

  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? enriched
    : enriched.filter((t) => t.category === active);

  return (
    <div className="tech-section-bg relative rounded-3xl py-2">
      {/* ── heading row ── */}
      <motion.div variants={textVariant()} className="flex flex-wrap items-end justify-center gap-3">
        <div>
          <p className={styles.sectionSubTextLight}>My skills</p>
          <h2 className={styles.sectionHeadTextLight}>Technologies.</h2>
        </div>

        {/* animated counter badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="badge-ping flex items-center gap-1.5 px-3 py-1 rounded-full mb-1"
          style={{
            background: 'rgba(91,94,166,0.14)',
            border: '1px solid rgba(91,94,166,0.35)',
          }}>
          <span className="w-2 h-2 rounded-full bg-french" />
          <span className="text-french font-poppins font-semibold text-[12px]">
            {filtered.length} {active === 'All' ? 'technologies' : active.toLowerCase()}
          </span>
        </motion.div>
      </motion.div>

      {/* ── short description ── */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="text-taupe font-poppins text-[14px] text-center max-w-xl mx-auto mt-3 leading-relaxed">
        Tools & languages I work with daily to build robust, scalable applications.
      </motion.p>

      {/* ── filter pills ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.45 }}
        className="flex flex-wrap justify-center gap-2.5 mt-6">
        {categories.map((cat) => {
          const count = cat === 'All' ? enriched.length : enriched.filter((t) => t.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`filter-pill ${active === cat ? 'active' : 'text-taupe'} font-poppins font-medium text-[13px] px-4 py-1.5 rounded-full flex items-center gap-2 relative z-0`}>
              {cat}
              <span
                className="font-poppins text-[10px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: active === cat ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                  color: active === cat ? '#fff' : 'rgba(255,255,255,0.5)',
                }}>
                {count}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* ── tech grid ── */}
      <motion.div
        layout
        className="flex flex-wrap justify-center gap-4 sm:gap-5 mt-10 px-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((tech, i) => (
            <TechCard
              key={tech.name}
              technology={tech}
              index={i}
              layoutId={`tech-${tech.name}`}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── bottom legend ── */}
      <div className="flex flex-wrap justify-center gap-4 mt-10 px-2">
        {['Beginner','Intermediate','Expert'].map((lbl, i) => {
          const pcts = [20, 60, 100];
          return (
            <div key={lbl} className="flex items-center gap-2">
              <div className="prof-track" style={{ width: 40 }}>
                <div className="prof-fill" style={{ width: `${pcts[i]}%` }} />
              </div>
              <span className="text-taupe font-poppins text-[11px]">{lbl}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, '');