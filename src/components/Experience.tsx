import { Briefcase } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Kinh nghiệm làm việc</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Backend Developer</h3>
                <p className="text-blue-600 font-semibold">BHS (BestMed) - Dự án hiện tại</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Hệ thống quản lý y tế/bảo hiểm (BestMed)
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Xây dựng và tối ưu hóa các module nghiệp vụ liên quan đến quản lý dữ liệu y tế</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Đảm bảo tính bảo mật và toàn vẹn dữ liệu cho người dùng</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">Senior Backend Developer</h3>
                <p className="text-blue-600 font-semibold mb-4">5+ năm kinh nghiệm</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">Tech Stack Chuyên sâu:</h4>
                <div className="flex flex-wrap gap-2">
                  {['.NET Core', 'Java Spring Boot', 'Python', 'Node.js', 'AWS Lambda', 'PostgreSQL', 'Redis', 'Kafka'].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">Thành tựu nổi bật:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Thiết kế và triển khai hệ thống Workflow phê duyệt đa cấp cho hàng nghìn người dùng</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Xây dựng kiến trúc Microservices với Event-driven Architecture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Tích hợp AI (Llama2, RAG) vào hệ thống doanh nghiệp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Triển khai Cloud Native Solutions trên AWS với Serverless Architecture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Implement RBAC system cho phân quyền chi tiết và bảo mật cao</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
