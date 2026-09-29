import { useLang } from '../i18n/LangContext';

/**
 * The one-paragraph summary shown under the name.
 *
 * Lives in its own component so the classic layout and the scroll journey render the
 * same words from the same place — there is no second copy to drift out of sync.
 */
export default function HeroSummary({ className = '' }: { className?: string }) {
  const { lang } = useLang();

  return (
    <p className={className}>
      {lang === 'vi' ? (
        <>
          Kỹ sư Backend <strong className="text-white font-semibold">7+ năm</strong> với các hệ thống chạy thật: sở hữu toàn bộ mảng <strong className="text-cyan-300 font-semibold">tích hợp BI Sisense</strong> và lớp <strong className="text-cyan-300 font-semibold">tuân thủ pháp lý cho quy trình cấp phát thuốc</strong> của nền tảng chăm sóc người cao tuổi BESTMED, xây hệ thống báo cáo <strong className="text-indigo-300 font-semibold">AWS Serverless</strong> trên Lambda + Cognito + Aurora, và — với vai trò <strong className="text-orange-300 font-semibold">AI System Architect tại TMA Solutions</strong> — thiết kế kiến trúc framework AI-First multi-agent trên nền <strong className="text-violet-300 font-semibold">bộ nhớ GraphRAG</strong>, <strong className="text-violet-300 font-semibold">giao thức MCP</strong>, hệ thống <strong className="text-amber-300 font-semibold">skill & workflow harness</strong> và các <strong className="text-emerald-300 font-semibold">Self-learning Agent</strong>.
        </>
      ) : (
        <>
          Backend Developer with <strong className="text-white font-semibold">7+ years</strong> on production systems: I own the <strong className="text-cyan-300 font-semibold">Sisense BI integration</strong> and the <strong className="text-cyan-300 font-semibold">medication-authorisation compliance layer</strong> of the BESTMED aged-care platform, built <strong className="text-indigo-300 font-semibold">AWS Serverless reporting</strong> on Lambda + Cognito + Aurora, and — as <strong className="text-orange-300 font-semibold">AI System Architect at TMA Solutions</strong> — architect an AI-First multi-agent framework built on <strong className="text-violet-300 font-semibold">GraphRAG memory</strong>, the <strong className="text-violet-300 font-semibold">Model Context Protocol (MCP)</strong>, <strong className="text-amber-300 font-semibold">skills & workflow harness</strong>, and <strong className="text-emerald-300 font-semibold">Self-learning Agents</strong>.
        </>
      )}
    </p>
  );
}
