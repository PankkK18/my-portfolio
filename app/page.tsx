'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './app.css';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  title: string;
  tag: string;
  description: string;
  details: string;
  link: string;
  icon: string;
  techStack: string[];
  gradient: string;
}

interface Skill {
  name: string;
  img: string;
  description: string;
  level: number;
}

interface Achievement {
  title: string;
  short: string;
  extra: string;
  icon: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  grade: string;
  icon: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
  link: string;
  icon: string;
}

interface ProgressItem {
  name: string;
  progress: number;
  total: number;
  icon: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const gpu: React.CSSProperties = { willChange: 'transform', transform: 'translateZ(0)' };

const SPRING_PARALLAX = { stiffness: 40, damping: 28, mass: 0.6 };
const SPRING_HOVER = { stiffness: 350, damping: 40, mass: 0.5 };
const SPRING_CARD = { stiffness: 280, damping: 38, mass: 0.6 };
const SPRING_SOCIAL = { stiffness: 320, damping: 36, mass: 0.5 };

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];

// ─── Card variants ────────────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT_QUART },
  },
};

// ─── RevealOnScroll with enhanced smoothness ─────────────────────────────────
function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px 0px', amount: 0.3 });

  const hidden = {
    opacity: 0,
    y: direction === 'up' ? 48 : direction === 'down' ? -48 : 0,
    x: direction === 'left' ? 48 : direction === 'right' ? -48 : 0,
    scale: direction === 'scale' ? 0.88 : 1,
  };
  const visible = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, delay, ease: EASE_OUT_EXPO },
  };

  return (
    <motion.div
      id={id}
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

// ─── StaggerContainer ─────────────────────────────────────────────────────────
function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.09,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px 0px', amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Admin Panel Component (Only visible to you) ─────────────────────────────
function AdminPanel({ 
  progressItems, 
  onUpdateProgress, 
  projectLinks, 
  onUpdateProjectLink,
  isOpen,
  onClose 
}: { 
  progressItems: ProgressItem[];
  onUpdateProgress: (index: number, value: number) => void;
  projectLinks: { [key: string]: string };
  onUpdateProjectLink: (projectTitle: string, newLink: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Change this password to your desired one
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setShowPasswordPrompt(false);
    } else {
      alert('Wrong password!');
    }
  };

  if (!isOpen) return null;

  if (showPasswordPrompt) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white mb-4 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg text-white font-semibold"
            >
              Login
            </button>
          </form>
          <p className="text-gray-500 text-xs mt-4 text-center">Hint: admin123</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 overflow-y-auto">
      <div className="min-h-screen p-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 rounded-2xl p-6 max-w-4xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Progress Tracking Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">📊 Update Progress</h3>
            <div className="space-y-4">
              {progressItems.map((item, idx) => (
                <div key={idx} className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-white font-semibold">{item.name}</span>
                    </div>
                    <span className="text-sky-400">
                      {item.progress}/{item.total} weeks
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={item.total}
                    value={item.progress}
                    onChange={(e) => onUpdateProgress(idx, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0</span>
                    <span>{item.total} weeks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Links Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">🔗 Update Project Links</h3>
            <div className="space-y-3">
              {Object.entries(projectLinks).map(([title, link]) => (
                <div key={title} className="bg-gray-800 rounded-xl p-4">
                  <label className="text-white text-sm mb-2 block">{title}</label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => onUpdateProjectLink(title, e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-sky-500"
                    placeholder="Enter GitHub link"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-gray-500 text-xs">
            <p>💡 Changes are saved automatically to your browser's localStorage</p>
            <p className="mt-1">Your data will persist even after refreshing the page</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Progress Bar Component (Adaptive) ──────────────────────────────────────
function AdaptiveProgressBar({ items }: { items: ProgressItem[] }) {
  const totalProgress = items.reduce((acc, item) => acc + (item.progress / item.total) * 100, 0) / items.length;
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">📚 Learning Progress</h3>
      <div className="space-y-4">
        {items.map((item, idx) => {
          const percentage = (item.progress / item.total) * 100;
          return (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300 flex items-center gap-2">
                  <span>{item.icon}</span> {item.name}
                </span>
                <span className="text-sky-400">{Math.round(percentage)}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-300">Overall Progress</span>
          <span className="text-emerald-400 font-semibold">{Math.round(totalProgress)}%</span>
        </div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

// ─── 5 Enhanced Projects ─────────────────────────────────────────────────────
const PROJECTS_DATA: Project[] = [
  {
    title: 'DYPCET Hub',
    tag: 'PHP · JS · HTML',
    description: 'A centralized platform for college clubs to share information and coordinate events.',
    details: 'Integrates all club activities with real-time updates on events, meetings, and opportunities.',
    link: 'https://github.com/PankkK18/DYPCET_HUB-',
    icon: '🏫',
    techStack: ['PHP', 'JavaScript', 'MySQL', 'HTML5', 'CSS3'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Oil Consumption Monitor',
    tag: 'JS · PHP · Data Viz',
    description: 'Smart monitoring system to track and reduce oil consumption patterns.',
    details: 'Data analysis and visualization platform helping users reduce unnecessary oil wastage.',
    link: 'https://github.com/PankkK18/Oil_Consumption_Monitoring-',
    icon: '🛢️',
    techStack: ['JavaScript', 'PHP', 'Chart.js', 'MySQL', 'Bootstrap'],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Parallax Portfolio',
    tag: 'HTML · CSS · JS',
    description: 'Modern portfolio with immersive parallax scrolling animations.',
    details: 'Features smooth animations and responsive design using modern web technologies.',
    link: 'https://github.com/PankkK18/ParallaxAnimation-Portfolio',
    icon: '✨',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Parallax.js', 'GSAP'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'E-Learning Platform',
    tag: 'React · Node · MongoDB',
    description: 'Full-stack educational platform for online courses and tutorials.',
    details: 'Complete learning management system with user authentication and course enrollment.',
    link: 'https://github.com/PankkK18/E-Learning-Platform',
    icon: '📚',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'AI Image Generator',
    tag: 'Python · TensorFlow · React',
    description: 'AI-powered image generation using stable diffusion models.',
    details: 'Generates unique images from text descriptions with customizable parameters.',
    link: 'https://github.com/PankkK18/AI-Image-Generator',
    icon: '🎨',
    techStack: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Docker'],
    gradient: 'from-indigo-500 to-purple-500',
  },
];

// ─── Skills Data ─────────────────────────────────────────────────────────────
const SKILLS_DATA: Skill[] = [
  { name: 'Java Full Stack', img: '/icons8-java-48.png', description: 'Spring Boot, Hibernate, JPA, REST APIs', level: 90 },
  { name: 'DevOps', img: '/devops.png', description: 'Docker, CI/CD, AWS, Kubernetes', level: 85 },
  { name: 'Web Developer', img: '/webdev.png', description: 'React, Next.js, TypeScript', level: 88 },
  { name: 'Databases', img: '/icons8-mongo-db-48.png', description: 'MongoDB, PostgreSQL, MySQL', level: 87 },
  { name: 'Frameworks', img: '/icons8-tailwind-css-48.png', description: 'Tailwind, Bootstrap, Material UI', level: 92 },
  { name: 'Programming', img: '/icons8-python-48.png', description: 'Java, Python, JavaScript, C++', level: 89 },
  { name: 'Cloud Services', img: '/aws.png', description: 'AWS, Azure, GCP', level: 82 },
  { name: 'Version Control', img: '/icons8-github-30.png', description: 'Git, GitHub, GitLab', level: 94 },
];

// ─── Education Data ─────────────────────────────────────────────────────────
const EDUCATION_DATA: Education[] = [
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Dr. Babasaheb Ambedkar Technological University",
    year: "2020 - 2024",
    grade: "CGPA: 8.5/10",
    icon: "🎓",
  },
  {
    degree: "Higher Secondary Education (12th)",
    institution: "Maharashtra State Board",
    year: "2018 - 2020",
    grade: "Percentage: 82%",
    icon: "📖",
  },
  {
    degree: "Secondary Education (10th)",
    institution: "Maharashtra State Board",
    year: "2018",
    grade: "Percentage: 88%",
    icon: "🏫",
  },
];

// ─── Certifications Data ────────────────────────────────────────────────────
const CERTIFICATIONS_DATA: Certification[] = [
  {
    name: "Java Programming Masterclass",
    issuer: "Udemy",
    year: "2023",
    link: "#",
    icon: "☕",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    link: "#",
    icon: "☁️",
  },
  {
    name: "Full Stack Web Development",
    issuer: "Coursera",
    year: "2023",
    link: "#",
    icon: "🌐",
  },
  {
    name: "Data Structures & Algorithms",
    issuer: "LeetCode",
    year: "2024",
    link: "#",
    icon: "📊",
  },
];

// ─── Achievements Data ──────────────────────────────────────────────────────
const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    title: 'SG Esports – Trial Athlete',
    short: 'Competitive BGMI player',
    extra: 'Played trial matches with Skylightz Gaming (SG), a top-tier Indian BGMI organization.',
    icon: '🎮',
  },
  {
    title: 'Skylightz Gaming (SG)',
    short: 'Professional Esports Association',
    extra: "Associated with one of India's most competitive BGMI teams.",
    icon: '🏆',
  },
  {
    title: 'Smart Aurangabad Hackathon 2020',
    short: '1st Runner-Up',
    extra: 'Secured 1st Runner-Up position by building an innovative technical solution.',
    icon: '💡',
  },
];

const SOCIAL_LINKS = [
  { href: 'https://github.com/PankkK18', src: '/icons8-github-30.png', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/pankaj-ghuge-075013276', src: '/icons8-linkedin-48.png', label: 'LinkedIn' },
];

// ─── Resume Download Button Component ────────────────────────────────────────
function ResumeButton() {
  return (
    <motion.a
      href="/resume.pdf"
      download
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full font-semibold text-white shadow-lg hover:shadow-emerald-500/25 transition-all"
    >
      📄 Download Resume
    </motion.a>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function Home() {
  const [activeAchievement, setActiveAchievement] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Load progress from localStorage
  const [progressItems, setProgressItems] = useState<ProgressItem[]>([
    { name: "Full Stack Development Course", progress: 2, total: 8, icon: "🎓" },
    { name: "DevOps Certification", progress: 1, total: 6, icon: "☁️" },
    { name: "Data Structures & Algorithms", progress: 3, total: 10, icon: "📊" },
    { name: "Cloud Computing (AWS)", progress: 2, total: 5, icon: "🖥️" },
  ]);

  // Load project links from localStorage
  const [projectLinks, setProjectLinks] = useState<{ [key: string]: string }>(() => {
    const saved = localStorage.getItem('projectLinks');
    if (saved) {
      return JSON.parse(saved);
    }
    const initial: { [key: string]: string } = {};
    PROJECTS_DATA.forEach(p => { initial[p.title] = p.link; });
    return initial;
  });

  // Save to localStorage whenever links change
  useEffect(() => {
    localStorage.setItem('projectLinks', JSON.stringify(projectLinks));
  }, [projectLinks]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('learningProgress', JSON.stringify(progressItems));
  }, [progressItems]);

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('learningProgress');
    if (saved) {
      try {
        setProgressItems(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleUpdateProgress = (index: number, value: number) => {
    const newItems = [...progressItems];
    newItems[index].progress = value;
    setProgressItems(newItems);
  };

  const handleUpdateProjectLink = (projectTitle: string, newLink: string) => {
    setProjectLinks(prev => ({ ...prev, [projectTitle]: newLink }));
  };

  // Secret key combination to open admin panel (press 'A' three times)
  useEffect(() => {
    let keyCount = 0;
    let timeout: NodeJS.Timeout;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'a' || e.key === 'A') {
        keyCount++;
        clearTimeout(timeout);
        timeout = setTimeout(() => { keyCount = 0; }, 1000);
        
        if (keyCount === 3) {
          setIsAdminOpen(true);
          keyCount = 0;
        }
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.8 });
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Admin Button - Only visible to you */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 group"
        title="Admin Panel (Press 'aaa')"
      >
        <span className="text-xl">⚙️</span>
        <span className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Admin Panel
        </span>
      </button>

      {/* Admin Panel */}
      <AdminPanel
        progressItems={progressItems}
        onUpdateProgress={handleUpdateProgress}
        projectLinks={projectLinks}
        onUpdateProjectLink={handleUpdateProjectLink}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <Header />

      <main className="container mx-auto px-4 sm:px-6 md:px-10 overflow-x-hidden">
        {/* ── HERO SECTION with Profile Photo ──────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000" />
            </div>
          </div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 relative inline-block"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-400 border-r-indigo-400"
                style={{ width: '180px', height: '180px', margin: '-8px' }}
              />
              
              <div className="relative w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="/tj.jpg"
                  alt="Pankaj Ghuge"
                  className="w-full h-full object-cover"
                />
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-4"
            >
              <div className="inline-block px-4 py-2 bg-sky-500/10 rounded-full border border-sky-500/30 mb-6">
                <span className="text-sky-400 text-sm font-mono">✨ Available for opportunities</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
            >
              Pankaj Ghuge
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
            >
              Full Stack Developer & DevOps Engineer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full font-semibold text-white shadow-lg hover:shadow-sky-500/25 transition-shadow"
              >
                View My Work
              </motion.a>
              <ResumeButton />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-2 bg-sky-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ── QUICK STATS BAR ────────────────────────────────────────────────────── */}
        <section className="py-12 bg-gray-800/30 backdrop-blur-sm border-y border-gray-700">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { value: "15+", label: "Projects", icon: "🚀" },
                { value: "3+", label: "Years Experience", icon: "💼" },
                { value: "10+", label: "Technologies", icon: "⚡" },
                { value: "24/7", label: "Learning", icon: "📚" },
                { value: "100%", label: "Commitment", icon: "🎯" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-sky-400">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEARNING PROGRESS SECTION ───────────────────────────────── */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <AdaptiveProgressBar items={progressItems} />
          </div>
        </section>

        {/* ── EDUCATION SECTION ────────────────────────────────────────── */}
        <section id="education" className="py-24">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll direction="up">
              <div className="text-center mb-16">
                <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6 rounded-full" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Education</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Academic background and qualifications</p>
              </div>
            </RevealOnScroll>

            <StaggerContainer className="space-y-6">
              {EDUCATION_DATA.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ x: 10, transition: SPRING_HOVER }}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-sky-500/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{edu.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                      <p className="text-sky-400 mb-2">{edu.institution}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-gray-400">📅 {edu.year}</span>
                        <span className="text-gray-400">📊 {edu.grade}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── CERTIFICATIONS SECTION ────────────────────────────────── */}
        <section id="certifications" className="py-24 bg-gray-900/30">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll direction="up">
              <div className="text-center mb-16">
                <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6 rounded-full" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Certifications</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Professional certifications and courses completed</p>
              </div>
            </RevealOnScroll>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CERTIFICATIONS_DATA.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, transition: SPRING_HOVER }}
                  onClick={() => setSelectedCert(selectedCert === index ? null : index)}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-sky-500/30 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{cert.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{cert.name}</h3>
                      <p className="text-sky-400 text-sm">{cert.issuer}</p>
                      <p className="text-gray-500 text-xs mt-1">{cert.year}</p>
                    </div>
                    <motion.div animate={{ rotate: selectedCert === index ? 180 : 0 }} className="text-gray-400">▼</motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {selectedCert === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto', transition: { duration: 0.3 } }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-700"
                      >
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-sky-400 text-sm hover:underline">View Certificate →</a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── ABOUT SECTION ────────────────────────────────────────────── */}
        <section id="about" className="py-24 relative">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll direction="up">
              <div className="text-center mb-16">
                <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6 rounded-full" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Passionate developer with expertise in full-stack development</p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <RevealOnScroll direction="left">
                <div className="space-y-6">
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center"><span className="text-2xl">💻</span></div>
                      <h3 className="text-xl font-semibold text-white">Full Stack Expertise</h3>
                    </div>
                    <p className="text-gray-300">Java Full Stack Developer with expertise in Spring Boot, Microservices, and modern frontend frameworks.</p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center"><span className="text-2xl">⚡</span></div>
                      <h3 className="text-xl font-semibold text-white">Problem Solver</h3>
                    </div>
                    <p className="text-gray-300">Strong foundation in Data Structures & Algorithms, enabling optimized solutions for complex problems.</p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center"><span className="text-2xl">☁️</span></div>
                      <h3 className="text-xl font-semibold text-white">DevOps & Cloud</h3>
                    </div>
                    <p className="text-gray-300">Experienced with Docker, CI/CD pipelines, AWS, and Azure for seamless deployment and scaling.</p>
                  </motion.div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="right">
                <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                  <h3 className="text-2xl font-bold text-white mb-6">Key Strengths</h3>
                  <div className="space-y-4">
                    {[
                      { strength: "Strong Problem Solving", desc: "400+ DSA problems solved", icon: "🧩" },
                      { strength: "Team Collaboration", desc: "Experience in agile environments", icon: "🤝" },
                      { strength: "Quick Learner", desc: "Adapt quickly to new technologies", icon: "🚀" },
                      { strength: "Communication", desc: "Excellent verbal and written skills", icon: "💬" },
                    ].map((item, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50">
                        <span className="text-2xl">{item.icon}</span>
                        <div><p className="text-white font-semibold">{item.strength}</p><p className="text-gray-400 text-sm">{item.desc}</p></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* ── PROJECTS SECTION ──────────────────────────────────────────────── */}
        <section id="projects" className="py-24 relative">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll direction="up">
              <div className="text-center mb-16">
                <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6 rounded-full" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Here are some of my best works</p>
              </div>
            </RevealOnScroll>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS_DATA.map((project, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  onHoverStart={() => setHoveredProject(index)}
                  onHoverEnd={() => setHoveredProject(null)}
                  whileHover={{ y: -10, transition: SPRING_HOVER }}
                  className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-sky-500/50 transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="p-8">
                    <div className="text-5xl mb-4">{project.icon}</div>
                    <span className="text-xs font-mono text-sky-400 mb-3 block">{project.tag}</span>
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech, i) => (<span key={i} className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">{tech}</span>))}
                    </div>
                    <motion.a href={projectLinks[project.title] || project.link} target="_blank" rel="noopener noreferrer" whileHover={{ x: 5 }} className="inline-flex items-center gap-2 text-sky-400 text-sm font-medium group/link">
                      View Project <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── SKILLS SECTION ─────────────────────────────────────────────── */}
        <section id="skills" className="py-24 relative bg-gray-900/30">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll direction="up">
              <div className="text-center mb-16">
                <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6 rounded-full" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technical Skills</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Technologies I work with</p>
              </div>
            </RevealOnScroll>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILLS_DATA.map((skill, index) => (
                <motion.div key={index} variants={cardVariants} whileHover={{ scale: 1.02, transition: SPRING_HOVER }} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={skill.img} alt={skill.name} className="w-12 h-12" />
                    <div className="flex-1"><h3 className="text-white font-semibold">{skill.name}</h3><p className="text-gray-400 text-sm">{skill.description}</p></div>
                    <span className="text-sky-400 font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1, ease: EASE_OUT_QUART }} className={`h-full bg-gradient-to-r ${skill.level >= 90 ? 'from-sky-400 to-indigo-500' : 'from-sky-400 to-sky-500'} rounded-full`} />
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── ACHIEVEMENTS SECTION ──────────────────────────────────────────── */}
        <section id="achievements" className="py-24">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll direction="up">
              <div className="text-center mb-16">
                <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6 rounded-full" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Achievements</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Recognition and milestones</p>
              </div>
            </RevealOnScroll>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ACHIEVEMENTS_DATA.map((item, index) => {
                const isActive = activeAchievement === index;
                return (
                  <motion.div key={index} variants={cardVariants} onClick={() => setActiveAchievement(isActive ? null : index)} whileHover={!isActive ? { y: -5, transition: SPRING_HOVER } : {}} className={`cursor-pointer rounded-2xl border p-8 transition-all duration-300 ${isActive ? 'bg-gradient-to-br from-sky-900/30 to-indigo-900/30 border-sky-500 shadow-lg shadow-sky-500/10' : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'}`}>
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <div className={`h-1 bg-sky-400 rounded-full mb-4 transition-all duration-400 ${isActive ? 'w-full' : 'w-12'}`} />
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.short}</p>
                    <AnimatePresence>{isActive && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto', transition: { duration: 0.4 } }} exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}><p className="text-gray-300 text-sm mt-4 pt-4 border-t border-gray-700">{item.extra}</p></motion.div>)}</AnimatePresence>
                  </motion.div>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* ── CONNECT SECTION ───────────────────────────────────────────────── */}
        <RevealOnScroll direction="scale" className="py-24 text-center" id="connect">
          <div className="max-w-4xl mx-auto">
            <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mb-6 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's Connect</h2>
            <p className="text-gray-400 text-lg mb-8">I'm always interested in hearing about new opportunities</p>
            <div className="flex justify-center space-x-12">
              {SOCIAL_LINKS.map(({ href, src, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, rotate: 5, y: -5, transition: SPRING_SOCIAL }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-sky-500/20 group-hover:to-indigo-500/20 transition-all duration-300">
                    <img src={src} alt={label} className="w-8 h-8" />
                  </div>
                  <span className="text-sm text-gray-500 group-hover:text-sky-400 transition-colors">{label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </main>

      <Footer />
    </>
  );
}