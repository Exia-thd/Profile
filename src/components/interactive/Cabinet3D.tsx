import React, { useState } from 'react';
import {
  Cpu,
  Briefcase,
  FolderGit2,
  Layers,
  Mail,
  UserCheck,
  ChevronRight,
  Sparkles,
  Terminal,
  Server,
  Activity,
  ShieldCheck,
  Zap,
  ArrowUpRight,
} from 'lucide-react';
import { useLang } from '../../i18n/LangContext';
import { AppView, CabinetDrawerInfo } from '../../types/navigation';
import { cyberAudio } from '../../utils/cyberAudio';

interface Cabinet3DProps {
  onSelectView: (view: AppView) => void;
  onOpenTerminal?: () => void;
}

const DRAWERS: CabinetDrawerInfo[] = [
  {
    id: 'architecture',
    number: '01',
    titleEn: 'Architecture & AI Engine',
    titleVi: 'Kiến trúc & AI Engine',
    subtitleEn: 'TMA AI-First Framework · GraphRAG Memory · Model Context Protocol (MCP) · Workflow Harness · Self-Learning',
    subtitleVi: 'Framework TMA AI-First · GraphRAG Memory · Giao thức MCP · Workflow Harness · Self-Learning Agents',
    badgeEn: 'AI System Architect',
    badgeVi: 'Kiến trúc sư AI',
    status: 'ONLINE',
    accentColor: 'from-orange-500/25 via-amber-500/10 to-transparent',
    accentHex: '#f97316',
    tags: ['GraphRAG Memory', 'MCP Protocol', 'Workflow Harness', 'Self-Learning'],
    metricsEn: '5 Cross-Roles Automated · 98.4% Recall',
    metricsVi: 'Tự động hóa 5 Roles · Độ chuẩn 98.4%',
    iconName: 'cpu',
  },
  {
    id: 'experience',
    number: '02',
    titleEn: 'Work Experience & Timeline',
    titleVi: 'Kinh nghiệm Thực chiến',
    subtitleEn: '7+ Years Production Track Record · Senior Backend at TMA Solutions & Global Outsource',
    subtitleVi: '7+ Năm Hệ thống Chạy thật · Senior Backend tại TMA Solutions & Dự án Khách hàng Quốc tế',
    badgeEn: 'Senior Backend Developer',
    badgeVi: 'Senior Backend Developer',
    status: 'ACTIVE',
    accentColor: 'from-emerald-500/25 via-teal-500/10 to-transparent',
    accentHex: '#10b981',
    tags: ['BESTMED Healthcare', 'Sisense BI Integration', 'Victorian Legislation', 'AWS Serverless'],
    metricsEn: '190 Issues Shipped · 7+ Years Experience',
    metricsVi: '190 Issues Shipped · 7+ Năm Kinh nghiệm',
    iconName: 'briefcase',
  },
  {
    id: 'projects',
    number: '03',
    titleEn: 'Featured Production Projects',
    titleVi: 'Dự án Trọng điểm',
    subtitleEn: 'TMA AI-First Engine, Healthcare Platform, HRM 2000+, AWS Serverless WDR, Savvy AI',
    subtitleVi: 'Framework TMA AI-First, Hệ thống Y tế Chăm sóc người cao tuổi, HRM 2,000+ nhân sự, AWS WDR',
    badgeEn: '7 Production Systems',
    badgeVi: '7 Hệ thống Chạy thật',
    status: 'DEPLOYED',
    accentColor: 'from-indigo-500/25 via-violet-500/10 to-transparent',
    accentHex: '#6366f1',
    tags: ['TMA AI-First', 'BESTMED Care', 'HRM Multi-Step', 'AWS WDR Serverless'],
    metricsEn: '2,000+ Active Users · Enterprise SLAs',
    metricsVi: '2,000+ Người dùng · Chuẩn SLA Doanh nghiệp',
    iconName: 'folder',
  },
  {
    id: 'skills',
    number: '04',
    titleEn: 'Tech Stack & Skills Matrix',
    titleVi: 'Kỹ năng & Ma trận Tech Stack',
    subtitleEn: 'High-Concurrency Backends, Cloud Native AWS/Azure, Vector DB FAISS & Event-Driven',
    subtitleVi: 'Backend Chịu tải cao (.NET, Java, Python), Cloud Native AWS/Azure, Vector DB & Event-Driven',
    badgeEn: 'Full-Spectrum Backend',
    badgeVi: 'Chuyên sâu Backend',
    status: 'VERIFIED',
    accentColor: 'from-cyan-500/25 via-sky-500/10 to-transparent',
    accentHex: '#06b6d4',
    tags: ['.NET Core (C#)', 'Java Spring Boot', 'Python FastAPI', 'AWS CloudFormation', 'PostgreSQL / FAISS'],
    metricsEn: 'Distributed Architecture · Zero-Idle Cloud',
    metricsVi: 'Hệ phân tán · Tối ưu chi phí Cloud',
    iconName: 'layers',
  },
  {
    id: 'contact',
    number: '05',
    titleEn: 'Contact & Tech Advisory',
    titleVi: 'Liên hệ & Tư vấn Kỹ thuật',
    subtitleEn: 'Open for System Architecture, Enterprise AI Solutions, and High-Scale Backend Advisory',
    subtitleVi: 'Sẵn sàng tư vấn Kiến trúc Hệ thống, Giải pháp AI Doanh nghiệp & Backend quy mô lớn',
    badgeEn: 'Direct Response (< 24h)',
    badgeVi: 'Phản hồi nhanh (< 24h)',
    status: 'READY',
    accentColor: 'from-rose-500/25 via-pink-500/10 to-transparent',
    accentHex: '#f43f5e',
    tags: ['thdat314@gmail.com', 'TP. Hồ Chí Minh, Việt Nam', 'LinkedIn Profile', 'GitHub Repository'],
    metricsEn: 'Fast Turnaround · Open for Tech Inquiries',
    metricsVi: 'Sẵn sàng kết nối · Tư vấn chuyên sâu',
    iconName: 'mail',
  },
];

