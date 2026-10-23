import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ROUTES } from '../../navigation/routes';
import { colors, spacing, radii, typography } from '../../theme';
import { ScreenContainer, Button } from '../../components';

// Frozen params — matches the original placeholder payload exactly.
// To wire real camera later: `npx expo install expo-camera`, replace
// handleScan with CameraView's onBarcodeScanned → build the same shape.
const FROZEN_SCAN = {
  amount: '85.00',
  payee: 'Sipho Traders',
  source: 'qr',
};

const FRAME = 260;
const CORNER = 32;

export default function ScanQrScreen({ navigation }) {
  const handleScan = () => {
    navigation.navigate(ROUTES.CONFIRM_PAYMENT, FROZEN_SCAN);
  };

  return (
    <ScreenContainer scroll>
      <Text style={styles.title}>Scan QR</Text>
      <Text style={styles.sub}>Point your camera at a Momo QR code</Text>

      <View style={styles.scanFrame}>
        <View style={[styles.corner, styles.tl]} />
        <View style={[styles.corner, styles.tr]} />
        <View style={[styles.corner, styles.bl]} />
        <View style={[styles.corner, styles.br]} />
        <Text style={styles.frameText}>Camera preview</Text>
      </View>

      <View style={styles.actions}>
        <Button title="Mock a successful scan" onPress={handleScan} fullWidth />
        <Button
          title="Cancel"
          variant="ghost"
          onPress={() => navigation.goBack()}
          fullWidth
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginTop: spacing.md,
  },
  sub: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  scanFrame: {
    width: FRAME,
    height: FRAME,
    borderRadius: radii.lg,
    backgroundColor: colors.primaryDark,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.textOnPrimary,
    opacity: 0.6,
  },
  corner: { position: 'absolute', width: CORNER, height: CORNER, borderColor: colors.secondary },
  tl: { top: spacing.md, left: spacing.md, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: radii.sm },
  tr: { top: spacing.md, right: spacing.md, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: radii.sm },
  bl: { bottom: spacing.md, left: spacing.md, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: radii.sm },
  br: { bottom: spacing.md, right: spacing.md, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: radii.sm },
  actions: { marginTop: spacing.xl, gap: spacing.md, paddingBottom: spacing.xxl },
});