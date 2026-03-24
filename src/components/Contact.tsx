import { Mail, Phone, MapPin, Linkedin, Github, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useLang } from '../i18n/LangContext';

export default function Contact() {
  const { t } = useLang();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(t('contact_alert'));
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: 'tranhuudat@example.com',
      href: 'mailto:tranhuudat@example.com',
      color: 'linear-gradient(135deg, #6366f1, #3b82f6)',
      iconShadow: 'rgba(99,102,241,0.3)',
    },
    {
      icon: Phone,
      label: t('contact_phone_label'),
      value: '+84 123 456 789',
      href: 'tel:+84123456789',
      color: 'linear-gradient(135deg, #7c3aed, #a855f7)',
      iconShadow: 'rgba(124,58,237,0.3)',
    },
    {
      icon: MapPin,
      label: t('contact_address_label'),
      value: t('contact_location'),
      href: null,
      color: 'linear-gradient(135deg, #0891b2, #06b6d4)',
      iconShadow: 'rgba(8,145,178,0.3)',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/tranhuudat',
      href: 'https://github.com',
      color: 'linear-gradient(135deg, #475569, #64748b)',
      iconShadow: 'rgba(71,85,105,0.3)',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/tranhuudat',
      href: 'https://linkedin.com',
      color: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
      iconShadow: 'rgba(29,78,216,0.3)',
    },
  ];

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0.75rem',
    color: 'white',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 200ms',
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07071a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(99,102,241,0.07)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(124,58,237,0.06)' }}></div>
        <div className="absolute inset-0 grid-pattern opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            <span className="gradient-text">{t('contact_heading')}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t('contact_sub')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: contact info */}
          <div className="flex flex-col gap-4">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 6px 20px rgba(99,102,241,0.3)' }}
                >
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{t('contact_info_heading')}</h3>
              </div>

              <div className="space-y-3">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-3.5 rounded-xl transition-all"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md"
                      style={{ background: item.color, boxShadow: `0 4px 12px ${item.iconShadow}` }}
                    >
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-slate-200 text-sm font-medium hover:text-indigo-400 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-slate-200 text-sm font-medium">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="glass-card p-6" style={{ borderColor: 'rgba(34,197,94,0.2)' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-green-400 font-semibold text-sm">Đang available</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Hiện tại tôi đang mở cơ hội với các vị trí{' '}
                <span className="text-white font-medium">Senior Backend Developer</span>.
                Thời gian phản hồi thường trong{' '}
                <span className="text-white font-medium">24 giờ</span>.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', boxShadow: '0 6px 20px rgba(124,58,237,0.3)' }}
              >
                <Send className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('contact_form_heading')}</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                  {t('contact_name_label')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder={t('contact_name_placeholder')}
                  onFocus={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
                  onBlur={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="email@example.com"
                  onFocus={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
                  onBlur={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                  {t('contact_message_label')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  style={{ ...inputStyle, resize: 'none' }}
                  placeholder={t('contact_message_placeholder')}
                  onFocus={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
                  onBlur={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white px-6 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5 transform flex items-center justify-center gap-2 text-sm"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(99,102,241,0.45)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(99,102,241,0.3)'; }}
              >
                <Send className="w-4 h-4" />
                {t('contact_send_btn')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
