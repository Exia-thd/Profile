import { useState, useRef, useEffect, KeyboardEvent, ReactNode } from 'react';
import { Terminal, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { useLang } from '../../i18n/LangContext';
import { cyberAudio } from '../../utils/cyberAudio';

interface CommandOutput {
  command: string;
  output: string | ReactNode;
}

export default function TerminalCLI({ onClose }: { onClose?: () => void }) {
  const { lang } = useLang();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1.5 text-slate-300">
          <p className="text-emerald-400 font-bold">
            🚀 Trần Hữu Đạt - Interactive Backend Terminal v2.4.0 (x86_64-cloud-linux)
          </p>
          <p className="text-slate-400 text-xs">
            {lang === 'vi'
              ? 'Gõ lệnh hoặc nhấn các phím tắt bên dưới để tra cứu thông tin nhanh:'
              : 'Type a command or click quick action chips below to inspect backend systems:'}
          </p>
        </div>
      ),
    },
  ]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickCommands = [
    'help',
    'about',
    'skills',
    'projects',
    'architecture',
    'contact',
    'metrics',
    'clear',
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    cyberAudio.playPulse();
    setCmdHistory((prev) => [...prev, trimmed]);
    setCmdIndex(-1);

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    let result: ReactNode = '';

    switch (trimmed) {
      case 'help':
        result = (
          <div className="space-y-1 text-xs">
            <p className="text-indigo-400 font-semibold">{lang === 'vi' ? 'Các lệnh khả dụng:' : 'Available commands:'}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 font-mono text-slate-300">
              <div><span className="text-cyan-400">about</span> - {lang === 'vi' ? 'Tổng quan hồ sơ' : 'Profile overview'}</div>
              <div><span className="text-cyan-400">skills</span> - {lang === 'vi' ? 'Kho công nghệ' : 'Tech stack'}</div>
              <div><span className="text-cyan-400">projects</span> - {lang === 'vi' ? 'Dự án thực chiến' : 'Key projects'}</div>
              <div><span className="text-cyan-400">experience</span> - {lang === 'vi' ? 'Kinh nghiệm làm việc' : 'Work timeline'}</div>
              <div><span className="text-cyan-400">architecture</span> - {lang === 'vi' ? 'Kiến trúc hệ thống' : 'System designs'}</div>
              <div><span className="text-cyan-400">metrics</span> - {lang === 'vi' ? 'Hiệu năng hệ thống' : 'Live benchmarks'}</div>
              <div><span className="text-cyan-400">contact</span> - {lang === 'vi' ? 'Thông tin liên hệ' : 'Contact coordinates'}</div>
              <div><span className="text-cyan-400">hire</span> - {lang === 'vi' ? 'Hợp tác tuyển dụng' : 'Recruitment status'}</div>
              <div><span className="text-cyan-400">clear</span> - {lang === 'vi' ? 'Xóa màn hình' : 'Clear screen'}</div>
            </div>
          </div>
        );
        break;

      case 'about':
        result = (
          <div className="space-y-1 text-slate-300 text-xs">
            <p className="text-white font-bold text-sm">Trần Hữu Đạt · Senior Backend Developer & AI System Architect</p>
            <p>🎓 HCMC University of Technology (Đại học Bách Khoa TP.HCM)</p>
            <p>📍 TP. Hồ Chí Minh, Việt Nam</p>
            <p>💼 7+ years on production backends: I own the Sisense BI integration and the medication-authorisation compliance layer of an aged-care platform, built AWS Serverless reporting on Lambda + Cognito + Aurora, and architect TMA's AI-First multi-agent framework on GraphRAG memory, Model Context Protocol (MCP), skills & workflow harness, and Self-learning Agents.</p>
          </div>
        );
        break;

      case 'skills':
        result = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-indigo-400 font-bold">Tech Stack Matrix:</p>
            <p><span className="text-emerald-400 font-semibold">• Backend:</span> .NET Core (C#), Java Spring Boot, Python (FastAPI/Flask), Node.js</p>
            <p><span className="text-amber-400 font-semibold">• Cloud (AWS):</span> Lambda, SQS, S3, Cognito, Aurora Serverless, CloudFormation, SAM</p>
            <p><span className="text-cyan-400 font-semibold">• Databases:</span> PostgreSQL, Redis, FAISS Vector DB, MySQL, MongoDB</p>
            <p><span className="text-violet-400 font-semibold">• Architecture:</span> Microservices, Event-Driven (Kafka, RabbitMQ, SignalR), GraphRAG, Claude AI Agents</p>
            <p><span className="text-rose-400 font-semibold">• Security & DevOps:</span> OAuth2, JWT, RBAC, Azure AD, Docker, GitLab CI/CD</p>
          </div>
        );
        break;

      case 'projects':
        result = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-indigo-400 font-bold">Featured Production & R&D Projects:</p>
            <p><span className="text-orange-400 font-semibold">[1] TMA AI-First Framework (AI System Architect):</span> LLM workflows, skills, GraphRAG memory, MCP protocol, workflow harness & Self-learning agents for BE/FE/Mobile/QA/BA</p>
            <p><span className="text-cyan-300 font-semibold">[2] BESTMED Platform (aged care):</span> Sisense BI integration, Azure Functions data-security pipeline, Victorian legislation medication compliance, AngularJS → Angular migration</p>
            <p><span className="text-purple-300 font-semibold">[3] HRM System (2,000+ staff):</span> Dynamic multi-step approval workflow, Hangfire, Quartz.NET, Kafka, Redis, FCM real-time alerts</p>
            <p><span className="text-amber-300 font-semibold">[4] AWS Serverless WDR:</span> Lambda + Cognito MFA + Aurora PostgreSQL + CloudWatch/SQS automated reporting</p>
            <p><span className="text-emerald-300 font-semibold">[5] Savvy Assistant AI:</span> Llama2 + FAISS vector search + RAG pipeline + ML image search</p>
            <p><span className="text-pink-300 font-semibold">[6] IT Asset Management:</span> Org chart hierarchy, GLPI REST API bi-directional sync, Quartz.NET, IdentityServer</p>
            <p><span className="text-blue-300 font-semibold">[7] Omnichannel Contact Center:</span> Java Spring Boot microservices, routing engine, Java Selenium automation test suite</p>
          </div>
        );
        break;

      case 'architecture':
        result = (
          <div className="text-xs text-slate-300 space-y-1">
            <p className="text-emerald-400 font-bold">Architecture Highlights:</p>
            <p>1. <span className="text-white">TMA AI-First Framework:</span> Spec Ingestion → LLM Agents (BE/FE/Mobile/QA/BA) → GraphRAG Context Memory → MCP Tooling → Self-Learning & Harness Verification</p>
            <p>2. <span className="text-white">BESTMED Medication Platform:</span> Timer Trigger → Service Bus → Worker → API (hourly tenant sync) → Sisense row-level security (ElastiCube + Live) → SQL Server</p>
            <p>3. <span className="text-white">Enterprise Workflow Engine (HRM):</span> Role-based Approval Graph → Hangfire/Quartz Schedulers → Kafka Event Streaming → NotiHub & FCM Push</p>
            <p>4. <span className="text-white">AWS Serverless Architecture (WDR):</span> API Gateway → Cognito MFA → Stateless Node.js Lambdas → Aurora PostgreSQL → EventBridge/SQS</p>
          </div>
        );
        break;

      case 'metrics':
        result = (
          <div className="space-y-1 text-xs font-mono text-slate-300 bg-black/40 p-2.5 rounded-lg border border-white/5">
            <p className="text-emerald-400 font-bold">HTTP 200 OK — Delivery Record:</p>
            <p>• BESTMED issues delivered: <span className="text-cyan-300">190 across releases 2.44 → 2.48</span></p>
            <p>• Medication authorisation paths unified: <span className="text-cyan-300">6 → 1</span></p>
            <p>• Recurring alert defects closed at root cause: <span className="text-cyan-300">8 via one state-machine redesign</span></p>
            <p>• Production race condition removed: <span className="text-cyan-300">four-layer token/lock redesign</span></p>
            <p>• Projects shipped: <span className="text-emerald-300">7 across AI, healthcare, cloud and enterprise</span></p>
          </div>
        );
        break;

      case 'contact':
        result = (
          <div className="space-y-1 text-xs text-slate-300">
            <p><span className="text-indigo-400 font-semibold">Email:</span> <a href="mailto:thdat314@gmail.com" className="text-cyan-300 underline">thdat314@gmail.com</a></p>
            <p><span className="text-indigo-400 font-semibold">Phone:</span> <a href="tel:+84969986422" className="text-cyan-300">0969 986 422</a></p>
            <p><span className="text-indigo-400 font-semibold">GitHub:</span> <a href="https://github.com/exia-thd" target="_blank" rel="noreferrer" className="text-cyan-300 underline">github.com/exia-thd</a></p>
            <p><span className="text-indigo-400 font-semibold">LinkedIn:</span> <a href="https://vn.linkedin.com/in/exia-692a3914b" target="_blank" rel="noreferrer" className="text-cyan-300 underline">linkedin.com/in/exia-692a3914b</a></p>
          </div>
        );
        break;

      case 'hire':
        result = (
          <div className="text-xs text-slate-300 space-y-1">
            <p className="text-emerald-400 font-bold">Status: OPEN FOR SENIOR BACKEND / AI ARCHITECT OPPORTUNITIES</p>
            <p>Response time: &lt; 24 hours.</p>
            <p>Direct contact: thdat314@gmail.com | 0969 986 422</p>
          </div>
        );
        break;

      default:
        result = (
          <p className="text-rose-400 text-xs">
            command not found: <span className="font-mono">{trimmed}</span>. Type <span className="text-cyan-300 underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> to view commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: result }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    cyberAudio.playKey();
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIndex = cmdIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length > 0 && cmdIndex !== -1) {
        const nextIndex = cmdIndex + 1;
        if (nextIndex < cmdHistory.length) {
          setCmdIndex(nextIndex);
          setInput(cmdHistory[nextIndex]);
        } else {
          setCmdIndex(-1);
          setInput('');
        }
      }
    }
  };

  return (
    <div
      className={`rounded-2xl bg-[#090b1e]/95 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-2xl flex flex-col font-mono transition-all duration-300 ${
        isExpanded ? 'h-[550px]' : 'h-[360px]'
      }`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer inline-block" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer inline-block" onClick={() => setIsExpanded(!isExpanded)} />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer inline-block" onClick={() => setHistory([])} />
          </div>
          <div className="flex items-center gap-1.5 ml-2 text-xs text-slate-300 font-semibold">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>exia@backend-node: ~/portfolio</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title={isExpanded ? 'Minimize' : 'Maximize'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-950/50 border-b border-white/5 overflow-x-auto text-[11px] scrollbar-none">
        <span className="text-slate-500 flex items-center gap-1 flex-shrink-0 mr-1">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          Quick:
        </span>
        {quickCommands.map((q) => (
          <button
            key={q}
            onClick={() => executeCommand(q)}
            className="px-2.5 py-0.5 rounded-full bg-white/5 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-300 border border-white/10 transition-all flex-shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Terminal logs */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400 font-bold">exia@cloud</span>
              <span className="text-slate-600">:</span>
              <span className="text-indigo-400">~</span>
              <span className="text-slate-500">$</span>
              <span className="text-white font-semibold">{item.command}</span>
            </div>
            <div className="pl-4 border-l border-white/5 text-slate-300">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command Input */}
      <div className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center gap-2">
        <span className="text-emerald-400 font-bold text-xs">exia$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={lang === 'vi' ? "Nhập lệnh (vd: 'projects', 'help')..." : "Type a command (e.g. 'skills', 'help')..."}
          className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder:text-slate-600 font-mono"
          autoFocus
        />
        <button
          onClick={() => {
            executeCommand(input);
            setInput('');
          }}
          className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          title="Send Command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
