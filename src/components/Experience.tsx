import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Star,
  Activity,
  Layers,
  FileSpreadsheet,
  Bot,
  Headphones,
  Package,
  ChevronDown,
  Sparkles,
  Building2,
} from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import SpotlightCard from './interactive/SpotlightCard';

export default function Experience() {
  const { t, lang } = useLang();
  const [expandedId, setExpandedId] = useState<string>('tma');

  const experiences = [
    {
      id: 'tma',
      role: t('tma_role'),
      company: t('tma_company'),
      badge: t('exp_lead'),
      badgeBg: 'rgba(249, 115, 22, 0.12)',
      badgeBorder: 'rgba(249, 115, 22, 0.35)',
      badgeText: '#fdba74',
      period: t('tma_period'),
      location: 'TP. Hồ Chí Minh',
      type: t('exp_lead'),
      description: t('tma_desc'),
      engagement: 'internal',
      dotColor: '#f97316',
      dotShadow: 'rgba(249, 115, 22, 0.4)',
      stripColor: 'linear-gradient(90deg, #f97316, #ec4899)',
      modules: [
        {
          name: t('tma_mod1_name'),
          detail: t('tma_mod1_detail'),
          icon: Sparkles,
        },
        {
          name: t('tma_mod2_name'),
          detail: t('tma_mod2_detail'),
          icon: Layers,
        },
        {
          name: t('tma_mod3_name'),
          detail: t('tma_mod3_detail'),
          icon: Bot,
        },
        {
          name: t('tma_mod4_name'),
          detail: t('tma_mod4_detail'),
          icon: Star,
        },
        {
          name: t('tma_mod5_name'),
          detail: t('tma_mod5_detail'),
          icon: FileSpreadsheet,
        },
      ],
      techStack: [
        'LLM Orchestration',
        'GraphRAG',
        'FAISS',
        'MCP Protocol',
        'Self-Learning Agents',
        'Harness Agents',
        'Python',
        '.NET Core',
        'TypeScript',
        'Docker',
      ],
      achievements: [
        t('tma_ach1'),
        t('tma_ach2'),
        t('tma_ach3'),
        t('tma_ach4'),
      ],
    },
    {
      id: 'bhs',
      role: t('bhs_role'),
      company: t('bhs_company'),
      badge: t('exp_current'),
      badgeBg: 'rgba(16, 185, 129, 0.1)',
      badgeBorder: 'rgba(16, 185, 129, 0.3)',
      badgeText: '#6ee7b7',
      period: t('bhs_period'),
      location: 'TP. Hồ Chí Minh',
      type: t('exp_fulltime'),
      description: t('bhs_desc'),
      engagement: 'internal',
      dotColor: '#10b981',
      dotShadow: 'rgba(16, 185, 129, 0.4)',
      stripColor: 'linear-gradient(90deg, #10b981, #06b6d4)',
      modules: [
        {
          name: t('bhs_mod1_name'),
          detail: t('bhs_mod1_detail'),
          icon: Activity,
        },
        {
          name: t('bhs_mod2_name'),
          detail: t('bhs_mod2_detail'),
          icon: Layers,
        },
        {
          name: t('bhs_mod3_name'),
          detail: t('bhs_mod3_detail'),
          icon: Sparkles,
        },
        {
          name: t('bhs_mod4_name'),
          detail: t('bhs_mod4_detail'),
          icon: Bot,
        },
        {
          name: t('bhs_mod5_name'),
          detail: t('bhs_mod5_detail'),
          icon: Star,
        },
        {
          name: t('bhs_mod6_name'),
          detail: t('bhs_mod6_detail'),
          icon: Layers,
        },
      ],
      techStack: [
        'C#',
        '.NET Core',
        'PostgreSQL',
        'Redis',
        'RabbitMQ',
        'Emergency Admin',
        'BestmedIQ AI',
        'Angular',
        'Docker',
        'Azure AD',
        'JWT',
        'RESTful API',
      ],
      achievements: [
        t('bhs_ach1'),
        t('bhs_ach2'),
        t('bhs_ach3'),
        t('bhs_ach4'),
      ],
    },
    {
      id: 'xyz',
      role: t('xyz_role'),
      company: t('xyz_company'),
      badge: t('exp_completed'),
      badgeBg: 'rgba(99, 102, 241, 0.1)',
      badgeBorder: 'rgba(99, 102, 241, 0.3)',
      badgeText: '#a5b4fc',
      period: '2022 – 2025',
      location: 'TP. Hồ Chí Minh',
      type: t('exp_fulltime'),
      description: t('xyz_desc'),
      engagement: 'outsourced',
      dotColor: '#6366f1',
      dotShadow: 'rgba(99, 102, 241, 0.4)',
      stripColor: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
      modules: [
        {
          name: t('xyz_mod1_name'),
          detail: t('xyz_mod1_detail'),
          icon: Layers,
        },
        {
          name: t('xyz_mod2_name'),
          detail: t('xyz_mod2_detail'),
          icon: FileSpreadsheet,
        },
        {
          name: t('xyz_mod3_name'),
          detail: t('xyz_mod3_detail'),
          icon: Bot,
        },
      ],
      techStack: [
        '.NET Core',
        'AWS Lambda',
        'Aurora PostgreSQL',
        'Kafka',
        'SignalR',
        'Python',
        'Llama2',
        'FAISS',
        'FastAPI',
      ],
      achievements: [
        t('xyz_ach1'),
        t('xyz_ach2'),
        t('xyz_ach3'),
      ],
    },
    {
      id: 'abc',
      role: t('abc_role'),
      company: t('abc_company'),
      badge: t('exp_completed'),
      badgeBg: 'rgba(148, 163, 184, 0.1)',
      badgeBorder: 'rgba(148, 163, 184, 0.25)',
      badgeText: '#94a3b8',
      period: '2021 – 2023',
      location: 'TP. Hồ Chí Minh',
      type: t('exp_fulltime'),
      description: t('abc_desc'),
      engagement: 'outsourced',
      dotColor: '#38bdf8',
      dotShadow: 'rgba(56, 189, 248, 0.4)',
      stripColor: 'linear-gradient(90deg, #38bdf8, #818cf8)',
      modules: [
        {
          name: t('abc_mod1_name'),
          detail: t('abc_mod1_detail'),
          icon: Headphones,
        },
        {
          name: t('abc_mod2_name'),
          detail: t('abc_mod2_detail'),
          icon: Package,
        },
      ],
      techStack: [
        'Java',
        'Spring Boot',
        'Microservices',
        '.NET Core',
        'PostgreSQL',
        'GLPI API',
        'Docker',
        'CI/CD',
      ],
      achievements: [
        t('abc_ach1'),
        t('abc_ach2'),
        t('abc_ach3'),
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07071a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[140px] bg-indigo-600/10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[140px] bg-violet-600/10" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge">{t('exp_career')}</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            <span className="gradient-text">{t('exp_heading')}</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">{t('exp_subtitle')}</p>
        </div>

        {/* Single-employer banner: everything below happened at TMA Solutions */}
        <div className="mb-10">
          <SpotlightCard
            className="p-0 overflow-hidden"
            spotlightColor="rgba(99, 102, 241, 0.2)"
            borderColor="rgba(255, 255, 255, 0.08)"
          >
            <div className="h-1" style={{ background: 'linear-gradient(90deg, #6366f1, #38bdf8)' }} />
            <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-indigo-300" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{t('exp_employer')}</h3>
                  <span className="font-mono text-sm text-indigo-300">{t('exp_employer_period')}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mt-1.5">{t('exp_employer_note')}</p>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical timeline connector with running laser pulse */}
          <div
            className="absolute left-8 top-0 bottom-0 w-0.5 hidden md:block overflow-hidden"
            style={{ background: 'linear-gradient(to bottom, #f97316, #10b981 33%, #6366f1 66%, #38bdf8)' }}
          >
            <motion.div
              className="w-full h-24 bg-white shadow-[0_0_12px_#fff]"
              animate={{ y: ['-100%', '800%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            />
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const isExpanded = expandedId === exp.id;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative md:pl-20"
                >
                  {/* Timeline node icon */}
                  <div
                    className="absolute left-[18px] top-8 w-9 h-9 rounded-full hidden md:flex items-center justify-center z-10 transition-transform duration-300 hover:scale-110"
                    style={{
                      background: exp.dotColor,
                      boxShadow: `0 0 0 4px #07071a, 0 0 16px ${exp.dotShadow}`,
                    }}
                  >
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>

                  {/* Experience Card */}
                  <SpotlightCard
                    className="p-0 overflow-hidden"
                    spotlightColor={`${exp.dotColor}25`}
                    borderColor="rgba(255, 255, 255, 0.08)"
                  >
                    {/* Top colored strip */}
                    <div className="h-1" style={{ background: exp.stripColor }} />

                    {/* Card Header */}
                    <div className="p-6 sm:p-7 border-b border-white/5 bg-white/[0.01]">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl sm:text-2xl font-bold text-white">{exp.role}</h3>
                            <span
                              className="px-2.5 py-0.5 text-xs font-semibold rounded-full border"
                              style={{
                                background: exp.badgeBg,
                                borderColor: exp.badgeBorder,
                                color: exp.badgeText,
                              }}
                            >
                              {exp.badge}
                            </span>
                          </div>
                          <p className="text-indigo-300 font-semibold text-base mt-1">{exp.company}</p>
                        </div>

                        {/* Expand / Collapse toggle */}
                        <button
                          onClick={() => setExpandedId(isExpanded ? '' : exp.id)}
                          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                        >
                          <span>{isExpanded ? (lang === 'vi' ? 'Thu gọn' : 'Collapse') : (lang === 'vi' ? 'Xem chi tiết' : 'Expand')}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-indigo-400' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Period, Location, Type tags */}
                      <div className="flex flex-wrap gap-4 mt-3 text-slate-400 text-xs sm:text-sm">
                        <span className="flex items-center gap-1.5 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-violet-400" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                          {exp.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                          {exp.engagement === 'internal' ? t('exp_internal') : t('exp_outsourced')}
                        </span>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed mt-4">{exp.description}</p>
                    </div>

                    {/* Expandable Module & Achievement Details with AnimatePresence */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 sm:p-7 space-y-6 bg-slate-950/40">
                            {/* Modules */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-3 flex items-center gap-2">
                                <span className="w-3 h-1 rounded-full" style={{ background: exp.stripColor }} />
                                <span>{t('exp_modules')}</span>
                              </h4>
                              <div className="grid sm:grid-cols-2 gap-3">
                                {exp.modules.map((mod, i) => {
                                  const ModIcon = mod.icon;
                                  return (
                                    <div
                                      key={i}
                                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                                    >
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <div
                                          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                                          style={{ background: `${exp.dotColor}25` }}
                                        >
                                          <ModIcon className="w-3.5 h-3.5" style={{ color: exp.dotColor }} />
                                        </div>
                                        <span className="text-white font-semibold text-xs sm:text-sm">
                                          {mod.name}
                                        </span>
                                      </div>
                                      <p className="text-slate-400 text-xs leading-relaxed">{mod.detail}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Tech Stack */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-2.5 flex items-center gap-2">
                                <span className="w-3 h-1 rounded-full" style={{ background: exp.stripColor }} />
                                <span>{t('exp_techstack')}</span>
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {exp.techStack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-white/5 border border-white/10 text-slate-200"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Key Achievements */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-2.5 flex items-center gap-2">
                                <Star className="w-3.5 h-3.5 text-amber-400" />
                                <span>{t('exp_achievements')}</span>
                              </h4>
                              <ul className="space-y-2">
                                {exp.achievements.map((ach, i) => (
                                  <li key={i} className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span>{ach}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Career Summary KPI Stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {[
            { value: '7+', label: t('exp_years'), color: '#818cf8', gradient: 'from-indigo-500 to-blue-500' },
            { value: '7', label: t('exp_bigprojects'), color: '#a78bfa', gradient: 'from-violet-500 to-purple-500' },
            { value: '3', label: t('exp_clients'), color: '#34d399', gradient: 'from-emerald-500 to-teal-500' },
            { value: '10+', label: t('exp_technologies'), color: '#38bdf8', gradient: 'from-cyan-500 to-sky-500' },
          ].map((stat) => (
            <SpotlightCard key={stat.label} className="p-5 text-center" spotlightColor="rgba(99, 102, 241, 0.15)">
              <div className="text-3xl font-extrabold font-mono mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-slate-400 text-xs font-medium">{stat.label}</div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
