/**
 * Chapter and atmosphere tables for the scroll journey.
 *
 * The journey is the career as an ascent: the valley floor at the profile, the summit
 * at contact. Each chapter maps to one of the site's existing sections — the chapter
 * bodies render those same components, so mode 2 cannot drift from mode 1.
 */

export interface AtmosphereKey {
  at: number;
  fogColor: string;
  fogDensity: number;
  skyTop: string;
  skyBottom: string;
  sunColor: string;
  sunIntensity: number;
  /** 0 = day, 1 = full night with stars. */
  night: number;
}

export type ChapterId =
  | 'home'
  | 'about'
  | 'architecture'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'contact';

export interface Chapter {
  id: ChapterId;
  /** Scroll range this chapter's title card is visible over. */
  range: [number, number];
  index: string;
  altitude: string;
  titleEn: string;
  titleVi: string;
  kickerEn: string;
  kickerVi: string;
  /** Short label for the nav bar; the full titles are too long for a menu. */
  navEn: string;
  navVi: string;
  accent: string;
}

/** Altitudes are the chapter's position on the climb, not a claim about anything real. */
export const CHAPTERS: Chapter[] = [
  {
    id: 'home',
    range: [0.0, 0.135],
    index: '01',
    altitude: 'BASE CAMP',
    titleEn: 'Trần Hữu Đạt',
    titleVi: 'Trần Hữu Đạt',
    kickerEn: 'Senior Backend Developer · AI System Architect',
    kickerVi: 'Senior Backend Developer · AI System Architect',
    navEn: 'Home',
    navVi: 'Trang chủ',
    accent: '#38bdf8',
  },
  {
    id: 'about',
    range: [0.135, 0.29],
    index: '02',
    altitude: 'THE APPROACH',
    titleEn: 'About & Engineering Philosophy',
    titleVi: 'Giới thiệu & Triết lý kỹ thuật',
    kickerEn: 'How the systems get built, and why',
    kickerVi: 'Hệ thống được xây như thế nào, và vì sao',
    navEn: 'About',
    navVi: 'Giới thiệu',
    accent: '#a855f7',
  },
  {
    id: 'architecture',
    range: [0.29, 0.45],
    index: '03',
    altitude: 'THE ICEFALL',
    titleEn: 'System Architecture',
    titleVi: 'Kiến trúc hệ thống',
    kickerEn: 'Live diagrams of the pipelines behind the work',
    kickerVi: 'Sơ đồ trực quan các luồng dữ liệu phía sau',
    navEn: 'Architecture',
    navVi: 'Kiến trúc',
    accent: '#f97316',
  },
  {
    id: 'experience',
    range: [0.45, 0.615],
    index: '04',
    altitude: 'THE LONG RIDGE',
    titleEn: 'Work Experience',
    titleVi: 'Kinh nghiệm làm việc',
    kickerEn: 'TMA Solutions, 2021 to now',
    kickerVi: 'TMA Solutions, từ 2021 đến nay',
    navEn: 'Experience',
    navVi: 'Kinh nghiệm',
    accent: '#10b981',
  },
  {
    id: 'projects',
    range: [0.615, 0.765],
    index: '05',
    altitude: 'HIGH CAMP',
    titleEn: 'Featured Projects',
    titleVi: 'Dự án trọng điểm',
    kickerEn: 'Seven production systems',
    kickerVi: 'Bảy hệ thống chạy thật',
    navEn: 'Projects',
    navVi: 'Dự án',
    accent: '#6366f1',
  },
  {
    id: 'skills',
    range: [0.765, 0.885],
    index: '06',
    altitude: 'THE WHITEOUT',
    titleEn: 'Technical Skills',
    titleVi: 'Kỹ năng công nghệ',
    kickerEn: 'Languages, cloud, data, AI',
    kickerVi: 'Ngôn ngữ, cloud, dữ liệu, AI',
    navEn: 'Skills',
    navVi: 'Kỹ năng',
    accent: '#06b6d4',
  },
  {
    id: 'contact',
    range: [0.885, 1.0],
    index: '07',
    altitude: 'THE SUMMIT',
    titleEn: 'Get In Touch',
    titleVi: 'Kết nối & Hợp tác',
    kickerEn: 'Open to architecture and senior backend work',
    kickerVi: 'Sẵn sàng cho cơ hội kiến trúc & backend',
    navEn: 'Contact',
    navVi: 'Liên hệ',
    accent: '#f43f5e',
  },
];

/**
 * Atmosphere keyframes. Dawn in the valley, clear cold air on the ridge, a deliberate
 * whiteout over the skills chapter, then thin dark sky and stars at the summit.
 */
export const ATMOSPHERE: AtmosphereKey[] = [
  { at: 0.00, fogColor: '#c3d0e2', fogDensity: 0.00046, skyTop: '#2e5590', skyBottom: '#f3d6ad', sunColor: '#ffd49a', sunIntensity: 1.25, night: 0.04 },
  { at: 0.18, fogColor: '#c7d6e8', fogDensity: 0.00040, skyTop: '#2b5a9e', skyBottom: '#dbe8f5', sunColor: '#ffe6bd', sunIntensity: 1.15, night: 0.0 },
  { at: 0.40, fogColor: '#d4e2f0', fogDensity: 0.00032, skyTop: '#2f6bb5', skyBottom: '#e7f1fb', sunColor: '#fff3de', sunIntensity: 1.35, night: 0.0 },
  { at: 0.58, fogColor: '#cfdff0', fogDensity: 0.00036, skyTop: '#1f5aa8', skyBottom: '#dceaf8', sunColor: '#ffeed4', sunIntensity: 1.2, night: 0.0 },
  // The whiteout beat: density spikes and the fog goes near-white.
  { at: 0.80, fogColor: '#f2f6fa', fogDensity: 0.00195, skyTop: '#9fb6cd', skyBottom: '#f4f8fc', sunColor: '#ffffff', sunIntensity: 0.55, night: 0.0 },
  { at: 0.90, fogColor: '#dbe6f2', fogDensity: 0.00058, skyTop: '#123a78', skyBottom: '#b9d2ea', sunColor: '#fff0d6', sunIntensity: 1.0, night: 0.12 },
  { at: 1.00, fogColor: '#8fa8c6', fogDensity: 0.00030, skyTop: '#040a1c', skyBottom: '#3f6ea8', sunColor: '#ffe2b0', sunIntensity: 0.9, night: 0.85 },
];

/**
 * Non-linear pacing: `[progress, speed]`. Chapters with a lot to read move the camera
 * slowly; the transitions between them push.
 */
export const PACE: [number, number][] = [
  [0.00, 0.55],
  [0.14, 1.35],
  [0.30, 0.6],
  [0.46, 1.25],
  [0.62, 0.7],
  [0.77, 1.4],
  [0.89, 0.5],
  [1.00, 0.5],
];
