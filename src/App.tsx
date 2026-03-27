import { Code2, Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LangProvider, useLang } from './i18n/LangContext';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { CubeIcon, RingIcon, DiamondIcon, HexIcon, OrbIcon } from './components/nav/NavIcon3D';

function AppContent() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Scroll spy — highlight nav item for the section currently in view
  useEffect(() => {
    const ids = ['about', 'experience', 'projects', 'skills', 'contact'];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-15% 0px -75% 0px', threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLinks = [
    { href: '#about',      id: 'about',      label: t('nav_about'),       Icon: CubeIcon,    color: '#6366f1' },
    { href: '#experience', id: 'experience', label: t('nav_experience'),  Icon: RingIcon,    color: '#8b5cf6' },
    { href: '#projects',   id: 'projects',   label: t('nav_projects'),    Icon: DiamondIcon, color: '#3b82f6' },
    { href: '#skills',     id: 'skills',     label: t('nav_skills'),      Icon: HexIcon,     color: '#10b981' },
    { href: '#contact',    id: 'contact',    label: t('nav_contact'),     Icon: OrbIcon,     color: '#06b6d4' },
  ];

  return (
    <div className="min-h-screen bg-[#07071a]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.06]" style={{ background: 'rgba(7,7,26,0.75)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-110">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">Trần Hữu Đạt</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all text-sm font-medium group"
                    style={{
                      color: active ? '#fff' : '#94a3b8',
                      background: active ? `${link.color}18` : 'transparent',
                      boxShadow: active ? `inset 0 -1.5px 0 0 ${link.color}` : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    <link.Icon color={active ? link.color : '#475569'} />
                    <span>{link.label}</span>
                    {active && (
                      <span
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: link.color, boxShadow: `0 0 6px ${link.color}` }}
                      />
                    )}
                  </a>
                );
              })}

              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
                className="ml-2 flex items-center gap-1.5 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-medium transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
                title={lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'EN' : 'VI'}</span>
              </button>

              <a
                href="#contact"
                className="ml-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg text-sm font-semibold hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20"
              >
                {t('nav_contact')}
              </a>
            </div>

            {/* Mobile: lang toggle + menu */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
                className="flex items-center gap-1 px-2.5 py-1.5 text-slate-400 hover:text-white rounded-lg text-xs font-medium transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'EN' : 'VI'}</span>
              </button>
              <button
                className="p-2 text-slate-400 hover:text-white transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/[0.06] px-4 py-3 space-y-1" style={{ background: 'rgba(7,7,26,0.95)' }}>
            {navLinks.map((link) => {
              const active = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium"
                  style={{
                    color: active ? '#fff' : '#94a3b8',
                    background: active ? `${link.color}15` : 'transparent',
                    borderLeft: active ? `2px solid ${link.color}` : '2px solid transparent',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <link.Icon color={active ? link.color : '#475569'} />
                  {link.label}
                </a>
              );
            })}
          </div>
        )}
      </nav>

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <footer className="border-t border-white/[0.06] py-10 bg-[#07071a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-semibold">Trần Hữu Đạt</span>
          </div>
          <p className="text-slate-600 text-sm">&copy; 2026 Trần Hữu Đạt. {t('footer_rights')}</p>
          <div className="flex items-center gap-1.5 text-slate-600 text-sm">
            <span>{t('footer_built')}</span>
            <span className="text-indigo-400 font-medium">React</span>
            <span>&</span>
            <span className="text-violet-400 font-medium">Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppContent />
    </LangProvider>
  );
}
