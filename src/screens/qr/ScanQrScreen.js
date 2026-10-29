import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ROUTES } from '../../navigation/routes';
import { colors, spacing, radii, typography } from '../../theme';
import { ScreenContainer, Button } from '../../components';

// Demo mock scan for development/testing
const FROZEN_SCAN = {
  amount: '85.00',
  payee: 'Sipho Traders',
  source: 'qr',
};

const FRAME = 260;
const CORNER = 32;

// QR payload format: townpay://pay?to=<name>&amount=<n>&ref=<id>
function parseQrPayload(data) {
  try {
    if (!data || typeof data !== 'string') return null;

    // Support both townpay:// and momo:// formats
    const url = data.trim();
    if (!url.startsWith('townpay://pay?') && !url.startsWith('momo://pay?')) {
      return null;
    }

    const params = new URLSearchParams(url.split('?')[1]);
    const to = params.get('to') || params.get('payId');
    const amount = params.get('amount');
    const ref = params.get('ref');

    if (!to) return null;

    const numAmount = amount ? parseFloat(amount) : null;
    if (numAmount !== null && (isNaN(numAmount) || numAmount <= 0 || numAmount > 100000)) {
      return null;
    }

    return {
      payee: to,
      amount: numAmount ? numAmount.toFixed(2) : '0.00',
      source: 'qr',
    };
  } catch (error) {
    return null;
  }
}

export default function ScanQrScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (scanned) return;

    const parsed = parseQrPayload(data);
    if (!parsed) {
      Alert.alert('Invalid QR Code', 'This QR code is not a valid TownPay payment code.');
      return;
    }

    setScanned(true);
    navigation.navigate(ROUTES.CONFIRM_PAYMENT, parsed);
  };

  const handleMockScan = () => {
    navigation.navigate(ROUTES.CONFIRM_PAYMENT, FROZEN_SCAN);
  };

  if (!permission) {
    return (
      <ScreenContainer scroll>
        <Text style={styles.title}>Scan QR</Text>
        <Text style={styles.sub}>Requesting camera permission...</Text>
      </ScreenContainer>
    );
  }

  if (!permission.granted) {
    return (
      <ScreenContainer scroll>
        <Text style={styles.title}>Camera Permission Required</Text>
        <Text style={styles.sub}>
          TownPay needs camera access to scan QR codes for payments.
        </Text>

        <View style={styles.actions}>
          <Button title="Grant Permission" onPress={requestPermission} fullWidth />
          <Button
            title="Demo scan"
            variant="secondary"
            onPress={handleMockScan}
            fullWidth
          />
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

  return (
    <ScreenContainer>
      <Text style={styles.title}>Scan QR</Text>
      <Text style={styles.sub}>Point your camera at a TownPay QR code</Text>

      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
        <View style={styles.scanFrame}>
          <View style={[styles.corner, styles.tl]} />
          <View style={[styles.corner, styles.tr]} />
          <View style={[styles.corner, styles.bl]} />
          <View style={[styles.corner, styles.br]} />
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="Demo scan"
          variant="secondary"
          onPress={handleMockScan}
          fullWidth
        />
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