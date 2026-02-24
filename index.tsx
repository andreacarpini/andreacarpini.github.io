
import React from 'react';
import { createRoot } from 'react-dom/client';

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  tools: string[];
  image: string;
  link: string;
  status: 'completed' | 'in-process';
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Stephen Asma",
    description: "A professional portfolio website for Stephen Asma, Professor of Philosophy, author, and cultural critic. Features an artistic design showcasing publications, research, and media appearances.",
    tools: ["JavaScript", "HTML5", "CSS3"],
    image: "./images/beetle.jpeg",
    link: "https://stephenasma.com",
    status: 'completed'
  },
  {
    id: 2,
    title: "Medstar Consulting",
    description: "Medical tourism agency connecting US patients with Turkey's premier healthcare providers for surgical and wellness treatments.",
    tools: ["React", "TypeScript", "Tailwind", "JavaScript"],
    image: "./images/instanbul-guide.webp",
    link: "https://medstarconsult.com",
    status: 'completed'
  },
  {
    id: 3,
    title: "Aura Workspace",
    description: "An experimental spatial canvas for organizing thoughts and code snippets.",
    tools: ["React Three Fiber", "WebXR", "Zustand"],
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop",
    link: "https://andrew-karpensky.github.io/aura-workspace",
    status: 'in-process'
  },
  {
    id: 4,
    title: "Monolith UI",
    description: "A component library inspired by brutalist architecture and modular design.",
    tools: ["Framer Motion", "React", "Radix UI"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    link: "https://andrew-karpensky.github.io/monolith-ui",
    status: 'in-process'
  },
  {
    id: 5,
    title: "SheetLabel",
    description: "Google Sheets add-on for real-time inventory tracking with zero-install mobile scanning. Batch-generates thermal label PDFs and supports offline check-in/check-out sync directly inside the Sheets workflow.",
    tools: ["Google Apps Script", "Google Sheets API", "Tailwind CSS", "jsPDF + JsBarcode", "PWA"],
    image: "./images/logo_2.svg",
    link: "https://sheetlabel.app/",
    status: 'completed'
  }
];


// --- Shared Components ---

const ArrowIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg 
    viewBox="0 0 12 12" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`shrink-0 ${className}`}
  >
    <path 
      d="M1 11L11 1M11 1H3.5M11 1V8.5" 
      stroke="currentColor" 
      strokeWidth="1.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const Navbar = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for the fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-10 flex justify-center items-baseline mix-blend-difference text-white">
      <div className="flex gap-12 text-[10px] uppercase tracking-[0.2em] font-medium">
        <a 
          href="#work" 
          onClick={(e) => handleScroll(e, 'work')} 
          className="hover:opacity-50 transition-opacity"
        >
          Projects
        </a>
        <a 
          href="#process" 
          onClick={(e) => handleScroll(e, 'process')} 
          className="hover:opacity-50 transition-opacity"
        >
          In Process
        </a>
        <a href="mailto:bluer.mullion.0h@icloud.com" className="hover:opacity-50 transition-opacity">Contact</a>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center px-8 md:px-24">
    <div className="max-w-4xl fade-in">
      <h1 className="serif text-6xl md:text-8xl lg:text-9xl mb-8 tracking-tighter">
        Andrew <br />
        <span className="italic">Karpensky</span>
      </h1>
      <p className="text-lg md:text-xl font-light leading-relaxed max-w-xl text-neutral-600">
        Web development.
      </p>
    </div>
  </section>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="project-card group cursor-pointer mb-24 md:mb-32 flex flex-col">
    <div className="aspect-[4/5] overflow-hidden bg-neutral-100 mb-6 thin-border border">
      <img 
        src={project.image} 
        alt={project.title} 
        className="project-image w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
      />
    </div>
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1">
        <h3 className="serif text-2xl mb-2">{project.title}</h3>
        <p className="text-sm text-neutral-500 mb-4 leading-relaxed font-light">{project.description}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {project.tools.map(tool => (
            <span key={tool} className="text-[9px] uppercase tracking-widest text-neutral-400">
              {tool}
            </span>
          ))}
        </div>
      </div>
      <a 
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest mt-2 group-hover:translate-x-1 transition-transform whitespace-nowrap shrink-0 hover:opacity-70"
      >
        View <ArrowIcon />
      </a>
    </div>
  </div>
);

const App = () => {
  const completedProjects = PROJECTS.filter(p => p.status === 'completed');
  const inProcessProjects = PROJECTS.filter(p => p.status === 'in-process');

  return (
    <div className="relative">
      <Navbar />
      <Hero />

      <main id="work" className="px-8 md:px-24 pb-32 scroll-mt-32">
        <div className="flex items-center gap-8 mb-24 md:mb-32">
          <h2 className="serif text-3xl md:text-5xl shrink-0">Recent Works</h2>
          <div className="h-[1px] w-full bg-neutral-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24">
          {completedProjects.map((project, idx) => (
            <div key={project.id} className={idx % 2 !== 0 ? 'md:mt-32' : ''}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <section id="process" className="mt-32 scroll-mt-32">
          <div className="flex items-center gap-8 mb-24 md:mb-32">
            <h2 className="serif text-3xl md:text-5xl shrink-0">In Process</h2>
            <div className="h-[1px] w-full bg-neutral-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {inProcessProjects.map(project => (
              <div key={project.id} className="group border-b thin-border pb-12">
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  Building
                </div>
                <h3 className="serif text-xl mb-4 group-hover:italic transition-all">{project.title}</h3>
                <p className="text-sm text-neutral-500 font-light mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-4 mb-6">
                  {project.tools.slice(0, 2).map(t => (
                    <span key={t} className="text-[9px] uppercase tracking-widest text-neutral-300">{t}</span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest border-b border-black pb-1 whitespace-nowrap">
                  View <ArrowIcon className="w-2.5 h-2.5" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="px-8 md:px-24 py-24 border-t thin-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <h4 className="serif text-4xl mb-4">Andrew Karpensky</h4>
          </div>
          <div className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.3em]">
            <a href="https://github.com/andreacarpini" target="_blank" className="hover:opacity-50 transition-opacity">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
