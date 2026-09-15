import { Server, Code2, Workflow, Cloud, TrendingUp, Award, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { useLang } from '../i18n/LangContext';
import SpotlightCard from './interactive/SpotlightCard';
import TiltCard3D from './interactive/TiltCard3D';

export default function About() {
  const { t, lang } = useLang();

  const highlights = [
    {
      icon: Server,
      title: t('about_hl1_title'),
      description: t('about_hl1_desc'),
      gradient: 'from-indigo-500 to-blue-500',
      color: '#6366f1',
      spotlight: 'rgba(99, 102, 241, 0.15)',
    },
    {
      icon: Code2,
      title: t('about_hl2_title'),
      description: t('about_hl2_desc'),
      gradient: 'from-violet-500 to-purple-500',
      color: '#8b5cf6',
      spotlight: 'rgba(139, 92, 246, 0.15)',
    },
    {
      icon: Workflow,
      title: t('about_hl3_title'),
      description: t('about_hl3_desc'),
      gradient: 'from-cyan-500 to-teal-500',
      color: '#06b6d4',
      spotlight: 'rgba(6, 182, 212, 0.15)',
    },
    {
      icon: Cloud,
      title: t('about_hl4_title'),
      description: t('about_hl4_desc'),
      gradient: 'from-emerald-500 to-green-500',
      color: '#10b981',
      spotlight: 'rgba(16, 185, 129, 0.15)',
    },
  ];

  const strengths = [
    {
      title: t('about_str1'),
      detail: lang === 'vi' ? 'Quy trình xét duyệt nhiều bước, phân quyền theo role động, tích hợp Kafka/SignalR.' : 'Multi-step approval workflows with dynamic role-based routing, Kafka & SignalR.',
    },
    {
      title: t('about_str2'),
      detail: lang === 'vi' ? 'Thiết kế giao tiếp bất đồng bộ, message broker RabbitMQ/Kafka, phân rã domain sạch.' : 'Asynchronous communication, RabbitMQ/Kafka message brokers, clean domain segregation.',
    },
    {
      title: t('about_str3'),
      detail: lang === 'vi' ? 'Tích hợp LLMs (Claude, Llama2), GraphRAG, Vector Database FAISS cho tự động hoá.' : 'LLM integrations (Claude, Llama2), GraphRAG knowledge graphs, FAISS vector retrieval.',
    },
    {
      title: t('about_str4'),
      detail: lang === 'vi' ? 'Kiến trúc AWS Lambda, Aurora Serverless, API Gateway, S3, SES tối ưu chi phí.' : 'Cost-efficient AWS Lambda, Aurora Serverless, API Gateway, S3 & SES architecture.',
    },
    {
      title: t('about_str5'),
      detail: lang === 'vi' ? 'Hệ thống RBAC granular, JWT + OAuth2, bảo mật Azure AD và chuẩn y tế nghiêm ngặt.' : 'Granular RBAC systems, JWT + OAuth2, Azure AD enterprise auth & healthcare standards.',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07071a] relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full blur-[140px] -translate-y-1/2 bg-indigo-600/10" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-[140px] -translate-y-1/2 bg-violet-600/10" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="section-badge">About Me</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            <span className="gradient-text">{t('about_heading')}</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t('about_subtitle')}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Main Hero Card — Spans 2 cols & 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 md:row-span-2"
          >
            <SpotlightCard
              className="p-7 sm:p-8 relative flex flex-col justify-between h-full"
              spotlightColor="rgba(99, 102, 241, 0.25)"
              borderColor="rgba(99, 102, 241, 0.2)"
            >
              {/* Top colored strip */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                      Engineering Profile
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Senior Backend Developer</h3>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {t('hero_bio_1')}{' '}
                  <span className="text-white font-semibold">{t('hero_bio_2')}</span>{' '}
                  {t('about_card_body')}{' '}
                  <span className="text-indigo-400 font-medium">healthcare systems (HIS/LIS)</span>{' '}
                  {t('about_card_to')}{' '}
                  <span className="text-violet-400 font-medium">AI-powered multi-agent enterprise automation</span>.
                </p>

                {/* Stat counters */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { value: '7+', label: t('exp_years'), color: '#818cf8' },
                    { value: '6+', label: t('exp_bigprojects'), color: '#a78bfa' },
                    { value: '10+', label: t('exp_technologies'), color: '#38bdf8' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors"
                    >
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                      <div className="text-slate-400 text-xs mt-1 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Tech stack tags */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  Core Foundation
                </span>
                <div className="flex flex-wrap gap-2">
                  {['C# .NET Core', 'Java Spring Boot', 'Python', 'AWS Serverless', 'PostgreSQL', 'Redis', 'Docker'].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 font-mono hover:scale-105 transition-transform"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 4 Feature Cards (2x2 Grid) */}
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                className="h-full"
              >
                <TiltCard3D maxTilt={9} scale={1.02} className="h-full">
                  <SpotlightCard
                    className="p-6 relative flex flex-col justify-between h-full hover:border-white/30 transition-colors"
                    spotlightColor={item.spotlight}
                  >
                    <div>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform"
                        style={{ background: `${item.color}25`, border: `1px solid ${item.color}60` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </SpotlightCard>
                </TiltCard3D>
              </motion.div>
            );
          })}

          {/* Full-width Strengths & Architectural Competencies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-4"
          >
            <SpotlightCard
              className="p-7 sm:p-8"
              spotlightColor="rgba(245, 158, 11, 0.15)"
              borderColor="rgba(245, 158, 11, 0.2)"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                    Competencies
                  </span>
                  <h3 className="text-xl font-bold text-white">{t('about_strengths')}</h3>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {strengths.map((str, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold text-white">{str.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-6">{str.detail}</p>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
