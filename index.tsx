
import React from 'react';
import { createRoot } from 'react-dom/client';

const Navbar = () => {
  return (
    <nav style={{ border: '1px dashed var(--border-md)' }} className="fixed top-0 left-0 w-full z-50 px-8 py-10 flex justify-center items-baseline">
      <div className="flex gap-12 text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--ink)' }}>
        <a href="mailto:bluer.mullion.0h@icloud.com">Contact</a>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="h-[100dvh] flex items-center justify-center px-6 md:px-16">
    <div className="fade-in" style={{ border: '1px dashed var(--border-md)', padding: '2rem 2.5rem' }}>
      <h1 className="serif text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05]">
        Andrew<br />
        <span className="italic">Karpensky</span>
      </h1>
    </div>
  </section>
);

const App = () => (
  <>
    <div style={{ position: 'fixed', inset: '16px', border: '1px dashed var(--border-md)', pointerEvents: 'none', zIndex: 9999 }} aria-hidden="true" />
    <Navbar />
    <div className="center-line" aria-hidden="true" />
    <Hero />

    <footer style={{ border: '1px dashed var(--border-md)' }} className="fixed bottom-0 left-0 w-full py-10 flex justify-center">
      <div className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--ink)' }}>
        <a href="https://github.com/andreacarpini" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </footer>
  </>
);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
