import { Code2, Database, Cloud, Shield, Settings, Layers } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      icon: Code2,
      category: 'Backend',
      color: 'linear-gradient(135deg, #6366f1, #3b82f6)',
      stripColor: 'linear-gradient(90deg, #6366f1, #3b82f6)',
      tagBg: 'rgba(99,102,241,0.1)',
      tagBorder: 'rgba(99,102,241,0.2)',
      tagText: '#a5b4fc',
      titleColor: '#818cf8',
      iconShadow: 'rgba(99,102,241,0.3)',
      skills: ['.NET Core', 'Java Spring Boot', 'Python', 'FastAPI', 'Flask', 'Node.js'],
    },
    {
      icon: Cloud,
      category: 'Cloud (AWS)',
      color: 'linear-gradient(135deg, #f59e0b, #f97316)',
      stripColor: 'linear-gradient(90deg, #f59e0b, #f97316)',
      tagBg: 'rgba(245,158,11,0.1)',
      tagBorder: 'rgba(245,158,11,0.2)',
      tagText: '#fcd34d',
      titleColor: '#fbbf24',
      iconShadow: 'rgba(245,158,11,0.3)',
      skills: ['Lambda', 'SQS', 'S3', 'Cognito', 'Aurora', 'CloudFormation', 'SAM'],
    },
    {
      icon: Database,
      category: 'Database',
      color: 'linear-gradient(135deg, #059669, #0d9488)',
      stripColor: 'linear-gradient(90deg, #059669, #0d9488)',
      tagBg: 'rgba(5,150,105,0.1)',
      tagBorder: 'rgba(5,150,105,0.2)',
      tagText: '#6ee7b7',
      titleColor: '#34d399',
      iconShadow: 'rgba(5,150,105,0.3)',
      skills: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis', 'FAISS'],
    },
    {
      icon: Layers,
      category: 'Architecture',
      color: 'linear-gradient(135deg, #7c3aed, #a855f7)',
      stripColor: 'linear-gradient(90deg, #7c3aed, #a855f7)',
      tagBg: 'rgba(124,58,237,0.1)',
      tagBorder: 'rgba(124,58,237,0.2)',
      tagText: '#c4b5fd',
      titleColor: '#a78bfa',
      iconShadow: 'rgba(124,58,237,0.3)',
      skills: ['Microservices', 'Event-driven', 'Serverless', 'REST API', 'WebSocket', 'Kafka'],
    },
    {
      icon: Settings,
      category: 'DevOps',
      color: 'linear-gradient(135deg, #0891b2, #06b6d4)',
      stripColor: 'linear-gradient(90deg, #0891b2, #06b6d4)',
      tagBg: 'rgba(8,145,178,0.1)',
      tagBorder: 'rgba(8,145,178,0.2)',
      tagText: '#67e8f9',
      titleColor: '#22d3ee',
      iconShadow: 'rgba(8,145,178,0.3)',
      skills: ['Docker', 'Jenkins', 'GitLab CI/CD', 'Git', 'RabbitMQ', 'SignalR'],
    },
    {
      icon: Shield,
      category: 'Security',
      color: 'linear-gradient(135deg, #e11d48, #ec4899)',
      stripColor: 'linear-gradient(90deg, #e11d48, #ec4899)',
      tagBg: 'rgba(225,29,72,0.1)',
      tagBorder: 'rgba(225,29,72,0.2)',
      tagText: '#fda4af',
      titleColor: '#fb7185',
      iconShadow: 'rgba(225,29,72,0.3)',
      skills: ['OAuth2', 'JWT', 'RBAC', 'AES-256', 'CSP', 'Azure AD'],
    },
  ];

  const stats = [
    { value: '5+', label: 'Năm kinh nghiệm', color: '#818cf8', strip: 'linear-gradient(90deg, #6366f1, #3b82f6)' },
    { value: '6+', label: 'Dự án lớn', color: '#a78bfa', strip: 'linear-gradient(90deg, #7c3aed, #a855f7)' },
    { value: '10+', label: 'Công nghệ', color: '#22d3ee', strip: 'linear-gradient(90deg, #0891b2, #06b6d4)' },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07071a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-[120px]" style={{ background: 'rgba(99,102,241,0.05)' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[120px]" style={{ background: 'rgba(5,150,105,0.05)' }}></div>
        <div className="absolute inset-0 grid-pattern opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge">Tech Stack</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Kỹ năng <span className="gradient-text">công nghệ</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Bộ công cụ & công nghệ tôi sử dụng hàng ngày
          </p>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="glass-card overflow-hidden group">
              {/* Strip */}
              <div className="h-[2px]" style={{ background: category.stripColor, opacity: 0.7 }}></div>

              <div className="p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                    style={{ background: category.color, boxShadow: `0 6px 20px ${category.iconShadow}` }}
                  >
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold" style={{ color: category.titleColor }}>{category.category}</h3>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-default hover:scale-105"
                      style={{
                        background: category.tagBg,
                        border: `1px solid ${category.tagBorder}`,
                        color: category.tagText,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card overflow-hidden group text-center">
              <div className="h-[2px]" style={{ background: stat.strip, opacity: 0.7 }}></div>
              <div className="p-6">
                <div className="text-4xl font-extrabold mb-2" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
