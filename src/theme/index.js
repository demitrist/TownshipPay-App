import { DefaultTheme } from '@react-navigation/native';
import { colors } from './colors';
import { spacing } from './spacing';
import { radii } from './radii';
import { typography } from './typography';
import { shadows } from './shadows';

export { colors, spacing, radii, typography, shadows };

export const theme = {
  colors,
  spacing,
  radii,
  typography,
  shadows,
};

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.danger,
  },
};
