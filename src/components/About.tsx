import { Code2, Server, Cloud, Workflow, Sparkles, TrendingUp, Award } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Server,
      title: 'Backend Excellence',
      description: 'Hơn 5 năm xây dựng hệ thống Backend với tech stack đa dạng',
      color: 'linear-gradient(135deg, #6366f1, #3b82f6)',
      borderColor: 'rgba(99,102,241,0.3)',
      tagBg: 'rgba(99,102,241,0.1)',
      tagBorder: 'rgba(99,102,241,0.2)',
      tagText: '#a5b4fc',
    },
    {
      icon: Code2,
      title: 'Multi-Stack Dev',
      description: '.NET Core, Java Spring Boot, Python & Node.js',
      color: 'linear-gradient(135deg, #7c3aed, #a855f7)',
      borderColor: 'rgba(124,58,237,0.3)',
      tagBg: 'rgba(124,58,237,0.1)',
      tagBorder: 'rgba(124,58,237,0.2)',
      tagText: '#c4b5fd',
    },
    {
      icon: Workflow,
      title: 'System Architecture',
      description: 'Microservices, Event-driven, Workflow phê duyệt đa cấp',
      color: 'linear-gradient(135deg, #0891b2, #06b6d4)',
      borderColor: 'rgba(8,145,178,0.3)',
      tagBg: 'rgba(8,145,178,0.1)',
      tagBorder: 'rgba(8,145,178,0.2)',
      tagText: '#67e8f9',
    },
    {
      icon: Cloud,
      title: 'AI Integration',
      description: 'Tích hợp AI/ML & LLM vào quy trình doanh nghiệp',
      color: 'linear-gradient(135deg, #059669, #10b981)',
      borderColor: 'rgba(5,150,105,0.3)',
      tagBg: 'rgba(5,150,105,0.1)',
      tagBorder: 'rgba(5,150,105,0.2)',
      tagText: '#6ee7b7',
    },
  ];

  const strengths = [
    'Thiết kế và triển khai hệ thống Workflow phê duyệt đa cấp với logic định tuyến linh hoạt',
    'Kiến trúc Microservices và hệ thống hướng sự kiện (Event-driven Architecture)',
    'Tích hợp AI và Machine Learning vào quy trình doanh nghiệp',
    'Cloud Native Development trên AWS với Serverless Architecture',
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07071a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full blur-[120px] -translate-y-1/2" style={{ background: 'rgba(99,102,241,0.06)' }}></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-[120px] -translate-y-1/2" style={{ background: 'rgba(139,92,246,0.06)' }}></div>
        <div className="absolute inset-0 grid-pattern opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge">About Me</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Tổng quan <span className="gradient-text">kinh nghiệm</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Backend developer với đam mê xây dựng hệ thống mạnh mẽ, hiệu năng cao
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Large intro card — spans 2 cols & 2 rows on md+ */}
          <div
            className="md:col-span-2 md:row-span-2 glass-card p-8 relative overflow-hidden group"
            style={{ borderTop: '1px solid rgba(99,102,241,0.25)' }}
          >
            {/* Top gradient strip */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
              style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)' }}
            ></div>
            {/* Ambient glow */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-2xl transition-all duration-500 group-hover:opacity-80"
              style={{ background: 'rgba(99,102,241,0.08)' }}
            ></div>

            <div className="relative">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 8px 24px rgba(99,102,241,0.3)' }}
              >
                <Sparkles className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">Senior Backend Developer</h3>

              <p className="text-slate-400 leading-relaxed mb-6">
                Với hơn <span className="text-white font-semibold">5 năm kinh nghiệm</span> phát triển
                phần mềm, tôi chuyên xây dựng các hệ thống backend phức tạp, hiệu năng cao — từ{' '}
                <span className="text-indigo-400">healthcare management</span> đến{' '}
                <span className="text-violet-400">AI-powered enterprise systems</span>.
              </p>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { value: '5+', label: 'Năm KN', color: '#818cf8' },
                  { value: '6+', label: 'Dự án', color: '#a78bfa' },
                  { value: '10+', label: 'Công nghệ', color: '#67e8f9' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="text-2xl font-extrabold" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {['.NET Core', 'Java Spring Boot', 'Python', 'AWS', 'PostgreSQL', 'Redis'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-medium"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#a5b4fc' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Feature cards — 2×2 grid on the right */}
          {highlights.map((item, index) => (
            <div
              key={index}
              className="glass-card p-6 relative overflow-hidden group cursor-default"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ background: item.color }}
              ></div>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                style={{ background: item.color, boxShadow: `0 6px 20px ${item.borderColor}` }}
              >
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}

          {/* Full-width strengths card */}
          <div className="md:col-span-4 glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', boxShadow: '0 6px 20px rgba(245,158,11,0.25)' }}
              >
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Điểm mạnh chuyên môn</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {strengths.map((strength, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl transition-all"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.05)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.15)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'; }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}
                  >
                    <TrendingUp className="w-3 h-3 text-indigo-400" />
                  </div>
                  <span className="text-slate-300 text-sm leading-relaxed">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
