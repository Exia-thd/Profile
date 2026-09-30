import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Mountain, ChevronDown, Terminal as TerminalIcon, LayoutGrid, Globe } from 'lucide-react';
import { useLang } from '../../i18n/LangContext';
import { cyberAudio } from '../../utils/cyberAudio';
import { CHAPTERS, type Chapter } from './journeyChapters';
import Hero from '../Hero';
import TechMarquee from '../interactive/TechMarquee';
import About from '../About';
import ArchitectureSection from '../ArchitectureSection';
import Experience from '../Experience';
import Projects from '../Projects';
import Skills from '../Skills';
import Contact from '../Contact';
import Footer from '../Footer';
import AvatarDisplay from '../common/AvatarDisplay';

const JourneyWorld = lazy(() => import('./JourneyWorld'));

/**
 * Height of each chapter's title stage, in viewport heights. Kept short: the stage is
 * only the cinematic intro, and the chapter's real content follows it — a long stage
 * means scrolling through empty space to reach anything.
 */
const VH_PER_CHAPTER = 1;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

interface ScrollJourneyProps {
  onExit: () => void;
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
  onCopyEmail: () => void;
  onNotify: (msg: string) => void;
}

export default function ScrollJourney({
  onExit,
  onOpenTerminal,
  onOpenCommandPalette,
  onCopyEmail,
  onNotify,
}: ScrollJourneyProps) {
  const { lang, setLang } = useLang();
  const progress = useRef(0);
  const stages = useRef<(HTMLDivElement | null)[]>([]);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const bodies = useRef<(HTMLDivElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);

  // Only the active chapter is React state, and it changes a handful of times per
  // journey. Everything else is written straight to the DOM from the frame loop.
  const [chapterIdx, setChapterIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const [boot, setBoot] = useState(0);

  /**
   * Progress is measured from where each chapter's stage actually sits, not from a
   * hardcoded scroll range: the chapter bodies are the real section components and
   * their heights differ wildly, so a fixed table would drift out of alignment.
   *
   * Opacities and the progress bar are written directly to their nodes. Setting React
   * state here instead re-rendered every mounted section sixty times a second, which is
   * what made scrolling feel like it was dragging.
   */
  useEffect(() => {
    let raf = 0;
    let lastIdx = -1;

    const read = () => {
      const vh = window.innerHeight;
      let idx = 0;
      let journey = 0;

      for (let i = 0; i < stages.current.length; i++) {
        const el = stages.current[i];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const local = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));

        // The card is only in the document for its own stage, so it starts fully visible
        // and just fades out as the section below comes up. Fading it in as well left it
        // invisible at the top of its own stage, which read as a broken jump.
        const card = cards.current[i];
        if (card) card.style.opacity = String(1 - smoothstep(0.2, 0.62, local));

        if (rect.top <= vh * 0.5) {
          idx = i;
          journey = (i + local) / CHAPTERS.length;
        }
      }

      progress.current = Math.min(1, Math.max(0, journey));

      if (bar.current) bar.current.style.width = `${progress.current * 100}%`;
      if (idx !== lastIdx) {
        lastIdx = idx;
        setChapterIdx(idx);
      }

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

  /**
   * Land on the chapter's content, not on its title stage.
   *
   * Targeting the stage put the viewport at a point where the title card had not faded
   * in and the section was still below the fold — a menu click showed an empty screen.
   * Somebody who clicks "Projects" wants the projects, so that is what they get; the
   * chapter is still named in the bar above.
   */
  const jumpTo = useCallback((i: number) => {
    // Height of the fixed chapter bar, which content must clear.
    const hud = window.innerWidth >= 1024 ? 78 : 120;
    const target = bodies.current[i] ?? stages.current[i];
    if (!target) return;

    const top = i === 0 ? 0 : window.scrollY + target.getBoundingClientRect().top - hud;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }, []);

  /**
   * Chapter bodies are the classic layout's own components, so the two modes carry
   * exactly the same information with no second copy to drift.
   */
  const body = (id: Chapter['id']) => {
    switch (id) {
      case 'home':
        return (
          <>
            <Hero
              onOpenTerminal={onOpenTerminal}
              onOpenCommandPalette={onOpenCommandPalette}
              onCopyEmail={onCopyEmail}
            />
            <TechMarquee />
          </>
        );
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
        return (
          <>
            <Contact onNotify={onNotify} />
            <Footer onOpenTerminal={onOpenTerminal} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="journey-root relative">
      <Suspense fallback={null}>
        <JourneyWorld progressRef={progress} onBootProgress={setBoot} onReady={() => setReady(true)} />
      </Suspense>

      {/* Scrim, light enough to leave the terrain readable */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#05070f]/28 via-transparent to-[#05070f]/45" />

      {!ready && (
        <div className="fixed inset-0 z-50 bg-[#05070f] flex flex-col items-center justify-center gap-4">
          <Mountain className="w-8 h-8 text-cyan-400 animate-pulse" />
          <div className="text-xs font-mono tracking-[0.3em] text-slate-400 uppercase">
            {lang === 'vi' ? 'Đang dựng địa hình' : 'Building terrain'}
          </div>
          <div className="w-56 h-0.5 bg-white/10 overflow-hidden rounded-full">
            <div
              className="h-full bg-cyan-400 transition-[width] duration-200 ease-out"
              style={{ width: `${Math.round(boot * 100)}%` }}
            />
          </div>
          <div className="text-[10px] font-mono text-slate-600 tabular-nums">{Math.round(boot * 100)}%</div>
        </div>
      )}

      {/* ---------------- Fixed HUD ---------------- */}
      <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none">
        {/* Section content scrolls underneath, so the bar needs its own ground. */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#05070f] via-[#05070f]/80 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="pointer-events-auto shrink-0">
            <div className="text-[10px] font-mono tracking-[0.25em] text-cyan-300/80 uppercase">
              {active.altitude}
            </div>
            <div className="text-sm font-bold text-white">Trần Hữu Đạt</div>
          </div>

          {/* Section menu. The journey is scroll-driven, but nobody should have to
              scroll to reach a section — every chapter is one click away. */}
          <nav className="hidden lg:flex items-center gap-1 pointer-events-auto rounded-2xl bg-slate-900/75 border border-white/10 backdrop-blur-xl p-1.5 shadow-xl">
            {CHAPTERS.map((c, i) => {
              const on = i === chapterIdx;
              return (
                <button
                  key={c.id}
                  onClick={() => jumpTo(i)}
                  aria-current={on ? 'true' : undefined}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    on ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={on ? { background: `${c.accent}22`, boxShadow: `inset 0 0 0 1px ${c.accent}55` } : undefined}
                >
                  {lang === 'vi' ? c.navVi : c.navEn}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 pointer-events-auto shrink-0">
            {/* Language switch, same as the classic layout's — the journey had none,
                so there was no way to read it in the other language. */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                setLang(lang === 'vi' ? 'en' : 'vi');
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800/80 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white backdrop-blur-xl transition-all"
              title={lang === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
              aria-label={lang === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'vi' ? 'EN' : 'VI'}</span>
            </button>

            <button
              onClick={onOpenTerminal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800/80 border border-white/10 text-xs font-mono text-slate-300 hover:text-white backdrop-blur-xl transition-all"
            >
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>CLI</span>
            </button>
            <button
              onClick={onExit}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-bold shadow-xl shadow-indigo-900/50 border border-indigo-400/40 transition-all active:scale-95 hover:-translate-y-0.5"
            >
              <LayoutGrid className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span>{lang === 'vi' ? 'Giao diện cổ điển' : 'Classic layout'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Same menu for narrow screens, as a strip that scrolls sideways. */}
      <div className="lg:hidden fixed top-[58px] left-0 right-0 z-30 pointer-events-none">
        <div className="pointer-events-auto overflow-x-auto no-scrollbar px-4 pb-2">
          <div className="inline-flex items-center gap-1.5 rounded-2xl bg-slate-900/85 border border-white/10 backdrop-blur-xl p-1.5 shadow-xl">
            {CHAPTERS.map((c, i) => {
              const on = i === chapterIdx;
              return (
                <button
                  key={c.id}
                  onClick={() => jumpTo(i)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all ${
                    on ? 'text-white' : 'text-slate-400'
                  }`}
                  style={on ? { background: `${c.accent}26`, boxShadow: `inset 0 0 0 1px ${c.accent}66` } : undefined}
                >
                  {lang === 'vi' ? c.navVi : c.navEn}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------------- Chapter rail ---------------- */}
      <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
        {CHAPTERS.map((c, i) => {
          const on = i === chapterIdx;
          return (
            <button
              key={c.id}
              onClick={() => jumpTo(i)}
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

      {/* ---------------- Next-chapter nudge ---------------- */}
      {chapterIdx < CHAPTERS.length - 1 && (
        <button
          onClick={() => jumpTo(chapterIdx + 1)}
          className="fixed bottom-6 right-6 z-30 group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/85 hover:bg-slate-800/90 border border-white/10 hover:border-cyan-400/50 backdrop-blur-xl text-xs font-mono text-slate-300 hover:text-white transition-all shadow-xl"
          title={lang === 'vi' ? 'Tới chương tiếp theo' : 'Jump to the next chapter'}
        >
          <span>
            {lang === 'vi' ? 'Chương' : 'Chapter'} {CHAPTERS[chapterIdx + 1].index}
          </span>
          <ChevronDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* ---------------- Progress bar ---------------- */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div
          ref={bar}
          className="h-full"
          style={{ width: '0%', background: active.accent, boxShadow: `0 0 10px ${active.accent}` }}
        />
      </div>

      {/* ---------------- Scroll track ---------------- */}
      <div className="relative z-10">
        {CHAPTERS.map((c, i) => {
          const content = body(c.id);
          return (
            <section key={c.id} id={`journey-${c.id}`} className="relative">
              <div
                ref={(el) => {
                  stages.current[i] = el;
                }}
                className="journey-stage relative"
                style={{ height: `${VH_PER_CHAPTER * 100}vh` }}
              >
                <div className="sticky top-0 h-screen flex items-center pt-24 pointer-events-none">
                  {/* The card and the portrait fade together, so the ref wraps both. */}
                  <div
                    ref={(el) => {
                      cards.current[i] = el;
                    }}
                    className="w-full flex items-center"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                  <div className="max-w-2xl ml-6 sm:ml-10 lg:ml-16 mr-6 rounded-3xl px-6 sm:px-9 py-7 sm:py-9 bg-[#05070f]/72 backdrop-blur-md border border-white/10 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[11px] font-mono tracking-[0.35em]" style={{ color: c.accent }}>
                        {c.index}
                      </span>
                      <span className="h-px w-10" style={{ background: c.accent }} />
                      <span className="text-[11px] font-mono tracking-[0.3em] text-slate-300 uppercase">
                        {c.altitude}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                      {lang === 'vi' ? c.titleVi : c.titleEn}
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-slate-300">
                      {lang === 'vi' ? c.kickerVi : c.kickerEn}
                    </p>

                    {i === 0 && (
                      <div className="mt-8 flex items-center gap-2 text-xs font-mono text-slate-400">
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                        <span>{lang === 'vi' ? 'Cuộn để bắt đầu hành trình' : 'Scroll to begin the ascent'}</span>
                      </div>
                    )}
                  </div>

                  {/* Portrait balancing the opening screen, which was card on the left
                      and empty terrain across the whole right half. */}
                  {i === 0 && (
                    <div className="hidden lg:flex ml-auto mr-24 xl:mr-32 flex-col items-center gap-6 relative">
                      <div
                        className="absolute -z-10 w-72 h-72 rounded-full blur-3xl"
                        style={{ background: `${c.accent}1f` }}
                        aria-hidden="true"
                      />
                      <AvatarDisplay size="lg" className="scale-[1.7] xl:scale-[1.95]" />
                      {/* The caption sits on bare terrain, which can be bright snow further
                          up the route, so it carries its own scrim like the card does. */}
                      <div className="mt-8 xl:mt-12 text-center rounded-2xl px-5 py-3 bg-[#05070f]/70 backdrop-blur-md border border-white/10">
                        <div className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: c.accent }}>
                          {lang === 'vi' ? 'Sẵn sàng hợp tác' : 'Open to work'}
                        </div>
                        <div className="mt-1.5 text-xs font-mono text-slate-300">
                          {lang === 'vi' ? 'TP. Hồ Chí Minh, Việt Nam' : 'Ho Chi Minh City, Vietnam'}
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              </div>

              {content && (
                <div
                  ref={(el) => {
                    bodies.current[i] = el;
                  }}
                  className="journey-body relative pb-16"
                >
                  <div className="max-w-7xl mx-auto">{content}</div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
