import { useState, useEffect, lazy, Suspense } from 'react';
import { LangProvider, useLang } from './i18n/LangContext';
import InteractiveCanvas from './components/interactive/InteractiveCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/interactive/TechMarquee';
import Cabinet3D from './components/interactive/Cabinet3D';
import SubPageContainer from './components/navigation/SubPageContainer';
import About from './components/About';
import ArchitectureSection from './components/ArchitectureSection';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalCLI from './components/interactive/TerminalCLI';
import CommandPalette from './components/interactive/CommandPalette';
import ToastNotification from './components/interactive/ToastNotification';
import PresentationMode from './components/interactive/PresentationMode';
import CyberHUDOverlay from './components/interactive/CyberHUDOverlay';
import { cyberAudio } from './utils/cyberAudio';
import { Terminal as TerminalIcon, Box, LayoutGrid, Mountain } from 'lucide-react';

// Style mode 2: heavy (three.js terrain), and most visitors stay on the classic
// layout, so it is only fetched when they switch.
const ScrollJourney = lazy(() => import('./components/journey/ScrollJourney'));

type StyleMode = 'classic' | 'journey';
const STYLE_KEY = 'exia_portfolio_style_mode';
import { AppView, ViewDisplayMode } from './types/navigation';

/**
 * Switcher back to the cabinet, shown throughout continuous mode.
 *
 * Fixed rather than sticky on purpose: the App root sets `overflow-x-hidden`, which
 * makes it the scroll container a sticky child would resolve against, so a sticky bar
 * scrolls away with the page and the way back to the cabinet disappears.
 */
function ContinuousModeBar({ onBackToCabinet }: { onBackToCabinet: () => void }) {
  const { lang } = useLang();

  return (
    <div className="fixed top-[72px] left-1/2 -translate-x-1/2 z-30 w-[94%] max-w-md px-1">
      <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-900/90 border border-indigo-500/40 backdrop-blur-xl shadow-2xl text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300 ml-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{lang === 'vi' ? 'Chế độ cuộn toàn bộ' : 'Continuous scroll mode'}</span>
        </div>
        <button
          onClick={onBackToCabinet}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold transition-all shadow-md shadow-indigo-600/30 active:scale-95"
          title={lang === 'vi' ? 'Quay lại chế độ Tủ 3D' : 'Back to 3D cabinet mode'}
        >
          <Box className="w-3.5 h-3.5" />
          <span>{lang === 'vi' ? 'Mở lại Tủ 3D' : 'Back to 3D Cabinet'}</span>
        </button>
      </div>
    </div>
  );
}

