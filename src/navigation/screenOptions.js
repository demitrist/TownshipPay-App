import { colors, typography } from '../theme';

export const stackScreenOptions = {
  headerStyle: { backgroundColor: colors.surface },
  headerTintColor: colors.primary,
  headerTitleStyle: {
    color: colors.text,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.lg,
  },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.background },
  animation: 'slide_from_right',
};
