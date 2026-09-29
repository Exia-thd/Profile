import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Mountain, ChevronDown, Terminal as TerminalIcon, LayoutGrid } from 'lucide-react';
import { useLang } from '../../i18n/LangContext';
import { CHAPTERS, type Chapter } from './journeyChapters';
import HeroSummary from '../HeroSummary';
import About from '../About';
import ArchitectureSection from '../ArchitectureSection';
import Experience from '../Experience';
import Projects from '../Projects';
import Skills from '../Skills';
import Contact from '../Contact';

const JourneyWorld = lazy(() => import('./JourneyWorld'));

/** Height of the scroll track, in viewport heights per chapter. */
const VH_PER_CHAPTER = 3.2;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

interface ScrollJourneyProps {
  onExit: () => void;
  onOpenTerminal: () => void;
  onNotify: (msg: string) => void;
}

export default function ScrollJourney({ onExit, onOpenTerminal, onNotify }: ScrollJourneyProps) {
  const { lang } = useLang();
  const progress = useRef(0);
  const stages = useRef<(HTMLDivElement | null)[]>([]);
  const [display, setDisplay] = useState(0);
  const [chapterIdx, setChapterIdx] = useState(0);
  const [cardAlpha, setCardAlpha] = useState<number[]>(() => CHAPTERS.map((_, i) => (i === 0 ? 1 : 0)));
  const [ready, setReady] = useState(false);

  /**
   * Progress is measured from where each chapter's stage actually sits, not from a
   * hardcoded scroll range: the chapter bodies are the real section components and
   * their heights differ wildly, so a fixed table would drift out of alignment and
   * leave a title card pinned on top of the section it introduces.
   */
  useEffect(() => {
    let raf = 0;
    const read = () => {
      const vh = window.innerHeight;
      const alphas: number[] = [];
      let idx = 0;
      let journey = 0;

      stages.current.forEach((el, i) => {
        if (!el) {
          alphas.push(0);
          return;
        }
        const rect = el.getBoundingClientRect();
        const travel = Math.max(1, el.offsetHeight - vh);
        const local = Math.min(1, Math.max(0, -rect.top / travel));

        // Fade the card in as the stage pins, out before the section below arrives.
        // The first chapter opens already visible — there is nothing to scroll past yet.
        const inn = i === 0 ? 1 : smoothstep(0, 0.14, local);
        const out = 1 - smoothstep(0.74, 0.97, local);
        alphas.push(Math.min(inn, out));

        if (rect.top <= vh * 0.5) {
          idx = i;
          journey = (i + local) / CHAPTERS.length;
        }
      });

      progress.current = Math.min(1, Math.max(0, journey));
      setCardAlpha(alphas);
      setChapterIdx(idx);
      setDisplay(progress.current);
      raf = requestAnimationFrame(read);
    };
    raf = requestAnimationFrame(read);
    return () => cancelAnimationFrame(raf);
  }, []);

  // The classic layout owns the page background; the journey needs it out of the way.
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#05070f';
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  const active: Chapter = CHAPTERS[chapterIdx] ?? CHAPTERS[0];

  const body = (id: Chapter['id']) => {
    switch (id) {
      case 'about':
        return <About />;
      case 'architecture':
        return <ArchitectureSection />;
      case 'experience':
        return <Experience />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'contact':
        return <Contact onNotify={onNotify} />;
      default:
        return null;
    }
  };

  return (
    <div className="journey-root relative">
      {/* ---------------- WebGL world, fixed behind everything ---------------- */}
      <Suspense fallback={null}>
        <JourneyWorld progressRef={progress} onReady={() => setReady(true)} />
      </Suspense>

      {/* Scrim so body copy stays readable over bright snow */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#05070f]/35 via-transparent to-[#05070f]/55" />

      {/* ---------------- Loading screen ---------------- */}
      {!ready && (
        <div className="fixed inset-0 z-50 bg-[#05070f] flex flex-col items-center justify-center gap-4">
          <Mountain className="w-8 h-8 text-cyan-400 animate-pulse" />
          <div className="text-xs font-mono tracking-[0.3em] text-slate-400 uppercase">
            {lang === 'vi' ? 'Đang dựng địa hình' : 'Building terrain'}
          </div>
          <div className="w-44 h-0.5 bg-white/10 overflow-hidden rounded-full">
            <div className="h-full w-1/3 bg-cyan-400 animate-[journey-sweep_1.1s_ease-in-out_infinite]" />
          </div>
        </div>
      )}

      {/* ---------------- Fixed HUD ---------------- */}
      <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-start justify-between gap-4">
          <div className="pointer-events-auto">
            <div className="text-[10px] font-mono tracking-[0.25em] text-cyan-300/80 uppercase">
              {active.altitude}
            </div>
            <div className="text-sm font-bold text-white">Trần Hữu Đạt</div>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={onOpenTerminal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-800/80 border border-white/10 text-xs font-mono text-slate-300 hover:text-white backdrop-blur-xl transition-all"
            >
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>CLI</span>
            </button>
            <button
              onClick={onExit}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-mono font-bold shadow-lg shadow-indigo-900/40 transition-all active:scale-95"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Giao diện cổ điển' : 'Classic layout'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- Chapter rail ---------------- */}
      <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
        {CHAPTERS.map((c) => {
          const on = c.id === active.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                const el = stages.current[CHAPTERS.indexOf(c)];
                if (el) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top + 4, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 justify-end"
              title={lang === 'vi' ? c.titleVi : c.titleEn}
            >
              <span
                className={`text-[10px] font-mono transition-all ${
                  on ? 'text-white opacity-100' : 'text-slate-400 opacity-0 group-hover:opacity-100'
                }`}
              >
                {c.index}
              </span>
              <span
                className="rounded-full transition-all duration-300"
                style={{
                  width: on ? 18 : 6,
                  height: 6,
                  background: on ? c.accent : 'rgba(255,255,255,0.28)',
                  boxShadow: on ? `0 0 12px ${c.accent}` : 'none',
                }}
              />
            </button>
          );
        })}
      </div>

      {/* ---------------- Progress bar ---------------- */}
      <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-white/10 z-30">
        <div
          className="h-full transition-[width] duration-150 ease-out"
          style={{ width: `${display * 100}%`, background: active.accent, boxShadow: `0 0 10px ${active.accent}` }}
        />
      </div>

      {/* ---------------- Scroll track ---------------- */}
      <div className="relative z-10">
        {CHAPTERS.map((c, i) => {
          const isFirst = i === 0;
          const content = body(c.id);
          return (
            <section key={c.id} id={`journey-${c.id}`} className="relative">
              {/* Stage: the card pins inside it, and its height is the chapter's share
                  of the scroll track. Measured above to drive progress. */}
              <div
                ref={(el) => {
                  stages.current[i] = el;
                }}
                className="relative"
                style={{ height: `${VH_PER_CHAPTER * 100}vh` }}
              >
                <div className="sticky top-0 h-screen flex items-center pointer-events-none">
                <div
                  className="max-w-3xl px-6 sm:px-10 lg:px-16"
                  style={{ opacity: cardAlpha[i] ?? 0 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-mono tracking-[0.35em]" style={{ color: c.accent }}>
                      {c.index}
                    </span>
                    <span className="h-px w-10" style={{ background: c.accent }} />
                    <span className="text-[11px] font-mono tracking-[0.3em] text-slate-300 uppercase">
                      {c.altitude}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                    {lang === 'vi' ? c.titleVi : c.titleEn}
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-slate-200/90 drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
                    {lang === 'vi' ? c.kickerVi : c.kickerEn}
                  </p>

                  {isFirst && (
                    <div className="mt-6 max-w-2xl text-slate-200 text-sm sm:text-base leading-relaxed drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
                      <HeroSummary />
                    </div>
                  )}

                  {isFirst && (
                    <div className="mt-10 flex items-center gap-2 text-xs font-mono text-slate-400">
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                      <span>{lang === 'vi' ? 'Cuộn để bắt đầu hành trình' : 'Scroll to begin the ascent'}</span>
                    </div>
                  )}
                </div>
                </div>
              </div>

              {/* The section itself — the same component the classic layout renders */}
              {content && (
                <div className="journey-body relative pb-24">
                  <div className="max-w-7xl mx-auto">{content}</div>
                </div>
              )}
            </section>
          );
        })}

        {/* Tail so the last chapter can finish its range */}
        <div className="h-[60vh]" aria-hidden="true" />
      </div>
    </div>
  );
}
