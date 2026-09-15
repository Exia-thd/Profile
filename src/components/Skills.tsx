import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Database,
  Cloud,
  Shield,
  Settings,
  Layers,
  Search,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import SpotlightCard from './interactive/SpotlightCard';
import TiltCard3D from './interactive/TiltCard3D';

export default function Skills() {
  const { t, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchSkill, setSearchSkill] = useState<string>('');

  const skillCategories = [
    {
      id: 'backend',
      icon: Code2,
      category: t('skills_backend'),
      color: '#6366f1',
      stripColor: 'linear-gradient(90deg, #6366f1, #3b82f6)',
      tagBg: 'rgba(99, 102, 241, 0.1)',
      tagBorder: 'rgba(99, 102, 241, 0.25)',
      tagText: '#a5b4fc',
      skills: [
        { name: 'C# .NET Core', exp: '5+ yrs', primary: true },
        { name: 'Java Spring Boot', exp: '4+ yrs', primary: true },
        { name: 'Python', exp: '3+ yrs', primary: true },
        { name: 'FastAPI', exp: '2+ yrs', primary: false },
        { name: 'Flask', exp: '2+ yrs', primary: false },
        { name: 'Node.js', exp: '3+ yrs', primary: false },
        { name: 'RESTful APIs', exp: '5+ yrs', primary: true },
      ],
    },
    {
      id: 'cloud',
      icon: Cloud,
      category: t('skills_cloud'),
      color: '#f59e0b',
      stripColor: 'linear-gradient(90deg, #f59e0b, #f97316)',
      tagBg: 'rgba(245, 158, 11, 0.1)',
      tagBorder: 'rgba(245, 158, 11, 0.25)',
      tagText: '#fcd34d',
      skills: [
        { name: 'AWS Lambda', exp: '3+ yrs', primary: true },
        { name: 'Amazon SQS', exp: '3+ yrs', primary: false },
        { name: 'Amazon S3', exp: '4+ yrs', primary: false },
        { name: 'Amazon Cognito', exp: '2+ yrs', primary: false },
        { name: 'Aurora Serverless', exp: '2+ yrs', primary: true },
        { name: 'CloudFormation', exp: '2+ yrs', primary: false },
        { name: 'AWS SAM', exp: '2+ yrs', primary: false },
      ],
    },
    {
      id: 'database',
      icon: Database,
      category: t('skills_database'),
      color: '#10b981',
      stripColor: 'linear-gradient(90deg, #059669, #10b981)',
      tagBg: 'rgba(16, 185, 129, 0.1)',
      tagBorder: 'rgba(16, 185, 129, 0.25)',
      tagText: '#6ee7b7',
      skills: [
        { name: 'PostgreSQL', exp: '5+ yrs', primary: true },
        { name: 'Redis (Cache Layer)', exp: '4+ yrs', primary: true },
        { name: 'FAISS Vector DB', exp: '2+ yrs', primary: true },
        { name: 'MySQL', exp: '4+ yrs', primary: false },
        { name: 'SQL Server', exp: '3+ yrs', primary: false },
        { name: 'MongoDB', exp: '2+ yrs', primary: false },
      ],
    },
    {
      id: 'architecture',
      icon: Layers,
      category: 'Architecture & AI',
      color: '#8b5cf6',
      stripColor: 'linear-gradient(90deg, #7c3aed, #a855f7)',
      tagBg: 'rgba(139, 92, 246, 0.1)',
      tagBorder: 'rgba(139, 92, 246, 0.25)',
      tagText: '#c4b5fd',
      skills: [
        { name: 'Microservices Mesh', exp: '4+ yrs', primary: true },
        { name: 'Event-Driven (Kafka)', exp: '3+ yrs', primary: true },
        { name: 'Multi-Agent AI (Claude)', exp: '1+ yrs', primary: true },
        { name: 'GraphRAG', exp: '1+ yrs', primary: true },
        { name: 'Serverless Arch', exp: '3+ yrs', primary: false },
        { name: 'SignalR & WebSockets', exp: '3+ yrs', primary: false },
      ],
    },
    {
      id: 'devops',
      icon: Settings,
      category: t('skills_devops'),
      color: '#06b6d4',
      stripColor: 'linear-gradient(90deg, #0891b2, #06b6d4)',
      tagBg: 'rgba(6, 182, 212, 0.1)',
      tagBorder: 'rgba(6, 182, 212, 0.25)',
      tagText: '#67e8f9',
      skills: [
        { name: 'Docker', exp: '4+ yrs', primary: true },
        { name: 'RabbitMQ', exp: '3+ yrs', primary: true },
        { name: 'GitLab CI/CD', exp: '3+ yrs', primary: false },
        { name: 'Jenkins', exp: '2+ yrs', primary: false },
        { name: 'Git Workflow', exp: '5+ yrs', primary: true },
      ],
    },
    {
      id: 'security',
      icon: Shield,
      category: t('skills_security'),
      color: '#ec4899',
      stripColor: 'linear-gradient(90deg, #e11d48, #ec4899)',
      tagBg: 'rgba(236, 72, 153, 0.1)',
      tagBorder: 'rgba(236, 72, 153, 0.25)',
      tagText: '#f472b6',
      skills: [
        { name: 'Granular RBAC', exp: '4+ yrs', primary: true },
        { name: 'OAuth2 & OpenID', exp: '4+ yrs', primary: true },
        { name: 'JWT Architecture', exp: '5+ yrs', primary: true },
        { name: 'Azure AD Integration', exp: '2+ yrs', primary: false },
        { name: 'AES-256 Encryption', exp: '3+ yrs', primary: false },
        { name: 'Content Security (CSP)', exp: '3+ yrs', primary: false },
      ],
    },
  ];

  const stats = [
    { value: '5+', label: t('skills_years_label'), color: '#818cf8' },
    { value: '6+', label: t('skills_projects_label'), color: '#a78bfa' },
    { value: '25+', label: t('skills_tech_label'), color: '#38bdf8' },
    { value: '99.9%', label: lang === 'vi' ? 'Uptime SLA thực chiến' : 'Production Uptime', color: '#34d399' },
  ];

  const filteredCategories = skillCategories.filter((cat) => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) return false;
    if (!searchSkill.trim()) return true;
    return (
      cat.category.toLowerCase().includes(searchSkill.toLowerCase()) ||
      cat.skills.some((s) => s.name.toLowerCase().includes(searchSkill.toLowerCase()))
    );
  });

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07071a] relative overflow-hidden">
      {/* Background radial blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-[140px] bg-indigo-600/10" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[140px] bg-emerald-600/10" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-badge">Tech Stack</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            <span className="gradient-text">{t('skills_heading')}</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t('skills_subtitle')}
          </p>
        </div>

        {/* Filter Chips & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {lang === 'vi' ? 'Tất cả lĩnh vực' : 'All Categories'}
            </button>
            {skillCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === c.id
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {c.category}
              </button>
            ))}
          </div>

          {/* Quick Skill Search */}
          <div className="relative min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
              placeholder={lang === 'vi' ? 'Tìm công nghệ...' : 'Search tech...'}
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
            />
          </div>
        </div>

        {/* Skill Cards Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <TiltCard3D maxTilt={7} scale={1.02} className="h-full">
                    <SpotlightCard
                      className="overflow-hidden group flex flex-col justify-between h-full hover:border-indigo-500/50 transition-colors"
                      spotlightColor={`${category.color}35`}
                    >
                      {/* Colored top strip */}
                      <div className="h-1" style={{ background: category.stripColor }} />

                      <div className="p-6">
                        {/* Category title */}
                        <div className="flex items-center gap-3 mb-5">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                            style={{ background: `${category.color}25`, border: `1px solid ${category.color}60` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: category.color }} />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-white">{category.category}</h3>
                            <span className="text-[11px] font-mono text-slate-400">
                              {category.skills.length} {lang === 'vi' ? 'công nghệ' : 'tools'}
                            </span>
                          </div>
                        </div>

                        {/* Skills tags list */}
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <div
                              key={skill.name}
                              className="group/tag inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all hover:scale-105 cursor-default hover:shadow-md"
                              style={{
                                background: category.tagBg,
                                border: `1px solid ${category.tagBorder}`,
                                color: category.tagText,
                              }}
                            >
                              <span>{skill.name}</span>
                              <span className="text-[10px] opacity-70 font-sans group-hover/tag:opacity-100">
                                {skill.exp}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </SpotlightCard>
                  </TiltCard3D>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Stats row with motion */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
            >
              <SpotlightCard
                className="p-5 text-center"
                spotlightColor="rgba(99, 102, 241, 0.2)"
              >
                <div className="text-3xl sm:text-4xl font-extrabold font-mono mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-slate-400 text-xs font-medium">{stat.label}</div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
