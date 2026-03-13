import { Code2, Server, Cloud, Workflow } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Server,
      title: 'Backend Excellence',
      description: 'Hơn 5 năm kinh nghiệm phát triển hệ thống Backend với tech stack đa dạng'
    },
    {
      icon: Code2,
      title: 'Multi-Stack Developer',
      description: 'Chuyên sâu .NET Core, Java Spring Boot, Python và Node.js (AWS Lambda)'
    },
    {
      icon: Workflow,
      title: 'System Architecture',
      description: 'Thiết kế hệ thống Workflow phê duyệt đa cấp, Microservices, Event-driven'
    },
    {
      icon: Cloud,
      title: 'AI Integration',
      description: 'Kinh nghiệm tích hợp AI và xây dựng giải pháp thông minh cho doanh nghiệp'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tổng quan kinh nghiệm</h2>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Điểm mạnh chuyên môn</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Thiết kế và triển khai hệ thống Workflow phê duyệt đa cấp với logic định tuyến linh hoạt</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Kiến trúc Microservices và hệ thống hướng sự kiện (Event-driven Architecture)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Tích hợp AI và Machine Learning vào quy trình doanh nghiệp</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Cloud Native Development trên AWS với Serverless Architecture</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
