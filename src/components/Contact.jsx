import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { send, sendHover } from '../assets';

/* ─────────────────────────────────────────────────────────
 *  INJECTED STYLES  (one-time, no extra CSS file needed)
 * ───────────────────────────────────────────────────────── */
const CSS = `
  /* focus glow – french accent */
  .contact-input:focus {
    box-shadow: 0 0 0 2px rgba(91,94,166,0.45);   /* french @ 45 % */
  }
  /* smooth placeholder shift */
  .contact-input::placeholder { transition: opacity 0.25s; }
  .contact-input:focus::placeholder { opacity: 0.4; }

  /* ripple on send button */
  .send-btn { position: relative; overflow: hidden; }
  .send-btn .ripple {
    position: absolute; border-radius: 50%;
    background: rgba(255,255,255,0.35);
    transform: scale(0);
    animation: ripple-anim 0.6s linear;
    pointer-events: none;
  }
  @keyframes ripple-anim {
    to { transform: scale(4); opacity: 0; }
  }

  /* social pill hover */
  .social-pill { transition: background 0.25s, transform 0.25s, box-shadow 0.25s; }
  .social-pill:hover {
    background: rgba(91,94,166,0.18);
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(91,94,166,0.25);
  }

  /* info-card subtle top-border glow */
  .info-card-glow {
    border-top: 2px solid transparent;
    background-image: linear-gradient(#1a1a2e, #1a1a2e),
                      linear-gradient(90deg, rgba(91,94,166,0.7), rgba(176,137,104,0.7));
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
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
 *  TINY SVG ICONS (no icon lib needed)
 * ───────────────────────────────────────────────────────── */
const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const AlertCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────
 *  CONFIG — swap your real values
 * ───────────────────────────────────────────────────────── */
const CONFIG = {
  emailjs: {
    serviceId : 'service_i3gr8kv',
    templateId: 'template_2ncrk48',
    publicKey : 'EbBUmoRg4tBWY-US7',
  },
  toName : 'Durgesh Katyayan',
  toEmail: 'durgeshmishra6387459355@gmail.com',
  socials: [
    { label: 'GitHub',   icon: GithubIcon,   url: 'https://github.com/durgeshkatyayan' },
    { label: 'LinkedIn', icon: LinkedinIcon,  url: 'https://www.linkedin.com/in/durgesh-katyayan-653a572b1/' },
    { label: 'Twitter',  icon: TwitterIcon,   url: 'https://twitter.com/kaniskkatyayan' },
  ],
  maxMessageLen: 500,
};

/* ─────────────────────────────────────────────────────────
 *  VALIDATION HELPERS
 * ───────────────────────────────────────────────────────── */
const validators = {
  name  : (v) => (!v.trim() ? 'Name is required.' : v.trim().length < 2 ? 'At least 2 characters.' : ''),
  email : (v) => (!v.trim() ? 'Email is required.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email.' : ''),
  message: (v) => (!v.trim() ? 'Message is required.' : v.trim().length < 10 ? 'At least 10 characters.' : ''),
};

/* ─────────────────────────────────────────────────────────
 *  TOAST  (auto-dismiss)
 * ───────────────────────────────────────────────────────── */
const Toast = ({ toast }) => {
  if (!toast) return null;
  const isOk = toast.type === 'success';
  return (
    <AnimatePresence>
      <motion.div
        key={toast.id}
        initial={{ y: -60, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -60, opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
        className="fixed top-6 left-1/2 z-[1000] flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg font-poppins text-[13px] font-medium"
        style={{
          transform: 'translateX(-50%)',
          background: isOk ? 'rgba(37,211,102,0.15)' : 'rgba(239,68,68,0.15)',
          border: `1px solid ${isOk ? 'rgba(37,211,102,0.4)' : 'rgba(239,68,68,0.4)'}`,
          color: isOk ? '#16a34a' : '#dc2626',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}>
        {isOk ? <CheckCircleIcon /> : <AlertCircleIcon />}
        {toast.msg}
      </motion.div>
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────────────────
 *  CONTACT
 * ───────────────────────────────────────────────────────── */
const Contact = () => {
  useStyles();

  /* ── state ── */
  const formRef   = useRef();
  const [form,    setForm]    = useState({ name: '', email: '', message: '' });
  const [errors,  setErrors]  = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [loading, setLoading] = useState(false);
  const [toast,   setToast]   = useState(null);
  const toastTimer = useRef(null);

  /* ── helpers ── */
  const showToast = useCallback((msg, type = 'success') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    const id = Date.now();
    setToast({ msg, type, id });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const validate = (fields = form) => {
    const e = {};
    Object.keys(fields).forEach((k) => { e[k] = validators[k](fields[k]); });
    return e;
  };

  const hasErrors = (errs) => Object.values(errs).some(Boolean);

  /* ── handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate();
    setErrors(errs);
    if (hasErrors(errs)) return;

    setLoading(true);
    emailjs
      .send(
        CONFIG.emailjs.serviceId,
        CONFIG.emailjs.templateId,
        {
          from_name : form.name,
          to_name   : CONFIG.toName,
          from_email: form.email,
          to_email  : CONFIG.toEmail,
          message   : form.message,
        },
        CONFIG.emailjs.publicKey
      )
      .then(() => {
        setLoading(false);
        showToast('Message sent! I\'ll get back to you soon.', 'success');
        setForm({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
        setErrors({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        showToast('Something went wrong. Please try again.', 'error');
      });
  };

  /* ── copy helper for social pills ── */
  const copyToClip = (text, label) => {
    navigator.clipboard.writeText(text).then(() => showToast(`${label} copied!`, 'success'));
  };

  /* ── ripple effect on send btn ── */
  const ripple = (e) => {
    const btn   = e.currentTarget;
    const circle = document.createElement('span');
    const rect  = btn.getBoundingClientRect();
    circle.classList.add('ripple');
    circle.style.left   = `${e.clientX - rect.left}px`;
    circle.style.top    = `${e.clientY - rect.top}px`;
    const size = Math.max(rect.width, rect.height);
    circle.style.width  = circle.style.height = `${size}px`;
    circle.style.marginLeft  = `${-size / 2}px`;
    circle.style.marginTop   = `${-size / 2}px`;
    btn.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
  };

  /* ── stagger for form fields ── */
  const fieldVariant = {
    hidden : { opacity: 0, y: 18 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.45, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  /* ── shared input className ── */
  const inputCls = (name) =>
    `contact-input w-full bg-eerieBlack py-3.5 px-5 placeholder:text-taupe text-timberWolf rounded-xl outline-none border font-poppins text-[14px] transition-all duration-200 ${
      errors[name] && touched[name] ? 'border-red-500' : 'border-transparent'
    }`;

  /* ─────────────────────────────────────────────────────
   *  RENDER
   * ───────────────────────────────────────────────────── */
  return (
    <>
      {/* global toast */}
      <Toast toast={toast} />

      <div className="-mt-[8rem] xl:flex-row flex-col-reverse flex gap-8 lg:gap-14 overflow-hidden">

        {/* ══════════ LEFT — Form card ══════════ */}
        <motion.div
          variants={slideIn('left', 'tween', 0.2, 1)}
          className="flex-[1] bg-jet p-6 sm:p-8 rounded-2xl">

          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadTextLight}>Contact.</h3>

          {/* progress bar — fills as fields are completed */}
          <div className="mt-5 mb-2 flex gap-1.5">
            {['name','email','message'].map((f, i) => (
              <div key={f} className="flex-1 h-[3px] rounded-full transition-all duration-500"
                style={{ background: form[f].trim() ? 'var(--french, #5b5ea6)' : 'rgba(255,255,255,0.1)' }} />
            ))}
          </div>
          <p className="text-taupe font-poppins text-[11px] mb-4">
            {[form.name, form.email, form.message].filter(v => v.trim()).length} / 3 fields filled
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 font-poppins">

            {/* Name */}
            <motion.label custom={0} variants={fieldVariant} initial="hidden" animate="visible" className="flex flex-col">
              <span className="text-timberWolf font-medium mb-2 text-[14px] flex items-center gap-1">
                Your Name <span className="text-french">*</span>
              </span>
              <input
                type="text" name="name" value={form.name}
                onChange={handleChange} onBlur={handleBlur}
                placeholder="What's your name?"
                className={inputCls('name')}
              />
              <AnimatePresence>
                {errors.name && touched.name && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    className="text-red-400 font-poppins text-[11.5px] mt-1.5 ml-1">{errors.name}</motion.p>
                )}
              </AnimatePresence>
            </motion.label>

            {/* Email */}
            <motion.label custom={1} variants={fieldVariant} initial="hidden" animate="visible" className="flex flex-col">
              <span className="text-timberWolf font-medium mb-2 text-[14px] flex items-center gap-1">
                Your Email <span className="text-french">*</span>
              </span>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} onBlur={handleBlur}
                placeholder="What's your email?"
                className={inputCls('email')}
              />
              <AnimatePresence>
                {errors.email && touched.email && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    className="text-red-400 font-poppins text-[11.5px] mt-1.5 ml-1">{errors.email}</motion.p>
                )}
              </AnimatePresence>
            </motion.label>

            {/* Message + char counter */}
            <motion.label custom={2} variants={fieldVariant} initial="hidden" animate="visible" className="flex flex-col">
              <span className="text-timberWolf font-medium mb-2 text-[14px] flex items-center justify-between">
                <span>Your Message <span className="text-french">*</span></span>
                <span className={`font-poppins text-[11px] ${form.message.length > CONFIG.maxMessageLen ? 'text-red-400' : 'text-taupe'}`}>
                  {form.message.length}/{CONFIG.maxMessageLen}
                </span>
              </span>
              <textarea
                rows="5" name="message" value={form.message}
                onChange={handleChange} onBlur={handleBlur}
                placeholder="What's your message?"
                maxLength={CONFIG.maxMessageLen + 20}
                className={`${inputCls('message')} resize-none`}
              />
              <AnimatePresence>
                {errors.message && touched.message && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    className="text-red-400 font-poppins text-[11.5px] mt-1.5 ml-1">{errors.message}</motion.p>
                )}
              </AnimatePresence>
            </motion.label>

            {/* Send button */}
            <motion.button
              custom={3} variants={fieldVariant} initial="hidden" animate="visible"
              type="submit" disabled={loading || hasErrors(validate())}
              onClick={ripple}
              className="send-btn live-demo flex justify-center sm:gap-4 gap-3 sm:text-[18px] text-[15px] text-timberWolf font-bold font-beckman items-center py-4 rounded-[10px] bg-night hover:bg-battleGray hover:text-eerieBlack transition duration-[0.2s] ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              onMouseOver={() => { const el = document.querySelector('.contact-btn'); if (el) el.setAttribute('src', sendHover); }}
              onMouseOut  ={() => { const el = document.querySelector('.contact-btn'); if (el) el.setAttribute('src', send); }}>
              {loading ? (
                <>
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" strokeDasharray="30 70" strokeLinecap="round"/>
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  Send
                  <img src={send} alt="send" className="contact-btn sm:w-[24px] sm:h-[24px] w-[20px] h-[20px] object-contain" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* ══════════ RIGHT — Info panel ══════════ */}
        <motion.div
          variants={slideIn('right', 'tween', 0.35, 1)}
          className="flex-[0.8] flex flex-col gap-5">

          {/* header blurb */}
          <div className="bg-jet p-6 rounded-2xl">
            <p className={styles.sectionSubText}>Let's talk</p>
            <h3 className={styles.sectionHeadTextLight} style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              I'd love to <span className="text-french">hear</span> from you.
            </h3>
            <p className="text-taupe font-poppins text-[13px] mt-3 leading-relaxed">
              Whether you have a project in mind, a question, or just want to say hi — my inbox is always open.
              Feel free to reach out through any channel below.
            </p>
          </div>

          {/* contact details cards */}
          {[
            { icon: MailIcon,     label: 'Email',   value: CONFIG.toEmail,        copy: true },
            { icon: PhoneIcon,    label: 'Phone',   value: '+91 8934902552',     copy: true },
            { icon: LocationIcon, label: 'Location', value: 'Kanpur Nagar, Uttar Pradesh', copy: false },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="info-card-glow bg-jet rounded-xl flex items-center gap-4 p-4 cursor-pointer group"
              onClick={() => item.copy && copyToClip(item.value, item.label)}
              title={item.copy ? `Click to copy ${item.label}` : undefined}>
              {/* icon circle */}
              <div className="flex items-center justify-center text-french flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ width: 46, height: 46, borderRadius: 13, background: 'rgba(91,94,166,0.12)' }}>
                <item.icon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-taupe font-poppins text-[11px] uppercase tracking-widest">{item.label}</p>
                <p className="text-timberWolf font-poppins font-medium text-[13.5px] truncate">{item.value}</p>
              </div>
              {item.copy && (
                <span className="text-taupe text-[10px] font-poppins opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                  click to copy
                </span>
              )}
            </motion.div>
          ))}

          {/* social links */}
          <div className="bg-jet p-5 rounded-2xl">
            <p className="text-taupe font-poppins text-[11px] uppercase tracking-widest mb-3">Follow me</p>
            <div className="flex flex-wrap gap-2.5">
              {CONFIG.socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.url} target="_blank" rel="noreferrer"
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 + i * 0.08, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                  className="social-pill flex items-center gap-2 px-4 py-2 rounded-full text-timberWolf font-poppins font-medium text-[13px]"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="text-french"><s.icon /></span>
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* availability badge */}
          <div className="bg-jet rounded-xl p-4 flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-3.5 h-3.5 rounded-full bg-green-400" />
              <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-green-400 animate-ping opacity-60" />
            </div>
            <p className="text-timberWolf font-poppins text-[13px]">
              Currently <span className="text-green-400 font-semibold">available</span> for freelance & full-time roles.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, 'contact');