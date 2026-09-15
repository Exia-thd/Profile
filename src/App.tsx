import { useState } from 'react';
import { LangProvider } from './i18n/LangContext';
import { AvatarProvider } from './context/AvatarContext';
import InteractiveCanvas from './components/interactive/InteractiveCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/interactive/TechMarquee';
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
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

          {/* Global Navigation */}
          <Navbar
            onOpenTerminal={() => setTerminalOpen(true)}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          />

          {/* Futuristic Cyber Telemetry HUD & Scanlines Layer */}
          <CyberHUDOverlay onOpenTerminal={() => setTerminalOpen(true)} />

          {/* Main Content Sections */}
          <main className="relative z-10">
            <Hero
              onOpenTerminal={() => setTerminalOpen(true)}
              onOpenCommandPalette={() => setCommandPaletteOpen(true)}
              onCopyEmail={copyEmail}
            />
            <TechMarquee />
            <About />
            <ArchitectureSection />
            <Experience />
            <Projects />
            <Skills />
            <Contact onNotify={showToast} />
          </main>

          {/* Footer */}
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
          />

          {/* Presentation Slide Tour Mode */}
          <PresentationMode />

          {/* Toast Alerts */}
          <ToastNotification message={toastMessage} />
        </div>
      </AvatarProvider>
    </LangProvider>
  );
}
