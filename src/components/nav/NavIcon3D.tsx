import React from 'react';

interface IconProps {
  color: string;
}

// ─── Wireframe spinning cube (About) ─────────────────────────────────────────
export function CubeIcon({ color }: IconProps) {
  const s = 12;
  const h = s / 2;
  const face = (transform: string, opacity = 1): React.CSSProperties => ({
    position: 'absolute', inset: 0,
    border: `1.5px solid ${color}`,
    opacity,
    transform,
  });
  return (
    <div style={{ width: 20, height: 20, perspective: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: s, height: s, transformStyle: 'preserve-3d', animation: 'nc-cube 4s linear infinite', position: 'relative' }}>
        <div style={face(`translateZ(${h}px)`)} />
        <div style={face(`rotateY(90deg) translateZ(${h}px)`, 0.6)} />
        <div style={face(`rotateY(-90deg) translateZ(${h}px)`, 0.6)} />
        <div style={face(`rotateX(90deg) translateZ(${h}px)`, 0.4)} />
        <div style={face(`rotateX(-90deg) translateZ(${h}px)`, 0.4)} />
        <div style={face(`translateZ(-${h}px)`, 0.2)} />
      </div>
    </div>
  );
}

// ─── Spinning torus ring (Experience) ────────────────────────────────────────
export function RingIcon({ color }: IconProps) {
  return (
    <div style={{ width: 20, height: 20, perspective: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: 16, height: 16, transformStyle: 'preserve-3d', animation: 'nc-ring 3s linear infinite', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Outer torus equator */}
        <div style={{ position: 'absolute', inset: 0, border: `2px solid ${color}`, borderRadius: '50%', opacity: 0.9 }} />
        {/* Tilted latitude ring */}
        <div style={{ position: 'absolute', inset: 2, border: `1.5px solid ${color}`, borderRadius: '50%', opacity: 0.55, transform: 'rotateX(72deg)' }} />
        {/* Inner latitude ring */}
        <div style={{ position: 'absolute', inset: 4, border: `1px solid ${color}`, borderRadius: '50%', opacity: 0.35, transform: 'rotateX(72deg) scaleY(0.5)' }} />
        {/* Center glow dot */}
        <div style={{ width: 3, height: 3, borderRadius: '50%', background: color, opacity: 0.7, position: 'absolute', boxShadow: `0 0 5px ${color}` }} />
      </div>
    </div>
  );
}

// ─── Spinning octahedron / diamond (Projects) ────────────────────────────────
export function DiamondIcon({ color }: IconProps) {
  const s = 13;
  const faceStyle = (transform: string, opacity = 1): React.CSSProperties => ({
    position: 'absolute', inset: 0,
    border: `1.5px solid ${color}`,
    opacity,
    transform,
  });
  return (
    <div style={{ width: 20, height: 20, perspective: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: s, height: s, transformStyle: 'preserve-3d', animation: 'nc-diamond 5s linear infinite', position: 'relative', transform: 'rotate(45deg)' }}>
        <div style={faceStyle('translateZ(0px) rotateX(0deg)')} />
        <div style={faceStyle('rotateX(70deg) translateZ(4px)', 0.7)} />
        <div style={faceStyle('rotateX(-70deg) translateZ(4px)', 0.7)} />
        <div style={faceStyle('rotateY(70deg) translateZ(4px)', 0.5)} />
        <div style={faceStyle('rotateY(-70deg) translateZ(4px)', 0.5)} />
      </div>
    </div>
  );
}

// ─── Hexagonal prism (Skills) ────────────────────────────────────────────────
function hexPath(r: number, cx: number, cy: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(' ');
}

export function HexIcon({ color }: IconProps) {
  const r = 7, cx = 9, cy = 9;
  const front = hexPath(r, cx, cy);
  const inner = hexPath(r * 0.55, cx, cy);
  return (
    <div style={{ width: 20, height: 20, perspective: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ transformStyle: 'preserve-3d', animation: 'nc-hex 4s linear infinite' }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          {/* Outer hex */}
          <polygon points={front} stroke={color} strokeWidth="1.5" fill={`${color}10`} />
          {/* Inner hex (depth lines) */}
          <polygon points={inner} stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
          {/* Radial lines from center to vertices */}
          {Array.from({ length: 6 }, (_, i) => {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            return (
              <line key={i}
                x1={cx} y1={cy}
                x2={cx + r * 0.55 * Math.cos(a)} y2={cy + r * 0.55 * Math.sin(a)}
                stroke={color} strokeWidth="0.8" opacity="0.35"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ─── Orbiting sphere (Contact) ───────────────────────────────────────────────
export function OrbIcon({ color }: IconProps) {
  return (
    <div style={{ width: 20, height: 20, perspective: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: 16, height: 16, transformStyle: 'preserve-3d', animation: 'nc-orb 3.5s linear infinite', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Orbit ring – tilted */}
        <div style={{ position: 'absolute', inset: 0, border: `1.5px solid ${color}`, borderRadius: '50%', transform: 'rotateX(68deg)', opacity: 0.7 }} />
        {/* Equator ring */}
        <div style={{ position: 'absolute', inset: 2, border: `1px solid ${color}`, borderRadius: '50%', opacity: 0.35, transform: 'rotateX(10deg)' }} />
        {/* Center sphere */}
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, position: 'absolute', opacity: 0.9, boxShadow: `0 0 8px ${color}` }} />
        {/* Orbiting satellite dot */}
        <div style={{
          position: 'absolute', width: 3.5, height: 3.5, borderRadius: '50%',
          background: color, top: '50%', left: '50%',
          marginTop: -1.75, marginLeft: -1.75,
          animation: 'nc-satellite 3.5s linear infinite',
          boxShadow: `0 0 5px ${color}`,
        }} />
      </div>
    </div>
  );
}
