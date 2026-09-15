import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Presentation,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useLang } from '../../i18n/LangContext';

export interface SlideSection {
  id: string;
  badge: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  iconText: string;
}

const SLIDES: SlideSection[] = [
  {
    id: 'home',
    badge: '01 / 07 · PROFILE',
    titleVi: 'Trần Hữu Đạt — Senior Backend Developer',
    titleEn: 'Trần Hữu Đạt — Senior Backend Developer',
    descVi: '7+ năm backend: tích hợp BI và lớp tuân thủ cấp phát thuốc của nền tảng BESTMED, báo cáo AWS Serverless, AI-First Multi-Agent trên GraphRAG / MCP',
    descEn: '7+ years in backend: BI integration and medication-compliance layer of the BESTMED platform, AWS Serverless reporting, AI-First Multi-Agent on GraphRAG / MCP',
    iconText: '👨‍💻',
  },
  {
    id: 'about',
    badge: '02 / 07 · ABOUT ME',
    titleVi: 'Giới thiệu & Triết lý kỹ thuật',
    titleEn: 'About & Engineering Philosophy',
    descVi: 'Tốt nghiệp ĐH Bách Khoa TP.HCM, chuyên gia thiết kế hệ thống phân tán chịu tải cao & tối ưu hiệu năng',
    descEn: 'HCMUT Alumnus, distributed systems specialist focused on resilience, latency, and high concurrency',
    iconText: '🎓',
  },
  {
    id: 'architecture',
    badge: '03 / 07 · ARCHITECTURE',
    titleVi: 'Sơ đồ luồng dữ liệu & Kiến trúc hệ thống',
    titleEn: 'System Architecture & Data Flows',
    descVi: 'Mô hình chi tiết Multi-Agent GraphRAG, Healthcare Event-Driven Claims Pipeline & AWS Zero-Idle',
    descEn: 'Interactive live diagrams: TMA Multi-Agent GraphRAG, Healthcare Event Pipeline & Zero-Idle AWS',
    iconText: '🏛️',
  },
  {
    id: 'experience',
    badge: '04 / 07 · EXPERIENCE',
    titleVi: 'Kinh nghiệm thực chiến & Lộ trình',
    titleEn: 'Work Experience & Timeline',
    descVi: 'TMA Solutions từ 2021 — AI-First Framework (Team Lead), BESTMED Platform, và các dự án outsource cho khách hàng',
    descEn: 'TMA Solutions since 2021 — AI-First Framework (Team Lead), BESTMED Platform, and outsourced client projects',
    iconText: '💼',
  },
  {
    id: 'projects',
    badge: '05 / 07 · PORTFOLIO',
    titleVi: 'Dự án trọng điểm & Hệ thống sản phẩm',
    titleEn: 'Key Projects & Production Systems',
    descVi: 'Nền tảng cấp phát thuốc BESTMED, báo cáo AWS Serverless (WDR), và framework agent AI-First của TMA',
    descEn: 'BESTMED medication platform, AWS Serverless reporting (WDR), and TMA AI-First enterprise agents',
    iconText: '🚀',
  },
  {
    id: 'skills',
    badge: '06 / 07 · TECH STACK',
    titleVi: 'Kỹ năng & Hệ sinh thái công nghệ',
    titleEn: 'Core Technical Stack & Tools',
    descVi: '.NET Core, Java Spring, Python, AWS Cloud, Kafka, Redis, PostgreSQL, Multi-Agent & GraphRAG',
    descEn: '.NET Core, Java Spring, Python, AWS Cloud, Kafka, Redis, PostgreSQL, Multi-Agent & GraphRAG',
    iconText: '⚡',
  },
  {
    id: 'contact',
    badge: '07 / 07 · CONTACT',
    titleVi: 'Kết nối & Hợp tác',
    titleEn: 'Get In Touch & Connect',
    descVi: 'Email thdat314@gmail.com, GitHub exia-thd, LinkedIn. Sẵn sàng cho cơ hội mới!',
    descEn: 'Email thdat314@gmail.com, GitHub exia-thd, LinkedIn. Open for exciting opportunities!',
    iconText: '📬',
  },
];

export default function PresentationMode() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 7000; // 7 seconds per slide

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToSlide = (index: number) => {
    const nextIndex = (index + SLIDES.length) % SLIDES.length;
    setCurrentSlide(nextIndex);
    setProgress(0);
    scrollToSection(SLIDES[nextIndex].id);
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      return;
    }

    const interval = 100; // update progress every 100ms
    const step = (interval / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, currentSlide]);

  // Keyboard navigation when in presentation mode
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setIsPlaying(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlide]);

  const activeSlide = SLIDES[currentSlide];

  return (
    <>
      {/* Floating Presentation Launch Bar / Mini Bar */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={() => {
              setIsOpen(true);
              setIsPlaying(true);
              scrollToSection(SLIDES[currentSlide].id);
            }}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-xl shadow-indigo-600/40 border border-indigo-400/40 backdrop-blur-xl transition-all hover:scale-105 hover:-translate-y-0.5"
            title="Bật chế độ lướt trang trình chiếu (Slide Presentation)"
          >
            <Presentation className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
            <span>{lang === 'vi' ? 'Lướt trình chiếu' : 'Slide Tour'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          </button>
        </motion.div>
      )}

      {/* Active Presentation Control Overlay Bar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl"
          >
            <div className="relative rounded-2xl bg-slate-950/95 border-2 border-indigo-500/50 shadow-2xl shadow-indigo-950/80 backdrop-blur-2xl p-3.5 sm:p-4 text-white">
              {/* Progress bar across top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-t-2xl overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                {/* Current Slide Info */}
                <div className="flex items-center gap-3 overflow-hidden text-left w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-xl shrink-0 shadow-inner">
                    {activeSlide.iconText}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300">
                        {activeSlide.badge}
                      </span>
                      {isPlaying && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold animate-pulse">
                          AUTO-SCROLL
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-white truncate">
                      {lang === 'vi' ? activeSlide.titleVi : activeSlide.titleEn}
                    </div>
                  </div>
                </div>

                {/* Presentation Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Prev Slide */}
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/15 transition-all active:scale-95"
                    title="Slide trước (Mũi tên trái)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Play / Pause Auto-scroll */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30 active:scale-95 transition-all"
                    title={isPlaying ? 'Tạm dừng tự động lướt' : 'Tự động lướt trang'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? (lang === 'vi' ? 'Dừng' : 'Pause') : (lang === 'vi' ? 'Chạy' : 'Play')}</span>
                  </button>

                  {/* Next Slide */}
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/15 transition-all active:scale-95"
                    title="Slide kế tiếp (Mũi tên phải hoặc Space)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Close Presentation Mode */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsPlaying(false);
                    }}
                    className="p-2 rounded-xl bg-red-500/15 hover:bg-red-500/30 text-red-300 hover:text-white border border-red-500/30 transition-all ml-1"
                    title="Thoát chế độ trình chiếu (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dots section navigator */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5 pt-2 border-t border-white/10">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentSlide
                        ? 'w-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    title={slide.titleVi}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
