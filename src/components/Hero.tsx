import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  MapPin,
  Github,
  Linkedin,
  Mail,
  ArrowDown,
  Terminal,
  Sparkles,
  Command,
  Activity,
  Server,
  Code2,
  Copy,
  Radio,
  Cpu,
  CheckCircle2,
  Play,
  Pause,
} from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import SpotlightCard from './interactive/SpotlightCard';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
  onCopyEmail: () => void;
}

export default function Hero({
  onOpenTerminal,
  onOpenCommandPalette,
  onCopyEmail,
}: HeroProps) {
  const { t, lang } = useLang();
  const [ping, setPing] = useState(14);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTelemetryPaused, setIsTelemetryPaused] = useState(false);
  const [streamIndex, setStreamIndex] = useState(0);

  const roles = [
    { title: 'Senior Backend Developer', sub: '.NET Core · Java · Python · Distributed Systems', color: '#818cf8' },
    { title: 'TMA AI-First Team Lead', sub: 'Autonomous Agents · GraphRAG · MCP Protocol', color: '#fb923c' },
    { title: 'Healthcare Distributed Systems', sub: 'Emergency Admin · BestmedIQ AI · Redis -70% Latency', color: '#2dd4bf' },
    { title: 'AWS Serverless Architect', sub: 'Zero-Idle Cost · Lambda · Aurora PostgreSQL', color: '#f59e0b' },
  ];

  const telemetryEvents = [
    { time: '01:44:02', service: 'TMA-Agent', status: 'OK', text: 'GraphRAG index synchronized (12,480 entities)', color: '#38bdf8' },
    { time: '01:44:05', service: 'BHS-Emergency', status: 'CRITICAL', text: 'Care team auto-dispatched in 1.4s (SLA < 2s)', color: '#ef4444' },
    { time: '01:44:09', service: 'Redis-Cluster', status: 'ACTIVE', text: 'Cache hit ratio 99.4% · Latency reduced -70%', color: '#10b981' },
    { time: '01:44:12', service: 'Kafka-Broker', status: 'STREAM', text: '10,000+ claim events published to consumer group', color: '#a855f7' },
    { time: '01:44:16', service: 'Harness-Agent', status: 'VERIFIED', text: 'BE & FE code scaffolding passed test benchmarks', color: '#fb923c' },
    { time: '01:44:20', service: 'AWS-Aurora', status: 'OPTIMAL', text: 'Zero-idle auto-scale configured across 3 AZs', color: '#f59e0b' },
  ];

  // Cycling dynamic roles
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3800);
    return () => clearInterval(roleTimer);
  }, [roles.length]);

  // Telemetry stream simulation
  useEffect(() => {
    if (isTelemetryPaused) return;
    const streamTimer = setInterval(() => {
      setStreamIndex((prev) => (prev + 1) % telemetryEvents.length);
      setPing(Math.floor(Math.random() * 6) + 11);
    }, 2800);
    return () => clearInterval(streamTimer);
  }, [isTelemetryPaused, telemetryEvents.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20 pb-16"
    >
      {/* Background mesh gradients with subtle motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-48 w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{ background: 'rgba(99, 102, 241, 0.16)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{ background: 'rgba(139, 92, 246, 0.14)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'rgba(6, 182, 212, 0.06)' }}
        />
        <div className="absolute inset-0 grid-pattern opacity-40" />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="text-center">
          {/* Top Status Badges with subtle bounce */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border bg-emerald-500/10 border-emerald-500/25 text-emerald-300 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>{lang === 'vi' ? 'Sẵn sàng nhận dự án & cơ hội mới' : 'Available for opportunities'}</span>
            </div>

            {/* Live System Health */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-slate-400 border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Production SLA 99.9%</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-bold">{ping}ms latency</span>
            </div>
          </motion.div>

          {/* Avatar with spinning dashed ring & floating glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-7 inline-block relative group"
          >
            {/* Outer spinning dashed ring */}
            <div
              className="absolute rounded-full border-2 border-dashed animate-spin-slow"
              style={{ inset: '-12px', borderColor: 'rgba(99, 102, 241, 0.45)' }}
            />
            {/* Second counter-rotating ring */}
            <div
              className="absolute rounded-full border border-dotted"
              style={{
                inset: '-20px',
                borderColor: 'rgba(56, 189, 248, 0.25)',
                animation: 'spin-slow 35s linear infinite reverse',
              }}
            />
            {/* Glow ring */}
            <div
              className="absolute rounded-full transition-all duration-500 group-hover:scale-110"
              style={{
                inset: '-6px',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.6), rgba(139,92,246,0.6), rgba(6,182,212,0.6))',
                borderRadius: '9999px',
                filter: 'blur(10px)',
              }}
            />
            {/* Monogram / Avatar Container */}
            <div
              className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-full bg-gradient-to-br from-indigo-500 via-violet-600 to-cyan-500 flex items-center justify-center text-white text-4xl sm:text-5xl font-extrabold shadow-2xl tracking-tight select-none cursor-pointer transition-transform duration-300 group-hover:scale-105"
              style={{ boxShadow: '0 0 55px rgba(99,102,241,0.5)' }}
            >
              ĐT
            </div>
            {/* Online Indicator with radar ping */}
            <div
              className="absolute bottom-1 right-1 w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
              style={{ border: '3.5px solid #07071a', boxShadow: '0 0 16px rgba(16,185,129,0.7)' }}
            >
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
            </div>
          </motion.div>

          {/* Developer Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-3 tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Trần Hữu Đạt
            </span>
          </motion.h1>

          {/* Dynamic Role Title with AnimatePresence Flip */}
          <div className="h-14 sm:h-16 flex flex-col items-center justify-center mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2">
                  <span
                    className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 font-bold"
                  >
                    {roles[roleIndex].title}
                  </span>
                  <span className="inline-block w-2 h-5 bg-indigo-400 animate-pulse ml-0.5" />
                </div>
                <div className="text-xs sm:text-sm font-mono text-slate-400 mt-1 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{roles[roleIndex].sub}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Academic & Location Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-400 mb-6"
          >
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              {t('hero_university')} (Đại học Bách Khoa TP.HCM)
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-violet-400" />
              {t('hero_location')}
            </span>
          </motion.div>

          {/* Summary Bio */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {lang === 'vi' ? (
              <>
                Kỹ sư Backend với <strong className="text-white font-semibold">5+ năm kinh nghiệm</strong> thực chiến thiết kế và vận hành các hệ thống phân tán chịu tải cao, kiến trúc <strong className="text-indigo-400">Microservices</strong>, <strong className="text-cyan-400">AWS Serverless</strong> và giải pháp tự động hoá <strong className="text-violet-400">TMA AI-First Multi-Agent (GraphRAG / MCP)</strong>.
              </>
            ) : (
              <>
                Backend Developer with <strong className="text-white font-semibold">5+ years of experience</strong> building mission-critical distributed systems, high-concurrency <strong className="text-indigo-400">Microservices</strong>, <strong className="text-cyan-400">AWS Serverless</strong> architectures, and enterprise <strong className="text-violet-400">TMA AI-First Multi-Agent frameworks (GraphRAG / MCP)</strong>.
              </>
            )}
          </motion.p>

          {/* Live System Telemetry Banner with Real-time Tick */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="max-w-3xl mx-auto mb-8 rounded-2xl bg-slate-900/80 border border-indigo-500/20 shadow-xl backdrop-blur-xl p-3 sm:p-3.5 text-left"
          >
            <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/[0.06] text-xs">
              <div className="flex items-center gap-2 font-mono text-slate-300">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="font-bold text-slate-200">LIVE SYSTEM TELEMETRY</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  HEALTH: NOMINAL
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTelemetryPaused(!isTelemetryPaused)}
                  className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors text-[11px] flex items-center gap-1 font-mono"
                  title={isTelemetryPaused ? 'Resume stream' : 'Pause stream'}
                >
                  {isTelemetryPaused ? <Play className="w-3 h-3 text-amber-400" /> : <Pause className="w-3 h-3 text-slate-400" />}
                  <span className="hidden sm:inline">{isTelemetryPaused ? 'Resume' : 'Live'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-slate-400 shrink-0">[{telemetryEvents[streamIndex].time}]</span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold shrink-0"
                  style={{ backgroundColor: `${telemetryEvents[streamIndex].color}20`, color: telemetryEvents[streamIndex].color }}
                >
                  {telemetryEvents[streamIndex].service}
                </span>
                <span className="text-slate-300 truncate">
                  {telemetryEvents[streamIndex].text}
                </span>
              </div>
              <span className="text-emerald-400 font-bold shrink-0 hidden sm:inline">
                {ping}ms
              </span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3.5 mb-12"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-white px-6 sm:px-7 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-1 hover:shadow-indigo-500/40 shadow-lg shadow-indigo-500/25 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[position:right_center] duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>{t('hero_contact_btn')}</span>
            </a>

            {/* Open Terminal Trigger */}
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-indigo-500/40 transition-all shadow-md group hover:-translate-y-0.5"
            >
              <Terminal className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span>{lang === 'vi' ? 'Mở Backend CLI' : 'Interactive CLI'}</span>
            </button>

            {/* Quick Command Palette Button */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-mono text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all hover:-translate-y-0.5"
              title="Command Palette (Cmd + K)"
            >
              <Command className="w-3.5 h-3.5 text-indigo-400" />
              <span>Cmd + K</span>
            </button>

            {/* Social Link: GitHub */}
            <a
              href="https://github.com/exia-thd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            {/* Social Link: LinkedIn */}
            <a
              href="https://vn.linkedin.com/in/exia-692a3914b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all hover:-translate-y-0.5"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </motion.div>

          {/* Quick Metrics Bento Row with Hover Lift & Glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10 text-left"
          >
            <SpotlightCard className="p-4 group hover:scale-[1.03] transition-all duration-300" spotlightColor="rgba(99, 102, 241, 0.25)">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">5+</div>
                <Server className="w-4 h-4 text-indigo-400/50 group-hover:text-indigo-400 transition-colors" />
              </div>
              <div className="text-xs text-slate-300 mt-1 font-semibold">
                {lang === 'vi' ? 'Năm kinh nghiệm backend' : 'Years Experience'}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">.NET, Java, Python, AWS</div>
            </SpotlightCard>

            <SpotlightCard className="p-4 group hover:scale-[1.03] transition-all duration-300" spotlightColor="rgba(168, 85, 247, 0.25)">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-extrabold text-violet-400 font-mono">-70%</div>
                <Activity className="w-4 h-4 text-violet-400/50 group-hover:text-violet-400 transition-colors" />
              </div>
              <div className="text-xs text-slate-300 mt-1 font-semibold">
                {lang === 'vi' ? 'Giảm độ trễ truy vấn' : 'Query Response Time'}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">PostgreSQL + Redis Cache</div>
            </SpotlightCard>

            <SpotlightCard className="p-4 group hover:scale-[1.03] transition-all duration-300" spotlightColor="rgba(56, 189, 248, 0.25)">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">10K+</div>
                <Cpu className="w-4 h-4 text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
              </div>
              <div className="text-xs text-slate-300 mt-1 font-semibold">
                {lang === 'vi' ? 'Yêu cầu y tế / ngày' : 'Daily Claims Processed'}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Healthcare Production SLA</div>
            </SpotlightCard>

            <SpotlightCard className="p-4 group hover:scale-[1.03] transition-all duration-300" spotlightColor="rgba(249, 115, 22, 0.25)">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-400 font-mono">2026</div>
                <Sparkles className="w-4 h-4 text-orange-400/50 group-hover:text-orange-400 transition-colors" />
              </div>
              <div className="text-xs text-slate-300 mt-1 font-semibold">
                {lang === 'vi' ? 'TMA AI-First Lead' : 'TMA AI-First Lead'}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">LLM Agents + GraphRAG + MCP</div>
            </SpotlightCard>
          </motion.div>

          {/* Scroll down indicator with animated pulse */}
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <span className="text-[11px] uppercase tracking-widest font-mono group-hover:text-indigo-400 transition-colors">{t('hero_scroll')}</span>
            <div className="w-6 h-9 rounded-full border border-slate-700 flex items-start justify-center p-1 group-hover:border-indigo-500 transition-colors">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
