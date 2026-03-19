
import React from 'react';
import { createRoot } from 'react-dom/client';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-10 flex justify-center items-baseline mix-blend-difference text-white">
      <div className="flex gap-12 text-[10px] uppercase tracking-[0.2em] font-medium">
        <a href="mailto:bluer.mullion.0h@icloud.com" className="hover:opacity-50 transition-opacity">Contact</a>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="h-[100dvh] flex items-center justify-center px-6 md:px-16">
    <div className="fade-in">
      <h1 className="serif text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05]">
        Andrew<br />
        <span className="italic">Karpensky</span>
      </h1>
    </div>
  </section>
);

const App = () => (
  <>
    <Navbar />
    <div className="center-line" aria-hidden="true" />
    <Hero />

    <footer className="fixed bottom-0 left-0 w-full py-10 flex justify-center mix-blend-difference text-white">
      <div className="text-[10px] uppercase tracking-[0.2em] font-medium">
        <a href="https://github.com/andreacarpini" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">GitHub</a>
      </div>
    </footer>
  </>
);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
