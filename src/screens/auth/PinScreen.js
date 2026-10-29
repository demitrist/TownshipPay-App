import React, { useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import { colors, radii, spacing, typography } from '../../theme';
import { useAuth } from '../../context/AuthContext';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'];

export default function PinScreen({ route }) {
  const mode = route.params?.mode || 'verify';
  const { verifyPin, setPin } = useAuth();
  const [pin, setLocalPin] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const shake = useRef(new Animated.Value(0)).current;

  const lockedOut = locked || attempts >= 5;

  const title = mode === 'set' ? 'Create a 4-digit PIN' : 'Enter your PIN';
  const subtitle =
    mode === 'set'
      ? 'You will use this PIN to unlock TownPay on this device.'
      : 'Demo PIN is 1234 if you have not set one.';

  function playShake() {
    shake.setValue(0);
    Animated.sequence([
      Animated.timing(shake, { toValue: 12, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -12, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }

  async function submit(nextPin) {
    try {
      if (mode === 'set') {
        await setPin(nextPin);
      } else {
        await verifyPin(nextPin);
      }
    } catch (err) {
      playShake();
      setError(err.message);
      setLocalPin('');
      setAttempts((count) => {
        const next = count + 1;
        if (next >= 5) {
          setLocked(true);
          setTimeout(() => {
            setLocked(false);
            setAttempts(0);
            setError('');
          }, 8000);
        }
        return next;
      });
    }
  }

  function onKey(key) {
    if (lockedOut || !key) return;
    setError('');
    if (key === 'back') {
      setLocalPin((current) => current.slice(0, -1));
      return;
    }
    const next = `${pin}${key}`.slice(0, 4);
    setLocalPin(next);
    if (next.length === 4) {
      submit(next);
    }
  }

  const dots = useMemo(() => [0, 1, 2, 3], []);

  return (
    <ScreenContainer>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <Animated.View style={[styles.dots, { transform: [{ translateX: shake }] }]}>
        {dots.map((index) => (
          <View key={index} style={[styles.dot, pin.length > index && styles.dotFilled]} />
        ))}
      </Animated.View>

      {error ? <Text style={styles.error}>{error}</Text> : <View style={styles.errorSlot} />}
      {lockedOut ? (
        <Text style={styles.lock}>Too many attempts. Try again in a moment.</Text>
      ) : null}

      <View style={styles.grid}>
        {KEYS.map((key) => (
          <Pressable
            key={key || 'blank'}
            onPress={() => onKey(key)}
            disabled={!key || lockedOut}
            accessibilityRole={key ? 'button' : undefined}
            accessibilityLabel={key === 'back' ? 'Delete' : key || 'empty'}
            style={({ pressed }) => [
              styles.key,
              !key && styles.keyBlank,
              pressed && key && styles.keyPressed,
            ]}
          >
            {key === 'back' ? (
              <Ionicons name="backspace-outline" size={22} color={colors.text} />
            ) : (
              <Text style={styles.keyLabel}>{key}</Text>
            )}
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: spacing.sm,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    marginHorizontal: spacing.sm,
  },
  dotFilled: {
    backgroundColor: colors.primary,
  },
  error: {
    color: colors.danger,
    textAlign: 'center',
    minHeight: 20,
  },
  errorSlot: {
    minHeight: 20,
  },
  lock: {
    color: colors.warning,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  grid: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    width: '30%',
    minHeight: 64,
    margin: '1.5%',
    borderRadius: radii.lg,
    backgroundColor: colors.keypad,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyBlank: {
    backgroundColor: colors.transparent,
  },
  keyPressed: {
    backgroundColor: colors.border,
  },
  keyLabel: {
    color: colors.text,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
  },
});
