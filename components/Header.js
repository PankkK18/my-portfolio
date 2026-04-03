'use client';

<<<<<<< HEAD
import React from 'react';

export default function Header() {
  return (
    <header className="bg-black-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">
          Portfolio
        </div>

        <ul className="flex space-x-8">
          <li>
            <a
              href="#projects"
              className="text-white hover:text-gray-400 transition"
            >
              Projects
            </a>
          </li>

          <li>
            <a
              href="#skills"
              className="text-white hover:text-gray-400 transition"
            >
              Skills
            </a>
          </li>

          <li>
            <a
              href="#connect"
              className="text-white hover:text-gray-400 transition"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
=======
import { motion, AnimatePresence, useScroll, useMotionTemplate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Matches the actual id="" values used in page.jsx
const NAV_LINKS = [
  { label: 'Projects',     href: 'projects'     },
  { label: 'Skills',       href: 'skills'       },
  { label: 'Achievements', href: 'achievements' },
  { label: 'Contact',      href: 'connect'      }, // label says Contact, scrolls to id="connect"
];

// Custom smooth scroll — ease-out-expo, 700ms
function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const start    = window.scrollY;
  const target   = el.getBoundingClientRect().top + window.scrollY - 72;
  const distance = target - start;
  const duration = 700;
  let   startTime = null;
  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
  function step(ts) {
    if (!startTime) startTime = ts;
    const p = Math.min((ts - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeOutExpo(p));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function Header() {
  const [active,     setActive]     = useState('');
  const [ripples,    setRipples]    = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();

  // ── Track which section is visible ──────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.getElementById(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ── Header glass bg opacity tied to scroll ───────────────────────────────
  // We use inline MotionValue so no re-render on scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 30));
  }, [scrollY]);

  // ── Nav click handler ────────────────────────────────────────────────────
  function handleClick(e, href) {
    e.preventDefault();
    // Ripple
    const key = Date.now();
    setRipples((p) => ({ ...p, [href]: key }));
    setTimeout(() => setRipples((p) => { const n = { ...p }; delete n[href]; return n; }), 600);
    setActive(href);
    smoothScrollTo(href);
    setMobileOpen(false);
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
          willChange: 'background',
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">

          {/* ── Logo ──────────────────────────────────────────────────── */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); smoothScrollTo(''); }}
            className="text-white text-xl font-bold tracking-tight select-none"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            Portfolio<span className="text-sky-400">.</span>
          </motion.a>

          {/* ── Desktop nav ───────────────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <NavItem
                  label={label}
                  href={href}
                  isActive={active === href}
                  hasRipple={!!ripples[href]}
                  onClick={handleClick}
                />
              </li>
            ))}
          </ul>

          {/* ── Mobile hamburger ──────────────────────────────────────── */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-0.5 bg-white rounded-full"
                style={{ width: '22px' }}
                animate={{
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                  rotate:  mobileOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  y:       mobileOpen ? (i === 0 ?  7 : i === 2 ?  -7 : 0) : 0,
                  scaleX:  mobileOpen && i === 1 ? 0 : 1,
                }}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            ))}
          </button>
        </div>

        {/* ── Mobile menu ───────────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{   opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-white/5"
              style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(14px)' }}
            >
              <ul className="container mx-auto px-6 py-3 flex flex-col gap-1 list-none m-0">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1,  x: 0   }}
                    transition={{ delay: i * 0.055, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={`#${href}`}
                      onClick={(e) => handleClick(e, href)}
                      className={`block py-3 px-4 rounded-xl text-sm font-medium transition-colors duration-150 ${
                        active === href
                          ? 'text-sky-400 bg-sky-400/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
>>>>>>> 3097e2c (updated my portfolio)
  );
}

// ─── Single desktop nav item ──────────────────────────────────────────────────
function NavItem({ label, href, isActive, hasRipple, onClick }) {
  return (
    <a
      href={`#${href}`}
      onClick={(e) => onClick(e, href)}
      className="relative inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium outline-none select-none overflow-hidden cursor-pointer"
      style={{ WebkitTapHighlightColor: 'transparent', textDecoration: 'none' }}
    >
      {/* Sliding active-pill background — shared layoutId slides between items */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            layoutId="nav-active-pill"
            className="absolute inset-0 rounded-lg bg-sky-400/12 border border-sky-400/25"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{   opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
          />
        )}
      </AnimatePresence>

      {/* Click ripple — radial burst from center */}
      <AnimatePresence>
        {hasRipple && (
          <motion.span
            key={`ripple-${href}`}
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.35) 0%, transparent 70%)' }}
            initial={{ opacity: 1, scale: 0.3 }}
            animate={{ opacity: 0, scale: 2.5 }}
            exit={{   opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* Label text */}
      <motion.span
        className="relative z-10 transition-colors duration-150"
        style={{ color: isActive ? '#38bdf8' : '#9ca3af' }}
        whileHover={{ color: '#ffffff' }}
      >
        {label}
      </motion.span>

      {/* Active dot below label */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            key="dot"
            className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-sky-400"
            style={{ width: '4px', height: '4px' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{   scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </AnimatePresence>
    </a>
  );
}