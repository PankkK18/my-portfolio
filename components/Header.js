'use client';

import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';

/* ───────────────── NAV LINKS ───────────────── */
const NAV_LINKS = [
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
  { label: 'Achievements', href: 'achievements' },
  { label: 'Contact', href: 'connect' },
];

/* ───────────────── SMOOTH SCROLL ───────────────── */
function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const start = window.scrollY;
  const target = el.getBoundingClientRect().top + window.scrollY - 70;
  const distance = target - start;
  const duration = 700;
  let startTime = null;

  const easeOutExpo = (t) =>
    t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);

    window.scrollTo(
      0,
      start + distance * easeOutExpo(progress)
    );

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ───────────────── HEADER COMPONENT ───────────────── */
export default function Header() {
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  /* ─── ACTIVE SECTION TRACKING ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
      }
    );

    NAV_LINKS.forEach(({ href }) => {
      const el = document.getElementById(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ─── SCROLL EFFECT ─── */
  useEffect(() => {
    return scrollY.on('change', (value) => {
      setScrolled(value > 30);
    });
  }, [scrollY]);

  /* ─── CLICK HANDLER ─── */
  function handleClick(e, href) {
    e.preventDefault();
    setActive(href);
    smoothScrollTo(href);
    setMobileOpen(false);
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? 'rgba(0,0,0,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.08)'
            : 'none',
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">

          {/* ─── LOGO ─── */}
          <motion.a
            href="#"
            className="text-white text-xl font-bold"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Portfolio<span className="text-sky-400">.</span>
          </motion.a>

          {/* ─── DESKTOP NAV ─── */}
          <ul className="hidden md:flex gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <motion.a
                  href={`#${href}`}
                  onClick={(e) => handleClick(e, href)}
                  className={`relative text-sm ${
                    active === href
                      ? 'text-sky-400'
                      : 'text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {label}

                  {/* underline animation */}
                  {active === href && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-sky-400"
                    />
                  )}
                </motion.a>
              </li>
            ))}
          </ul>

          {/* ─── MOBILE BUTTON ─── */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>

        {/* ─── MOBILE MENU ─── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black border-t border-white/10"
            >
              <ul className="flex flex-col p-4 gap-2">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={`#${href}`}
                      onClick={(e) => handleClick(e, href)}
                      className={`block py-2 px-3 rounded ${
                        active === href
                          ? 'text-sky-400 bg-sky-400/10'
                          : 'text-gray-300'
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}