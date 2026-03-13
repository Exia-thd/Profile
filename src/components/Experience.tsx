import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Star, TrendingUp, Users, Shield, Zap, Database } from 'lucide-react';
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
      color: 'from-blue-600 to-cyan-600',
      badgeColor: 'bg-green-100 text-green-700 border-green-200',
      badge: t('exp_current'),
      description: t('bhs_desc'),
      modules: [
        { icon: Shield,     name: t('bhs_mod1_name'), detail: t('bhs_mod1_detail') },
        { icon: Database,   name: t('bhs_mod2_name'), detail: t('bhs_mod2_detail') },
        { icon: Zap,        name: t('bhs_mod3_name'), detail: t('bhs_mod3_detail') },
        { icon: TrendingUp, name: t('bhs_mod4_name'), detail: t('bhs_mod4_detail') },
        { icon: Users,      name: t('bhs_mod5_name'), detail: t('bhs_mod5_detail') },
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
      color: 'from-violet-600 to-purple-600',
      badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
      badge: t('exp_completed'),
      description: t('xyz_desc'),
      modules: [
        { icon: Briefcase, name: t('xyz_mod1_name'), detail: t('xyz_mod1_detail') },
        { icon: Zap,       name: t('xyz_mod2_name'), detail: t('xyz_mod2_detail') },
        { icon: TrendingUp,name: t('xyz_mod3_name'), detail: t('xyz_mod3_detail') },
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
      color: 'from-emerald-600 to-teal-600',
      badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
      badge: t('exp_completed'),
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
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium rounded-full mb-4">
            {t('exp_career')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('exp_heading')}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-violet-500 to-emerald-500 hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative md:pl-20">
                {/* Timeline dot */}
                <div className={`absolute left-4 top-8 w-9 h-9 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg shadow-blue-500/20 z-10 hidden md:flex`}>
                  <Briefcase className="w-4 h-4 text-white" />
                </div>

                {/* Card */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:bg-white/8 transition-all duration-300">
                  {/* Card header */}
                  <div className={`bg-gradient-to-r ${exp.color} p-6`}>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                        <p className="text-white/80 font-semibold text-lg">{exp.company}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${exp.badgeColor} bg-white/90`}>
                        {exp.badge}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4 text-white/70 text-sm">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{exp.period}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{exp.location}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" />{exp.type}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <p className="text-slate-300 leading-relaxed">{exp.description}</p>

                    {/* Modules */}
                    <div>
                      <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-blue-400" />
                        {t('exp_modules')}
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {exp.modules.map((mod, i) => (
                          <div key={i} className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-8 h-8 bg-gradient-to-br ${exp.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                <mod.icon className="w-4 h-4 text-white" />
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
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-blue-400" />
                        {t('exp_techstack')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((tech) => (
                          <span key={tech} className="px-3 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-sm font-medium hover:border-blue-500/50 hover:text-blue-300 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-400" />
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
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '5+', label: t('exp_years'),        color: 'text-blue-400' },
            { value: '6+', label: t('exp_bigprojects'),  color: 'text-violet-400' },
            { value: '3',  label: t('exp_companies'),    color: 'text-emerald-400' },
            { value: '10+',label: t('exp_technologies'), color: 'text-amber-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:bg-white/8 transition-colors">
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
