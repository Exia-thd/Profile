import { GraduationCap, Calendar, MapPin, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="mb-8 inline-block">
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
              ĐT
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Trần Hữu Đạt
          </h1>

          <p className="text-2xl md:text-3xl text-blue-600 font-semibold mb-6">
            Senior Backend Developer
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>14/03/1996</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              <span>ĐH Bách Khoa TP.HCM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>TP. Hồ Chí Minh</span>
            </div>
          </div>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Backend Developer với hơn 5 năm kinh nghiệm xây dựng các hệ thống phức tạp.
            Chuyên sâu về .NET Core, Java Spring Boot, Python và AWS Cloud.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Mail className="w-5 h-5" />
              Liên hệ
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
