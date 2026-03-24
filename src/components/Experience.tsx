import { Briefcase, Calendar, MapPin, CheckCircle2, Star, TrendingUp, Users, Shield, Zap, Database } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

export default function Experience() {
  const { t } = useLang();

  const experiences = [
    {
      id: 1,
      role: t('bhs_role'),
      company: t('bhs_company'),
      type: t('exp_fulltime'),
      period: t('bhs_period'),
      location: t('hero_location'),
      stripColor: 'linear-gradient(90deg, #6366f1, #06b6d4)',
      dotColor: 'linear-gradient(135deg, #6366f1, #3b82f6)',
      dotShadow: 'rgba(99,102,241,0.4)',
      badge: t('exp_current'),
      badgeBg: 'rgba(34,197,94,0.1)',
      badgeBorder: 'rgba(34,197,94,0.25)',
      badgeText: '#86efac',
      description: t('bhs_desc'),
      modules: [
        { icon: Shield,      name: t('bhs_mod1_name'), detail: t('bhs_mod1_detail') },
        { icon: Database,    name: t('bhs_mod2_name'), detail: t('bhs_mod2_detail') },
        { icon: Zap,         name: t('bhs_mod3_name'), detail: t('bhs_mod3_detail') },
        { icon: TrendingUp,  name: t('bhs_mod4_name'), detail: t('bhs_mod4_detail') },
        { icon: Users,       name: t('bhs_mod5_name'), detail: t('bhs_mod5_detail') },
      ],
      techStack: ['.NET Core 8', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'Azure AD', 'REST API', 'SignalR'],
      achievements: [t('bhs_ach1'), t('bhs_ach2'), t('bhs_ach3'), t('bhs_ach4')],
    },
    {
      id: 2,
      role: t('xyz_role'),
      company: t('xyz_company'),
      type: t('exp_fulltime'),
      period: t('xyz_period'),
      location: t('hero_location'),
      stripColor: 'linear-gradient(90deg, #7c3aed, #a855f7)',
      dotColor: 'linear-gradient(135deg, #7c3aed, #a855f7)',
      dotShadow: 'rgba(124,58,237,0.4)',
      badge: t('exp_completed'),
      badgeBg: 'rgba(148,163,184,0.08)',
      badgeBorder: 'rgba(148,163,184,0.15)',
      badgeText: '#94a3b8',
      description: t('xyz_desc'),
      modules: [
        { icon: Briefcase,  name: t('xyz_mod1_name'), detail: t('xyz_mod1_detail') },
        { icon: Zap,        name: t('xyz_mod2_name'), detail: t('xyz_mod2_detail') },
        { icon: TrendingUp, name: t('xyz_mod3_name'), detail: t('xyz_mod3_detail') },
      ],
      techStack: ['.NET Core', 'Java Spring Boot', 'Kafka', 'SignalR', 'AWS Lambda', 'Aurora', 'Python', 'FAISS'],
      achievements: [t('xyz_ach1'), t('xyz_ach2'), t('xyz_ach3')],
    },
    {
      id: 3,
      role: t('abc_role'),
      company: t('abc_company'),
      type: t('exp_fulltime'),
      period: t('abc_period'),
      location: t('hero_location'),
      stripColor: 'linear-gradient(90deg, #059669, #0d9488)',
      dotColor: 'linear-gradient(135deg, #059669, #0d9488)',
      dotShadow: 'rgba(5,150,105,0.4)',
      badge: t('exp_completed'),
      badgeBg: 'rgba(148,163,184,0.08)',
      badgeBorder: 'rgba(148,163,184,0.15)',
      badgeText: '#94a3b8',
      description: t('abc_desc'),
      modules: [
        { icon: Users,    name: t('abc_mod1_name'), detail: t('abc_mod1_detail') },
        { icon: Database, name: t('abc_mod2_name'), detail: t('abc_mod2_detail') },
      ],
      techStack: ['Java Spring Boot', '.NET Core', 'Microservices', 'GLPI API', 'MySQL', 'Docker', 'Jenkins'],
      achievements: [t('abc_ach1'), t('abc_ach2'), t('abc_ach3')],
    },
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07071a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(99,102,241,0.05)' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(124,58,237,0.05)' }}></div>
        <div className="absolute inset-0 grid-pattern opacity-40"></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge">{t('exp_career')}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            <span className="gradient-text">{t('exp_heading')}</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Hành trình phát triển qua các hệ thống thực tiễn
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #6366f1, #8b5cf6, #059669)' }}
          ></div>

          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative md:pl-20">
                {/* Timeline dot */}
                <div
                  className="absolute left-[18px] top-8 w-9 h-9 rounded-full flex items-center justify-center z-10 hidden md:flex"
                  style={{ background: exp.dotColor, boxShadow: `0 0 0 4px rgba(7,7,26,1), 0 0 0 6px ${exp.dotShadow}` }}
                >
                  <Briefcase className="w-4 h-4 text-white" />
                </div>

                {/* Card */}
                <div className="glass-card overflow-hidden">
                  <div className="h-[3px]" style={{ background: exp.stripColor }}></div>

                  {/* Card header */}
                  <div className="p-6 pb-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-0.5">{exp.role}</h3>
                        <p className="text-slate-300 font-semibold">{exp.company}</p>
                      </div>
                      <span
                        className="px-3 py-1 text-sm font-semibold rounded-full border"
                        style={{ background: exp.badgeBg, borderColor: exp.badgeBorder, color: exp.badgeText }}
                      >
                        {exp.badge}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3 text-slate-400 text-sm">
                      <span className="flex items-center gap-1.5">
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
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <p className="text-slate-300 leading-relaxed">{exp.description}</p>

                    {/* Modules */}
                    <div>
                      <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <span className="w-4 h-[2px] rounded-full" style={{ background: exp.stripColor }}></span>
                        {t('exp_modules')}
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {exp.modules.map((mod, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl transition-colors"
                            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ background: exp.dotColor }}
                              >
                                <mod.icon className="w-3.5 h-3.5 text-white" />
                              </div>
                              <span className="text-white font-semibold text-sm">{mod.name}</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">{mod.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                        <span className="w-4 h-[2px] rounded-full" style={{ background: exp.stripColor }}></span>
                        {t('exp_techstack')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: '#cbd5e1' }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-400" />
                        {t('exp_achievements')}
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '5+', label: t('exp_years'), color: '#818cf8', strip: 'linear-gradient(90deg, #6366f1, #3b82f6)' },
            { value: '6+', label: t('exp_bigprojects'), color: '#a78bfa', strip: 'linear-gradient(90deg, #7c3aed, #a855f7)' },
            { value: '3', label: t('exp_companies'), color: '#34d399', strip: 'linear-gradient(90deg, #059669, #0d9488)' },
            { value: '10+', label: t('exp_technologies'), color: '#fbbf24', strip: 'linear-gradient(90deg, #f59e0b, #f97316)' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card overflow-hidden text-center">
              <div className="h-[2px]" style={{ background: stat.strip, opacity: 0.7 }}></div>
              <div className="p-5">
                <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
