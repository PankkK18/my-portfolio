'use client'; // Client-side rendering


import React, { useState } from 'react'; // Import useState from React
import Header from '../components/Header';
import Footer from '../components/Footer';
import './app.css'; // Ensure this path is correct

export default function Home() {
  // State for form data and response messages
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for form submission

  // Remove unused variables or use them in your code
const _responseMessage = "This is a placeholder message"; // Example of prefixing with underscore to suppress ESLint warning
const _loading = true;
const _handleSubmit = () => { /* some logic */ };
const _toggleDropdown = () => { /* some logic */ };
const [activeAchievement, setActiveAchievement] = useState(null);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.status === 201) {
        setResponseMessage(result.message);
        setFormData({ name: '', email: '', message: '' }); // Clear form fields
      } else {
        setResponseMessage(result.message);
      }
    } catch (error) {
      setResponseMessage('An error occurred. Please try again.');
    }

    setLoading(false); // End loading
  };

  // List of projects
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

{/* Projects Section */}
<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
    width: '100%',
  }}
>
  {projects.map((project, index) => (
    <div
      key={index}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.08)',
        color: '#ffffff',
      }}
    >
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>
          {project.title}
        </h3>

        <p style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.9 }}>
          {project.description}
        </p>

        <p style={{ fontSize: '13px', opacity: 0.7 }}>
          {project.details}
        </p>
      </div>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: '20px',
          color: '#38bdf8',
          textDecoration: 'none',
          fontWeight: '500',
        }}
      >
        View Project
      </a>
    </div>
  ))}
</div>


  // List of skills
 const skills = [
  {
    name: 'Java Full Stack',
    img: '/icons8-java-48.png',
    description: 'Java, Spring Boot, Hibernate, JPA, REST APIs, Microservices'
  },
  {
    name: 'DevOps',
    img: '/devops.png',
    description: 'Docker, CI/CD, AWS, Nginx, Linux, GitHub Actions'
  },
  {
    name: 'Web Developer',
    img: '/webdev.png',
    description: 'HTML, CSS, JavaScript, React.js, Next.js, Responsive Design'
  },
  {
    name: 'Databases',
    img: '/icons8-mongo-db-48.png',
    description: 'MongoDB, MySQL, PostgreSQL'
  },
  {
    name: 'Frameworks & Tools',
    img: '/icons8-tailwind-css-48.png',
    description: 'React.js, Tailwind CSS, Next.js, Git, GitHub'
  },
  {
    name: 'Programming Languages',
    img: '/icons8-python-48.png',
    description: 'Java, Python, JavaScript, C++, SQL'
  },
  {
    name: 'JavaScript Frameworks',
    img: '/js.png',
    description: 'React, Vue.js'
  },
  {
    name: 'Version Control',
    img: '/icons8-github-30.png',
    description: 'Git, GitHub'
  },
  {
    name: 'Cloud Services',
    img: '/aws.png',
    description: 'AWS, Azure'
  }
];


  // Achievements & Certifications
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
        {/* Introduction Section */}
        <section className="relative text-center py-20">
          {/* Background Div */}
          <div className="absolute top-0 left-0 w-full bg-gradient-to-r" style={{ height: '300px' }}>
            <img src="/bg.jpg" alt="Background" className="w-full h-full object-cover opacity-50" />
            {/* Text Section inside Background Div */}
            <div className="absolute right-0 bottom-0 p-4 text-right text-white">
              <h2 className="text-4xl font-bold mb-2">Pankaj Ghuge</h2>
              <p className="text-gray-200 mb-4">
                Full Stack Developer | Machine Learning Enthusiast | Cloud Computing Expert
              </p>
            </div>
          </div>

          {/* Profile Section */}
          <div className="relative z-10 container mx-auto flex flex-col items-center pt-24">
            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-white mb-4">
              <img src="/tj.jpg" alt="Pankaj Ghuge" className="object-cover w-full h-full" />
            </div>
          </div>
        </section>
        <section className="py-16 w-full text-left">
  <h3 className="text-2xl font-bold text-white mb-4">
    About Me
  </h3>

  <p className="text-gray-300 leading-relaxed text-sm max-w-6xl">
    I am a <span className="text-white font-semibold">Java Full Stack Developer</span>{' '}
    with strong hands-on experience in building end-to-end applications using
    Java, Spring Boot, Hibernate, JPA, REST APIs, and Microservices.
    I enjoy designing scalable backend systems and writing clean, maintainable code.
    <br /><br />
    I have a solid foundation in{' '}
    <span className="text-white font-semibold">Data Structures and Algorithms (DSA)</span>,
    which helps me solve complex problems efficiently and build optimized solutions.
    <br /><br />
    On the frontend side, I work as a{' '}
    <span className="text-white font-semibold">Web Developer</span>{' '}
    using HTML, CSS, JavaScript, React.js, and Next.js to create responsive,
    user-friendly interfaces.
    <br /><br />
    I also have hands-on experience with{' '}
    <span className="text-white font-semibold">DevOps practices</span>{' '}
    including Docker, CI/CD pipelines, Linux environments, Git, and GitHub,
    enabling smooth development-to-deployment workflows.
    <br /><br />
    Additionally, I have worked with{' '}
    <span className="text-white font-semibold">Databases</span>{' '}
    such as MongoDB, MySQL, and PostgreSQL, along with modern frameworks and tools
    like Tailwind CSS and Next.js. I also have exposure to{' '}
    <span className="text-white font-semibold">Cloud platforms</span>{' '}
    including AWS and Azure.
    <br /><br />
    I am actively seeking opportunities as a{' '}
    <span className="text-blue-400 font-semibold">
      Java Full Stack / Backend / DevOps Engineer
    </span>{' '}
    where I can apply my skills, work on real-world systems, and grow as a software engineer.
  </p>
