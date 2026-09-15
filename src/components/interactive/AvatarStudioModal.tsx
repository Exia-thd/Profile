import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  Upload,
  X,
  Sparkles,
  Check,
  RefreshCw,
  Image as ImageIcon,
  User,
  ShieldCheck,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import { useAvatar } from '../../context/AvatarContext';
import { cyberAudio } from '../../utils/cyberAudio';
import { useLang } from '../../i18n/LangContext';

export default function AvatarStudioModal() {
  const {
    avatarUrl,
    isMonogram,
    isModalOpen,
    closeModal,
    uploadAvatar,
    setAvatarUrl,
    toggleMonogram,
    resetDefault,
  } = useAvatar();

  const { lang } = useLang();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isModalOpen) return null;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsSubmitting(true);
      await uploadAvatar(file);
      setIsSubmitting(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setIsSubmitting(true);
      await uploadAvatar(file);
      setIsSubmitting(false);
    }
  };

  const applyCustomUrl = () => {
    if (customUrlInput.trim()) {
      setAvatarUrl(customUrlInput.trim());
      setCustomUrlInput('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-cyan-500/40 bg-slate-950/95 shadow-[0_0_60px_rgba(6,182,212,0.25)] text-left z-10 font-sans"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-900/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Camera className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white leading-none">
                  {lang === 'vi' ? 'Studio Ảnh Đại Diện (Avatar)' : 'Profile Avatar Studio'}
                </h3>
                <p className="text-[11px] font-mono text-cyan-400 mt-1">
                  SYS://PROFILE.AVATAR_MANAGER
                </p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Live Holographic Preview Center */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="relative group">
                {/* Outer spinning sci-fi ring */}
                <div
                  className="absolute rounded-full border-2 border-dashed animate-spin-slow"
                  style={{ inset: '-8px', borderColor: 'rgba(6, 182, 212, 0.6)' }}
                />
                {/* Glow layer */}
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: '-4px',
                    background: 'linear-gradient(135deg, rgba(6,182,212,0.6), rgba(99,102,241,0.6))',
                    filter: 'blur(10px)',
                  }}
                />
                {/* Actual Avatar Display */}
                {isMonogram ? (
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-violet-600 to-cyan-400 flex items-center justify-center text-white text-3xl font-extrabold shadow-2xl border-2 border-white/20">
                    ĐT
                  </div>
                ) : (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-400/60 shadow-2xl bg-slate-900">
                    <img
                      src={avatarUrl}
                      alt="Trần Hữu Đạt Avatar"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        // Fallback to monogram if image fails
                        (e.target as HTMLImageElement).src = '/avatar.jpg';
                      }}
                    />
                  </div>
                )}
                {/* Active Indicator */}
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-950">
                  <Check className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Status Info */}
              <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-sm font-bold text-white">Trần Hữu Đạt</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {isMonogram ? 'MONOGRAM' : 'PHOTO ACTIVE'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'vi'
                    ? 'Ảnh đại diện được áp dụng đồng bộ cho Hero, Navbar, Thẻ Hồ Sơ và Footer.'
                    : 'Avatar is synchronized across Hero, Navbar, Profile Card, and Footer.'}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] font-mono text-cyan-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Tự động lưu trữ trình duyệt (Local Persistence)</span>
                </div>
              </div>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
                  : 'border-white/15 bg-white/[0.02] hover:border-cyan-500/50 hover:bg-cyan-500/[0.04]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Upload className="w-6 h-6 animate-bounce" />
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  {lang === 'vi' ? 'Chọn ảnh đại diện của bạn' : 'Upload your profile photo'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'vi'
                    ? 'Kéo thả file ảnh vào đây, hoặc click để mở hộp thoại chọn ảnh'
                    : 'Drag and drop your image file here, or click to browse'}
                </p>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                  Hỗ trợ: PNG, JPG, JPEG, WEBP (Tối đa 10MB)
                </p>
              </div>

              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 mt-1"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Tải tệp từ thiết bị...' : 'Browse files...'}</span>
              </button>
            </div>

            {/* Quick Presets & Options */}
            <div className="space-y-3 pt-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                {lang === 'vi' ? 'Tùy chọn hiển thị khác' : 'Display Options'}
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Toggle Monogram Mode */}
                <button
                  onClick={() => toggleMonogram()}
                  className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left text-xs ${
                    isMonogram
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-200'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <User className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold block">
                      {isMonogram ? 'Đang dùng: Monogram' : 'Chuyển sang Monogram'}
                    </span>
                    <span className="text-[10px] text-slate-400">Chữ cái ĐT tối giản</span>
                  </div>
                </button>

                {/* Reset to Default */}
                <button
                  onClick={resetDefault}
                  className="flex items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all text-left text-xs text-slate-300 hover:text-white"
                >
                  <RefreshCw className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold block">Khôi phục mặc định</span>
                    <span className="text-[10px] text-slate-400">Sử dụng ảnh gốc</span>
                  </div>
                </button>
              </div>

              {/* Paste Direct Image URL */}
              <div className="flex gap-2 pt-2">
                <input
                  type="url"
                  placeholder="Hoặc dán URL ảnh trực tiếp (https://...)"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && applyCustomUrl()}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  onClick={applyCustomUrl}
                  disabled={!customUrlInput.trim()}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-40 text-xs font-semibold text-white transition-colors"
                >
                  Áp dụng
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 border-t border-white/10 bg-slate-900/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>NHẤN ESC ĐỂ ĐÓNG</span>
            <button
              onClick={closeModal}
              className="px-4 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-500/40 transition-colors"
            >
              Hoàn tất
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
