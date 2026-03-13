import { GraduationCap, Calendar, MapPin, Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 pt-16">
        <div className="text-center">
          {/* Avatar */}
          <div className="mb-8 inline-block relative">
            <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-blue-500/30 ring-4 ring-white/10">
              ĐT
            </div>
            <div className="absolute -bottom-1 -right-1 w-11 h-11 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-3 tracking-tight">
            Trần Hữu Đạt
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl font-semibold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Senior Backend Developer
            </span>
          </p>

          {/* Info chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-slate-300 rounded-full text-sm backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-blue-400" />
              14/03/1996
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-slate-300 rounded-full text-sm backdrop-blur-sm">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              {t('hero_university')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-slate-300 rounded-full text-sm backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-blue-400" />
              {t('hero_location')}
            </span>
          </div>

          {/* Bio */}
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('hero_bio_1')}{' '}
            <span className="text-white font-semibold">{t('hero_bio_2')}</span>{' '}
            {t('hero_bio_3')}{' '}
            <span className="text-blue-400 font-medium">.NET Core</span>,{' '}
            <span className="text-blue-400 font-medium">Java Spring Boot</span>,{' '}
            <span className="text-blue-400 font-medium">Python</span>{' '}
            {t('hero_bio_end')}{' '}
            <span className="text-blue-400 font-medium">AWS Cloud</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transform"
            >
              <Mail className="w-5 h-5" />
              {t('hero_contact_btn')}
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/15 transition-all backdrop-blur-sm hover:-translate-y-0.5 transform"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/15 transition-all backdrop-blur-sm hover:-translate-y-0.5 transform"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>

          {/* Scroll indicator */}
          <a href="#about" className="inline-flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors">
            <span className="text-xs uppercase tracking-widest">{t('hero_scroll')}</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
