
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

const ContactSlide = ({ color }: { color: string }) => {
  const dim = color === '#fff' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.28)';
  const field: React.CSSProperties = {
    background: 'none', border: 'none', borderBottom: `1px solid ${dim}`,
    color, outline: 'none', width: '100%', padding: '0.5rem 0',
    fontSize: '0.95rem', fontFamily: 'Inter, sans-serif',
    caretColor: color,
  };
  const lbl: React.CSSProperties = {
    color: dim, fontSize: '0.58rem', letterSpacing: '0.18em',
    textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem',
    fontFamily: 'Inter, sans-serif', fontWeight: 500,
  };
  return (
    <form onSubmit={e => e.preventDefault()}
      style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '2.5rem', padding: '0 2.5rem' }}
    >
      <div><label style={lbl}>Email</label><input style={field} type="email" /></div>
      <div>
        <label style={lbl}>Message</label>
        <textarea style={{ ...field, resize: 'none', height: '4.5rem', display: 'block' }} />
      </div>
      <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}>
        <svg width="44" height="44" viewBox="0 0 44 44" style={{ display: 'block' }}>
          <g transform="translate(22,22)">
            {/* shaft */}
            <line x1="-22" y1="0" x2="0" y2="0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            {/* upper arm */}
            <line x1="0" y1="0" x2="0" y2="-13"
              stroke={color} strokeWidth="1.5" strokeLinecap="round"
              style={{ transformOrigin: '0px 0px', transform: 'rotate(-36deg)' }}
            />
            {/* lower arm */}
            <line x1="0" y1="0" x2="0" y2="13"
              stroke={color} strokeWidth="1.5" strokeLinecap="round"
              style={{ transformOrigin: '0px 0px', transform: 'rotate(36deg)' }}
            />
          </g>
        </svg>
      </button>
    </form>
  );
};

// Each arm pivots from the chevron's center.
// Upper arm: line pointing straight up, rotated ±ang → tip sweeps through 12 o'clock on every flip.
// Lower arm: line pointing straight down, rotated ∓ang → tip sweeps through 6 o'clock.
// The transition between > and < passes through a straight vertical | automatically.
const Chevron = ({ pointsRight, color }: { pointsRight: boolean; color: string }) => {
  const ang = pointsRight ? 36 : -36;
  const ease = 'cubic-bezier(0.34, 1.2, 0.64, 1)';
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" style={{ display: 'block' }}>
      <g transform="translate(22,22)">
        <line x1="0" y1="0" x2="0" y2="-17"
          stroke={color} strokeWidth="1.5" strokeLinecap="round"
          style={{
            transformOrigin: '0px 0px',
            transform: `rotate(${ang}deg)`,
            transition: `transform 0.75s ${ease}, stroke 0.3s ease`,
          }}
        />
        <line x1="0" y1="0" x2="0" y2="17"
          stroke={color} strokeWidth="1.5" strokeLinecap="round"
          style={{
            transformOrigin: '0px 0px',
            transform: `rotate(${-ang}deg)`,
            transition: `transform 0.75s ${ease} 0.05s, stroke 0.3s ease`,
          }}
        />
      </g>
    </svg>
  );
};

const Btn = ({ onClick, top, left, pointsRight, color, label }: {
  onClick: () => void; top: string; left: string;
  pointsRight: boolean; color: string; label: string;
}) => (
  <button onClick={onClick} aria-label={label}
    style={{ position: 'absolute', top, left, transform: 'translateX(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0, zIndex: 10 }}
  >
    <Chevron pointsRight={pointsRight} color={color} />
  </button>
);

const App = () => {
  const [state, setState] = React.useState<State>('default');
  const isBlack = state === 'black';

  const whitePanelClip =
    state === 'white'  ? 'inset(0 0 0 0%)'   :
    state === 'black'  ? 'inset(0 0 0 100%)' :
                         'inset(0 0 0 50%)';

  const whiteTextClip =
    state === 'black'  ? 'inset(0 0 0 0)'    :
    state === 'white'  ? 'inset(0 100% 0 0)' :
                         'inset(0 50% 0 0)';

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
      <div style={{ position: 'fixed', inset: 0, clipPath: whiteTextClip, transition: T, zIndex: 1, overflow: 'hidden' }}>
        {/* Name — always centered in full screen, fades out when form is open */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: isBlack ? 0 : 1,
          transition: 'opacity 0.9s cubic-bezier(0.76, 0, 0.24, 1)',
          pointerEvents: isBlack ? 'none' : 'auto',
        }}>
          <NameHeading color="#fff" />
        </div>

        {/* Form — centered in full screen, fades in/out */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: isBlack ? 1 : 0,
          transform: isBlack ? 'translateY(0)' : 'translateY(22px)',
          transition: 'opacity 0.8s cubic-bezier(0.76, 0, 0.24, 1), transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
          pointerEvents: isBlack ? 'auto' : 'none',
        }}>
          <ContactSlide color="#fff" />
        </div>

        <Btn
          onClick={() => setState(s => s === 'black' ? 'default' : 'black')}
          top="20%" left="25%"
          pointsRight={isBlack} color="#fff"
          label={isBlack ? 'Close' : 'Open'}
        />
      </div>

      {/* Black text layer (over white) */}
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: blackTextClip, transition: T, zIndex: 1 }}>
        <NameHeading color="#000" />
      </div>
    </>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
