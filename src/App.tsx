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
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
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
                  className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}

              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
                className="ml-2 flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-all"
                title={lang === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'}
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'en' ? 'VI' : 'EN'}</span>
              </button>

              <a
                href="#contact"
                className="ml-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
              >
                {t('nav_contact')}
              </a>
            </div>

            {/* Mobile: lang toggle + menu */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-white/5 border border-white/10 text-slate-300 rounded-lg text-xs font-medium transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'VI' : 'EN'}</span>
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
          <div className="md:hidden bg-slate-900 border-t border-white/5 px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-medium"
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

      <footer className="bg-slate-900 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-semibold">Trần Hữu Đạt</span>
          </div>
          <p className="text-slate-500 text-sm">&copy; 2026 Trần Hữu Đạt. {t('footer_rights')}</p>
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            <span>{t('footer_built')}</span>
            <span className="text-blue-400 font-medium">React</span>
            <span>&</span>
            <span className="text-cyan-400 font-medium">Tailwind CSS</span>
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
