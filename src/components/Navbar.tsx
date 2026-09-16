import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Globe,
  Terminal,
  Command,
  ChevronDown,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import NavIcon3D from './nav/NavIcon3D';
import AvatarDisplay from './common/AvatarDisplay';
import { cyberAudio } from '../utils/cyberAudio';
import { AppView } from '../types/navigation';

interface NavbarProps {
  currentView?: AppView;
  onNavigateView?: (view: AppView) => void;
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
}

export default function Navbar({
  currentView = 'overview',
  onNavigateView,
  onOpenTerminal,
  onOpenCommandPalette,
}: NavbarProps) {
  const { t, lang, setLang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll spy for continuous mode sections
      const sections = ['contact', 'skills', 'projects', 'experience', 'architecture', 'about', 'home'];
      const scrollPos = window.scrollY + 220;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sec === 'home' ? 'overview' : sec);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#overview', label: t('nav_home'), id: 'overview', icon: 'home' },
    { href: '#about', label: t('nav_about'), id: 'about', icon: 'about' },
    { href: '#architecture', label: lang === 'vi' ? 'Kiến trúc' : 'Architecture', id: 'architecture', icon: 'architecture' },
    { href: '#experience', label: t('nav_experience'), id: 'experience', icon: 'experience' },
    { href: '#projects', label: t('nav_projects'), id: 'projects', icon: 'projects' },
    { href: '#skills', label: t('nav_skills'), id: 'skills', icon: 'skills' },
    { href: '#contact', label: t('nav_contact'), id: 'contact', icon: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, viewId: string) => {
    cyberAudio.playClick();
    if (onNavigateView) {
      e.preventDefault();
      onNavigateView(viewId as AppView);
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07071a]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Avatar & Logo */}
          <div className="flex items-center gap-3">
            <AvatarDisplay size="sm" showUploadBadge={false} />
            <a
              href="#overview"
              onClick={(e) => handleLinkClick(e, 'overview')}
              onMouseEnter={() => cyberAudio.playHover()}
              className="flex flex-col group text-left cursor-pointer"
            >
              <span className="text-sm font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors leading-tight">
                Trần Hữu Đạt
              </span>
              <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider">
                Senior Backend Dev
              </span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/5 rounded-full p-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const activeId = activeSection || currentView;
              const isActive = activeId === link.id || (link.id === 'overview' && activeId === 'overview');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => cyberAudio.playHover()}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <NavIcon3D type={link.icon} active={isActive} />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-2">
            {/* Quick Command Palette Button */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                onOpenCommandPalette();
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs font-mono transition-all"
              title="Search & Quick Commands"
            >
              <Command className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[11px]">Cmd+K</span>
            </button>

            {/* Interactive Terminal Trigger */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                onOpenTerminal();
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-mono transition-all"
              title="Open Backend Terminal"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>CLI</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                setLang(lang === 'vi' ? 'en' : 'vi');
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'vi' ? 'EN' : 'VI'}</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile language button */}
            <button
              onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 text-xs font-bold"
            >
              {lang === 'vi' ? 'EN' : 'VI'}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden mt-3 p-4 bg-slate-900/95 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl space-y-1.5">
            {navLinks.map((link) => {
              const activeId = activeSection || currentView;
              const isActive = activeId === link.id || (link.id === 'overview' && activeId === 'overview');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/30 text-white border border-indigo-500/40'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <NavIcon3D type={link.icon} active={isActive} />
                  <span>{link.label}</span>
                </a>
              );
            })}

            <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenTerminal();
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-indigo-600/20 text-indigo-300 text-xs font-mono font-medium"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>CLI Terminal</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 text-slate-300 text-xs font-mono font-medium"
              >
                <Command className="w-4 h-4 text-indigo-400" />
                <span>Cmd + K</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
