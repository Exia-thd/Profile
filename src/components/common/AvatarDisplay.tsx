import { useState } from 'react';
import { cyberAudio } from '../../utils/cyberAudio';

/**
 * Avatar served straight from GitHub, so it always matches the profile picture on
 * github.com/Exia-thd — changing it there changes it here, with nothing to redeploy.
 * The id-based URL is the one GitHub redirects `github.com/exia-thd.png` to, so using
 * it directly saves a redirect on every render.
 */
const GITHUB_AVATAR = 'https://avatars.githubusercontent.com/u/81846720?v=4&s=256';

/** Bundled copy, used only if GitHub cannot be reached. */
const LOCAL_AVATAR = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/avatar.jpg`;

type AvatarSource = 'github' | 'local' | 'monogram';

interface AvatarDisplayProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export default function AvatarDisplay({
  size = 'lg',
  className = '',
  onClick,
}: AvatarDisplayProps) {
  const [isHovered, setIsHovered] = useState(false);
  // GitHub first, the bundled copy if that fails, initials if both do.
  const [source, setSource] = useState<AvatarSource>('github');

  const handleImageError = () => {
    setSource((current) => (current === 'github' ? 'local' : 'monogram'));
  };

  const sizeMap = {
    sm: { container: 'w-9 h-9', text: 'text-sm', ringInset: '-3px', ringBorder: 'border', dot: 'w-2.5 h-2.5' },
    md: { container: 'w-16 h-16 sm:w-20 sm:h-20', text: 'text-2xl', ringInset: '-6px', ringBorder: 'border-2', dot: 'w-3.5 h-3.5' },
    lg: { container: 'w-28 h-28 sm:w-32 sm:h-32', text: 'text-4xl sm:text-5xl', ringInset: '-10px', ringBorder: 'border-2', dot: 'w-4 h-4' },
  };

  const currentSize = sizeMap[size];
  const isInteractive = Boolean(onClick);

  return (
    <div
      onClick={
        isInteractive
          ? () => {
              cyberAudio.playClick();
              onClick?.();
            }
          : undefined
      }
      onMouseEnter={() => {
        setIsHovered(true);
        if (isInteractive) cyberAudio.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group select-none inline-block ${isInteractive ? 'cursor-pointer' : ''} ${className}`}
      title="Trần Hữu Đạt - Senior Backend Developer & AI System Architect"
    >
      {/* Outer spinning dashed cyber ring */}
      <div
        className={`absolute rounded-full ${currentSize.ringBorder} border-dashed animate-spin-slow transition-colors`}
        style={{
          inset: currentSize.ringInset,
          borderColor: isHovered ? 'rgba(6, 182, 212, 0.9)' : 'rgba(99, 102, 241, 0.6)',
        }}
      />

      {/* Futuristic glowing chromatic aura */}
      <div
        className="absolute rounded-full transition-all duration-500 group-hover:scale-110"
        style={{
          inset: '-4px',
          background: isHovered
            ? 'linear-gradient(135deg, rgba(6,182,212,0.9), rgba(99,102,241,0.9), rgba(236,72,153,0.8))'
            : 'linear-gradient(135deg, rgba(99,102,241,0.7), rgba(168,85,247,0.7), rgba(6,182,212,0.7))',
          filter: size === 'sm' ? 'blur(6px)' : 'blur(12px)',
        }}
      />

      {/* Main Avatar Core */}
      <div
        className={`relative ${currentSize.container} rounded-full overflow-hidden flex items-center justify-center font-extrabold shadow-2xl tracking-tight transition-transform duration-300 group-hover:scale-[1.02] border-2 ${
          isHovered ? 'border-cyan-300' : 'border-white/20'
        } bg-slate-950`}
        style={{
          boxShadow: isHovered ? '0 0 40px rgba(6,182,212,0.7)' : '0 0 30px rgba(99,102,241,0.5)',
        }}
      >
        {source === 'monogram' ? (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-violet-600 to-cyan-400 flex items-center justify-center text-white">
            <span className={currentSize.text}>ĐT</span>
          </div>
        ) : (
          <img
            key={source}
            src={source === 'github' ? GITHUB_AVATAR : LOCAL_AVATAR}
            alt="Trần Hữu Đạt - Senior Backend Developer & AI System Architect"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/* Verified Online Active Status Dot */}
      <div
        className={`absolute bottom-0 right-0 ${currentSize.dot} bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-900 z-10`}
        style={{ boxShadow: '0 0 14px rgba(16,185,129,0.9)' }}
        title="Online · Available for Architectural & Senior Backend Consulting"
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
      </div>
    </div>
  );
}
