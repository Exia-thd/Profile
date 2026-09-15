import { useState, FormEvent, ChangeEvent } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  MessageSquare,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import SpotlightCard from './interactive/SpotlightCard';

interface ContactProps {
  onNotify: (msg: string) => void;
}

export default function Contact({ onNotify }: ContactProps) {
  const { t, lang } = useLang();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onNotify(lang === 'vi' ? `Đã sao chép ${label} vào bộ nhớ tạm!` : `Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSentSuccess(true);
      onNotify(t('contact_alert'));
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSentSuccess(false), 5000);
    }, 1000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactCards = [
    {
      key: 'email',
      icon: Mail,
      label: 'Email',
      value: 'thdat314@gmail.com',
      copyValue: 'thdat314@gmail.com',
      href: 'mailto:thdat314@gmail.com',
      color: '#6366f1',
    },
    {
      key: 'phone',
      icon: Phone,
      label: t('contact_phone_label'),
      value: '0969 986 422',
      copyValue: '0969986422',
      href: 'tel:+84969986422',
      color: '#8b5cf6',
    },
    {
      key: 'location',
      icon: MapPin,
      label: t('contact_address_label'),
      value: t('contact_location'),
      copyValue: 'TP. Hồ Chí Minh, Việt Nam',
      href: null,
      color: '#06b6d4',
    },
    {
      key: 'github',
      icon: Github,
      label: 'GitHub',
      value: 'github.com/exia-thd',
      copyValue: 'https://github.com/exia-thd',
      href: 'https://github.com/exia-thd',
      color: '#475569',
    },
    {
      key: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/exia-692a3914b',
      copyValue: 'https://vn.linkedin.com/in/exia-692a3914b',
      href: 'https://vn.linkedin.com/in/exia-692a3914b',
      color: '#2563eb',
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07071a] relative overflow-hidden">
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full blur-[140px] bg-indigo-600/10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[140px] bg-violet-600/10" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge">Get In Touch</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            <span className="gradient-text">{t('contact_heading')}</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">{t('contact_sub')}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Availability Banner */}
            <SpotlightCard
              className="p-6 border-emerald-500/30"
              spotlightColor="rgba(16, 185, 129, 0.2)"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-emerald-400 font-semibold text-sm font-mono uppercase tracking-wider">
                  {t('contact_available_label')}
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {t('contact_available_body1')}{' '}
                <strong className="text-white">Senior Backend / Distributed Systems Developer</strong>.{' '}
                {t('contact_available_body2')}{' '}
                <span className="text-emerald-300 font-semibold">{t('contact_available_time')}</span>.
              </p>
            </SpotlightCard>

            {/* Contact Items List */}
            <SpotlightCard className="p-6" spotlightColor="rgba(99, 102, 241, 0.15)">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{t('contact_info_heading')}</h3>
              </div>

              <div className="space-y-3">
                {contactCards.map((item) => {
                  const Icon = item.icon;
                  const isCopied = copiedKey === item.key;

                  return (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: item.color }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-slate-400 text-[10px] font-mono uppercase tracking-wider">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              target={item.href.startsWith('http') ? '_blank' : undefined}
                              rel="noopener noreferrer"
                              className="text-slate-200 text-xs sm:text-sm font-medium hover:text-indigo-400 transition-colors truncate block"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <span className="text-slate-200 text-xs sm:text-sm font-medium truncate block">
                              {item.value}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Copy Action */}
                      <button
                        onClick={() => handleCopy(item.copyValue, item.key, item.label)}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
                        title="Copy to clipboard"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Direct Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-7 sm:p-8" spotlightColor="rgba(139, 92, 246, 0.15)">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{t('contact_form_heading')}</h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'vi' ? 'Gửi tin nhắn trực tiếp đến Trần Hữu Đạt' : 'Send a direct note to Trần Hữu Đạt'}
                  </p>
                </div>
              </div>

              {sentSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                  <span>{t('contact_alert')}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      {t('contact_name_label')} <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('contact_name_placeholder')}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="name@company.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    {lang === 'vi' ? 'Tiêu đề thảo luận' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={lang === 'vi' ? 'Ví dụ: Hợp tác dự án Microservices / AI R&D' : 'e.g. Senior Backend Opportunity / Collaboration'}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    {t('contact_message_label')} <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t('contact_message_placeholder')}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-indigo-500/25 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:opacity-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{sending ? (lang === 'vi' ? 'Đang gửi tin nhắn...' : 'Sending message...') : t('contact_send_btn')}</span>
                </button>
              </form>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
