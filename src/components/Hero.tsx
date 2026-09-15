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
  Layers,
  Box,
} from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import SpotlightCard from './interactive/SpotlightCard';
import TiltCard3D from './interactive/TiltCard3D';
import CyberHoloCore3D from './interactive/CyberHoloCore3D';
import AvatarDisplay from './common/AvatarDisplay';
import { cyberAudio } from '../utils/cyberAudio';

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
  const [heroTab, setHeroTab] = useState<'3d' | 'pillars'>('3d');

  const roles = [
    { title: 'Senior Backend Developer', sub: '.NET Core · Java · Python · Distributed Systems', color: '#818cf8' },
    { title: 'AI System Architect @ TMA Solutions', sub: 'Autonomous Agents · GraphRAG · MCP Protocol', color: '#fb923c' },
    { title: 'Healthcare Platform Engineer', sub: 'Aged-Care Medication · Sisense BI · Azure Functions', color: '#2dd4bf' },
    { title: 'AWS Serverless Architect', sub: 'Zero-Idle Cost · Lambda · Aurora PostgreSQL', color: '#f59e0b' },
  ];

  const telemetryEvents = [
    { time: '01:44:02', service: 'TMA-Agent', status: 'OK', text: 'GraphRAG index synchronized (12,480 entities)', color: '#38bdf8' },
    { time: '01:44:05', service: 'BESTMED-Auth', status: 'ENFORCED', text: 'S8 administration blocked: PIN + dual-sign required', color: '#ef4444' },
    { time: '01:44:09', service: 'Sisense-Sync', status: 'ACTIVE', text: 'Tenant row-level security synced (ElastiCube + Live)', color: '#10b981' },
    { time: '01:44:12', service: 'Service-Bus', status: 'STREAM', text: 'Timer trigger -> worker queue drained, 0 backlog', color: '#a855f7' },
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
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-24 pb-16"
    >
      {/* Background radiant mesh gradients with lively illumination */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.22, 0.32, 0.22] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-24 w-[750px] h-[750px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 -right-36 w-[700px] h-[700px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-10 left-1/3 w-[600px] h-[400px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'rgba(16, 185, 129, 0.12)' }}
        />
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Top Status Badges */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
        >
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border bg-emerald-500/15 border-emerald-500/35 text-emerald-300 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>{lang === 'vi' ? 'Sẵn sàng nhận dự án & cơ hội mới' : 'Available for opportunities'}</span>
          </div>

          {/* High Availability SLA */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 border border-white/15 bg-slate-900/60 backdrop-blur-md shadow-sm">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Production SLA 99.9%</span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-bold">{ping}ms latency</span>
          </div>
        </motion.div>

        {/* Hero Main Grid: Left Profile Details | Right 3D Interactive Stage */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          {/* Left Column: Profile Information */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-5 mb-5 justify-center lg:justify-start">
              {/* Avatar with 3D Tilt & Cybernetic Ring */}
              <TiltCard3D maxTilt={15} scale={1.05} className="cursor-pointer">
                <AvatarDisplay size="lg" showUploadBadge={true} />
              </TiltCard3D>

              {/* Developer Name & Header */}
              <div className="text-center sm:text-left">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold block mb-1">
                  Senior Software Engineer
                </span>
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
                >
                  <span className="bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent drop-shadow-sm">
                    Trần Hữu Đạt
                  </span>
                </motion.h1>
              </div>
            </div>

            {/* Dynamic Role Title with AnimatePresence Flip */}
            <div className="h-16 flex flex-col justify-center mb-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center lg:items-start"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2">
                    <span
                      className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-cyan-300 to-purple-300 font-bold"
                    >
                      {roles[roleIndex].title}
                    </span>
                    <span className="inline-block w-2 h-5 bg-indigo-400 animate-pulse ml-0.5" />
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-slate-300 mt-1 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{roles[roleIndex].sub}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Academic & Location Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs sm:text-sm text-slate-300 mb-6"
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-indigo-500/25 backdrop-blur-md shadow-sm">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                {t('hero_university')} (ĐH Bách Khoa TP.HCM)
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-indigo-500/25 backdrop-blur-md shadow-sm">
                <MapPin className="w-4 h-4 text-violet-400" />
                {t('hero_location')}
              </span>
            </motion.div>

            {/* Summary Bio */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0"
            >
              {lang === 'vi' ? (
                <>
                  Kỹ sư Backend <strong className="text-white font-semibold">7+ năm</strong> với các hệ thống chạy thật: sở hữu toàn bộ mảng <strong className="text-cyan-300 font-semibold">tích hợp BI Sisense</strong> và lớp <strong className="text-cyan-300 font-semibold">tuân thủ pháp lý cho quy trình cấp phát thuốc</strong> của nền tảng chăm sóc người cao tuổi BESTMED, xây hệ thống báo cáo <strong className="text-indigo-300 font-semibold">AWS Serverless</strong> trên Lambda + Cognito + Aurora, và — với vai trò <strong className="text-orange-300 font-semibold">AI System Architect tại TMA Solutions</strong> — thiết kế kiến trúc framework AI-First multi-agent trên nền <strong className="text-violet-300 font-semibold">bộ nhớ GraphRAG</strong> và <strong className="text-violet-300 font-semibold">giao thức MCP</strong>.
                </>
              ) : (
                <>
                  Backend Developer with <strong className="text-white font-semibold">7+ years</strong> on production systems: I own the <strong className="text-cyan-300 font-semibold">Sisense BI integration</strong> and the <strong className="text-cyan-300 font-semibold">medication-authorisation compliance layer</strong> of the BESTMED aged-care platform, built <strong className="text-indigo-300 font-semibold">AWS Serverless reporting</strong> on Lambda + Cognito + Aurora, and — as <strong className="text-orange-300 font-semibold">AI System Architect at TMA Solutions</strong> — architect an AI-First multi-agent framework built on <strong className="text-violet-300 font-semibold">GraphRAG memory</strong> and the <strong className="text-violet-300 font-semibold">Model Context Protocol (MCP)</strong>.
                </>
              )}
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-white px-6 sm:px-7 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-1 hover:shadow-indigo-500/50 shadow-xl shadow-indigo-600/30 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[position:right_center] duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>{t('hero_contact_btn')}</span>
              </a>

              {/* Open Terminal Trigger */}
              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-indigo-500/30 hover:border-indigo-400 transition-all shadow-md group hover:-translate-y-0.5"
              >
                <Terminal className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
                <span>{lang === 'vi' ? 'Mở Backend CLI' : 'Interactive CLI'}</span>
              </button>

              {/* Quick Command Palette Button */}
              <button
                onClick={onOpenCommandPalette}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-white/15 transition-all hover:-translate-y-0.5"
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
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-white/15 transition-all hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>

              {/* Social Link: LinkedIn */}
              <a
                href="https://vn.linkedin.com/in/exia-692a3914b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-white/15 transition-all hover:-translate-y-0.5"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </motion.div>

            {/* Live System Telemetry Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="rounded-2xl bg-slate-950/80 border border-indigo-500/30 shadow-2xl backdrop-blur-xl p-3.5 text-left"
            >
              <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2 font-mono text-slate-200">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="font-bold text-white tracking-wide">LIVE SYSTEM TELEMETRY</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
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
                    className="px-2 py-0.5 rounded text-[10px] font-bold shrink-0 shadow-sm"
                    style={{ backgroundColor: `${telemetryEvents[streamIndex].color}25`, color: telemetryEvents[streamIndex].color, border: `1px solid ${telemetryEvents[streamIndex].color}40` }}
                  >
                    {telemetryEvents[streamIndex].service}
                  </span>
                  <span className="text-slate-200 truncate">
                    {telemetryEvents[streamIndex].text}
                  </span>
                </div>
                <span className="text-emerald-400 font-bold shrink-0 hidden sm:inline">
                  {ping}ms
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive System Architecture & Tech Highlights */}
          <div className="lg:col-span-5">
            {/* High-Tech HUD View Switcher */}
            <div className="flex items-center justify-between p-1.5 rounded-2xl bg-slate-950/80 border border-cyan-500/25 backdrop-blur-xl mb-3 font-mono text-xs shadow-lg">
              <button
                onClick={() => {
                  setHeroTab('3d');
                  cyberAudio.playClick();
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all font-semibold ${
                  heroTab === '3d'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-cyan-400" />
                <span>3D Holo Topology</span>
              </button>
              <button
                onClick={() => {
                  setHeroTab('pillars');
                  cyberAudio.playClick();
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all font-semibold ${
                  heroTab === 'pillars'
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Server className="w-3.5 h-3.5 text-indigo-400" />
                <span>{lang === 'vi' ? 'Kiến trúc & Trọng tâm kỹ thuật' : 'Backend & AI Focus'}</span>
              </button>
            </div>

            {heroTab === '3d' ? (
              <CyberHoloCore3D />
            ) : (
              <TiltCard3D maxTilt={7} scale={1.01} className="w-full">
                <SpotlightCard
                  className="p-6 sm:p-7 relative rounded-3xl overflow-hidden border border-indigo-500/30 bg-slate-900/80 backdrop-blur-2xl shadow-2xl text-left"
                  spotlightColor="rgba(99, 102, 241, 0.3)"
                >
                  {/* Header: System Status & Active Pod */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                        <Server className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-none">
                          {lang === 'vi' ? 'Kiến trúc & Trọng tâm kỹ thuật' : 'Backend & AI Focus'}
                        </h3>
                        <p className="text-[11px] font-mono text-cyan-400 mt-1">cluster: production-asia-se1</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ONLINE
                    </span>
                  </div>

                  {/* Core Pillars */}
                  <div className="space-y-3.5 mb-5">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                          TMA AI-First & Autonomous Agents
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Lead</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {lang === 'vi'
                          ? 'Xây dựng Multi-Agent Orchestration, tích hợp GraphRAG & chuẩn giao thức Model Context Protocol (MCP).'
                          : 'Architecting Multi-Agent systems, GraphRAG retrieval pipelines, and Model Context Protocol (MCP).'}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-cyan-400" />
                          Healthcare Platform Engineering
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">190 issues</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {lang === 'vi'
                          ? 'Tích hợp BI Sisense, pipeline bảo mật dữ liệu trên Azure Functions và lớp tuân thủ cấp phát thuốc theo luật bang Victoria.'
                          : 'Sisense BI integration, an Azure Functions data-security pipeline, and a medication-authorisation layer compliant with Victorian legislation.'}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-amber-500/30 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          AWS Serverless & Resilience
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Cost Opt</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {lang === 'vi'
                          ? 'Kiến trúc Lambda + Aurora PostgreSQL zero-idle cost, thiết kế microservices có khả năng tự phục hồi (resilient).'
                          : 'AWS Lambda + Aurora PostgreSQL zero-idle infrastructure, fault-tolerant & resilient microservices design.'}
                      </p>
                    </div>
                  </div>

                  {/* Tech chips footer */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                    {['.NET 9', 'C#', 'Java Spring', 'Python', 'Kafka', 'Redis', 'Docker', 'AWS'].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-indigo-500/10 border border-indigo-500/25 text-indigo-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </TiltCard3D>
            )}
          </div>
        </div>

        {/* 4 Quick Metrics Bento Row wrapped in 3D Tilt Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12 text-left"
        >
          <TiltCard3D maxTilt={12} scale={1.03}>
            <SpotlightCard className="p-5 h-full group" spotlightColor="rgba(99, 102, 241, 0.35)">
              <div className="flex items-center justify-between">
                <div className="text-3xl sm:text-4xl font-extrabold text-indigo-300 font-mono drop-shadow-sm">7+</div>
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 group-hover:scale-110 transition-transform">
                  <Server className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <div className="text-sm text-white mt-2 font-bold">
                {lang === 'vi' ? 'Năm kinh nghiệm backend' : 'Years Experience'}
              </div>
              <div className="text-xs text-slate-400 mt-1">.NET, Java, Python, AWS</div>
            </SpotlightCard>
          </TiltCard3D>

          <TiltCard3D maxTilt={12} scale={1.03}>
            <SpotlightCard className="p-5 h-full group" spotlightColor="rgba(168, 85, 247, 0.35)">
              <div className="flex items-center justify-between">
                <div className="text-3xl sm:text-4xl font-extrabold text-violet-300 font-mono drop-shadow-sm">-70%</div>
                <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center border border-violet-500/30 group-hover:scale-110 transition-transform">
                  <Activity className="w-4 h-4 text-violet-400" />
                </div>
              </div>
              <div className="text-sm text-white mt-2 font-bold">
                {lang === 'vi' ? 'Giảm độ trễ truy vấn' : 'Query Response Time'}
              </div>
              <div className="text-xs text-slate-400 mt-1">PostgreSQL + Redis Cache</div>
            </SpotlightCard>
          </TiltCard3D>

          <TiltCard3D maxTilt={12} scale={1.03}>
            <SpotlightCard className="p-5 h-full group" spotlightColor="rgba(56, 189, 248, 0.35)">
              <div className="flex items-center justify-between">
                <div className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-mono drop-shadow-sm">10K+</div>
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 group-hover:scale-110 transition-transform">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="text-sm text-white mt-2 font-bold">
                {lang === 'vi' ? 'Yêu cầu y tế / ngày' : 'Daily Claims Processed'}
              </div>
              <div className="text-xs text-slate-400 mt-1">Healthcare Production SLA</div>
            </SpotlightCard>
          </TiltCard3D>

          <TiltCard3D maxTilt={12} scale={1.03}>
            <SpotlightCard className="p-5 h-full group" spotlightColor="rgba(249, 115, 22, 0.35)">
              <div className="flex items-center justify-between">
                <div className="text-3xl sm:text-4xl font-extrabold text-orange-300 font-mono drop-shadow-sm">2026</div>
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                </div>
              </div>
              <div className="text-sm text-white mt-2 font-bold">
                {lang === 'vi' ? 'TMA AI-First Lead' : 'TMA AI-First Lead'}
              </div>
              <div className="text-xs text-slate-400 mt-1">LLM Agents + GraphRAG + MCP</div>
            </SpotlightCard>
          </TiltCard3D>
        </motion.div>

        {/* Scroll down indicator */}
        <div className="text-center">
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-slate-300 hover:text-white transition-colors group"
          >
            <span className="text-xs uppercase tracking-widest font-mono group-hover:text-cyan-300 transition-colors font-semibold">
              {t('hero_scroll')}
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-indigo-400/40 flex items-start justify-center p-1 group-hover:border-cyan-400 transition-colors shadow-[0_0_12px_rgba(99,102,241,0.3)]">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
