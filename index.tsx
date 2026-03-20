
import React from 'react';
import { createRoot } from 'react-dom/client';

const T = `clip-path 0.9s cubic-bezier(0.76, 0, 0.24, 1)`;
type State = 'default' | 'black' | 'white';

const NameHeading = ({ color }: { color: string }) => (
  <h1
    className="serif text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05] fade-in"
    style={{ color, padding: '2rem 2.5rem', margin: 0 }}
  >
    Andrew<br />
    <span className="italic">Karpensky</span>
  </h1>
);

const Icon = ({ isPlus, color }: { isPlus: boolean; color: string }) => (
  <svg width="48" height="48" viewBox="0 0 48 48">
    <rect x="8" y="23" width="32" height="2" rx="1" fill={color}
      style={{
        transformBox: 'fill-box', transformOrigin: 'center',
        transition: 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isPlus ? 'scaleX(1)' : 'scaleX(1.12)',
      }}
    />
    <rect x="23" y="8" width="2" height="32" rx="1" fill={color}
      style={{
        transformBox: 'fill-box', transformOrigin: 'center',
        transition: 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
        transform: isPlus ? 'scaleY(1)' : 'scaleY(0)',
      }}
    />
  </svg>
);

const Btn = ({ onClick, top, left, isPlus, color, label }: {
  onClick: () => void; top: string; left: string;
  isPlus: boolean; color: string; label: string;
}) => (
  <button onClick={onClick} aria-label={label}
    style={{ position: 'absolute', top, left, transform: 'translateX(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}
  >
    <Icon isPlus={isPlus} color={color} />
  </button>
);

const Links = ({ show, color, delay }: { show: boolean; color: string; delay: string }) => (
  <div style={{
    display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3rem',
    opacity: show ? 1 : 0, pointerEvents: show ? 'all' : 'none',
    transition: `opacity 0.5s ease ${show ? delay : '0s'}`,
  }}>
    <a href="mailto:bluer.mullion.0h@icloud.com" style={{ color, textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>Email</a>
    <a href="https://github.com/andreacarpini" target="_blank" rel="noopener noreferrer" style={{ color, textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>GitHub</a>
  </div>
);

const App = () => {
  const [state, setState] = React.useState<State>('default');

  const whitePanelClip =
    state === 'white'  ? 'inset(0 0 0 0%)'   :
    state === 'black'  ? 'inset(0 0 0 100%)' :
                         'inset(0 0 0 50%)';

  // white text layer — visible over black regions
  const whiteTextClip =
    state === 'black'  ? 'inset(0 0 0 0)'    :
    state === 'white'  ? 'inset(0 100% 0 0)' :
                         'inset(0 50% 0 0)';

  // black text layer — visible over white regions
  const blackTextClip =
    state === 'white'  ? 'inset(0 0 0 0%)'   :
    state === 'black'  ? 'inset(0 0 0 100%)' :
                         'inset(0 0 0 50%)';

  return (
    <>
      {/* Black base */}
      <div style={{ position: 'fixed', inset: 0, background: '#000' }} />

      {/* White panel */}
      <div style={{ position: 'fixed', inset: 0, background: '#fff', clipPath: whitePanelClip, transition: T }} />

      {/* White text layer (over black) */}
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: whiteTextClip, transition: T, zIndex: 1 }}>
        <Btn
          onClick={() => setState(s => s === 'black' ? 'default' : 'black')}
          top="20%" left="25%"
          isPlus={state !== 'black'} color="#fff"
          label={state === 'black' ? 'Close' : 'Open contact'}
        />
        <NameHeading color="#fff" />
      </div>

      {/* Black text layer (over white) */}
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: blackTextClip, transition: T, zIndex: 1 }}>
        <Btn
          onClick={() => setState(s => s === 'white' ? 'default' : 'white')}
          top="20%" left="75%"
          isPlus={state === 'white'} color="#000"
          label={state === 'white' ? 'Close' : 'Open contact'}
        />
        <NameHeading color="#000" />
      </div>

      {/* Contact links — black side, appear at top:20% in right half */}
      <div style={{ position: 'fixed', top: '20%', right: 0, width: '50%', display: 'flex', justifyContent: 'center', transform: 'translateY(-50%)', zIndex: 2 }}>
        <Links show={state === 'black'} color="#fff" delay="0.75s" />
      </div>

      {/* Contact links — white side, appear at top:20% in left half */}
      <div style={{ position: 'fixed', top: '20%', left: 0, width: '50%', display: 'flex', justifyContent: 'center', transform: 'translateY(-50%)', zIndex: 2 }}>
        <Links show={state === 'white'} color="#000" delay="0.75s" />
      </div>
    </>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
