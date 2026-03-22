
import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

const nameStyle = { padding: '2rem 2.5rem', margin: 0, whiteSpace: 'nowrap' as const };

// Decided once per page load, never changes
const flipped = Math.random() < 0.5;

// left/right background and text colors based on flip
const leftBg  = flipped ? '#fff' : '#000';
const rightBg = flipped ? '#000' : '#fff';
const leftText  = flipped ? '#000' : '#fff';
const rightText = flipped ? '#fff' : '#000';

const App = () => {
  const [linksOpen, setLinksOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
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

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, right: '50%', background: leftBg }} />
      <div style={{ position: 'fixed', inset: 0, left: '50%', background: rightBg }} />

      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, clipPath: 'inset(0 50% 0 0)' }}>
        <h1 className="name-title"
          style={{ ...nameStyle, color: leftText, fontWeight: 400 }}>
          Andrew<br /><span className="name-accent">Karpensky</span>
        </h1>
      </div>
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, clipPath: 'inset(0 0 0 50%)' }}>
        <h1 className="name-title"
          style={{ ...nameStyle, color: rightText, fontWeight: 400 }}>
          Andrew<br /><span className="name-accent">Karpensky</span>
        </h1>
      </div>

      <a href="mailto:bluer.mullion.0h@icloud.com" className="nav-link"
        style={{ position: 'fixed', bottom: '20%', left: '25%', transform: 'translateX(-50%)', zIndex: 2, color: leftText }}>
        Contact
      </a>

      <button
        ref={btnRef}
        onClick={() => setLinksOpen(o => !o)}
        className="nav-link"
        style={{ position: 'fixed', bottom: '20%', left: '75%', transform: 'translateX(-50%)', zIndex: 2, color: rightText, fontStyle: 'italic', textDecoration: linksOpen ? 'underline' : undefined }}>
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