</section>


        {/* Projects Section */}
        <section id="projects" className="py-20">
          <h3 className="text-3xl font-bold mb-4">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-black-100 p-8 rounded-lg shadow-md border border-gray-700 transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                <p className="text-gray-600">{project.description}</p>
                <p className="text-gray-500">{project.details}</p>
                <a href={project.link} className="text-blue-500" target="_blank" rel="noopener noreferrer">View Project</a>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <h3 className="text-3xl font-bold mb-8 text-center text-white">Skills</h3>
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-black-800 p-8 rounded-lg shadow-lg flex items-center border border-gray-700 transition-transform duration-300 ease-in-out hover:scale-110"
                >
                  <img
                    src={skill.img}
                    alt={skill.name}
                    className="w-16 h-16 mr-6"
                  />
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-white">{skill.name}</h4>
                    <p className="text-gray-400">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
   <section id="achievements" className="py-24">
  <h3 className="text-3xl font-bold mb-12 text-center text-white">
    Achievements
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {achievements.map((item, index) => {
      const isActive = activeAchievement === index;

      return (
        <div
          key={index}
          onClick={() =>
            setActiveAchievement(isActive ? null : index)
          }
          className={`
            cursor-pointer rounded-2xl border border-gray-700 p-8
            transition-all duration-500 ease-in-out
            ${isActive
              ? 'scale-110 bg-black shadow-2xl ring-2 ring-blue-500/40'
              : 'bg-black/60 hover:scale-105'}
          `}
        >
          {/* Title */}
          <h4 className="text-xl font-semibold text-white mb-2">
            {item.title}
          </h4>

          {/* Short text */}
          <p className="text-gray-400 text-sm">
            {item.short}
          </p>

          {/* Expanded text */}
          {isActive && (
            <p className="text-gray-300 text-sm leading-relaxed mt-4">
              {item.extra}
            </p>
          )}
        </div>
      );
    })}
  </div>
</section>



        {/* Connect with Me Section */}
        <section id="connect" className="py-20 text-center">
          <h3 className="text-3xl font-bold mb-4">Connect with Me</h3>
          <div className="flex justify-center space-x-8">
            <a href="https://github.com/PankkK18" className="hover:scale-110 transition-transform duration-300">
              <img src="/icons8-github-30.png" alt="GitHub" className="w-12 h-12" />
            </a>
            <a href="https://www.linkedin.com/in/pankaj-ghuge-075013276" className="hover:scale-110 transition-transform duration-300">
              <img src="/icons8-linkedin-48.png" alt="LinkedIn" className="w-12 h-12" />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