/** Prominent invitation into the 3D journey, shown on the classic layout. */
function JourneySwitchButton({ onSwitch }: { onSwitch: () => void }) {
  const { lang } = useLang();

  return (
    <button
      onClick={onSwitch}
      className="group flex items-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:from-cyan-500 hover:via-sky-500 hover:to-indigo-500 border border-cyan-300/40 shadow-2xl shadow-cyan-900/50 text-white font-bold text-sm sm:text-base transition-all hover:-translate-y-1 hover:shadow-cyan-700/60 active:scale-95"
      title="Switch to the 3D scroll journey"
    >
      <Mountain className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
      <span>{lang === 'vi' ? 'Xem bản 3D' : '3D Journey'}</span>
      <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
    </button>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('overview');
  const [displayMode, setDisplayMode] = useState<ViewDisplayMode>('cabinet');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  // The scroll journey is the front door; the classic layout is the opt-out.
  const [styleMode, setStyleMode] = useState<StyleMode>('journey');

  // Remember the chosen style across visits.
  useEffect(() => {
    try {
      if (localStorage.getItem(STYLE_KEY) === 'classic') setStyleMode('classic');
    } catch {
      // Storage blocked — the journey is the default either way.
    }
  }, []);

  const switchStyle = (mode: StyleMode) => {
    cyberAudio.playClick();
    setStyleMode(mode);
    try {
      localStorage.setItem(STYLE_KEY, mode);
    } catch {
      // Preference just will not persist for this visitor.
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  };

  // Sync with URL hash on mount & hashchange
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validViews: AppView[] = [
        'overview',
        'architecture',
        'experience',
        'projects',
        'skills',
        'contact',
        'about',
      ];
      if (validViews.includes(hash as AppView)) {
        setCurrentView(hash as AppView);
      } else if (hash === 'home') {
        setCurrentView('overview');
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Cmd/Ctrl+K toggles the command palette, the shortcut the navbar advertises.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigateView = (view: AppView) => {
    cyberAudio.playClick();
    setCurrentView(view);
    try {
      // replaceState, not `location.hash = ...`: assigning the hash makes the browser
      // jump to the element instantly, which fights the smooth scroll below.
      window.history.replaceState(null, '', `#${view}`);
    } catch {
      // ignore
    }

    if (displayMode === 'cabinet') {
      // In cabinet mode, immediately scroll to top so subpage is fully in view
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      // In continuous mode, smoothly scroll directly to the matching section!
      const targetId = view === 'overview' ? 'home' : view;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (view === 'overview') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  };

  // Used by the slide tour: switch mode only. No sound, no competing scroll —
  // the tour drives the scrolling itself.
  const ensureContinuousMode = () => {
    setDisplayMode((mode) => (mode === 'continuous' ? mode : 'continuous'));
  };

  const handleSwitchToContinuous = (targetView?: AppView) => {
    cyberAudio.playClick();
    setDisplayMode('continuous');
    const viewToScroll = targetView || currentView;
    setTimeout(() => {
      const targetId = viewToScroll === 'overview' ? 'cabinet' : viewToScroll;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleSwitchToCabinet = (targetView: AppView = 'overview') => {
    cyberAudio.playClick();
    setDisplayMode('cabinet');
    setCurrentView(targetView);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('thdat314@gmail.com');
    showToast('Copied thdat314@gmail.com to clipboard!');
  };

  return (
    <LangProvider>
      {styleMode === 'journey' ? (
        <Suspense
          fallback={
            <div className="min-h-screen bg-[#05070f] flex items-center justify-center">
              <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400">
                <Mountain className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Loading journey…</span>
              </div>
            </div>
          }
        >
          <ScrollJourney
            onExit={() => switchStyle('classic')}
            onOpenTerminal={() => setTerminalOpen(true)}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onCopyEmail={copyEmail}
            onNotify={showToast}
          />
        </Suspense>
      ) : (
      <div className="min-h-screen bg-transparent text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-clip font-sans">
        {/* Dynamic Interactive Particle Grid Canvas */}
        <InteractiveCanvas />

        {/* Global Navigation Header - Always available */}
        <Navbar
          currentView={currentView}
          onNavigateView={handleNavigateView}
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        {/* Futuristic Cyber Telemetry HUD & Scanlines Layer */}
        <CyberHUDOverlay onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Main Content Router */}
        <main className="relative z-10">
          {displayMode === 'cabinet' ? (
            currentView === 'overview' ? (
              /* === OVERVIEW HUB (HERO + TECH MARQUEE + 3D SERVER ROOM WITH CABINET) === */
              <div>
                <Hero
                  onOpenTerminal={() => setTerminalOpen(true)}
                  onOpenCommandPalette={() => setCommandPaletteOpen(true)}
                  onCopyEmail={copyEmail}
                  onNavigateView={handleNavigateView}
                />
                <TechMarquee />

                {/* 3D Server Room with Interactive Cabinet */}
                <Cabinet3D
                  onSelectView={handleNavigateView}
                  onOpenTerminal={() => setTerminalOpen(true)}
                />

                {/* Mode switcher banner at bottom of overview */}
                <div className="text-center pb-16 pt-6">
                  <button
                    onClick={() => handleSwitchToContinuous()}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono transition-all shadow-lg active:scale-95"
                  >
                    <LayoutGrid className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>Chuyển sang chế độ cuộn toàn bộ (Continuous View)</span>
                  </button>
                </div>
              </div>
            ) : (
              /* === DEDICATED SUB-PAGE VIEW (EXPANDED CONTENT) === */
              <SubPageContainer
                currentView={currentView}
                overlayOpen={terminalOpen || commandPaletteOpen}
                onNavigate={handleNavigateView}
                onBackToCabinet={() => handleNavigateView('overview')}
                onToggleContinuous={() => handleSwitchToContinuous(currentView)}
              >
                {currentView === 'architecture' && <ArchitectureSection />}
                {currentView === 'experience' && <Experience />}
                {currentView === 'projects' && <Projects />}
                {currentView === 'skills' && <Skills />}
                {currentView === 'contact' && <Contact onNotify={showToast} />}
                {currentView === 'about' && <About />}
              </SubPageContainer>
            )
          ) : (
            /* === CONTINUOUS ALL-IN-ONE VIEW (FOR SCROLL & SLIDE TOUR) === */
            <div>
              <ContinuousModeBar onBackToCabinet={() => handleSwitchToCabinet()} />

              {/* Spacer so the fixed bar never covers the top of the hero */}
              <div className="h-14" aria-hidden="true" />

              <Hero
                onOpenTerminal={() => setTerminalOpen(true)}
                onOpenCommandPalette={() => setCommandPaletteOpen(true)}
                onCopyEmail={copyEmail}
                onNavigateView={handleNavigateView}
              />
              <TechMarquee />
              <Cabinet3D
                onSelectView={handleNavigateView}
                onOpenTerminal={() => setTerminalOpen(true)}
              />
              <About />
              <ArchitectureSection />
              <Experience />
              <Projects />
              <Skills />
              <Contact onNotify={showToast} />
            </div>
          )}
        </main>

        {/* Global Footer */}
        <Footer onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Style switcher: classic layout ⇄ scroll journey */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <JourneySwitchButton onSwitch={() => switchStyle('journey')} />
        </div>

        {/* Floating Quick Terminal Launcher Button */}
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={() => {
              cyberAudio.playClick();
              setTerminalOpen(!terminalOpen);
            }}
            className="group flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-indigo-500/50 shadow-2xl backdrop-blur-xl text-slate-300 hover:text-white transition-all hover:scale-105"
            title="Toggle Developer Terminal (CLI)"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <TerminalIcon className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-mono font-semibold hidden sm:inline">exia-cli</span>
          </button>
        </div>

        {/* Command Palette (Cmd + K) */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenTerminal={() => setTerminalOpen(true)}
          onCopyEmail={copyEmail}
          onNavigateView={handleNavigateView}
        />

        {/* Presentation Slide Tour Mode */}
        <PresentationMode
          displayMode={displayMode}
          onEnsureContinuousMode={ensureContinuousMode}
        />

      </div>
      )}

      {/* Terminal and toasts belong to both styles, so they live outside the switch. */}
      {terminalOpen && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-[60] w-[calc(100vw-2rem)] sm:w-[540px] max-w-full drop-shadow-2xl">
          <TerminalCLI onClose={() => setTerminalOpen(false)} />
        </div>
      )}

      <ToastNotification message={toastMessage} />
    </LangProvider>
  );
}
