import { motion } from 'motion/react';
import {
  Cpu,
  Database,
  Cloud,
  Layers,
  Brain,
  Zap,
  Server,
  Workflow,
  Radio,
  Sparkles,
} from 'lucide-react';
import { useLang } from '../../i18n/LangContext';

export default function TechMarquee() {
  const { lang } = useLang();

  const technologies = [
    { name: '.NET Core 8', category: 'Backend', icon: Server, color: '#818cf8' },
    { name: 'PostgreSQL Partitioning', category: 'Database', icon: Database, color: '#34d399' },
    { name: 'TMA AI-First Framework', category: 'Autonomous AI', icon: Brain, color: '#fb923c' },
    { name: 'GraphRAG Context', category: 'Knowledge Memory', icon: Radio, color: '#c084fc' },
    { name: 'MCP Protocol', category: 'LLM Tooling', icon: Workflow, color: '#38bdf8' },
    { name: 'AWS Lambda & SQS', category: 'Serverless', icon: Cloud, color: '#f59e0b' },
    { name: 'Redis Cache Layer', category: 'High Speed', icon: Zap, color: '#f43f5e' },
    { name: 'Kafka Event Streaming', category: 'Message Broker', icon: Layers, color: '#a78bfa' },
    { name: 'Sisense BI', category: 'Analytics Layer', icon: Sparkles, color: '#2dd4bf' },
    { name: 'Self-Learning Agent', category: 'Evaluation Harness', icon: Cpu, color: '#f472b6' },
    { name: 'Java Spring Boot', category: 'Microservices', icon: Server, color: '#60a5fa' },
    { name: 'Python FAISS Vector DB', category: 'AI Retrieval', icon: Brain, color: '#4ade80' },
  ];

  // Double the array for seamless infinite loop
  const list = [...technologies, ...technologies];

  return (
    <div className="relative w-full py-6 overflow-hidden border-y border-white/[0.07] bg-gradient-to-r from-slate-950/60 via-slate-900/40 to-slate-950/60 backdrop-blur-md">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#07071a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#07071a] to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <div className="flex items-center gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
        {list.map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div
              key={`${tech.name}-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all cursor-default group backdrop-blur-sm"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${tech.color}18` }}
              >
                <Icon className="w-4 h-4" style={{ color: tech.color }} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors tracking-tight whitespace-nowrap">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-300 transition-colors whitespace-nowrap">
                  {tech.category}
                </span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full ml-2 opacity-30 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: tech.color }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
