import { Briefcase, Calendar, MapPin, CheckCircle2, Star, TrendingUp, Users, Shield, Zap, Database } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Backend Developer',
    company: 'BHS (BestMed)',
    type: 'Full-time',
    period: '2023 – Hiện tại',
    location: 'TP. Hồ Chí Minh',
    stripColor: 'linear-gradient(90deg, #6366f1, #06b6d4)',
    dotColor: 'linear-gradient(135deg, #6366f1, #3b82f6)',
    dotShadow: 'rgba(99,102,241,0.4)',
    badge: 'Đang làm',
    badgeBg: 'rgba(34,197,94,0.1)',
    badgeBorder: 'rgba(34,197,94,0.25)',
    badgeText: '#86efac',
    description: 'Phát triển và vận hành hệ thống quản lý y tế & bảo hiểm BestMed – nền tảng số hóa toàn bộ quy trình bảo hiểm y tế doanh nghiệp.',
    modules: [
      { icon: Shield, name: 'Module Quản lý Bảo hiểm', detail: 'Engine xử lý yêu cầu bồi thường (claims), phê duyệt đa cấp, tích hợp đối tác bảo hiểm qua REST API & Webhook.' },
      { icon: Database, name: 'Module Hồ sơ Bệnh nhân', detail: 'Schema quản lý hồ sơ y tế chuẩn HL7/FHIR, mã hóa AES-256, đảm bảo tuân thủ bảo mật dữ liệu y tế.' },
      { icon: Zap, name: 'API Gateway & Integration', detail: 'RESTful API chuẩn, rate limiting, API versioning, tích hợp HIS & LIS.' },
      { icon: TrendingUp, name: 'Tối ưu hiệu năng', detail: 'Tối ưu query PostgreSQL (giảm 70% response time), Redis caching layer, pagination & lazy loading.' },
      { icon: Users, name: 'Phân quyền RBAC', detail: 'Hệ thống RBAC theo vai trò: Admin, Bác sĩ, Y tá, Nhân viên bảo hiểm. JWT + OAuth2 với Azure AD.' },
    ],
    techStack: ['.NET Core 8', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'Azure AD', 'REST API', 'SignalR'],
    achievements: [
      'Giảm 70% response time nhờ tối ưu query và Redis caching',
      'Xử lý 10,000+ yêu cầu bảo hiểm/ngày với zero downtime',
      'Đảm bảo 99.9% uptime cho hệ thống production',
      'Tích hợp thành công 5 đối tác bảo hiểm và 3 hệ thống bệnh viện',
    ],
  },
  {
    id: 2,
    role: 'Senior Backend Developer',
    company: 'Công ty Phần mềm XYZ',
    type: 'Full-time',
    period: '2021 – 2023',
    location: 'TP. Hồ Chí Minh',
    stripColor: 'linear-gradient(90deg, #7c3aed, #a855f7)',
    dotColor: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    dotShadow: 'rgba(124,58,237,0.4)',
    badge: 'Đã hoàn thành',
    badgeBg: 'rgba(148,163,184,0.08)',
    badgeBorder: 'rgba(148,163,184,0.15)',
    badgeText: '#94a3b8',
    description: 'Phát triển hệ thống HRM và Work Done Report trên AWS Serverless cho doanh nghiệp 2,000+ nhân viên.',
    modules: [
      { icon: Briefcase, name: 'HRM Workflow Engine', detail: 'Phê duyệt đa cấp linh hoạt: nghỉ phép, OT, đề xuất tuyển dụng. Kafka async events + SignalR real-time.' },
      { icon: Zap, name: 'AWS Serverless (WDR)', detail: 'AWS Lambda + Aurora Serverless + S3. Auto báo cáo KPI, export PDF/Excel, email tự động qua SES.' },
      { icon: TrendingUp, name: 'AI Integration (Savvy)', detail: 'Llama2 + RAG với FAISS vector database — chatbot hỗ trợ nhân viên tra cứu chính sách nội bộ.' },
    ],
    techStack: ['.NET Core', 'Java Spring Boot', 'Kafka', 'SignalR', 'AWS Lambda', 'Aurora', 'Python', 'FAISS'],
    achievements: [
      'Thiết kế workflow engine phục vụ 2,000+ nhân viên',
      'Giảm 80% thời gian xử lý báo cáo với AWS Serverless',
      'Chatbot AI giảm 40% lượng ticket hỗ trợ nội bộ',
    ],
  },
  {
    id: 3,
    role: 'Backend Developer',
    company: 'Công ty Công nghệ ABC',
    type: 'Full-time',
    period: '2019 – 2021',
    location: 'TP. Hồ Chí Minh',
    stripColor: 'linear-gradient(90deg, #059669, #0d9488)',
    dotColor: 'linear-gradient(135deg, #059669, #0d9488)',
    dotShadow: 'rgba(5,150,105,0.4)',
    badge: 'Đã hoàn thành',
    badgeBg: 'rgba(148,163,184,0.08)',
    badgeBorder: 'rgba(148,163,184,0.15)',
    badgeText: '#94a3b8',
    description: 'Phát triển hệ thống Contact Center omnichannel và Asset Management System cho doanh nghiệp viễn thông.',
    modules: [
      { icon: Users, name: 'Contact Center Omnichannel', detail: 'Hệ thống tổng đài đa kênh (voice, chat, email, social) trên Microservices với Java Spring Boot.' },
      { icon: Database, name: 'Asset Management System', detail: 'Quản lý tài sản IT, tích hợp GLPI API, theo dõi vòng đời thiết bị, QR code scan, báo cáo khấu hao tự động.' },
    ],
    techStack: ['Java Spring Boot', '.NET Core', 'Microservices', 'GLPI API', 'MySQL', 'Docker', 'Jenkins'],
    achievements: [
      'Xây dựng hệ thống contact center phục vụ 500+ agents',
      'Quản lý 10,000+ tài sản IT với độ chính xác 99%',
      'CI/CD pipeline giảm 60% thời gian deployment',
    ],
  },
];

export default function Experience() {
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
          <span className="section-badge">Career Journey</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Kinh nghiệm <span className="gradient-text">làm việc</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Hành trình phát triển qua các hệ thống thực tiễn
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
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
                  {/* Colored strip */}
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
                    {/* Description */}
                    <p className="text-slate-300 leading-relaxed">{exp.description}</p>

                    {/* Modules */}
                    <div>
                      <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <span className="w-4 h-[2px] rounded-full" style={{ background: exp.stripColor }}></span>
                        Modules & Trách nhiệm chính
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
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
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
                        Thành tựu nổi bật
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
            { value: '5+', label: 'Năm kinh nghiệm', color: '#818cf8', strip: 'linear-gradient(90deg, #6366f1, #3b82f6)' },
            { value: '6+', label: 'Dự án lớn', color: '#a78bfa', strip: 'linear-gradient(90deg, #7c3aed, #a855f7)' },
            { value: '3', label: 'Công ty', color: '#34d399', strip: 'linear-gradient(90deg, #059669, #0d9488)' },
            { value: '10+', label: 'Công nghệ', color: '#fbbf24', strip: 'linear-gradient(90deg, #f59e0b, #f97316)' },
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
