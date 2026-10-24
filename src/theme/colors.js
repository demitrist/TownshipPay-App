/**
 * Palette sampled from the attached 10-stop blue strip (dark royal → ice).
 * Semantic tokens are the ONLY colours teammates should import.
 */
export const palette = {
  blue10: '#0A4DE0',
  blue20: '#1563F0',
  blue30: '#2174FA',
  blue40: '#2E88FF',
  blue50: '#4B9CFF',
  blue60: '#6BB0FF',
  blue70: '#90C6FF',
  blue80: '#B5DBFF',
  blue90: '#D6ECFF',
  blue95: '#EEF6FF',
  navy: '#0B1F3A',
  slate: '#4E6680',
  white: '#FFFFFF',
  overlay: 'rgba(11, 31, 58, 0.45)',
};

export const colors = {
  primary: palette.blue20,
  primaryDark: palette.blue10,
  secondary: palette.blue50,
  background: palette.blue95,
  surface: palette.white,
  text: palette.navy,
  textMuted: palette.slate,
  textOnPrimary: palette.white,
  border: palette.blue80,
  success: '#0F7A52',
  warning: '#B86A00',
  danger: '#C62828',
  info: palette.blue30,
  statusPending: '#B86A00',
  statusSynced: '#0F7A52',
  offlineBanner: '#B86A00',
  onlineBanner: '#0F7A52',
  lowStock: '#C62828',
  tabBar: palette.white,
  keypad: palette.blue90,
  overlay: palette.overlay,
  white: palette.white,
  disabled: palette.blue80,
  transparent: 'transparent',
};
