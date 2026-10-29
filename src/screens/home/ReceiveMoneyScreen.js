import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

import { colors, spacing, radii } from '../../theme';
import { ROUTES } from '../../navigation/routes';
import { useTransactions } from '../../context/TransactionsContext';
import { useAuth } from '../../context/AuthContext';
import { formatMoney } from '../../utils/format';

export default function ReceiveMoneyScreen({ navigation }) {
  const { user } = useAuth();
  const { addTransaction, balance } = useTransactions();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amountError, setAmountError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const submittingRef = useRef(false);

  const payId = user?.phone ?? user?.email ?? 'you@momo';
  const qrValue = `townpay://pay?to=${encodeURIComponent(payId)}`;

  const validateAmount = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setAmountError('');
      return true;
    }

    const num = Number(trimmed);
    if (isNaN(num) || num <= 0) {
      setAmountError('Amount must be greater than R0.00');
      return false;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) {
      setAmountError('Amount can have at most 2 decimal places');
      return false;
    }

    if (num > 100000) {
      setAmountError('Amount exceeds maximum limit');
      return false;
    }

    setAmountError('');
    return true;
  };

  const handleAmountChange = (value) => {
    setAmount(value);
    validateAmount(value);
  };

  const handleRequestPayment = () => {
    if (submittingRef.current) {
      return;
    }

    const amountText = amount.trim();
    if (amountText && !validateAmount(amountText)) {
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const requestAmount = amountText ? Number(amountText) : 0;

      // Record a pending incoming transaction
      const transaction = addTransaction({
        type: 'credit',
        amount: requestAmount,
        currency: 'ZAR',
        source: 'receive',
        counterparty: 'Payment request',
        note: note.trim() || 'Requested via QR code',
        status: 'pending',
      });

      setShowSuccess(true);
    } catch (error) {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    Share.share({
      message: `Pay me using TownPay: ${qrValue}`,
    });
  };

  const handleBackToHome = () => {
    setShowSuccess(false);
    setIsSubmitting(false);
    submittingRef.current = false;
    setAmount('');
    setNote('');
    setAmountError('');
    navigation.goBack();
  };

  if (showSuccess) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={80} color={colors.success} />
        </View>
        <Text style={styles.successTitle}>Payment Request Created</Text>
        <Text style={styles.successMessage}>
          {amount.trim()
            ? `Request for ${formatMoney(Number(amount))} has been recorded.`
            : 'Payment request has been recorded.'}
        </Text>
        <Text style={styles.successSub}>
          The payer can scan your QR code to complete the payment.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToHome}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Receive Money</Text>
        <Text style={styles.subtitle}>
          Show this QR code or request a specific amount.
        </Text>

        {/* QR Code Section */}
        <View style={styles.qrCard}>
          <View style={styles.qrContainer}>
            <QRCode
              value={qrValue}
              size={200}
              backgroundColor={colors.white}
              color={colors.text}
            />
          </View>
          <Text style={styles.merchantName}>{user?.name || 'You'}</Text>
          <Text style={styles.merchantId}>{payId}</Text>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={20} color={colors.primary} />
            <Text style={styles.shareButtonText}>Share my code</Text>
          </TouchableOpacity>
        </View>

        {/* Request Amount Form */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Request Specific Amount (Optional)</Text>

          <Text style={styles.label}>Amount (ZAR)</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencyPrefix}>R</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={colors.textMuted}
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={handleAmountChange}
              maxLength={12}
            />
          </View>
          {amountError ? <Text style={styles.error}>{amountError}</Text> : null}

          <Text style={styles.label}>Note (Optional)</Text>
          <TextInput
            style={[styles.input, styles.noteInput]}
            placeholder="What is this payment for?"
            placeholderTextColor={colors.textMuted}
            value={note}
            onChangeText={setNote}
            multiline
            maxLength={150}
            textAlignVertical="top"
          />
        </View>

        {/* Request Button */}
        <TouchableOpacity
          style={[
            styles.requestButton,
            isSubmitting && styles.disabledButton,
          ]}
          onPress={handleRequestPayment}
          disabled={isSubmitting}
        >
          <Ionicons
            name="arrow-down-outline"
            size={20}
            color={colors.textOnPrimary}
          />
          <Text style={styles.requestButtonText}>
            {isSubmitting ? 'Creating Request...' : 'Request Payment'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Demo application only. No real money is transferred.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  heading: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  qrCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  qrContainer: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    marginBottom: spacing.lg,
  },
  merchantName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  merchantId: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  currencyPrefix: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
    marginRight: spacing.sm,
  },
  amountInput: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: 19,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  noteInput: {
    height: 85,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    marginBottom: spacing.md,
  },
  requestButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  requestButtonText: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disclaimer: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  successContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  successIcon: {
    marginBottom: spacing.lg,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  successMessage: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  successSub: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radii.lg,
  },
  backButtonText: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});
