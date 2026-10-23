import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../navigation/routes';

export default function SplashScreen({ navigation }) {
  const { isAuthenticated, isLoading } = useAuth();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();
  }, [opacity, scale]);

  useEffect(() => {
    if (isLoading) return undefined;
    const timer = setTimeout(() => {
      if (isAuthenticated) return;
      navigation.replace(ROUTES.LOGIN);
    }, 1800);
    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading, navigation]);

  return (
    <View style={styles.root} accessibilityRole="image" accessibilityLabel="TownPay splash">
      <Animated.View style={[styles.logoWrap, { opacity, transform: [{ scale }] }]}>
        <View style={styles.mark}>
          <Text style={styles.markLetter}>T</Text>
        </View>
        <Text style={styles.name}>TownPay</Text>
        <Text style={styles.tag}>Pay. Sell. Stay in sync.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
  },
  mark: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  markLetter: {
    color: colors.primary,
    fontSize: 40,
    fontWeight: typography.weights.bold,
  },
  name: {
    color: colors.textOnPrimary,
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
  },
  tag: {
    marginTop: spacing.sm,
    color: colors.textOnPrimary,
    opacity: 0.9,
    fontSize: typography.sizes.md,
  },
});
