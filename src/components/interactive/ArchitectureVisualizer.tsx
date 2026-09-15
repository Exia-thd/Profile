import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Cpu,
  Database,
  Server,
  Zap,
  ShieldCheck,
  Radio,
  Play,
  CheckCircle,
  FileCode2,
  Workflow,
  Sparkles,
} from 'lucide-react';
import { useLang } from '../../i18n/LangContext';

interface NodeItem {
  id: string;
  name: string;
  role: string;
  icon: typeof Brain;
  tech: string[];
  metrics: string;
  descriptionEn: string;
  descriptionVi: string;
  color: string;
}

interface Pipeline {
  id: string;
  titleEn: string;
  titleVi: string;
  tag: string;
  descriptionEn: string;
  descriptionVi: string;
  nodes: NodeItem[];
}

export default function ArchitectureVisualizer() {
  const { lang } = useLang();
  const [activePipelineId, setActivePipelineId] = useState<'ai' | 'healthcare' | 'serverless'>('ai');
  const [selectedNode, setSelectedNode] = useState<NodeItem | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);

  const pipelines: Record<'ai' | 'healthcare' | 'serverless', Pipeline> = {
    ai: {
      id: 'ai',
      titleEn: 'TMA AI-First Framework & Multi-Agent Engine',
      titleVi: 'Hệ Thống TMA AI-First Framework & Đa Agent Tự Động Hóa',
      tag: 'Team Lead · AI-First Engineering',
      descriptionEn:
        'An autonomous development engine automating project scaffolding, dynamic code generation, documentation synthesis, and continuous developer wiki updates. Employs GraphRAG memory, Model Context Protocol (MCP), cross-role agents (BE, FE, Mobile, QA, BA), and self-learning harness evaluation.',
      descriptionVi:
        'Framework phát triển phần mềm AI-First độc quyền tự động hóa từ khởi tạo dự án, sinh mã nguồn, tự động tạo Docs và cập nhật Wiki tri thức. Ứng dụng bộ nhớ GraphRAG, giao thức MCP, agent đa vai trò (BE, FE, Mobile, QA, BA) cùng kiến trúc self-learning harness agent.',
      nodes: [
        {
          id: 'spec',
          name: 'Requirements & Spec Ingestion',
          role: 'Scaffolding & Contract Input',
          icon: Workflow,
          tech: ['Jira API', 'OpenAPI / Swagger', 'Markdown Specs'],
          metrics: '< 100ms ingestion',
          descriptionEn: 'Parses functional specs, Jira requirements, and API definitions to trigger scaffold pipelines.',
          descriptionVi: 'Đọc và phân tích yêu cầu nghiệp vụ, Jira issues và contract API để khởi tạo khung dự án.',
          color: '#38bdf8',
        },
        {
          id: 'agent',
          name: 'Cross-Role Autonomous Agents',
          role: 'BE, FE, Mobile, QA & BA',
          icon: Brain,
          tech: ['LLM Orchestration', 'Multi-Agent Personas', 'Skills Workflow'],
          metrics: '5 Core Roles Automated',
          descriptionEn: 'Deploys specialized agents tailored for Backend, Frontend, Mobile, QA test suites, and BA specs.',
          descriptionVi: 'Điều phối agent chuyên biệt cho từng vai trò: Lập trình viên BE, FE, Mobile, kiểm thử tự động QA và phân tích nghiệp vụ BA.',
          color: '#f97316',
        },
        {
          id: 'graphrag',
          name: 'GraphRAG Memory & MCP Protocol',
          role: 'Persistent Context & Tooling Bridge',
          icon: Radio,
          tech: ['GraphRAG', 'MCP Protocol', 'FAISS Vector Index'],
          metrics: '98.4% Context Precision',
          descriptionEn: 'Maintains deep codebase knowledge graphs and uses MCP (Model Context Protocol) to interact with IDEs and CLI tools.',
          descriptionVi: 'Bộ nhớ tri thức GraphRAG lưu cấu trúc dự án bền vững kết hợp giao thức MCP kết nối LLM với công cụ dev.',
          color: '#a855f7',
        },
        {
          id: 'harness',
          name: 'Self-Learning & Harness Agent',
          role: 'Verification & Auto-Tuning',
          icon: Sparkles,
          tech: ['Self-Learning Loop', 'Evaluation Harness', 'Benchmark Suite'],
          metrics: 'Automated Self-Correction',
          descriptionEn: 'Runs validation tests, checks quality guardrails, and drives the self-learning feedback loop to refine outputs.',
          descriptionVi: 'Harness agent chạy benchmark kiểm thử, đối chiếu tiêu chuẩn chất lượng và tự động phản hồi cho agent hiệu chỉnh.',
          color: '#ec4899',
        },
        {
          id: 'codegen',
          name: 'Scaffolding, Docs & Wiki Sync',
          role: 'Production Assets Output',
          icon: FileCode2,
          tech: ['Auto Docs', 'ERD Generation', 'Confluence/Wiki Sync'],
          metrics: '-75% Setup Time',
          descriptionEn: 'Generates production-grade starter code, comprehensive architecture documentation, and living wiki pages.',
          descriptionVi: 'Xuất mã nguồn chuẩn, tự động sinh tài liệu kiến trúc, sơ đồ ERD và đồng bộ trực tiếp lên hệ thống Wiki.',
          color: '#10b981',
        },
      ],
    },
    healthcare: {
      id: 'healthcare',
      titleEn: 'BHS Healthcare & Emergency Platform',
      titleVi: 'Hệ Thống Y Tế & Điều Phối Cấp Cứu BHS',
      tag: 'Production · 99.9% Uptime SLA',
      descriptionEn:
        'Enterprise healthcare platform handling emergency medical requests, care team coordination, BestmedIQ AI analytics, AI-assisted Angular upgrades, and high-throughput claims processing.',
      descriptionVi:
        'Nền tảng y tế số hóa xử lý yêu cầu cấp cứu khẩn cấp, cổng Emergency Admin, quản lý Care Team, phân tích báo cáo BestmedIQ AI, nâng cấp Angular bằng AI và xử lý bồi thường hiệu năng cao.',
      nodes: [
        {
          id: 'emergency',
          name: 'Emergency Dispatch & Admin',
          role: 'Urgent Triage & Incident Ingress',
          icon: ShieldCheck,
          tech: ['Real-time Dispatch', 'Emergency Admin', 'Audit Trail'],
          metrics: '< 2s Dispatch Latency',
          descriptionEn: 'Instantaneous intake of emergency medical alerts, triage dispatching, and Emergency Admin oversight.',
          descriptionVi: 'Tiếp nhận yêu cầu cấp cứu y tế khẩn cấp, điều phối tức thời và cổng quản trị Emergency Admin kiểm soát.',
          color: '#ef4444',
        },
        {
          id: 'careteam',
          name: 'Care Team Coordinator',
          role: 'Doctor & Nurse Case Alignment',
          icon: Server,
          tech: ['.NET Core', 'Clean Architecture', 'RBAC Security'],
          metrics: 'Multi-specialist Assignment',
          descriptionEn: 'Coordinates doctors, nurses, and specialists assigned to patient cases with secure communications.',
          descriptionVi: 'Điều phối nhân sự y tế: phân công bác sĩ, y tá và chuyên gia lâm sàng theo từng hồ sơ bệnh nhân.',
          color: '#38bdf8',
        },
        {
          id: 'bestmediq',
          name: 'BestmedIQ AI Analytics & Modern UI',
          role: 'AI Diagnosis & Angular Upgrade',
          icon: Brain,
          tech: ['BestmedIQ AI', 'AST AI Tooling', 'Angular Modernization'],
          metrics: '100% Zero-Regression UI',
          descriptionEn: 'Analyzes diagnostic reports for claims validation and utilizes AI-assisted tooling to modernize Angular components.',
          descriptionVi: 'Phân tích báo cáo y tế BestmedIQ AI phát hiện bất thường và ứng dụng AI nâng cấp frontend Angular hiện đại.',
          color: '#8b5cf6',
        },
        {
          id: 'cache',
          name: 'Redis Cache & Claims Engine',
          role: 'High-Throughput Policy Layer',
          icon: Zap,
          tech: ['Redis Cluster', 'RabbitMQ', 'Distributed Locking'],
          metrics: '-70% Query Latency',
          descriptionEn: 'Caches hospital tariffs and handles asynchronous claims batching through RabbitMQ message queues.',
          descriptionVi: 'Lưu cache bảng giá bảo hiểm, tối ưu tốc độ truy vấn giảm 70% latency và định tuyến hàng đợi RabbitMQ.',
          color: '#f59e0b',
        },
        {
          id: 'storage',
          name: 'Partitioned PostgreSQL Cluster',
          role: 'HIPAA/FHIR Secure Storage',
          icon: Database,
          tech: ['PostgreSQL', 'Table Partitioning', 'AES-256 Encryption'],
          metrics: '10,000+ Claims / Day',
          descriptionEn: 'Ensures encrypted, audited, and ACID-compliant healthcare transaction data storage under HL7/FHIR standards.',
          descriptionVi: 'Lưu trữ an toàn tuân thủ chuẩn HL7/FHIR, mã hoá AES-256 và bảo đảm tính toàn vẹn 10,000+ giao dịch mỗi ngày.',
          color: '#10b981',
        },
      ],
    },
    serverless: {
      id: 'serverless',
      titleEn: 'AWS Serverless Work Done Reporting',
      titleVi: 'Hệ Thống Báo Cáo Serverless AWS (WDR)',
      tag: 'Cloud-Native · Cost Efficient',
      descriptionEn:
        'Automated reporting and KPI tracking for 2,000+ enterprise employees powered by AWS Lambda, Aurora Serverless, and scheduled SES dispatching.',
      descriptionVi:
        'Hệ thống tự động hóa báo cáo KPI cho 2,000+ nhân viên doanh nghiệp trên nền tảng AWS Lambda, Aurora Serverless và gửi mail qua SES.',
      nodes: [
        {
          id: 'auth',
          name: 'AWS Cognito & MFA',
          role: 'Identity Management',
          icon: ShieldCheck,
          tech: ['Cognito', 'MFA', 'CSP Security'],
          metrics: '2,000+ enterprise users',
          descriptionEn: 'Secures enterprise employee sign-in with multi-factor authentication and role claims.',
          descriptionVi: 'Quản lý tài khoản doanh nghiệp an toàn với xác thực 2 bước và phân quyền linh hoạt.',
          color: '#f59e0b',
        },
        {
          id: 'lambda',
          name: 'AWS Lambda Compute',
          role: 'Stateless Event Handlers',
          icon: Zap,
          tech: ['Node.js', 'AWS SAM', 'API Gateway'],
          metrics: 'Auto-scaling to zero',
          descriptionEn: 'Executes report compilation, approval workflows, and KPI calculations on-demand.',
          descriptionVi: 'Xử lý logic tổng hợp báo cáo và tính điểm KPI theo yêu cầu, tự động scale tiết kiệm chi phí.',
          color: '#38bdf8',
        },
        {
          id: 'aurora',
          name: 'Aurora Serverless Postgres',
          role: 'Relational Database',
          icon: Database,
          tech: ['Aurora Serverless', 'Connection Pooling'],
          metrics: 'Sub-second cold starts',
          descriptionEn: 'Stores timesheets, performance reviews, and managerial sign-offs with auto-scaling storage.',
          descriptionVi: 'Lưu trữ lịch sử báo cáo công việc và đánh giá quản lý với cơ chế auto-scale linh hoạt.',
          color: '#10b981',
        },
        {
          id: 's3',
          name: 'AWS S3 & PDF Engine',
          role: 'Artifact Archive',
          icon: FileCode2,
          tech: ['S3 Buckets', 'Presigned URLs', 'PDF Kit'],
          metrics: '99.999999999% Durability',
          descriptionEn: 'Archives immutable PDF/Excel report exports with secure presigned download links.',
          descriptionVi: 'Lưu trữ bản xuất PDF/Excel có chữ ký số và link tải bảo mật có thời hạn.',
          color: '#a855f7',
        },
        {
          id: 'ses',
          name: 'AWS SES & Notifications',
          role: 'Automated Dispatcher',
          icon: Sparkles,
          tech: ['SES', 'CloudWatch Events', 'Cron Trigger'],
          metrics: 'Scheduled Friday 5PM',
          descriptionEn: 'Dispatches automated reminder alerts and executive digest summaries on schedule.',
          descriptionVi: 'Tự động gửi email nhắc nhở nộp báo cáo và tóm tắt gửi ban giám đốc định kỳ.',
          color: '#ec4899',
        },
      ],
    },
  };

  const currentPipeline = pipelines[activePipelineId];

  // Set default selected node
  useEffect(() => {
    setSelectedNode(currentPipeline.nodes[1]);
    setActiveStepIndex(-1);
  }, [activePipelineId]);

  const [simLogs, setSimLogs] = useState<string[]>([]);

  // Simulation runner
  const handleRunSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimLogs([]);
    let step = 0;
    setActiveStepIndex(0);
    setSelectedNode(currentPipeline.nodes[0]);

    const getLogForStep = (pipeId: string, stepIndex: number) => {
      const time = new Date().toLocaleTimeString('en-US', { hour12: false });
      if (pipeId === 'ai') {
        const msgs = [
          `[${time}] 📥 INGEST: PRD & technical specs loaded -> initiating schema analyzer`,
          `[${time}] 🧠 ORCHESTRATE: Cross-role agents (BE, FE, Mobile, QA, BA) assigned via MCP Protocol`,
          `[${time}] 🔍 MEMORY: GraphRAG + FAISS vector lookup completed across TMA knowledge graph`,
          `[${time}] 🧪 HARNESS: Self-learning agents executing test suites & automated lint verification`,
          `[${time}] 🚀 SYNC: Microservice boilerplate created, auto docs & enterprise wiki synced!`,
        ];
        return msgs[stepIndex] || `[${time}] Node ${stepIndex + 1} processing payload`;
      } else if (pipeId === 'healthcare') {
        const msgs = [
          `[${time}] 🚑 INGEST: Incoming patient emergency dispatch request received`,
          `[${time}] ⚡ GATEWAY: JWT & RateLimiter verified -> routing to Emergency Admin Core`,
          `[${time}] 🛡️ CORE: Patient triage & care team notification dispatched (< 2s SLA)`,
          `[${time}] 🤖 BESTMEDIQ: AI automated report summary & ICD-10 diagnostic coding generated`,
          `[${time}] 💾 STORAGE: PostgreSQL transaction committed, Redis cached & claims queue notified`,
        ];
        return msgs[stepIndex] || `[${time}] Node ${stepIndex + 1} processing payload`;
      } else {
        const msgs = [
          `[${time}] 🔐 AUTH: Enterprise employee authentication verified via AWS Cognito MFA`,
          `[${time}] ⚡ COMPUTE: Event-driven AWS Lambda spawned on API Gateway trigger`,
          `[${time}] 💾 DATABASE: Timesheet & KPI record written to Aurora Serverless Postgres`,
          `[${time}] 📄 EXPORT: PDF Kit compiled immutable executive timesheet -> saved to S3`,
          `[${time}] 📧 DISPATCH: AWS SES sent automated digest summary to executive managers`,
        ];
        return msgs[stepIndex] || `[${time}] Node ${stepIndex + 1} processing payload`;
      }
    };

    setSimLogs([getLogForStep(activePipelineId, 0)]);

    const interval = setInterval(() => {
      step++;
      if (step < currentPipeline.nodes.length) {
        setActiveStepIndex(step);
        setSelectedNode(currentPipeline.nodes[step]);
        setSimLogs((prev) => [...prev, getLogForStep(activePipelineId, step)]);
      } else {
        clearInterval(interval);
        setSimulating(false);
      }
    }, 1100);
  };

  return (
    <div className="w-full">
      {/* Tab Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
          {(['ai', 'healthcare', 'serverless'] as const).map((id) => {
            const p = pipelines[id];
            const active = activePipelineId === id;
            return (
              <button
                key={id}
                onClick={() => setActivePipelineId(id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  active
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {id === 'ai' && <Brain className="w-4 h-4 text-orange-400" />}
                {id === 'healthcare' && <Server className="w-4 h-4 text-indigo-400" />}
                {id === 'serverless' && <Zap className="w-4 h-4 text-amber-400" />}
                <span>{lang === 'vi' ? p.titleVi : p.titleEn}</span>
              </button>
            );
          })}
        </div>

        {/* Simulation trigger button */}
        <button
          onClick={handleRunSimulation}
          disabled={simulating}
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-50"
        >
          {simulating ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{lang === 'vi' ? 'Đang truyền dữ liệu...' : 'Streaming payload...'}</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{lang === 'vi' ? 'Mô phỏng luồng dữ liệu' : 'Simulate Live Flow'}</span>
            </>
          )}
        </button>
      </div>

      {/* Description Header */}
      <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
            {currentPipeline.tag}
          </span>
          <p className="text-slate-300 text-sm mt-1">
            {lang === 'vi' ? currentPipeline.descriptionVi : currentPipeline.descriptionEn}
          </p>
        </div>
      </div>

      {/* Interactive Pipeline Graph Canvas */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-[#090b1e]/90 border border-white/10 overflow-x-auto shadow-2xl backdrop-blur-xl">
        {/* Animated flow background grid */}
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

        {/* Node Sequence Container */}
        <div className="relative z-10 flex items-center justify-between min-w-[760px] py-4">
          {currentPipeline.nodes.map((node, index) => {
            const isSelected = selectedNode?.id === node.id;
            const isStepActive = activeStepIndex === index;
            const NodeIcon = node.icon;

            return (
              <div key={node.id} className="flex items-center flex-1 last:flex-initial">
                {/* Node Box */}
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`group relative flex flex-col items-center p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'scale-105 border-indigo-400 bg-indigo-950/40 shadow-xl shadow-indigo-500/20'
                      : isStepActive
                      ? 'scale-105 border-emerald-400 bg-emerald-950/40 shadow-xl shadow-emerald-500/30'
                      : 'border-white/10 bg-slate-900/60 hover:border-white/25 hover:bg-slate-800/60'
                  }`}
                  style={{ minWidth: '130px' }}
                >
                  {/* Status Indicator */}
                  <div className="absolute -top-2 -right-2">
                    {isStepActive ? (
                      <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center animate-bounce shadow-lg shadow-emerald-500/50">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </span>
                    ) : (
                      <span
                        className="w-2.5 h-2.5 rounded-full block"
                        style={{ background: node.color, boxShadow: `0 0 8px ${node.color}` }}
                      />
                    )}
                  </div>

                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 shadow-md transition-transform group-hover:scale-110"
                    style={{ background: `${node.color}20`, border: `1px solid ${node.color}50` }}
                  >
                    <NodeIcon className="w-5 h-5" style={{ color: node.color }} />
                  </div>

                  <span className="text-xs font-bold text-white text-center leading-tight">
                    {node.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium text-center mt-1">
                    {node.role}
                  </span>

                  <span className="text-[9px] font-mono text-indigo-300 mt-2 px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                    {node.metrics}
                  </span>
                </div>

                {/* Connecting Wire & Data Packet */}
                {index < currentPipeline.nodes.length - 1 && (
                  <div className="relative flex-1 h-[2px] mx-2 bg-gradient-to-r from-white/20 via-indigo-500/40 to-white/20 overflow-hidden">
                    {/* Continuous subtle pulse */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70"
                      style={{
                        animation: 'data-beam 3s ease-in-out infinite',
                        animationDelay: `${index * 0.5}s`,
                      }}
                    />

                    {/* Active simulation packet */}
                    {isStepActive && (
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400"
                        initial={{ left: '0%' }}
                        animate={{ left: '100%' }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Inspector Detail Drawer */}
      <AnimatePresence mode="wait">
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-6 p-6 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{ background: `${selectedNode.color}25`, border: `1.5px solid ${selectedNode.color}70` }}
              >
                <selectedNode.icon className="w-6 h-6" style={{ color: selectedNode.color }} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-bold text-white">{selectedNode.name}</h4>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold"
                    style={{ background: `${selectedNode.color}20`, color: selectedNode.color }}
                  >
                    {selectedNode.role}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mt-1.5 max-w-2xl leading-relaxed">
                  {lang === 'vi' ? selectedNode.descriptionVi : selectedNode.descriptionEn}
                </p>
              </div>
            </div>

            {/* Right details */}
            <div className="flex flex-col md:items-end gap-2 flex-shrink-0 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
              <div className="text-xs font-mono text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{selectedNode.metrics}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Simulation Telemetry Terminal */}
      <AnimatePresence>
        {simLogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 rounded-2xl bg-black/80 border border-emerald-500/30 backdrop-blur-xl p-4 font-mono text-xs overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="text-white font-bold tracking-wide">ARCHITECTURE EVENT LOG STREAM</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {simulating ? 'ACTIVE STREAM' : 'COMPLETED'}
                </span>
              </div>
              <button
                onClick={() => setSimLogs([])}
                className="text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2">
              {simLogs.map((log, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-2 text-slate-300 leading-relaxed font-mono"
                >
                  <span className="text-emerald-400 select-none">❯</span>
                  <span>{log}</span>
                </motion.div>
              ))}
              {simulating && (
                <div className="flex items-center gap-2 text-indigo-400 font-mono animate-pulse text-[11px] pt-1">
                  <span>Executing pipeline orchestration...</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
