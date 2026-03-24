import { Code2, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { LangProvider, useLang } from './i18n/LangContext';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function AppContent() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: t('nav_about') },
    { href: '#experience', label: t('nav_experience') },
    { href: '#projects', label: t('nav_projects') },
    { href: '#skills', label: t('nav_skills') },
    { href: '#contact', label: t('nav_contact') },
  ];

  return (
    <div className="min-h-screen bg-[#07071a]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.06]" style={{ background: 'rgba(7,7,26,0.75)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">Trần Hữu Đạt</span>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}

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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
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
