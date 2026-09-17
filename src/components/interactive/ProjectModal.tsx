import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Cpu, ExternalLink, Github, Zap, Shield, Activity, Layers } from 'lucide-react';
import { useLang } from '../../i18n/LangContext';

export interface ProjectDetailData {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  badge: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  architectureSummaryEn?: string;
  architectureSummaryVi?: string;
  challengesEn?: string[];
  challengesVi?: string[];
}

interface ProjectModalProps {
  project: ProjectDetailData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lang } = useLang();

  // Escape closes the modal. Without this the key fell through to whatever else was
  // listening — on a sub-page that meant leaving the page entirely.
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          data-overlay-open="true"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07071a]/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#090b1e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Top decorative gradient strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />

            {/* Header */}
            <div className="p-6 pb-4 flex items-start justify-between border-b border-white/5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                    style={{
                      background: project.badgeBg,
                      borderColor: project.badgeBorder,
                      color: project.badgeText,
                    }}
                  >
                    {project.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Backend Architecture Deep-Dive</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <p className="text-slate-400 text-sm mt-0.5">{project.subtitle}</p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Metrics Grid if available */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center"
                    >
                      <div className="text-lg font-bold text-cyan-400 font-mono">{m.value}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* System Description */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  {lang === 'vi' ? 'Tổng quan giải pháp' : 'Solution Overview'}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Architectural Highlights */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-violet-400" />
                  {lang === 'vi' ? 'Điểm nhấn kiến trúc' : 'Architectural Highlights'}
                </h4>
                <div className="space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  {lang === 'vi' ? 'Công nghệ triển khai' : 'Technologies Deployed'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-white/5 border border-white/10 text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-950/60 border-t border-white/5 flex items-center justify-between">
              <a
                href="https://github.com/exia-thd"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>github.com/exia-thd</span>
              </a>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
              >
                {lang === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
