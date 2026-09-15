import { Network, Cpu, ShieldCheck } from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import ArchitectureVisualizer from './interactive/ArchitectureVisualizer';

export default function ArchitectureSection() {
  const { lang } = useLang();

  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050616] relative overflow-hidden border-t border-b border-white/5">
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] bg-indigo-900/15" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-badge inline-flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            <span className="gradient-text">
              {lang === 'vi' ? 'Mô Phỏng Kiến Trúc Hệ Thống' : 'Live System Architecture Flows'}
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            {lang === 'vi'
              ? 'Khám phá các luồng kiến trúc thực tế tôi đã thiết kế: từ Multi-Agent R&D, Microservices bảo hiểm y tế đến AWS Serverless.'
              : 'Explore interactive diagrams of production architectures I engineered: Multi-Agent AI code generation, distributed healthcare microservices, and AWS serverless.'}
          </p>
        </div>

        {/* Visualizer Component */}
        <ArchitectureVisualizer />
      </div>
    </section>
  );
}
