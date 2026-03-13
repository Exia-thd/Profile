import { Folder, ExternalLink } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'BHS (BestMed)',
      subtitle: 'Dự án hiện tại',
      description: 'Hệ thống quản lý y tế/bảo hiểm',
      tech: ['.NET Core', 'PostgreSQL', 'Redis'],
      highlights: [
        'Xây dựng và tối ưu hóa các module nghiệp vụ liên quan đến quản lý dữ liệu y tế',
        'Đảm bảo tính bảo mật và toàn vẹn dữ liệu cho người dùng'
      ]
    },
    {
      title: 'HRM System',
      subtitle: 'Hệ thống Quản trị Nhân sự',
      description: 'Hệ thống quản lý nhân sự toàn diện với workflow phức tạp',
      tech: ['C#', '.NET Core', 'Entity Framework', 'PostgreSQL', 'Redis', 'Kafka'],
      highlights: [
        'Workflow phê duyệt đa bước với logic định tuyến linh hoạt theo vai trò',
        'Hệ thống RBAC chi tiết cho hàng nghìn nhân viên',
        'Xử lý tác vụ ngầm với Hangfire và Quartz.NET',
        'Thông báo real-time với SignalR và Firebase Cloud Messaging'
      ]
    },
    {
      title: 'Work Done Report (WDR)',
      subtitle: 'Hệ thống Báo cáo Công việc',
      description: 'Cloud-native reporting system trên AWS',
      tech: ['AWS Lambda', 'Node.js', 'Aurora PostgreSQL', 'API Gateway', 'Cognito'],
      highlights: [
        'Kiến trúc Serverless hoàn toàn trên AWS',
        'Tích hợp AWS Cognito với MFA và CSP',
        'Versioning cho báo cáo với audit trail',
        'Dashboard analytics real-time'
      ]
    },
    {
      title: 'Savvy Assistant',
      subtitle: 'AI-Powered Business Chatbot',
      description: 'Chatbot thông minh tích hợp AI cho doanh nghiệp',
      tech: ['Python', 'Llama2', 'FAISS', 'RAG'],
      highlights: [
        'Tích hợp LLM (Llama2) vào quy trình doanh nghiệp',
        'Vector Search với FAISS cho semantic search tốc độ cao',
        'Image-based search với Machine Learning',
        'Tự động trả lời từ kho tri thức nội bộ'
      ]
    },
    {
      title: 'Asset Management System',
      subtitle: 'Hệ thống Quản lý Tài sản',
      description: 'Quản lý tài sản thiết bị IT toàn diện',
      tech: ['.NET Core', 'PostgreSQL', 'GLPI API'],
      highlights: [
        'Thiết kế cấu trúc cây sơ đồ tổ chức',
        'Quản lý bàn giao tài sản thiết bị IT',
        'Tích hợp đồng bộ với hệ thống GLPI qua REST API'
      ]
    },
    {
      title: 'Contact Center System',
      subtitle: 'Hệ thống Trung tâm liên lạc',
      description: 'Omnichannel contact center solution',
      tech: ['Java', 'Spring Boot', 'Microservices', 'MySQL'],
      highlights: [
        'Xử lý luồng dữ liệu từ Chat, Email và SMS',
        'Kiến trúc Microservices',
        'Automation Testing với Java Selenium',
        'Mock services cho đảm bảo độ ổn định'
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Dự án thực chiến</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Folder className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                    <p className="text-blue-600 font-semibold text-sm">{project.subtitle}</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{project.description}</p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
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
