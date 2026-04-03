'use client';

<<<<<<< HEAD
import React, { useState } from 'react';
=======
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import React, { useState, useRef } from 'react';
>>>>>>> 3097e2c (updated my portfolio)
import Header from '../components/Header';
import Footer from '../components/Footer';
import './app.css';

<<<<<<< HEAD
export default function Home() {
  const [activeAchievement, setActiveAchievement] = useState<number | null>(null);

  // Projects
  const projects = [
    {
      title: 'DYPCET Hub',
      description:
        'A centralized platform for college clubs to share information. Built using HTML5, CSS, JavaScript, and PHP.',
      details:
        'The system integrates all club activities and provides students with real-time updates on events, meetings, and opportunities.',
      link: 'https://github.com/PankkK18/DYPCET_HUB-',
    },
    {
      title: 'Reduce Oil Consumption and Monitoring',
      description:
        'A web solution to monitor and reduce oil consumption using JavaScript and PHP.',
      details:
        'The project involves the use of data analysis and visualization to help users reduce unnecessary oil wastage.',
      link: 'https://github.com/PankkK18/Oil_Consumption_Monitoring-',
    },
    {
      title: 'Portfolio with Parallax Animation',
      description:
        'A portfolio built with modern web technologies and parallax animation.',
      details:
        'Features smooth animations and responsive design. Built using HTML, CSS, JavaScript, and the parallax.js library.',
      link: 'https://github.com/PankkK18/ParallaxAnimation-Portfolio',
    },
  ];

  // Skills
  const skills = [
    {
      name: 'Java Full Stack',
      img: '/icons8-java-48.png',
      description: 'Java, Spring Boot, Hibernate, JPA, REST APIs, Microservices',
    },
    {
      name: 'DevOps',
      img: '/devops.png',
      description: 'Docker, CI/CD, AWS, Nginx, Linux, GitHub Actions',
    },
    {
      name: 'Web Developer',
      img: '/webdev.png',
      description: 'HTML, CSS, JavaScript, React.js, Next.js, Responsive Design',
    },
    {
      name: 'Databases',
      img: '/icons8-mongo-db-48.png',
      description: 'MongoDB, MySQL, PostgreSQL',
    },
    {
      name: 'Frameworks & Tools',
      img: '/icons8-tailwind-css-48.png',
      description: 'React.js, Tailwind CSS, Next.js, Git, GitHub',
    },
    {
      name: 'Programming Languages',
      img: '/icons8-python-48.png',
      description: 'Java, Python, JavaScript, C++, SQL',
    },
    {
      name: 'JavaScript Frameworks',
      img: '/js.png',
      description: 'React, Vue.js',
    },
    {
      name: 'Version Control',
      img: '/icons8-github-30.png',
      description: 'Git, GitHub',
    },
    {
      name: 'Cloud Services',
      img: '/aws.png',
      description: 'AWS, Azure',
    },
  ];

  // Achievements
  const achievements = [
    {
      title: 'SG Esports – Trial Athlete',
      short: 'Competitive BGMI player',
      extra:
        'Played trial matches with Skylightz Gaming (SG), a top-tier Indian BGMI organization and BGMI Masters Series 2022 winners.',
    },
    {
      title: 'Skylightz Gaming (SG)',
      short: 'Professional Esports Association',
      extra:
        'Associated with one of India’s most competitive BGMI teams, known for consistent top-level tournament performance.',
    },
    {
      title: 'Smart Aurangabad Hackathon 2020',
      short: '1st Runner-Up',
      extra:
        'Secured 1st Runner-Up position by building an innovative technical solution under strict time constraints.',
    },
=======
// ─── GPU-acceleration style — applied to every animated layer ─────────────────
const gpu = { willChange: 'transform', transform: 'translateZ(0)' };

// ─── Buttery spring presets ────────────────────────────────────────────────────
// Higher damping = less oscillation = smoother perceived motion
const SPRING_PARALLAX  = { stiffness: 40,  damping: 28, mass: 0.6 }; // scroll parallax
const SPRING_HOVER     = { stiffness: 350, damping: 40, mass: 0.5 }; // hover lifts
const SPRING_CARD      = { stiffness: 280, damping: 38, mass: 0.6 }; // card spring
const SPRING_SOCIAL    = { stiffness: 320, damping: 36, mass: 0.5 }; // social icons

// ─── Easing curves that render cleanly on 60 & 120 Hz ─────────────────────────
const EASE_OUT_EXPO   = [0.16, 1, 0.3, 1];   // fast start, long glide
const EASE_OUT_QUART  = [0.25, 1, 0.5, 1];   // smooth decelerate

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
function RevealOnScroll({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-70px 0px' });

  const hidden = {
    opacity: 0,
    y: direction === 'up' ? 48 : direction === 'down' ? -48 : 0,
    x: direction === 'left' ? 48 : direction === 'right' ? -48 : 0,
    scale: direction === 'scale' ? 0.88 : 1,
  };
  const visible = {
    opacity: 1, y: 0, x: 0, scale: 1,
    transition: { duration: 0.7, delay, ease: EASE_OUT_EXPO },
  };

  return (
    <motion.div
      ref={ref}
      style={gpu}
      className={className}
      initial={hidden}
      animate={isInView ? visible : hidden}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger container ────────────────────────────────────────────────────────
function StaggerContainer({ children, className = '', staggerDelay = 0.09 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay, delayChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  );
}

const cardVariants = {
  hidden:  { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT_QUART },
  },
};

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [formData, setFormData]             = useState({ name: '', email: '', message: '' });
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading]               = useState(false);
  const [activeAchievement, setActiveAchievement] = useState(null);

  const { scrollY } = useScroll();

  // Parallax — smooth springs with low stiffness so they never "snap"
  const heroBgY   = useSpring(useTransform(scrollY, [0, 600], [0, -160]), SPRING_PARALLAX);
  const heroTextY = useSpring(useTransform(scrollY, [0, 600], [0,  -72]), { ...SPRING_PARALLAX, stiffness: 50 });
  const heroImgY  = useSpring(useTransform(scrollY, [0, 600], [0,  -36]), { ...SPRING_PARALLAX, stiffness: 60 });

  // Orbs — raw transforms (no spring) so they track scroll frame-perfectly
  const orb1Y = useTransform(scrollY, [0, 1000], [0, -110]);
  const orb2Y = useTransform(scrollY, [0, 1000], [0,   72]);
  const orb3Y = useTransform(scrollY, [0, 1000], [0,  -56]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res    = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const result = await res.json();
      setResponseMessage(result.message);
      if (res.status === 201) setFormData({ name: '', email: '', message: '' });
    } catch { setResponseMessage('An error occurred. Please try again.'); }
    setLoading(false);
  };

  const projects = [
    { title: 'DYPCET Hub',             tag: 'PHP · JS · HTML',    description: 'A centralized platform for college clubs to share information. Built using HTML5, CSS, JavaScript, and PHP.',            details: 'Integrates all club activities with real-time updates on events, meetings, and opportunities.',           link: 'https://github.com/PankkK18/DYPCET_HUB-' },
    { title: 'Oil Consumption Monitor', tag: 'JS · PHP · Data Viz', description: 'A web solution to monitor and reduce oil consumption using JavaScript and PHP.',                                        details: 'Data analysis and visualization to help users reduce unnecessary oil wastage.',                           link: 'https://github.com/PankkK18/Oil_Consumption_Monitoring-' },
    { title: 'Parallax Portfolio',      tag: 'HTML · CSS · JS',    description: 'A portfolio built with modern web technologies and parallax animation.',                                                 details: 'Features smooth animations and responsive design using HTML, CSS, JS, and parallax.js.',                 link: 'https://github.com/PankkK18/ParallaxAnimation-Portfolio' },
  ];

  const skills = [
    { name: 'Java Full Stack',       img: '/icons8-java-48.png',        description: 'Java, Spring Boot, Hibernate, JPA, REST APIs, Microservices' },
    { name: 'DevOps',                img: '/devops.png',                description: 'Docker, CI/CD, AWS, Nginx, Linux, GitHub Actions' },
    { name: 'Web Developer',         img: '/webdev.png',                description: 'HTML, CSS, JavaScript, React.js, Next.js, Responsive Design' },
    { name: 'Databases',             img: '/icons8-mongo-db-48.png',    description: 'MongoDB, MySQL, PostgreSQL' },
    { name: 'Frameworks & Tools',    img: '/icons8-tailwind-css-48.png',description: 'React.js, Tailwind CSS, Next.js, Git, GitHub' },
    { name: 'Programming Languages', img: '/icons8-python-48.png',      description: 'Java, Python, JavaScript, C++, SQL' },
    { name: 'JavaScript Frameworks', img: '/js.png',                    description: 'React, Vue.js' },
    { name: 'Version Control',       img: '/icons8-github-30.png',      description: 'Git, GitHub' },
    { name: 'Cloud Services',        img: '/aws.png',                   description: 'AWS, Azure' },
  ];

  const achievements = [
    { title: 'SG Esports – Trial Athlete',      short: 'Competitive BGMI player',           extra: 'Played trial matches with Skylightz Gaming (SG), a top-tier Indian BGMI organization and BGMI Masters Series 2022 winners.' },
    { title: 'Skylightz Gaming (SG)',            short: 'Professional Esports Association',  extra: "Associated with one of India's most competitive BGMI teams, known for consistent top-level tournament performance." },
    { title: 'Smart Aurangabad Hackathon 2020',  short: '1st Runner-Up',                     extra: 'Secured 1st Runner-Up position by building an innovative technical solution under strict time constraints.' },
>>>>>>> 3097e2c (updated my portfolio)
  ];

  return (
    <>
      <Header />
<<<<<<< HEAD

      <main className="container mx-auto p-4">
        {/* Hero */}
        <section className="relative text-center py-20">
          <div className="absolute top-0 left-0 w-full" style={{ height: '300px' }}>
            <img
              src="/bg.jpg"
              alt="Background"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute right-0 bottom-0 p-4 text-right text-white">
              <h2 className="text-4xl font-bold mb-2">Pankaj Ghuge</h2>
              <p className="text-gray-200 mb-4">
                Java Full Stack Developer | DevOps | DSA | Web Developer
              </p>
            </div>
          </div>

          <div className="relative z-10 flex justify-center pt-24">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white">
              <img src="/tj.jpg" alt="Pankaj Ghuge" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-16 w-full text-left">
          <h3 className="text-2xl font-bold text-white mb-4">About Me</h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-6xl">
            I am a <span className="font-semibold text-white">Java Full Stack Developer</span>{' '}
            with strong experience in building scalable backend systems using Java,
            Spring Boot, Hibernate, JPA, REST APIs, and Microservices.
            <br /><br />
            I have a solid foundation in{' '}
            <span className="font-semibold text-white">Data Structures and Algorithms (DSA)</span>,
            enabling efficient problem solving and optimized system design.
            <br /><br />
            On the frontend, I work with{' '}
            <span className="font-semibold text-white">React.js and Next.js</span>{' '}
            to build responsive and user-friendly interfaces.
            <br /><br />
            I also have hands-on experience in{' '}
            <span className="font-semibold text-white">DevOps</span> including Docker,
            CI/CD pipelines, Linux, Git, and GitHub.
            <br /><br />
            I am actively seeking roles as a{' '}
            <span className="text-blue-400 font-semibold">
              Java Full Stack / Backend / DevOps Engineer
            </span>.
          </p>
        </section>

        {/* Projects */}
        <section className="py-20">
          <h3 className="text-3xl font-bold mb-4">Projects</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <div key={i} className="p-8 border border-gray-700 rounded-lg hover:scale-105 transition">
                <h4 className="text-xl font-semibold">{p.title}</h4>
                <p className="text-gray-400 text-sm mt-2">{p.description}</p>
                <p className="text-gray-500 text-sm mt-1">{p.details}</p>
                <a href={p.link} target="_blank" className="text-blue-400 mt-4 inline-block">
                  View Project
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="py-20">
          <h3 className="text-3xl font-bold text-center mb-8">Skills</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {skills.map((s, i) => (
              <div key={i} className="p-6 border border-gray-700 rounded-lg flex items-center gap-4">
                <img src={s.img} alt={s.name} className="w-12 h-12" />
                <div>
                  <h4 className="font-semibold">{s.name}</h4>
                  <p className="text-gray-400 text-sm">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="py-24">
          <h3 className="text-3xl font-bold text-center mb-12">Achievements</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((a, i) => {
              const active = activeAchievement === i;
              return (
                <div
                  key={i}
                  onClick={() => setActiveAchievement(active ? null : i)}
                  className={`cursor-pointer p-8 border border-gray-700 rounded-xl transition ${
                    active ? 'scale-105 bg-black' : 'hover:scale-105'
                  }`}
                >
                  <h4 className="font-semibold">{a.title}</h4>
                  <p className="text-gray-400 text-sm">{a.short}</p>
                  {active && <p className="text-gray-300 text-sm mt-4">{a.extra}</p>}
                </div>
              );
            })}
          </div>
        </section>
=======
      <main className="container mx-auto p-4 overflow-x-hidden">

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section className="relative text-center py-20 overflow-hidden" style={{ minHeight: '420px' }}>

          {/* Layer 1 – background (deepest, slowest) */}
          <motion.div
            style={{ y: heroBgY, ...gpu }}
            className="absolute top-0 left-0 w-full"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
            aria-hidden="true"
          >
            <div style={{ height: '340px', position: 'relative' }}>
              <img src="/bg.jpg" alt="" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 55%, #000 100%)' }} />
            </div>
          </motion.div>

          {/* Layer 2 – ambient orbs (GPU-promoted, raw transform) */}
          {[
            { y: orb1Y, color: '#38bdf8', top: 32,  left: 40,  w: 140, blur: 28, delay: 0.3 },
            { y: orb2Y, color: '#818cf8', top: 20,  right: 60, w: 170, blur: 36, delay: 0.5 },
            { y: orb3Y, color: '#34d399', top: 60,  left: '44%', w: 210, blur: 44, delay: 0.7 },
          ].map(({ y, color, top, left, right, w, blur, delay }, i) => (
            <motion.div
              key={i}
              aria-hidden="true"
              style={{
                y, ...gpu,
                position: 'absolute', top, left, right,
                width: w, height: w, borderRadius: '50%',
                background: `radial-gradient(circle, ${color}, transparent)`,
                filter: `blur(${blur}px)`,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: i === 2 ? 0.07 : 0.12, scale: 1 }}
              transition={{ duration: 1.8, delay, ease: EASE_OUT_EXPO }}
            />
          ))}

          {/* Layer 3 – name/subtitle (medium) */}
          <motion.div
            style={{ y: heroTextY, ...gpu }}
            className="absolute right-0 bottom-4 p-6 text-right text-white z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT_EXPO }}
          >
            <h2 className="text-4xl font-bold mb-1">Pankaj Ghuge</h2>
            <p className="text-gray-300 text-sm">Full Stack Developer · ML Enthusiast · Cloud Expert</p>
          </motion.div>

          {/* Layer 4 – avatar (closest) */}
          <motion.div
            style={{ y: heroImgY, ...gpu }}
            className="relative z-10 flex flex-col items-center pt-28"
          >
            {/* Pulsing ring — CSS animation (no JS, perfect fps) */}
            <div
              aria-hidden="true"
              className="absolute rounded-full border border-sky-400/20"
              style={{
                width: '224px', height: '224px',
                animation: 'pulse-ring 3s ease-in-out infinite',
              }}
            />
            <motion.div
              className="relative w-44 h-44 rounded-full overflow-hidden shadow-2xl border-4 border-white"
              style={gpu}
              initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: EASE_OUT_EXPO }}
              whileHover={{ scale: 1.07, boxShadow: '0 0 48px rgba(56,189,248,0.4)', transition: SPRING_HOVER }}
            >
              <img src="/tj.jpg" alt="Pankaj Ghuge" className="object-cover w-full h-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* CSS keyframe for pulse ring — injected once */}
        <style>{`
          @keyframes pulse-ring {
            0%, 100% { transform: translateZ(0) scale(1);   opacity: 0.45; }
            50%       { transform: translateZ(0) scale(1.18); opacity: 0;    }
          }
        `}</style>

        {/* ── ABOUT ───────────────────────────────────────────────────────── */}
        <RevealOnScroll direction="up" className="py-16 w-full text-left">
          <h3 className="text-2xl font-bold text-white mb-6">About Me</h3>
          {[
            <>I am a <span className="text-white font-semibold">Java Full Stack Developer</span> with strong hands-on experience in building end-to-end applications using Java, Spring Boot, Hibernate, JPA, REST APIs, and Microservices. I enjoy designing scalable backend systems and writing clean, maintainable code.</>,
            <>I have a solid foundation in <span className="text-white font-semibold">Data Structures and Algorithms (DSA)</span>, which helps me solve complex problems efficiently and build optimized solutions.</>,
            <>On the frontend side, I work as a <span className="text-white font-semibold">Web Developer</span> using HTML, CSS, JavaScript, React.js, and Next.js to create responsive, user-friendly interfaces.</>,
            <>I also have hands-on experience with <span className="text-white font-semibold">DevOps practices</span> including Docker, CI/CD pipelines, Linux environments, Git, and GitHub, enabling smooth development-to-deployment workflows.</>,
            <>Additionally, I have worked with <span className="text-white font-semibold">Databases</span> such as MongoDB, MySQL, and PostgreSQL, along with <span className="text-white font-semibold">Cloud platforms</span> including AWS and Azure.</>,
            <>I am actively seeking opportunities as a <span className="text-sky-400 font-semibold">Java Full Stack / Backend / DevOps Engineer</span> where I can apply my skills, work on real-world systems, and grow as a software engineer.</>,
          ].map((para, i) => (
            <RevealOnScroll key={i} delay={i * 0.07} direction="left">
              <p className="text-gray-300 leading-relaxed text-sm max-w-5xl mb-4">{para}</p>
            </RevealOnScroll>
          ))}
        </RevealOnScroll>

        {/* ── PROJECTS ────────────────────────────────────────────────────── */}
        <section id="projects" className="py-20">
          <RevealOnScroll direction="up">
            <h3 className="text-3xl font-bold mb-10 text-white">Projects</h3>
          </RevealOnScroll>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.13}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                style={gpu}
                whileHover={{ scale: 1.035, y: -8, boxShadow: '0 24px 64px rgba(56,189,248,0.13)', transition: SPRING_HOVER }}
                className="bg-gray-900 p-8 rounded-2xl border border-gray-700 flex flex-col justify-between group"
              >
                {/* Accent bar — CSS transition, not JS, perfectly smooth */}
                <div
                  className="h-px bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mb-5 origin-left"
                  style={{ transform: 'scaleX(0)', transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1)' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scaleX(1)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scaleX(0)')}
                />
                <div>
                  <span className="text-xs font-mono text-sky-400 mb-3 block opacity-70">{project.tag}</span>
                  <h4 className="text-lg font-semibold text-white mb-2">{project.title}</h4>
                  <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                  <p className="text-gray-500 text-xs">{project.details}</p>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sky-400 text-sm font-medium"
                >
                  View on GitHub
                  {/* CSS keyframe arrow — zero JS overhead */}
                  <span style={{ display: 'inline-block', animation: 'arrow-bounce 1.6s ease-in-out infinite' }}>→</span>
                </a>
              </motion.div>
            ))}
          </StaggerContainer>
        </section>

        {/* CSS keyframe for arrow */}
        <style>{`
          @keyframes arrow-bounce {
            0%, 100% { transform: translateX(0) translateZ(0); }
            50%       { transform: translateX(5px) translateZ(0); }
          }
        `}</style>

        {/* ── SKILLS ──────────────────────────────────────────────────────── */}
        <section id="skills" className="py-20">
          <RevealOnScroll direction="up">
            <h3 className="text-3xl font-bold mb-10 text-center text-white">Skills</h3>
          </RevealOnScroll>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" staggerDelay={0.06}>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                style={gpu}
                whileHover={{ scale: 1.05, y: -5, transition: SPRING_HOVER }}
                className="bg-gray-900 p-5 rounded-xl border border-gray-700 flex items-center gap-4"
              >
                {/* Icon wobble — CSS, not JS */}
                <img
                  src={skill.img}
                  alt={skill.name}
                  className="w-12 h-12 flex-shrink-0"
                  style={{ transition: 'transform 0.38s cubic-bezier(0.16,1,0.3,1)', willChange: 'transform' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'rotate(-10deg) scale(1.15) translateZ(0)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'rotate(0deg) scale(1) translateZ(0)')}
                />
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">{skill.name}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </section>

        {/* ── ACHIEVEMENTS ────────────────────────────────────────────────── */}
        <section id="achievements" className="py-24">
          <RevealOnScroll direction="up">
            <h3 className="text-3xl font-bold mb-12 text-center text-white">Achievements</h3>
          </RevealOnScroll>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.11}>
            {achievements.map((item, index) => {
              const isActive = activeAchievement === index;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  style={gpu}
                  onClick={() => setActiveAchievement(isActive ? null : index)}
                  animate={{ scale: isActive ? 1.04 : 1, transition: SPRING_CARD }}
                  whileHover={!isActive ? { scale: 1.03, y: -4, transition: SPRING_HOVER } : {}}
                  className={`cursor-pointer rounded-2xl border p-8 transition-colors duration-200 ${
                    isActive
                      ? 'bg-gray-900 border-sky-500/50 shadow-[0_0_40px_rgba(56,189,248,0.11)]'
                      : 'bg-gray-900/60 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {/* Expanding underline — CSS transition */}
                  <div
                    className="h-px bg-sky-400 rounded-full mb-4"
                    style={{
                      width: isActive ? '100%' : '32px',
                      transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  />
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.short}</p>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="extra"
                        style={{ overflow: 'hidden' }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto', transition: { duration: 0.38, ease: EASE_OUT_QUART } }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.28, ease: 'easeIn' } }}
                      >
                        <p className="text-gray-300 text-sm leading-relaxed mt-4 border-t border-gray-700 pt-4">
                          {item.extra}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </section>

        {/* ── CONNECT ─────────────────────────────────────────────────────── */}
        <RevealOnScroll direction="scale" className="py-20 text-center">
          <h3 className="text-3xl font-bold mb-8 text-white">Connect with Me</h3>
          <div className="flex justify-center space-x-10">
            {[
              { href: 'https://github.com/PankkK18',                        src: '/icons8-github-30.png',   label: 'GitHub'   },
              { href: 'https://www.linkedin.com/in/pankaj-ghuge-075013276', src: '/icons8-linkedin-48.png', label: 'LinkedIn' },
            ].map(({ href, src, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={gpu}
                whileHover={{ scale: 1.26, rotate: 5, y: -5, transition: SPRING_SOCIAL }}
                whileTap={{ scale: 0.92, transition: { duration: 0.1 } }}
                className="flex flex-col items-center gap-2 group"
              >
                <img src={src} alt={label} className="w-12 h-12" />
                <span className="text-xs text-gray-500 group-hover:text-sky-400 transition-colors duration-150">
                  {label}
                </span>
              </motion.a>
            ))}
          </div>
        </RevealOnScroll>
>>>>>>> 3097e2c (updated my portfolio)

        {/* Connect */}
        <section className="py-20 text-center">
          <h3 className="text-3xl font-bold mb-6">Connect with Me</h3>
          <div className="flex justify-center gap-8">
            <a href="https://github.com/PankkK18">
              <img src="/icons8-github-30.png" className="w-12 h-12" />
            </a>
            <a href="https://www.linkedin.com/in/pankaj-ghuge-075013276">
              <img src="/icons8-linkedin-48.png" className="w-12 h-12" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}