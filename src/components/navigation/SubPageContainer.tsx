import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Cpu,
  Briefcase,
  FolderGit2,
  Layers,
  Mail,
  UserCheck,
} from 'lucide-react';
import { useLang } from '../../i18n/LangContext';
import { AppView } from '../../types/navigation';
import { cyberAudio } from '../../utils/cyberAudio';

interface SubPageContainerProps {
  currentView: AppView;
  /** An overlay (terminal, command palette) is open and owns the Escape key. */
  overlayOpen?: boolean;
  onNavigate: (view: AppView) => void;
  onBackToCabinet: () => void;
  onToggleContinuous?: () => void;
  children: React.ReactNode;
}

interface DrawerMeta {
  id: AppView;
  number: string;
  titleEn: string;
  titleVi: string;
  icon: typeof Cpu;
  accent: string;
}

const DRAWER_ORDER: DrawerMeta[] = [
  { id: 'architecture', number: '01', titleEn: 'Architecture & AI Engine', titleVi: 'Kiến trúc & AI Engine', icon: Cpu, accent: '#f97316' },
  { id: 'experience', number: '02', titleEn: 'Work Experience & Roles', titleVi: 'Kinh nghiệm Thực chiến', icon: Briefcase, accent: '#10b981' },
  { id: 'projects', number: '03', titleEn: 'Featured Projects', titleVi: 'Dự án Trọng điểm', icon: FolderGit2, accent: '#6366f1' },
  { id: 'skills', number: '04', titleEn: 'Tech Stack & Matrix', titleVi: 'Kỹ năng & Tech Stack', icon: Layers, accent: '#06b6d4' },
  { id: 'contact', number: '05', titleEn: 'Contact & Advisory', titleVi: 'Liên hệ & Tư vấn', icon: Mail, accent: '#f43f5e' },
  { id: 'about', number: '00', titleEn: 'About & Philosophy', titleVi: 'Hồ sơ & Triết lý', icon: UserCheck, accent: '#a855f7' },
];

export default function SubPageContainer({
  currentView,
  overlayOpen = false,
  onNavigate,
  onBackToCabinet,
  onToggleContinuous,
  children,
}: SubPageContainerProps) {
  const { lang } = useLang();

  // Scroll to top immediately when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentView]);

  // ESC key to return to cabinet — but only when nothing else owns Escape. Without
  // this, closing the command palette also threw the visitor out of the sub-page.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (overlayOpen) return;
      // Project modal and friends mark themselves; they are still in the DOM at this
      // point, so their own Escape handler gets to close them first.
      if (document.querySelector('[data-overlay-open="true"]')) return;

      cyberAudio.playClick();
      onBackToCabinet();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBackToCabinet, overlayOpen]);

  const currentIndex = DRAWER_ORDER.findIndex((d) => d.id === currentView);
  const currentDrawer = DRAWER_ORDER[currentIndex] || DRAWER_ORDER[0];

  const prevDrawer =
    currentIndex > 0 ? DRAWER_ORDER[currentIndex - 1] : DRAWER_ORDER[DRAWER_ORDER.length - 1];
  const nextDrawer =
    currentIndex < DRAWER_ORDER.length - 1 ? DRAWER_ORDER[currentIndex + 1] : DRAWER_ORDER[0];

  return (
    <div className="min-h-screen pt-20 pb-16 relative z-10">
      {/* Sticky Sub-Page Control Bar */}
      <div className="sticky top-[60px] z-30 bg-[#07091f]/90 backdrop-blur-xl border-y border-white/10 shadow-2xl py-3 px-4 sm:px-6 lg:px-8 mb-8 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left: Back Button & Breadcrumbs */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <button
              onClick={() => {
                cyberAudio.playClick();
                onBackToCabinet();
              }}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 hover:border-cyan-400 text-cyan-200 hover:text-white text-xs font-semibold font-mono transition-all shadow-md"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-cyan-300" />
              <span>{lang === 'vi' ? 'Quay lại Phòng 3D' : 'Back to 3D Room'}</span>
              <span className="hidden sm:inline text-[10px] text-cyan-400 font-normal ml-1">
                (ESC)
              </span>
            </button>

            {/* Breadcrumb Info */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400 hidden sm:inline">OVERVIEW</span>
              <span className="text-slate-500 hidden sm:inline">/</span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: currentDrawer.accent }}
                />
                <span className="text-slate-400 text-[11px]">RU-{currentDrawer.number}</span>
                <span className="text-white font-bold text-xs truncate max-w-[150px] sm:max-w-xs">
                  {lang === 'vi' ? currentDrawer.titleVi : currentDrawer.titleEn}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Drawer Hopper Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
            {DRAWER_ORDER.filter((d) => d.id !== 'about').map((drawer) => {
              const isActive = drawer.id === currentView;
              const Icon = drawer.icon;

              return (
                <button
                  key={drawer.id}
                  onClick={() => {
                    cyberAudio.playClick();
                    onNavigate(drawer.id);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md border border-indigo-400/50'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/5'
                  }`}
                  title={lang === 'vi' ? drawer.titleVi : drawer.titleEn}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: isActive ? '#fff' : drawer.accent }} />
                  <span className="hidden xl:inline">
                    {lang === 'vi' ? drawer.titleVi : drawer.titleEn}
                  </span>
                  <span className="xl:hidden">RU-{drawer.number}</span>
                </button>
              );
            })}

            {onToggleContinuous && (
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  onToggleContinuous();
                }}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-all ml-1"
                title={lang === 'vi' ? 'Xem toàn bộ dạng cuộn' : 'Continuous View'}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lang === 'vi' ? 'Cuộn hết' : 'All-in-one'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Sub-Page Component Content with Entry Animation */}
      <motion.div
        key={currentView}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

      {/* Sub-Page Footer Drawer Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-10 border-t border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Previous Drawer */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              onNavigate(prevDrawer.id);
            }}
            className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-indigo-500/40 text-left transition-all shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ChevronLeft className="w-5 h-5 text-indigo-400 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {lang === 'vi' ? 'Ngăn trước' : 'Previous Drawer'} (RU-{prevDrawer.number})
                </span>
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {lang === 'vi' ? prevDrawer.titleVi : prevDrawer.titleEn}
                </span>
              </div>
            </div>
          </button>

          {/* Next Drawer */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              onNavigate(nextDrawer.id);
            }}
            className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-indigo-500/40 text-right transition-all shadow-md"
          >
            <div className="flex flex-col items-end w-full mr-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                {lang === 'vi' ? 'Ngăn tiếp theo' : 'Next Drawer'} (RU-{nextDrawer.number})
              </span>
              <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                {lang === 'vi' ? nextDrawer.titleVi : nextDrawer.titleEn}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <ChevronRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Big Center Back to Cabinet Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              cyberAudio.playClick();
              onBackToCabinet();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'vi' ? 'Đóng ngăn, trở về Phòng Kỹ Thuật 3D' : 'Close Drawer & Return to 3D Room'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
