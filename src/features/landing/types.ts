export type LandingHeroIcon = 'shield' | 'activity' | 'users' | 'zap';
export type LandingValuePropIcon = 'brain' | 'zap' | 'shield';
export type LandingValuePropTone = 'blue' | 'violet' | 'emerald';

export interface LandingValuePropToneClasses {
  wrapper: string;
  icon: string;
  border: string;
}

export interface LandingCopy {
  key: string;
  fallback: string;
}

export interface LandingHeroSecondaryNode {
  id: string;
  top: string;
  left: string;
  icon: LandingHeroIcon;
  label: LandingCopy;
}

export interface LandingValueProp {
  id: string;
  icon: LandingValuePropIcon;
  tone: LandingValuePropTone;
  title: LandingCopy;
  description: LandingCopy;
}

export interface LandingViewModel {
  heroSecondaryNodes: LandingHeroSecondaryNode[];
  valueProps: LandingValueProp[];
}
