import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cyberAudio } from '../utils/cyberAudio';

interface AvatarContextType {
  avatarUrl: string;
  isMonogram: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  uploadAvatar: (file: File) => Promise<boolean>;
  setAvatarUrl: (url: string) => void;
  toggleMonogram: (val?: boolean) => void;
  resetDefault: () => void;
  toastMsg: string | null;
}

export const DEFAULT_AVATAR = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/avatar.jpg`;
const STORAGE_KEY = 'exia_portfolio_avatar_custom';
const MONOGRAM_KEY = 'exia_portfolio_avatar_monogram';

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [avatarUrl, setAvatarUrlState] = useState<string>(DEFAULT_AVATAR);
  const [isMonogram, setIsMonogram] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        // If saved avatar was a hardcoded root path, migrate to current base URL
        if (saved === '/avatar.jpg' || saved.endsWith('/avatar.jpg')) {
          setAvatarUrlState(DEFAULT_AVATAR);
        } else {
          setAvatarUrlState(saved);
        }
      }
      const savedMonogram = localStorage.getItem(MONOGRAM_KEY);
      if (savedMonogram === 'true') {
        setIsMonogram(true);
      }
    } catch {
      // Storage access safety
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const uploadAvatar = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        triggerToast('Vui lòng chọn file hình ảnh hợp lệ (PNG, JPG, WEBP).');
        resolve(false);
        return;
      }

      // Max 10MB
      if (file.size > 10 * 1024 * 1024) {
        triggerToast('Dung lượng ảnh tối đa là 10MB.');
        resolve(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setAvatarUrlState(result);
          setIsMonogram(false);
          try {
            localStorage.setItem(STORAGE_KEY, result);
            localStorage.setItem(MONOGRAM_KEY, 'false');
          } catch {
            // Storage quota limit fallback
          }
          cyberAudio.playActivate();
          triggerToast('Đã cập nhật ảnh đại diện thành công!');
          resolve(true);
        } else {
          resolve(false);
        }
      };
      reader.onerror = () => {
        triggerToast('Lỗi khi đọc file ảnh.');
        resolve(false);
      };
      reader.readAsDataURL(file);
    });
  };

  const setAvatarUrl = (url: string) => {
    setAvatarUrlState(url);
    setIsMonogram(false);
    try {
      localStorage.setItem(STORAGE_KEY, url);
      localStorage.setItem(MONOGRAM_KEY, 'false');
    } catch {
      // Ignore
    }
    cyberAudio.playClick();
    triggerToast('Đã áp dụng ảnh đại diện!');
  };

  const toggleMonogram = (val?: boolean) => {
    const next = val !== undefined ? val : !isMonogram;
    setIsMonogram(next);
    try {
      localStorage.setItem(MONOGRAM_KEY, next ? 'true' : 'false');
    } catch {
      // Ignore
    }
    cyberAudio.playClick();
    triggerToast(next ? 'Đã chuyển sang chế độ Monogram (ĐT)' : 'Đã chuyển sang chế độ Ảnh đại diện');
  };

  const resetDefault = () => {
    setAvatarUrlState(DEFAULT_AVATAR);
    setIsMonogram(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(MONOGRAM_KEY);
    } catch {
      // Ignore
    }
    cyberAudio.playClick();
    triggerToast('Đã khôi phục ảnh đại diện mặc định');
  };

  const openModal = () => {
    cyberAudio.playClick();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    cyberAudio.playClick();
    setIsModalOpen(false);
  };

  return (
    <AvatarContext.Provider
      value={{
        avatarUrl,
        isMonogram,
        isModalOpen,
        openModal,
        closeModal,
        uploadAvatar,
        setAvatarUrl,
        toggleMonogram,
        resetDefault,
        toastMsg,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatar() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
}
