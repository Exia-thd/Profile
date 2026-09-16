export type AppView =
  | 'overview'
  | 'architecture'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'contact'
  | 'about';

export type ViewDisplayMode = 'cabinet' | 'continuous';

export interface CabinetDrawerInfo {
  id: AppView;
  number: string;
  titleEn: string;
  titleVi: string;
  subtitleEn: string;
  subtitleVi: string;
  badgeEn: string;
  badgeVi: string;
  status: 'ONLINE' | 'ACTIVE' | 'DEPLOYED' | 'VERIFIED' | 'READY';
  accentColor: string;
  accentHex: string;
  tags: string[];
  metricsEn: string;
  metricsVi: string;
  iconName: 'cpu' | 'briefcase' | 'folder' | 'layers' | 'mail' | 'user';
}
