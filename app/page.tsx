'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './app.css';

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
  ];

  return (
    <>
      <Header />

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
