import React, { useRef, useState, MouseEvent, ReactNode, HTMLAttributes } from 'react';

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
  onClick?: () => void;
  id?: string;
  key?: React.Key;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(99, 102, 241, 0.25)',
  borderColor = 'rgba(129, 140, 248, 0.2)',
  onClick,
  id,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 shadow-lg shadow-indigo-950/20 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      style={{
        background: 'linear-gradient(145deg, rgba(22, 28, 62, 0.8) 0%, rgba(14, 18, 44, 0.85) 100%)',
        border: `1px solid ${borderColor}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Spotlight Radial Gradient */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />
      {/* Top subtle light reflection */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
