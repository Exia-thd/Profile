import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Terminal,
  FileText,
  User,
  Briefcase,
  Layers,
  Wrench,
  Mail,
  Copy,
  Globe,
  Github,
  Linkedin,
  ArrowRight,
} from 'lucide-react';
import { useLang } from '../../i18n/LangContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onCopyEmail: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenTerminal,
  onCopyEmail,
}: CommandPaletteProps) {
  const { lang, setLang } = useLang();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const actions = [
    {
      id: 'about',
      label: lang === 'vi' ? 'Về tôi (About Me)' : 'About Overview',
      icon: User,
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'architecture',
      label: lang === 'vi' ? 'Kiến trúc hệ thống (Architecture Simulator)' : 'System Architecture Visualizer',
      icon: Layers,
      action: () => {
        document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'experience',
      label: lang === 'vi' ? 'Kinh nghiệm làm việc (Experience)' : 'Career Experience',
      icon: Briefcase,
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'projects',
      label: lang === 'vi' ? 'Dự án thực chiến (Projects)' : 'Projects Showcase',
      icon: Layers,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'skills',
      label: lang === 'vi' ? 'Kỹ năng công nghệ (Tech Stack)' : 'Tech Skills Matrix',
      icon: Wrench,
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'terminal',
      label: lang === 'vi' ? 'Mở Backend Terminal CLI' : 'Open Developer Terminal CLI',
      icon: Terminal,
      action: () => {
        onOpenTerminal();
        onClose();
      },
    },
    {
      id: 'copy-email',
      label: lang === 'vi' ? 'Sao chép Email (thdat314@gmail.com)' : 'Copy Email to Clipboard',
      icon: Copy,
      action: () => {
        onCopyEmail();
        onClose();
      },
    },
    {
      id: 'lang',
      label: lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt',
      icon: Globe,
      action: () => {
        setLang(lang === 'vi' ? 'en' : 'vi');
        onClose();
      },
    },
    {
      id: 'contact',
      label: lang === 'vi' ? 'Liên hệ (Contact)' : 'Get In Touch',
      icon: Mail,
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07071a]/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-lg bg-[#0d0f28] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === 'vi' ? 'Nhập thao tác hoặc điều hướng...' : 'Type a command or section...'}
                className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-500 font-sans"
                autoFocus
              />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                ESC
              </span>
            </div>

            {/* List */}
            <div className="max-h-72 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  {lang === 'vi' ? 'Không tìm thấy kết quả.' : 'No commands matched.'}
                </div>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600/30 group-hover:text-indigo-300 transition-colors">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
