import { useState, useEffect } from 'react';
import { LangProvider } from './i18n/LangContext';
import { AvatarProvider } from './context/AvatarContext';
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
import { Terminal as TerminalIcon, Box, LayoutGrid } from 'lucide-react';
import { AppView, ViewDisplayMode } from './types/navigation';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('overview');
  const [displayMode, setDisplayMode] = useState<ViewDisplayMode>('cabinet');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const handleNavigateView = (view: AppView) => {
    cyberAudio.playClick();
    setCurrentView(view);
    try {
      window.location.hash = view === 'overview' ? '#overview' : `#${view}`;
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
      <AvatarProvider>
        <div className="min-h-screen bg-transparent text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden font-sans">
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
                {/* Floating Switcher Bar back to Cabinet */}
                <div className="sticky top-20 z-30 max-w-md mx-auto px-4 pt-2">
                  <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-900/90 border border-indigo-500/40 backdrop-blur-xl shadow-2xl text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-300 ml-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Chế độ cuộn toàn bộ</span>
                    </div>
                    <button
                      onClick={() => handleSwitchToCabinet()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold transition-all shadow-md shadow-indigo-600/30 active:scale-95"
                    >
                      <Box className="w-3.5 h-3.5" />
                      <span>Mở lại Tủ 3D</span>
                    </button>
                  </div>
                </div>

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

          {/* Floating Terminal Drawer / Window */}
          {terminalOpen && (
            <div className="fixed bottom-20 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-[540px] max-w-full drop-shadow-2xl">
              <TerminalCLI onClose={() => setTerminalOpen(false)} />
            </div>
          )}

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
            onEnsureContinuousMode={() => handleSwitchToContinuous()}
          />

          {/* Toast Alerts */}
          <ToastNotification message={toastMessage} />
        </div>
      </AvatarProvider>
    </LangProvider>
  );
}
