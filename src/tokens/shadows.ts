export const shadows = {
  none: 'none',
  xs: '0 1px 2px #0000000A',
  sm: '0 2px 4px #0000000F',
  md: '0 4px 8px #00000014',
  lg: '0 8px 16px #0000001A',
  xl: '0 16px 32px #0000001F',
} as const;

export type ShadowToken = keyof typeof shadows;
