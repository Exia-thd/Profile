import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Layers,
  Bot,
  BarChart3,
  Package,
  Phone,
  Activity,
  Brain,
  Search,
  ExternalLink,
  ArrowUpRight,
  Filter,
  Sparkles,
} from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import SpotlightCard from './interactive/SpotlightCard';
import TiltCard3D from './interactive/TiltCard3D';
import ProjectModal, { ProjectDetailData } from './interactive/ProjectModal';

export default function Projects() {
  const { t, lang } = useLang();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<ProjectDetailData | null>(null);

  const projects = [
    // 1. TMA AI-First Framework (AI System Architect)
    {
      category: 'ai',
      title: t('proj_tma_title'),
      subtitle: t('proj_tma_sub'),
      description: t('proj_tma_desc'),
      tech: ['LLM Orchestration', 'GraphRAG', 'MCP Protocol', 'Self-Learning Agent', 'Harness Agent', 'Python', '.NET', 'TypeScript'],
      icon: Brain,
      color: '#f97316',
      stripColor: 'linear-gradient(90deg, #f97316, #ec4899)',
      badge: t('proj_tma_badge'),
      badgeBg: 'rgba(249, 115, 22, 0.12)',
      badgeBorder: 'rgba(249, 115, 22, 0.35)',
      badgeText: '#fdba74',
      metrics: [
        { label: 'Scaffolding Speed', value: '-75%' },
        { label: 'Doc Automation', value: '100%' },
        { label: 'Roles Covered', value: 'BE/FE/Mobile/QA/BA' },
      ],
      highlights: [
        t('proj_tma_h1'),
        t('proj_tma_h2'),
        t('proj_tma_h3'),
        t('proj_tma_h4'),
        t('proj_tma_h5'),
        t('proj_tma_h6'),
        t('proj_tma_h7'),
      ],
    },
    // 2. BHS (BestMed) Healthcare Platform
    {
      category: 'healthcare',
      title: t('proj_bhs_title'),
      subtitle: t('proj_bhs_sub'),
      description: t('proj_bhs_desc'),
      tech: ['ASP.NET Core', 'C#', 'Angular', 'AngularJS', 'Azure Functions', 'Azure Service Bus', 'SQL Server', 'Sisense'],
      icon: Activity,
      color: '#06b6d4',
      stripColor: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
      badge: t('proj_current'),
      badgeBg: 'rgba(16, 185, 129, 0.12)',
      badgeBorder: 'rgba(16, 185, 129, 0.35)',
      badgeText: '#6ee7b7',
      metrics: [
        { label: 'Issues Delivered', value: '190' },
        { label: 'Releases', value: '2.44 → 2.48' },
        { label: 'Code Paths Unified', value: '6' },
      ],
      highlights: [
        t('proj_bhs_h1'),
        t('proj_bhs_h2'),
        t('proj_bhs_h3'),
        t('proj_bhs_h4'),
        t('proj_bhs_h5'),
        t('proj_bhs_h6'),
        t('proj_bhs_h7'),
        t('proj_bhs_h8'),
        t('proj_bhs_h9'),
        t('proj_bhs_h10'),
      ],
    },
    // 3. HRM System
    {
      category: 'enterprise',
      title: t('proj_hrm_title'),
      subtitle: t('proj_hrm_sub'),
      description: t('proj_hrm_desc'),
      tech: ['C#', '.NET Core', 'PostgreSQL', 'Hangfire', 'Quartz.NET', 'Kafka', 'Redis', 'IdentityServer', 'NotiHub/FCM'],
      icon: Layers,
      color: '#8b5cf6',
      stripColor: 'linear-gradient(90deg, #7c3aed, #a855f7)',
      badge: '2023 – 2024',
      badgeBg: 'rgba(148, 163, 184, 0.08)',
      badgeBorder: 'rgba(148, 163, 184, 0.2)',
      badgeText: '#cbd5e1',
      metrics: [
        { label: 'Workforce', value: '2,000+' },
        { label: 'Scheduler', value: 'Hangfire' },
        { label: 'Event Engine', value: 'Kafka/Redis' },
      ],
      highlights: [
        t('proj_hrm_h1'),
        t('proj_hrm_h2'),
        t('proj_hrm_h3'),
        t('proj_hrm_h4'),
        t('proj_hrm_h5'),
        t('proj_hrm_h6'),
        t('proj_hrm_h7'),
        t('proj_hrm_h8'),
      ],
    },
    // 4. Work Done Report (AWS Serverless)
    {
      category: 'cloud',
      title: t('proj_wdr_title'),
      subtitle: t('proj_wdr_sub'),
      description: t('proj_wdr_desc'),
      tech: ['AWS Lambda', 'Node.js', 'API Gateway', 'Cognito MFA', 'Aurora PostgreSQL', 'AWS SQS', 'CloudWatch Events', 'SAM'],
      icon: BarChart3,
      color: '#f59e0b',
      stripColor: 'linear-gradient(90deg, #f59e0b, #f97316)',
      badge: '2025',
      badgeBg: 'rgba(148, 163, 184, 0.08)',
      badgeBorder: 'rgba(148, 163, 184, 0.2)',
      badgeText: '#cbd5e1',
      metrics: [
        { label: 'Cost Model', value: 'Pay-per-use' },
        { label: 'Report Gen Time', value: '-80%' },
        { label: 'Architecture', value: 'Serverless' },
      ],
      highlights: [
        t('proj_wdr_h1'),
        t('proj_wdr_h2'),
        t('proj_wdr_h3'),
        t('proj_wdr_h4'),
        t('proj_wdr_h5'),
        t('proj_wdr_h6'),
        t('proj_wdr_h7'),
        t('proj_wdr_h8'),
        t('proj_wdr_h9'),
      ],
    },
    // 5. Savvy Assistant (Enterprise Chatbot)
    {
      category: 'ai',
      title: t('proj_savvy_title'),
      subtitle: t('proj_savvy_sub'),
      description: t('proj_savvy_desc'),
      tech: ['Python MVC', 'Llama2', 'Llamacpp', 'FAISS Vector DB', 'RAG', 'ML Image Search', 'React'],
      icon: Bot,
      color: '#10b981',
      stripColor: 'linear-gradient(90deg, #059669, #10b981)',
      badge: '2022 – 2023',
      badgeBg: 'rgba(148, 163, 184, 0.08)',
      badgeBorder: 'rgba(148, 163, 184, 0.2)',
      badgeText: '#cbd5e1',
      metrics: [
        { label: 'Support Tickets', value: '-40%' },
        { label: 'Vector Database', value: 'FAISS' },
        { label: 'Image Search', value: 'ML Enabled' },
      ],
      highlights: [
        t('proj_savvy_h1'),
        t('proj_savvy_h2'),
        t('proj_savvy_h3'),
        t('proj_savvy_h4'),
        t('proj_savvy_h5'),
        t('proj_savvy_h6'),
      ],
    },
    // 6. IT Asset Management
    {
      category: 'enterprise',
      title: t('proj_asset_title'),
      subtitle: t('proj_asset_sub'),
      description: t('proj_asset_desc'),
      tech: ['C# .NET Core', 'ASP.NET Core', 'PostgreSQL', 'GLPI REST API', 'Quartz.NET', 'IdentityServer', 'Docker'],
      icon: Package,
      color: '#ec4899',
      stripColor: 'linear-gradient(90deg, #e11d48, #ec4899)',
      badge: '2022 – 2023',
      badgeBg: 'rgba(148, 163, 184, 0.08)',
      badgeBorder: 'rgba(148, 163, 184, 0.2)',
      badgeText: '#cbd5e1',
      metrics: [
        { label: 'Assets Tracked', value: '10,000+' },
        { label: 'Accuracy', value: '99%' },
        { label: 'Integration', value: 'GLPI REST' },
      ],
      highlights: [
        t('proj_asset_h1'),
        t('proj_asset_h2'),
        t('proj_asset_h3'),
        t('proj_asset_h4'),
        t('proj_asset_h5'),
        t('proj_asset_h6'),
      ],
    },
    // 7. Contact Center Omnichannel
    {
      category: 'enterprise',
      title: t('proj_cc_title'),
      subtitle: t('proj_cc_sub'),
      description: t('proj_cc_desc'),
      tech: ['Java', 'Spring Boot', 'Microservices', 'MySQL', 'Java Selenium', 'Winium', 'Postman', 'Mock Services'],
      icon: Phone,
      color: '#3b82f6',
      stripColor: 'linear-gradient(90deg, #6366f1, #3b82f6)',
      badge: '2021 – 2022',
      badgeBg: 'rgba(148, 163, 184, 0.08)',
      badgeBorder: 'rgba(148, 163, 184, 0.2)',
      badgeText: '#cbd5e1',
      metrics: [
        { label: 'Concurrent Agents', value: '500+' },
        { label: 'Test Automation', value: 'Selenium' },
        { label: 'Channels', value: 'Chat/Email/SMS' },
      ],
      highlights: [
        t('proj_cc_h1'),
        t('proj_cc_h2'),
        t('proj_cc_h3'),
        t('proj_cc_h4'),
        t('proj_cc_h5'),
        t('proj_cc_h6'),
      ],
    },
  ];

  const filterCategories = [
    { id: 'all', labelEn: 'All Projects', labelVi: 'Tất cả dự án' },
    { id: 'ai', labelEn: 'AI & Multi-Agent', labelVi: 'AI & Đa Agent' },
    { id: 'healthcare', labelEn: 'Healthcare', labelVi: 'Y tế & Bệnh viện' },
    { id: 'enterprise', labelEn: 'Enterprise Systems', labelVi: 'Hệ thống Doanh nghiệp' },
    { id: 'cloud', labelEn: 'Cloud & Serverless', labelVi: 'Cloud & Serverless' },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = selectedFilter === 'all' || p.category === selectedFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07071a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full blur-[140px] bg-violet-600/10" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full blur-[140px] bg-indigo-600/10" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="section-badge">Portfolio</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            <span className="gradient-text">{t('proj_heading')}</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">{t('proj_subtitle')}</p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
            {filterCategories.map((cat) => {
              const active = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {lang === 'vi' ? cat.labelVi : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'vi' ? 'Tìm theo tên hoặc công nghệ...' : 'Filter by name or tech...'}
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="h-full"
                >
                  <TiltCard3D maxTilt={7} scale={1.02} className="h-full">
                    <SpotlightCard
                      className="overflow-hidden group flex flex-col justify-between h-full cursor-pointer hover:border-indigo-500/50 transition-colors"
                      spotlightColor={`${project.color}35`}
                      onClick={() => setActiveModalProject(project)}
                    >
                      {/* Top colored strip */}
                      <div className="h-1 flex-shrink-0" style={{ background: project.stripColor }} />

                      <div className="p-6 flex flex-col flex-1">
                        {/* Header row */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
                              style={{
                                background: `${project.color}25`,
                                border: `1px solid ${project.color}60`,
                              }}
                            >
                              <Icon className="w-5 h-5" style={{ color: project.color }} />
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-white leading-tight group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                                <span>{project.title}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                              </h3>
                              <p className="text-xs text-slate-400 mt-0.5">{project.subtitle}</p>
                            </div>
                          </div>

                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap flex-shrink-0"
                            style={{
                              background: project.badgeBg,
                              borderColor: project.badgeBorder,
                              color: project.badgeText,
                            }}
                          >
                            {project.badge}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-slate-200 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* KPI Metrics Chips */}
                        {project.metrics && (
                          <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 rounded-xl bg-slate-900/60 border border-white/10">
                            {project.metrics.map((m, mIdx) => (
                              <div key={mIdx} className="text-center">
                                <div className="text-xs font-mono font-bold text-cyan-300">{m.value}</div>
                                <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-slate-800/80 border border-white/15 text-slate-200 group-hover:border-indigo-400/40 transition-colors"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Highlights preview */}
                        <div className="space-y-1.5 mt-auto pt-2 border-t border-white/10">
                          {project.highlights.slice(0, 2).map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{highlight}</span>
                            </div>
                          ))}
                        </div>

                        {/* Deep dive trigger banner */}
                        <div className="mt-4 pt-3 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:text-indigo-300 transition-colors">
                          <span>{lang === 'vi' ? 'Xem kiến trúc chi tiết' : 'Inspect system details'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </SpotlightCard>
                  </TiltCard3D>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* If no search results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p>{lang === 'vi' ? 'Không tìm thấy dự án nào khớp với tìm kiếm.' : 'No projects found matching your query.'}</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
