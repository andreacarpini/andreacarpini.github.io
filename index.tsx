
import React from 'react';
import { createRoot } from 'react-dom/client';

const nameStyle = { padding: '2rem 2.5rem', margin: 0, whiteSpace: 'nowrap' as const };

const linkStyle = {
  fontFamily: "'Playfair Display', serif",
  fontWeight: 400,
  fontSize: '1rem',
};

// Decided once per page load, never changes
const flipped = Math.random() < 0.5;

// left/right background and text colors based on flip
const leftBg  = flipped ? '#fff' : '#000';
const rightBg = flipped ? '#000' : '#fff';
const leftText  = flipped ? '#000' : '#fff';
const rightText = flipped ? '#fff' : '#000';

const App = () => {
  const [linksOpen, setLinksOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  const aboutBtnRef = React.useRef<HTMLButtonElement>(null);
  const aboutPanelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!linksOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        btnRef.current?.contains(e.target as Node) ||
        linkRef.current?.contains(e.target as Node)
      ) return;
      setLinksOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [linksOpen]);

  React.useEffect(() => {
    if (!aboutOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        aboutBtnRef.current?.contains(e.target as Node) ||
        aboutPanelRef.current?.contains(e.target as Node)
      ) return;
      setAboutOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [aboutOpen]);

  return (
    <>
      {/* Left half */}
      <div style={{ position: 'fixed', inset: 0, right: '50%', background: leftBg }} />
      {/* Right half */}
      <div style={{ position: 'fixed', inset: 0, left: '50%', background: rightBg }} />

      {/* Name — left half */}
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, clipPath: 'inset(0 50% 0 0)' }}>
        <h1 className="serif text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05]"
          style={{ ...nameStyle, color: leftText, fontWeight: 400 }}>
          Andrew<br /><span className="italic">Karpensky</span>
        </h1>
      </div>
      {/* Name — right half */}
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, clipPath: 'inset(0 0 0 50%)' }}>
        <h1 className="serif text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05]"
          style={{ ...nameStyle, color: rightText, fontWeight: 400 }}>
          Andrew<br /><span className="italic">Karpensky</span>
        </h1>
      </div>

      {/* Contact — centered in left side */}
      <a href="mailto:contact@andrewkarpensky.com" className="nav-link"
        style={{ position: 'fixed', bottom: '20%', left: '25%', transform: 'translateX(-50%)', zIndex: 2, color: leftText }}>
        Contact
      </a>

      {/* About toggle — top 20%, centered in left side */}
      <button
        ref={aboutBtnRef}
        onClick={() => setAboutOpen(o => !o)}
        className="nav-link"
        style={{ position: 'fixed', top: '20%', left: '25%', transform: 'translateX(-50%)', zIndex: 2, color: leftText, fontStyle: 'italic', textDecoration: aboutOpen ? 'underline' : undefined, textUnderlineOffset: '6px' }}>
        About
      </button>
      {aboutOpen && (
        <div ref={aboutPanelRef} style={{ position: 'fixed', top: 'calc(20% + 2.5rem)', left: '25%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
          <span style={{ color: leftText, fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: '0.9rem', fontStyle: 'italic', whiteSpace: 'nowrap' }}>Chicago, IL</span>
          <span style={{ color: leftText, fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: '0.9rem', fontStyle: 'italic', whiteSpace: 'nowrap' }}>Web Design</span>
          <span style={{ color: leftText, fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: '0.9rem', fontStyle: 'italic', whiteSpace: 'nowrap' }}>AWS, DevOps</span>
        </div>
      )}

      {/* Links toggle — centered in right side */}
      <button
        ref={btnRef}
        onClick={() => setLinksOpen(o => !o)}
        className="nav-link"
        style={{ position: 'fixed', bottom: '20%', left: '75%', transform: 'translateX(-50%)', zIndex: 2, color: rightText, fontStyle: 'italic', textDecoration: linksOpen ? 'underline' : undefined, textUnderlineOffset: '6px' }}>
        Links
      </button>
      {linksOpen && (
        <a ref={linkRef} href="https://github.com/andreacarpini" target="_blank" rel="noopener noreferrer"
          className="nav-link"
          style={{ position: 'fixed', bottom: 'calc(20% - 2.5rem)', left: '75%', transform: 'translateX(-50%)', zIndex: 2, color: rightText, fontStyle: 'italic' }}>
          GitHub
        </a>
      )}
    </>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
