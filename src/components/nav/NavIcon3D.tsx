import React from 'react';

interface IconProps {
  color: string;
}

// Wireframe spinning cube (About)
export function CubeIcon({ color }: IconProps) {
  const s = 14;
  const h = s / 2;
  const face = (transform: string, opacity = 1): React.CSSProperties => ({
    position: 'absolute',
    inset: 0,
    border: `1.5px solid ${color}`,
    opacity,
    transform,
  });
  return (
    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ perspective: '60px' }}>
      <div style={{ width: s, height: s, transformStyle: 'preserve-3d', animation: 'nc-cube 4s linear infinite', position: 'relative' }}>
        <div style={face(`translateZ(${h}px)`)} />
        <div style={face(`rotateY(90deg) translateZ(${h}px)`, 0.65)} />
        <div style={face(`rotateY(-90deg) translateZ(${h}px)`, 0.65)} />
        <div style={face(`rotateX(90deg) translateZ(${h}px)`, 0.45)} />
        <div style={face(`rotateX(-90deg) translateZ(${h}px)`, 0.45)} />
        <div style={face(`translateZ(-${h}px)`, 0.25)} />
      </div>
    </div>
  );
}

// Spinning torus ring (Experience)
export function RingIcon({ color }: IconProps) {
  return (
    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ perspective: '60px' }}>
      <div style={{ width: 16, height: 16, transformStyle: 'preserve-3d', animation: 'nc-ring 3.5s linear infinite', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, border: `2px solid ${color}`, borderRadius: '50%', opacity: 0.9 }} />
        <div style={{ position: 'absolute', inset: 2, border: `1.5px solid ${color}`, borderRadius: '50%', opacity: 0.6, transform: 'rotateX(72deg)' }} />
        <div style={{ position: 'absolute', inset: 4, border: `1px solid ${color}`, borderRadius: '50%', opacity: 0.35, transform: 'rotateX(72deg) scaleY(0.5)' }} />
        <div style={{ width: 3, height: 3, borderRadius: '50%', background: color, opacity: 0.8, position: 'absolute', boxShadow: `0 0 6px ${color}` }} />
      </div>
    </div>
  );
}

// Spinning octahedron / diamond (Projects)
export function DiamondIcon({ color }: IconProps) {
  const s = 14;
  const faceStyle = (transform: string, opacity = 1): React.CSSProperties => ({
    position: 'absolute',
    inset: 0,
    border: `1.5px solid ${color}`,
    opacity,
    transform,
  });
  return (
    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ perspective: '60px' }}>
      <div style={{ width: s, height: s, transformStyle: 'preserve-3d', animation: 'nc-diamond 5s linear infinite', position: 'relative', transform: 'rotate(45deg)' }}>
        <div style={faceStyle('translateZ(0px) rotateX(0deg)')} />
        <div style={faceStyle('rotateX(70deg) translateZ(4px)', 0.75)} />
        <div style={faceStyle('rotateX(-70deg) translateZ(4px)', 0.75)} />
        <div style={faceStyle('rotateY(70deg) translateZ(4px)', 0.55)} />
        <div style={faceStyle('rotateY(-70deg) translateZ(4px)', 0.55)} />
      </div>
    </div>
  );
}

// Hexagonal prism (Skills)
function hexPath(r: number, cx: number, cy: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(' ');
}

export function HexIcon({ color }: IconProps) {
  const r = 7.5, cx = 9, cy = 9;
  const front = hexPath(r, cx, cy);
  const inner = hexPath(r * 0.55, cx, cy);
  return (
    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ perspective: '60px' }}>
      <div style={{ transformStyle: 'preserve-3d', animation: 'nc-hex 4s linear infinite' }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <polygon points={front} stroke={color} strokeWidth="1.5" fill={`${color}15`} />
          <polygon points={inner} stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
          {Array.from({ length: 6 }, (_, i) => {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={cx + r * 0.55 * Math.cos(a)}
                y2={cy + r * 0.55 * Math.sin(a)}
                stroke={color}
                strokeWidth="0.8"
                opacity="0.4"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// Orbiting sphere (Contact)
export function OrbIcon({ color }: IconProps) {
  return (
    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ perspective: '60px' }}>
      <div style={{ width: 16, height: 16, transformStyle: 'preserve-3d', animation: 'nc-orb 3.5s linear infinite', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, border: `1.5px solid ${color}`, borderRadius: '50%', transform: 'rotateX(68deg)', opacity: 0.75 }} />
        <div style={{ position: 'absolute', inset: 2, border: `1px solid ${color}`, borderRadius: '50%', opacity: 0.4, transform: 'rotateX(10deg)' }} />
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, position: 'absolute', opacity: 0.95, boxShadow: `0 0 8px ${color}` }} />
        <div
          style={{
            position: 'absolute',
            width: 3.5,
            height: 3.5,
            borderRadius: '50%',
            background: color,
            top: '50%',
            left: '50%',
            marginTop: -1.75,
            marginLeft: -1.75,
            animation: 'nc-satellite 3.5s linear infinite',
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

export default function NavIcon3D({ type, active }: { type: string; active?: boolean }) {
  const color = active ? '#38bdf8' : '#818cf8';

  switch (type) {
    case 'home':
      return <CubeIcon color={color} />;
    case 'about':
      return <CubeIcon color={color} />;
    case 'architecture':
      return <RingIcon color={color} />;
    case 'experience':
      return <RingIcon color={color} />;
    case 'projects':
      return <DiamondIcon color={color} />;
    case 'skills':
      return <HexIcon color={color} />;
    case 'contact':
      return <OrbIcon color={color} />;
    default:
      return <CubeIcon color={color} />;
  }
}

