import React from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ROUTES } from '../../navigation/routes';
import { colors, spacing, radii, typography } from '../../theme';
import { ScreenContainer, Card, Button } from '../../components';
import { useAuth } from '../../context/AuthContext';

export default function MyQrScreen({ navigation }) {
  const { user } = useAuth();
  const payId = user?.phone ?? user?.email ?? 'you@momo';
  const qrValue = `momo://pay?payId=${encodeURIComponent(payId)}`;

  return (
    <ScreenContainer scroll>
      <Text style={styles.title}>My QR</Text>
      <Text style={styles.sub}>Show this code to receive money</Text>

      <Card>
        <View style={styles.qrWrap}>
          <QRCode
            value={qrValue}
            size={220}
            backgroundColor={colors.white}
            color={colors.text}
          />
        </View>
        <Text style={styles.name}>{user?.name ?? 'You'}</Text>
        <Text style={styles.payId}>{payId}</Text>
      </Card>

      <View style={styles.actions}>
        <Button
          title="Scan a QR"
          onPress={() => navigation.navigate(ROUTES.SCAN_QR)}
          fullWidth
        />
        <Button
          title="Share my code"
          variant="secondary"
          onPress={() => Share.share({ message: `Pay me: ${qrValue}` })}
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
  qrWrap: { alignSelf: 'center' },
  name: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  payId: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  actions: { marginTop: spacing.xl, gap: spacing.md, paddingBottom: spacing.xxl },
});