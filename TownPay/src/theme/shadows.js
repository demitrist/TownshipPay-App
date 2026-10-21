import { Platform } from 'react-native';
import { colors } from './colors';

const ios = {
  shadowColor: colors.text,
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
};

const android = {
  elevation: 3,
};

export const shadows = {
  card: Platform.select({ ios, android, default: ios }),
  tab: Platform.select({
    ios: { ...ios, shadowOpacity: 0.12, shadowRadius: 16 },
    android: { elevation: 8 },
    default: ios,
  }),
};
