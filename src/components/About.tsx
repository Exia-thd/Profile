import { Code2, Server, Cloud, Workflow } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

export default function About() {
  const { t } = useLang();

  const highlights = [
    { icon: Server, title: t('about_hl1_title'), description: t('about_hl1_desc') },
    { icon: Code2, title: t('about_hl2_title'), description: t('about_hl2_desc') },
    { icon: Workflow, title: t('about_hl3_title'), description: t('about_hl3_desc') },
    { icon: Cloud, title: t('about_hl4_title'), description: t('about_hl4_desc') },
  ];

  const strengths = [
    t('about_str1'),
    t('about_str2'),
    t('about_str3'),
    t('about_str4'),
    t('about_str5'),
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about_heading')}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-100 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about_strengths')}</h3>
          <ul className="space-y-3 text-gray-700">
            {strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
