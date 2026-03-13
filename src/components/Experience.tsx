import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Star, TrendingUp, Users, Shield, Zap, Database } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Backend Developer',
    company: 'BHS (BestMed)',
    type: 'Full-time',
    period: '2023 – Hiện tại',
    location: 'TP. Hồ Chí Minh',
    color: 'from-blue-600 to-cyan-600',
    badgeColor: 'bg-green-100 text-green-700 border-green-200',
    badge: 'Đang làm',
    description: 'Phát triển và vận hành hệ thống quản lý y tế & bảo hiểm BestMed – nền tảng số hóa toàn bộ quy trình bảo hiểm y tế doanh nghiệp.',
    modules: [
      {
        icon: Shield,
        name: 'Module Quản lý Bảo hiểm',
        detail: 'Xây dựng engine xử lý yêu cầu bồi thường (claims), phê duyệt đa cấp, và tích hợp với đối tác bảo hiểm bên ngoài thông qua REST API & Webhook.'
      },
      {
        icon: Database,
        name: 'Module Hồ sơ Bệnh nhân',
        detail: 'Thiết kế schema quản lý hồ sơ y tế chuẩn HL7/FHIR, mã hóa dữ liệu nhạy cảm AES-256, đảm bảo tuân thủ quy định bảo mật dữ liệu y tế.'
      },
      {
        icon: Zap,
        name: 'Module API Gateway & Integration',
        detail: 'Thiết kế RESTful API chuẩn, rate limiting, API versioning, tích hợp hệ thống HIS (Hospital Information System) và LIS (Lab Information System).'
      },
      {
        icon: TrendingUp,
        name: 'Tối ưu hiệu năng hệ thống',
        detail: 'Tối ưu query PostgreSQL (giảm 70% response time), triển khai Redis caching layer cho dữ liệu tra cứu, áp dụng pagination & lazy loading.'
      },
      {
        icon: Users,
        name: 'Phân quyền & Bảo mật (RBAC)',
        detail: 'Implement hệ thống RBAC chi tiết theo vai trò: Admin, Bác sĩ, Y tá, Nhân viên bảo hiểm. Tích hợp JWT + OAuth2 với Azure AD.'
      }
    ],
    techStack: ['.NET Core 8', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'Azure AD', 'REST API', 'SignalR'],
    achievements: [
      'Giảm 70% response time nhờ tối ưu query và Redis caching',
      'Xử lý 10,000+ yêu cầu bảo hiểm/ngày với zero downtime',
      'Đảm bảo 99.9% uptime cho hệ thống production',
      'Tích hợp thành công 5 đối tác bảo hiểm và 3 hệ thống bệnh viện'
    ]
  },
  {
    id: 2,
    role: 'Senior Backend Developer',
    company: 'Công ty Phần mềm XYZ',
    type: 'Full-time',
    period: '2021 – 2023',
    location: 'TP. Hồ Chí Minh',
    color: 'from-violet-600 to-purple-600',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    badge: 'Đã hoàn thành',
    description: 'Phát triển hệ thống HRM (Human Resource Management) và Work Done Report trên nền tảng AWS Serverless cho doanh nghiệp 2,000+ nhân viên.',
    modules: [
      {
        icon: Briefcase,
        name: 'HRM Workflow Engine',
        detail: 'Thiết kế hệ thống phê duyệt đa cấp linh hoạt: nghỉ phép, OT, đề xuất tuyển dụng. Sử dụng Kafka để xử lý async events và thông báo real-time qua SignalR.'
      },
      {
        icon: Zap,
        name: 'AWS Serverless (WDR)',
        detail: 'Xây dựng Work Done Report trên AWS Lambda + Aurora Serverless + S3. Tự động hóa báo cáo KPI hàng tuần, export PDF/Excel, gửi email tự động qua SES.'
      },
      {
        icon: TrendingUp,
        name: 'AI Integration (Savvy Assistant)',
        detail: 'Tích hợp Llama2 + RAG (Retrieval-Augmented Generation) với FAISS vector database, xây dựng chatbot hỗ trợ nhân viên tra cứu chính sách nội bộ.'
      }
    ],
    techStack: ['.NET Core', 'Java Spring Boot', 'Kafka', 'SignalR', 'AWS Lambda', 'Aurora', 'Python', 'FAISS'],
    achievements: [
      'Thiết kế workflow engine phục vụ 2,000+ nhân viên',
      'Giảm 80% thời gian xử lý báo cáo với AWS Serverless',
      'Chatbot AI giảm 40% lượng ticket hỗ trợ nội bộ'
    ]
  },
  {
    id: 3,
    role: 'Backend Developer',
    company: 'Công ty Công nghệ ABC',
    type: 'Full-time',
    period: '2019 – 2021',
    location: 'TP. Hồ Chí Minh',
    color: 'from-emerald-600 to-teal-600',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    badge: 'Đã hoàn thành',
    description: 'Phát triển hệ thống Contact Center omnichannel và Asset Management System cho doanh nghiệp viễn thông.',
    modules: [
      {
        icon: Users,
        name: 'Contact Center Omnichannel',
        detail: 'Xây dựng hệ thống tổng đài đa kênh (voice, chat, email, social) trên kiến trúc Microservices với Java Spring Boot, tích hợp CRM và phân tích sentiment AI.'
      },
      {
        icon: Database,
        name: 'Asset Management System',
        detail: 'Phát triển hệ thống quản lý tài sản IT, tích hợp GLPI API, theo dõi vòng đời thiết bị, QR code scan, báo cáo khấu hao tự động.'
      }
    ],
    techStack: ['Java Spring Boot', '.NET Core', 'Microservices', 'GLPI API', 'MySQL', 'Docker', 'Jenkins'],
    achievements: [
      'Xây dựng hệ thống contact center phục vụ 500+ agents',
      'Quản lý 10,000+ tài sản IT với độ chính xác 99%',
      'CI/CD pipeline giảm 60% thời gian deployment'
    ]
  }
];

export default function Experience() {
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
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Kinh nghiệm làm việc
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-violet-500 to-emerald-500 hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative md:pl-20">
                {/* Timeline dot */}
                <div className={`absolute left-4 top-8 w-9 h-9 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg shadow-blue-500/20 z-10 hidden md:flex`}>
                  <Briefcase className="w-4 h-4 text-white" />
                </div>

                {/* Card */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:bg-white/8 transition-all duration-300 group">
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
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Description */}
                    <p className="text-slate-300 leading-relaxed">{exp.description}</p>

                    {/* Modules */}
                    <div>
                      <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-blue-400" />
                        Modules & Trách nhiệm chính
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
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-sm font-medium hover:border-blue-500/50 hover:text-blue-300 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-400" />
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
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '5+', label: 'Năm kinh nghiệm', color: 'text-blue-400' },
            { value: '6+', label: 'Dự án lớn', color: 'text-violet-400' },
            { value: '3', label: 'Công ty', color: 'text-emerald-400' },
            { value: '10+', label: 'Công nghệ', color: 'text-amber-400' },
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
