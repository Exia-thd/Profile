import { Folder } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

export default function Projects() {
  const { t } = useLang();

  const projects = [
    {
      title: 'BHS (BestMed)',
      subtitle: t('proj_current'),
      description: t('proj_bhs_desc'),
      tech: ['.NET Core', 'PostgreSQL', 'Redis'],
      highlights: [t('proj_bhs_h1'), t('proj_bhs_h2')],
    },
    {
      title: 'HRM System',
      subtitle: t('proj_hrm_sub'),
      description: t('proj_hrm_desc'),
      tech: ['C#', '.NET Core', 'Entity Framework', 'PostgreSQL', 'Redis', 'Kafka'],
      highlights: [t('proj_hrm_h1'), t('proj_hrm_h2'), t('proj_hrm_h3'), t('proj_hrm_h4')],
    },
    {
      title: 'Work Done Report (WDR)',
      subtitle: t('proj_wdr_sub'),
      description: t('proj_wdr_desc'),
      tech: ['AWS Lambda', 'Node.js', 'Aurora PostgreSQL', 'API Gateway', 'Cognito'],
      highlights: [t('proj_wdr_h1'), t('proj_wdr_h2'), t('proj_wdr_h3'), t('proj_wdr_h4')],
    },
    {
      title: 'Savvy Assistant',
      subtitle: t('proj_savvy_sub'),
      description: t('proj_savvy_desc'),
      tech: ['Python', 'Llama2', 'FAISS', 'RAG'],
      highlights: [t('proj_savvy_h1'), t('proj_savvy_h2'), t('proj_savvy_h3'), t('proj_savvy_h4')],
    },
    {
      title: 'Asset Management System',
      subtitle: t('proj_asset_sub'),
      description: t('proj_asset_desc'),
      tech: ['.NET Core', 'PostgreSQL', 'GLPI API'],
      highlights: [t('proj_asset_h1'), t('proj_asset_h2'), t('proj_asset_h3')],
    },
    {
      title: 'Contact Center System',
      subtitle: t('proj_cc_sub'),
      description: t('proj_cc_desc'),
      tech: ['Java', 'Spring Boot', 'Microservices', 'MySQL'],
      highlights: [t('proj_cc_h1'), t('proj_cc_h2'), t('proj_cc_h3'), t('proj_cc_h4')],
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('proj_heading')}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Folder className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                  <p className="text-blue-600 font-semibold text-sm">{project.subtitle}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
