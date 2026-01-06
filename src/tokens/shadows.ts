export const shadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
  sm: '0 2px 4px rgba(0, 0, 0, 0.06)',
  md: '0 4px 8px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
  xl: '0 16px 32px rgba(0, 0, 0, 0.12)',
} as const;

export type ShadowToken = keyof typeof shadows;
