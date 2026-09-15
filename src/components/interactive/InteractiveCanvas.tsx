import { useEffect, useRef } from 'react';
import { cyberAudio } from '../../utils/cyberAudio';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  isCyberNode?: boolean;
}

interface CyberPulse {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
  color: string;
}

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    };

    const colors = ['#6366f1', '#8b5cf6', '#38bdf8', '#06b6d4', '#10b981', '#f59e0b'];
    const particleCount = Math.min(Math.floor((width * height) / 16000), 85);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.2 + 1,
        alpha: baseAlpha,
        baseAlpha,
        color: colors[Math.floor(Math.random() * colors.length)],
        isCyberNode: Math.random() > 0.75,
      });
    }

    const pulses: CyberPulse[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      cyberAudio.playClick();
      const clickColors = ['#38bdf8', '#818cf8', '#34d399', '#f472b6', '#fb923c'];
      pulses.push({
        x: e.clientX,
        y: e.clientY,
        r: 10,
        maxR: 220,
        alpha: 0.8,
        color: clickColors[Math.floor(Math.random() * clickColors.length)],
      });
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let frame = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      // 1. Futuristic Cyber Horizon Perspective Grid (Bottom portion)
      const horizonY = height * 0.75;
      const gridAlpha = 0.05;
      ctx.strokeStyle = `rgba(99, 102, 241, ${gridAlpha})`;
      ctx.lineWidth = 1;

      // Perspective convergence lines
      const vanishingX = width * 0.5;
      for (let x = -width * 0.5; x <= width * 1.5; x += 140) {
        ctx.beginPath();
        ctx.moveTo(vanishingX, horizonY);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines with perspective compression
      for (let y = horizonY; y <= height; y += (y - horizonY) * 0.45 + 18) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Render shockwave pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.r += 4.2;
        p.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = p.alpha;
        ctx.stroke();

        // Secondary inner echo ring
        if (p.r > 25) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.65, 0, Math.PI * 2);
          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.globalAlpha = 1;

        if (p.alpha < 0.015 || p.r >= p.maxR) {
          pulses.splice(i, 1);
        }
      }

      // 3. Cybernetic Constellation Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();

            // Intermittent animated data packet traveling along line
            if (dist < 90 && (i + j + Math.floor(frame / 30)) % 14 === 0) {
              const progress = ((frame * 1.5) % 100) / 100;
              const px = particles[i].x + (particles[j].x - particles[i].x) * progress;
              const py = particles[i].y + (particles[j].y - particles[i].y) * progress;
              ctx.beginPath();
              ctx.arc(px, py, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = '#38bdf8';
              ctx.shadowColor = '#38bdf8';
              ctx.shadowBlur = 6;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      // 4. Update & Draw Particles with Cyber Reticles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interaction with mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 1.8;
          p.y -= Math.sin(angle) * force * 1.8;

          // Connect to mouse reticle
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / mouse.radius) * 0.4})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          p.alpha = Math.min(p.baseAlpha + 0.45, 0.95);
        } else {
          p.alpha = p.baseAlpha;
        }

        // Particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Special Cyber Node Diamond Crosshair Ring
        if (p.isCyberNode && p.alpha > 0.3) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.8;
          ctx.strokeRect(p.x - 4, p.y - 4, 8, 8);
        }

        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
