export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    900: '#2C2C2C',
    500: '#6B6B6B',
    100: '#F5F5F5',
  },
  accent: '#64748B',
} as const;

export const semanticColors = {
  light: {
    background: colors.white,
    foreground: colors.black,
    muted: colors.gray[100],
    mutedForeground: colors.gray[500],
    border: colors.gray[100],
    borderStrong: colors.gray[500],
    accent: colors.accent,
    accentForeground: colors.white,
  },
  dark: {
    background: colors.black,
    foreground: colors.white,
    muted: colors.gray[900],
    mutedForeground: colors.gray[500],
    border: colors.gray[900],
    borderStrong: colors.gray[500],
    accent: colors.accent,
    accentForeground: colors.white,
  },
} as const;

export type ColorToken = keyof typeof colors;
export type SemanticColorToken = keyof typeof semanticColors.light;
