import { CheckCircle2, Layers, Bot, BarChart3, Package, Phone, Activity } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

export default function Projects() {
  const { t } = useLang();

  const projects = [
    {
      title: t('bhs_company'),
      subtitle: t('proj_bhs_desc'),
      description: t('proj_bhs_desc'),
      tech: ['.NET Core', 'PostgreSQL', 'Redis', 'RabbitMQ'],
      icon: Activity,
      color: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      stripColor: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
      iconShadow: 'rgba(59,130,246,0.3)',
      badge: t('proj_current'),
      badgeBg: 'rgba(34,197,94,0.1)',
      badgeBorder: 'rgba(34,197,94,0.25)',
      badgeText: '#86efac',
      highlights: [t('proj_bhs_h1'), t('proj_bhs_h2')],
    },
    {
      title: 'HRM System',
      subtitle: t('proj_hrm_sub'),
      description: t('proj_hrm_desc'),
      tech: ['C#', '.NET Core', 'PostgreSQL', 'Redis', 'Kafka', 'SignalR'],
      icon: Layers,
      color: 'linear-gradient(135deg, #7c3aed, #a855f7)',
      stripColor: 'linear-gradient(90deg, #7c3aed, #a855f7)',
      iconShadow: 'rgba(124,58,237,0.3)',
      badge: '2021 – 2023',
      badgeBg: 'rgba(148,163,184,0.08)',
      badgeBorder: 'rgba(148,163,184,0.15)',
      badgeText: '#94a3b8',
      highlights: [t('proj_hrm_h1'), t('proj_hrm_h2'), t('proj_hrm_h3'), t('proj_hrm_h4')],
    },
    {
      title: 'Work Done Report',
      subtitle: t('proj_wdr_sub'),
      description: t('proj_wdr_desc'),
      tech: ['AWS Lambda', 'Node.js', 'Aurora PostgreSQL', 'API Gateway', 'Cognito'],
      icon: BarChart3,
      color: 'linear-gradient(135deg, #f59e0b, #f97316)',
      stripColor: 'linear-gradient(90deg, #f59e0b, #f97316)',
      iconShadow: 'rgba(245,158,11,0.3)',
      badge: '2021 – 2023',
      badgeBg: 'rgba(148,163,184,0.08)',
      badgeBorder: 'rgba(148,163,184,0.15)',
      badgeText: '#94a3b8',
      highlights: [t('proj_wdr_h1'), t('proj_wdr_h2'), t('proj_wdr_h3'), t('proj_wdr_h4')],
    },
    {
      title: 'Savvy Assistant',
      subtitle: t('proj_savvy_sub'),
      description: t('proj_savvy_desc'),
      tech: ['Python', 'Llama2', 'FAISS', 'RAG', 'FastAPI'],
      icon: Bot,
      color: 'linear-gradient(135deg, #059669, #0d9488)',
      stripColor: 'linear-gradient(90deg, #059669, #0d9488)',
      iconShadow: 'rgba(5,150,105,0.3)',
      badge: '2021 – 2023',
      badgeBg: 'rgba(148,163,184,0.08)',
      badgeBorder: 'rgba(148,163,184,0.15)',
      badgeText: '#94a3b8',
      highlights: [t('proj_savvy_h1'), t('proj_savvy_h2'), t('proj_savvy_h3'), t('proj_savvy_h4')],
    },
    {
      title: 'Asset Management',
      subtitle: t('proj_asset_sub'),
      description: t('proj_asset_desc'),
      tech: ['.NET Core', 'PostgreSQL', 'GLPI API', 'Docker'],
      icon: Package,
      color: 'linear-gradient(135deg, #e11d48, #ec4899)',
      stripColor: 'linear-gradient(90deg, #e11d48, #ec4899)',
      iconShadow: 'rgba(225,29,72,0.3)',
      badge: '2019 – 2021',
      badgeBg: 'rgba(148,163,184,0.08)',
      badgeBorder: 'rgba(148,163,184,0.15)',
      badgeText: '#94a3b8',
      highlights: [t('proj_asset_h1'), t('proj_asset_h2'), t('proj_asset_h3')],
    },
    {
      title: 'Contact Center',
      subtitle: t('proj_cc_sub'),
      description: t('proj_cc_desc'),
      tech: ['Java', 'Spring Boot', 'Microservices', 'MySQL', 'Docker'],
      icon: Phone,
      color: 'linear-gradient(135deg, #6366f1, #3b82f6)',
      stripColor: 'linear-gradient(90deg, #6366f1, #3b82f6)',
      iconShadow: 'rgba(99,102,241,0.3)',
      badge: '2019 – 2021',
      badgeBg: 'rgba(148,163,184,0.08)',
      badgeBorder: 'rgba(148,163,184,0.15)',
      badgeText: '#94a3b8',
      highlights: [t('proj_cc_h1'), t('proj_cc_h2'), t('proj_cc_h3'), t('proj_cc_h4')],
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07071a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(124,58,237,0.05)' }}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(99,102,241,0.05)' }}></div>
        <div className="absolute inset-0 grid-pattern opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            <span className="gradient-text">{t('proj_heading')}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Các hệ thống thực tế từ healthcare đến AI, cloud-native đến enterprise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <div key={index} className="glass-card overflow-hidden group flex flex-col">
              {/* Colored top strip */}
              <div className="h-[3px] flex-shrink-0" style={{ background: project.stripColor }}></div>

              <div className="p-6 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                      style={{ background: project.color, boxShadow: `0 6px 20px ${project.iconShadow}` }}
                    >
                      <project.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">{project.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{project.subtitle}</p>
                    </div>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap flex-shrink-0 ml-2"
                    style={{ background: project.badgeBg, borderColor: project.badgeBorder, color: project.badgeText }}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-medium"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: '#cbd5e1' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-2 mt-auto">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