export default function Cabinet3D({ onSelectView, onOpenTerminal }: Cabinet3DProps) {
  const { lang } = useLang();
  const [hoveredDrawer, setHoveredDrawer] = useState<AppView | null>(null);

  // Instant navigation with zero delay
  const handleSelectDrawer = (view: AppView, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    cyberAudio.playClick();
    onSelectView(view);
  };

  const getDrawerIcon = (iconName: string, color: string) => {
    const iconProps = { className: 'w-5 h-5', style: { color } };
    switch (iconName) {
      case 'cpu':
        return <Cpu {...iconProps} />;
      case 'briefcase':
        return <Briefcase {...iconProps} />;
      case 'folder':
        return <FolderGit2 {...iconProps} />;
      case 'layers':
        return <Layers {...iconProps} />;
      case 'mail':
        return <Mail {...iconProps} />;
      default:
        return <Cpu {...iconProps} />;
    }
  };

  return (
    <section id="cabinet" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <Server className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'vi' ? 'KHÁM PHÁ HỒ SƠ NĂNG LỰC' : 'EXPLORE THE PORTFOLIO'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          {lang === 'vi' ? (
            <>
              Toàn bộ <span className="gradient-text">Hồ sơ năng lực</span>
            </>
          ) : (
            <>
              The Complete <span className="gradient-text">Portfolio</span>
            </>
          )}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-3">
          {lang === 'vi'
            ? 'Kiến trúc hệ thống, kinh nghiệm, dự án, kỹ năng và liên hệ — chọn một ngăn bất kỳ để mở trang đầy đủ của phần đó.'
            : 'System architecture, experience, projects, skills and contact — open any rack unit to read the full page behind it.'}
        </p>

        {/* Quick actions above the room */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-5 text-xs font-mono">
          <button
            onClick={(e) => handleSelectDrawer('about', e)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-200 hover:text-white transition-all shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'vi' ? 'Giới thiệu & Triết lý kỹ thuật' : 'About & Engineering Philosophy'}</span>
            <ArrowUpRight className="w-3 h-3 text-purple-300" />
          </button>

          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-200 hover:text-white transition-all shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Terminal CLI</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          3D ROOM STAGE (CĂN PHÒNG 3D VỚI CHIỀU SÂU VÀ ÁNH SÁNG)
          ========================================================================= */}
      {/* =========================================================================
          3D ROOM STAGE — a real perspective box, not stacked flat layers.
          `perspective` lives on the stage; the surfaces below sit in a
          `preserve-3d` layer and are rotated 90° into place, so the floor,
          ceiling and side walls actually converge on a vanishing point.
          ========================================================================= */}
      <div
        className="relative rounded-3xl border-2 border-slate-700/80 bg-[#04060f] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_60px_rgba(99,102,241,0.2)]"
        style={{ perspective: '1200px', perspectiveOrigin: '50% 38%' }}
      >
        {/* --- THE ROOM SHELL (floor / ceiling / walls in true 3D) --- */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
          aria-hidden="true"
        >
          {/* BACK WALL — pushed ROOM_DEPTH into the screen, scaled to refill the frame */}
          <div
            className="absolute left-1/2 top-1/2 w-[170%] h-[170%] -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: 'translateZ(-700px)',
              background:
                'radial-gradient(ellipse at 50% 35%, #131a3a 0%, #0a0e22 45%, #04060f 100%)',
            }}
          >
            <div className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:48px_48px]" />
            {/* Rack silhouettes lined up against the far wall */}
            <div className="absolute bottom-[32%] left-1/2 -translate-x-1/2 flex items-end gap-5 opacity-45">
              {[64, 92, 78, 104, 78, 92, 64].map((h, i) => (
                <div
                  key={i}
                  className="w-12 rounded-t-md bg-gradient-to-t from-[#0b1026] to-[#1a2246] border-t border-x border-indigo-500/20"
                  style={{ height: `${h}px` }}
                >
                  <div className="mt-2 mx-auto w-6 h-0.5 rounded bg-cyan-400/60" />
                  <div className="mt-1.5 mx-auto w-4 h-0.5 rounded bg-emerald-400/50" />
                </div>
              ))}
            </div>
          </div>

          {/* FLOOR — hinged at the bottom edge of the stage, laid back into the room */}
          <div
            className="absolute left-1/2 bottom-0 w-[190%] h-[700px] -translate-x-1/2 room-floor"
            style={{ transformOrigin: '50% 100%', transform: 'rotateX(90deg)' }}
          >
            <div className="absolute inset-0 bg-[#060a18]" />
            <div className="absolute inset-0 room-grid room-grid-scroll opacity-70" />
            {/* Light pooling on the floor in front of the cabinet */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[46%] h-full bg-gradient-to-t from-indigo-500/25 via-cyan-500/10 to-transparent" />
          </div>

          {/* CEILING — mirror of the floor, hinged at the top edge */}
          <div
            className="absolute left-1/2 top-0 w-[190%] h-[700px] -translate-x-1/2"
            style={{ transformOrigin: '50% 0%', transform: 'rotateX(-90deg)' }}
          >
            <div className="absolute inset-0 bg-[#080c1c]" />
            <div className="absolute inset-0 room-grid opacity-40" />
            {/* Two recessed light bars running the length of the ceiling */}
            <div className="absolute top-[14%] left-[30%] w-2.5 h-[62%] rounded-full bg-cyan-200 shadow-[0_0_40px_12px_rgba(34,211,238,0.55)]" />
            <div className="absolute top-[14%] right-[30%] w-2.5 h-[62%] rounded-full bg-indigo-200 shadow-[0_0_40px_12px_rgba(99,102,241,0.55)]" />
          </div>

          {/* LEFT WALL — hinged on the left edge, running back into the room */}
          <div
            className="absolute left-0 top-0 h-full w-[700px]"
            style={{ transformOrigin: '0% 50%', transform: 'rotateY(90deg)' }}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #04060f 0%, #0c1130 100%)' }} />
            <div className="absolute inset-0 room-grid opacity-40" />
            {/* Wall-mounted bay panel */}
            <div className="absolute top-[22%] left-[14%] w-56 p-3 rounded-xl bg-black/70 border border-cyan-500/25 font-mono text-[10px] text-slate-400 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-white/10 pb-1">
                <span>BAY-A // RACK 01</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span>TMA-GRAPH-RAG</span>
                <span className="text-emerald-400">SYNC</span>
              </div>
              <div className="flex items-center justify-between">
                <span>MCP-SOCKET</span>
                <span className="text-cyan-400">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <span>HARNESS-ENG</span>
                <span className="text-purple-400">IDLE</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-1.5">
                <div className="bg-cyan-400 h-full w-4/5 animate-pulse" />
              </div>
            </div>
          </div>

          {/* RIGHT WALL — hinged on the right edge */}
          <div
            className="absolute right-0 top-0 h-full w-[700px]"
            style={{
              transformOrigin: '100% 50%',
              transform: 'rotateY(-90deg)',
              background: 'linear-gradient(270deg, #04060f 0%, #0c1130 100%)',
            }}
          >
            <div className="absolute inset-0 room-grid opacity-40" />
            {/* Wall-mounted diagnostics panel */}
            <div className="absolute top-[22%] right-[14%] w-56 p-3 rounded-xl bg-black/70 border border-indigo-500/25 font-mono text-[10px] text-slate-400 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
              <div className="flex items-center justify-between text-indigo-400 font-bold border-b border-white/10 pb-1">
                <span>BAY-B // METRICS</span>
                <Activity className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span>CPU LOAD</span>
                <span className="text-slate-200">14.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>UPTIME</span>
                <span className="text-emerald-400">99.99%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CLUSTER</span>
                <span className="text-cyan-400">5 AGENTS</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-1.5">
                <div className="bg-indigo-500 h-full w-2/3" />
              </div>
            </div>
          </div>
        </div>

        {/* --- VOLUMETRIC LIGHT & DEPTH HAZE (flat overlay, sits between room and cabinet) --- */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div
            className="absolute -top-10 left-[30%] -translate-x-1/2 w-72 sm:w-96 h-[70%] opacity-40 blur-2xl"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.55) 0%, rgba(34,211,238,0.12) 45%, transparent 78%)',
            }}
          />
          <div
            className="absolute -top-10 right-[30%] translate-x-1/2 w-72 sm:w-96 h-[70%] opacity-40 blur-2xl"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.55) 0%, rgba(99,102,241,0.12) 45%, transparent 78%)',
            }}
          />
          {/* Distance haze so the far wall reads as far away */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 42%, rgba(10,14,34,0.55) 0%, transparent 55%)',
            }}
          />
        </div>

        {/* =========================================================================
            --- 4. THE 3D CABINET (TỦ KỸ THUẬT ĐỨNG VỮNG CHÃI Ở GIỮA PHÒNG) ---
            Completely stable, upright, NO mouse tilt / wobbling
            ========================================================================= */}
        <div className="relative z-10 pt-20 pb-28 sm:pt-24 sm:pb-32 px-3 sm:px-10 max-w-3xl lg:max-w-4xl mx-auto">
          {/* Contact shadow the cabinet drops on the room floor */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[92%] h-16 blur-xl rounded-[50%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.95) 0%, rgba(6,182,212,0.18) 45%, transparent 75%)',
            }}
          />

          {/* Cabinet Top Roof Cap (Nắp trên của tủ với góc nhìn 3D) */}
          <div className="relative rounded-t-3xl border-t-2 border-x-2 border-slate-600/80 bg-gradient-to-b from-[#1a2345] via-[#101730] to-[#0a0f24] px-6 py-4 shadow-xl">
            {/* Ventilation Louvers & Status LEDs */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-300 font-bold">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span>SERVER RACK UNIT R-07 // MODULAR CABINET</span>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="hidden sm:inline text-slate-400">SYS_VER: v2.6-AI</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>ONLINE</span>
                </span>
              </div>
            </div>

            {/* Realistic Top Exhaust Grate */}
            <div className="flex justify-center gap-1.5 mt-2.5 opacity-60">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="w-3 sm:w-5 h-1 rounded-sm bg-black/60 border-t border-slate-600/50" />
              ))}
            </div>
          </div>

          {/* Cabinet Main Body with 3D Side Flanges */}
          <div className="relative border-x-2 border-slate-600/80 bg-[#090d22]/95 p-3 sm:p-6 backdrop-blur-2xl shadow-2xl">
            {/* Left & Right Cabinet Rack Mounting Rails */}
            <div className="space-y-4">
              {DRAWERS.map((drawer) => {
                const isHovered = hoveredDrawer === drawer.id;

                return (
                  <div
                    key={drawer.id}
                    id={`cabinet-drawer-${drawer.id}`}
                    onMouseEnter={() => {
                      cyberAudio.playHover();
                      setHoveredDrawer(drawer.id);
                    }}
                    onMouseLeave={() => setHoveredDrawer(null)}
                    onClick={(e) => handleSelectDrawer(drawer.id, e)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSelectDrawer(drawer.id);
                      }
                    }}
                    className={`group relative rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden select-none ${
                      isHovered
                        ? 'border-cyan-400/90 bg-slate-900/95 translate-x-1 shadow-[0_12px_35px_rgba(0,0,0,0.7)]'
                        : 'border-white/10 bg-[#0d1330]/85 hover:border-white/20'
                    }`}
                    style={{
                      boxShadow: isHovered
                        ? `0 16px 40px rgba(0,0,0,0.8), 0 0 25px ${drawer.accentHex}40`
                        : '0 4px 15px rgba(0,0,0,0.4)',
                    }}
                  >
                    {/* Glowing Top Rail of Drawer */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-200"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${drawer.accentHex}, transparent)`,
                        opacity: isHovered ? 1 : 0.25,
                      }}
                    />

                    {/* Drawer Content */}
                    <div className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      {/* Left: RU Number, Icon & Titles */}
                      <div className="flex items-center gap-3.5">
                        {/* Rack Unit Tag */}
                        <div className="flex flex-col items-center justify-center w-11 h-11 rounded-xl bg-black/60 border border-white/10 font-mono text-slate-300 group-hover:border-cyan-400/50 transition-colors">
                          <span className="text-[10px] text-slate-400 leading-none">RU</span>
                          <span className="text-base font-extrabold text-white leading-none">
                            {drawer.number}
                          </span>
                        </div>

                        {/* 3D Icon Badge */}
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-200 shadow-md group-hover:scale-105"
                          style={{
                            background: `radial-gradient(circle, ${drawer.accentHex}30 0%, rgba(15,23,42,0.9) 100%)`,
                            borderColor: `${drawer.accentHex}60`,
                            boxShadow: isHovered ? `0 0 16px ${drawer.accentHex}70` : 'none',
                          }}
                        >
                          {getDrawerIcon(drawer.iconName, drawer.accentHex)}
                        </div>

                        {/* Drawer Title & Description */}
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                              {lang === 'vi' ? drawer.titleVi : drawer.titleEn}
                            </h3>
                            <span
                              className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider"
                              style={{
                                backgroundColor: `${drawer.accentHex}20`,
                                color: drawer.accentHex,
                                border: `1px solid ${drawer.accentHex}50`,
                              }}
                            >
                              {lang === 'vi' ? drawer.badgeVi : drawer.badgeEn}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 max-w-xl line-clamp-1 sm:line-clamp-2">
                            {lang === 'vi' ? drawer.subtitleVi : drawer.subtitleEn}
                          </p>
                        </div>
                      </div>

                      {/* Middle: Live Metrics & Tags (Medium+ screens) */}
                      <div className="hidden lg:flex flex-col items-end gap-1.5 text-right font-mono">
                        <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {lang === 'vi' ? drawer.metricsVi : drawer.metricsEn}
                        </span>
                        <div className="flex flex-wrap items-center justify-end gap-1.5">
                          {drawer.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] text-slate-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Metallic Pull Handle & Action Button */}
                      <div className="flex items-center gap-3 self-end md:self-center w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                        {/* Metallic Cyber Handle */}
                        <div
                          className="hidden sm:flex items-center justify-center w-28 h-4 rounded-full border border-slate-600 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 shadow-inner group-hover:from-cyan-600 group-hover:via-indigo-400 group-hover:to-cyan-600 transition-all"
                          title="Drawer Handle"
                        >
                          <div className="flex gap-1">
                            <span className="w-1 h-2 rounded-sm bg-slate-900/70" />
                            <span className="w-1 h-2 rounded-sm bg-slate-900/70" />
                            <span className="w-1 h-2 rounded-sm bg-slate-900/70" />
                            <span className="w-1 h-2 rounded-sm bg-slate-900/70" />
                          </div>
                        </div>

                        {/* Open Button (Clicking navigates immediately) */}
                        <button
                          type="button"
                          onClick={(e) => handleSelectDrawer(drawer.id, e)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono text-white transition-all shadow-md group-hover:scale-105"
                          style={{
                            background: isHovered
                              ? `linear-gradient(135deg, ${drawer.accentHex}, #4f46e5)`
                              : 'rgba(255,255,255,0.08)',
                            border: isHovered ? 'none' : '1px solid rgba(255,255,255,0.15)',
                          }}
                        >
                          <span>{lang === 'vi' ? 'Mở trang con' : 'Open Page'}</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cabinet Bottom Pedestal (Chân đế tủ đứng trên sàn 3D) */}
          <div className="relative rounded-b-3xl border-b-2 border-x-2 border-slate-600/80 bg-gradient-to-t from-[#141b33] to-[#0a0f24] px-6 py-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
            {/* Rubber shock absorber feet */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-2.5 rounded bg-slate-800 border border-slate-600 shadow-inner" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-semibold">5 SUB-PAGES READY TO NAVIGATE</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span>SLA: 99.99%</span>
              <span>POWER: NOMINAL</span>
              <div className="w-8 h-2.5 rounded bg-slate-800 border border-slate-600 shadow-inner" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
