import { Code2, Database, Cloud, Shield, Settings } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      icon: Code2,
      category: 'Backend',
      color: 'from-blue-500 to-cyan-500',
      skills: ['.NET Core', 'Java Spring Boot', 'Python (FastAPI/Flask)', 'Node.js']
    },
    {
      icon: Cloud,
      category: 'Cloud (AWS)',
      color: 'from-orange-500 to-amber-500',
      skills: ['Lambda', 'SQS', 'S3', 'Cognito', 'Aurora', 'CloudFormation', 'SAM']
    },
    {
      icon: Database,
      category: 'Database',
      color: 'from-green-500 to-emerald-500',
      skills: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis', 'FAISS']
    },
    {
      icon: Settings,
      category: 'DevOps',
      color: 'from-violet-500 to-purple-500',
      skills: ['Docker', 'Jenkins', 'GitLab CI/CD', 'Git']
    },
    {
      icon: Shield,
      category: 'Security',
      color: 'from-red-500 to-rose-500',
      skills: ['OAuth2', 'JWT', 'RBAC', 'Data Encryption', 'CSP']
    }
  ];

  const detailedSkills = [
    {
      category: 'Backend Development',
      items: '.NET Core, Java Spring Boot, Python (FastAPI/Flask), Node.js'
    },
    {
      category: 'Cloud & AWS',
      items: 'Lambda, SQS, S3, Cognito, Aurora, CloudFormation, SAM'
    },
    {
      category: 'Database',
      items: 'PostgreSQL, MySQL, SQL Server, MongoDB, Redis, FAISS'
    },
    {
      category: 'DevOps',
      items: 'Docker, Jenkins, GitLab CI/CD, Git'
    },
    {
      category: 'Security',
      items: 'OAuth2, JWT, RBAC, Data Encryption, CSP'
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Kỹ năng công nghệ</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-slate-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Chi tiết kỹ năng</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-blue-600">
                  <th className="text-left py-4 px-6 text-gray-900 font-bold text-lg bg-blue-50">
                    Nhóm kỹ năng
                  </th>
                  <th className="text-left py-4 px-6 text-gray-900 font-bold text-lg bg-blue-50">
                    Chi tiết
                  </th>
                </tr>
              </thead>
              <tbody>
                {detailedSkills.map((skill, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-gray-900 align-top">
                      {skill.category}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {skill.items}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">5+</div>
            <div className="text-gray-600">Năm kinh nghiệm</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">6+</div>
            <div className="text-gray-600">Dự án lớn</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
            <div className="text-gray-600">Công nghệ</div>
          </div>
        </div>
      </div>
    </section>
  );
}
