import { GraduationCap, Calendar, MapPin, Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLang } from '../i18n/LangContext';

const HeroScene = lazy(() => import('./three/HeroScene'));

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#07071a]"
    >
      {/* Three.js Canvas background */}
      <div className="absolute inset-0 pointer-events-none">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 60 }}
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
          >
            <HeroScene />
          </Canvas>
        </Suspense>
      </div>

      {/* Background mesh gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-48 w-[550px] h-[550px] rounded-full blur-[130px] animate-glow-pulse"
          style={{ background: 'rgba(99,102,241,0.10)' }}
        ></div>
        <div
          className="absolute bottom-1/4 -right-48 w-[550px] h-[550px] rounded-full blur-[130px] animate-glow-pulse"
          style={{ background: 'rgba(139,92,246,0.08)', animationDelay: '2s' }}
        ></div>
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 pt-16">
        <div className="text-center">
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-8 border" style={{ background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.2)', color: '#86efac' }}>
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            Available for opportunities
          </div>

          {/* Avatar */}
          <div className="mb-8 inline-block relative">
            {/* Spinning dashed ring */}
            <div
              className="absolute rounded-full border-2 border-dashed animate-spin-slow"
              style={{ inset: '-10px', borderColor: 'rgba(99,102,241,0.35)' }}
            ></div>
            {/* Glow ring */}
            <div
              className="absolute rounded-full"
              style={{ inset: '-3px', background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.4), rgba(6,182,212,0.4))', borderRadius: '9999px', filter: 'blur(6px)' }}
            ></div>
            <div className="relative w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold shadow-2xl" style={{ boxShadow: '0 0 40px rgba(99,102,241,0.35)' }}>
              ĐT
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-11 h-11 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              style={{ border: '4px solid #07071a', boxShadow: '0 0 12px rgba(34,197,94,0.4)' }}
            >
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-3 tracking-tight">
            <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 60%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Trần Hữu Đạt
            </span>
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl font-semibold mb-6">
            <span className="gradient-text">Senior Backend Developer</span>
          </p>

          {/* Info chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { icon: Calendar, label: '14/03/1996' },
              { icon: GraduationCap, label: t('hero_university') },
              { icon: MapPin, label: t('hero_location') },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-slate-300 rounded-full text-sm"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(8px)' }}
              >
                <Icon className="w-3.5 h-3.5 text-indigo-400" />
                {label}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('hero_bio_1')}{' '}
            <span className="text-white font-semibold">{t('hero_bio_2')}</span>{' '}
            {t('hero_bio_3')}{' '}
            <span className="text-indigo-400 font-medium">.NET Core</span>,{' '}
            <span className="text-violet-400 font-medium">Java Spring Boot</span>,{' '}
            <span className="text-cyan-400 font-medium">Python</span>{' '}
            {t('hero_bio_end')}{' '}
            <span className="text-indigo-400 font-medium">AWS Cloud</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5 transform"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 4px 24px rgba(99,102,241,0.3)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 32px rgba(99,102,241,0.45)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(99,102,241,0.3)'; }}
            >
              <Mail className="w-5 h-5" />
              {t('hero_contact_btn')}
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5 transform"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="https://vn.linkedin.com/in/exia-692a3914b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5 transform"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>

          {/* Scroll indicator */}
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-2 transition-colors"
            style={{ color: '#475569' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#475569'; }}
          >
            <span className="text-xs uppercase tracking-widest">{t('hero_scroll')}</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
