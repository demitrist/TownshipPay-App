import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, spacing, radii } from '../../theme';
import { useTransactions } from '../../context/TransactionsContext';
import { formatMoney } from '../../utils/format';

export default function SendMoneyScreen({ navigation, route }) {
  const [payee, setPayee] = useState(
    route.params?.prefillPayee || ''
  );

  const [amount, setAmount] = useState(
    route.params?.prefillAmount || ''
  );

  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submittingRef = useRef(false);

  const {
    addTransaction,
    balance,
    isOnline,
  } = useTransactions();

  // Validate and simulate a payment
  const handleSendMoney = () => {
    if (submittingRef.current) {
      return;
    }

    const recipientName = payee.trim();
    const amountText = amount.trim();
    const paymentAmount = Number(amountText);

    if (!recipientName) {
      Alert.alert(
        'Missing Recipient',
        'Please enter the recipient name.'
      );
      return;
    }

    if (
      !/^\d+(\.\d{1,2})?$/.test(amountText) ||
      !Number.isFinite(paymentAmount) ||
      paymentAmount <= 0
    ) {
      Alert.alert(
        'Invalid Amount',
        'Please enter a valid amount greater than R0.00, with no more than two decimal places.'
      );
      return;
    }

    if (paymentAmount > balance) {
      Alert.alert(
        'Insufficient Demo Balance',
        'You do not have enough demo funds for this payment.'
      );
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      // Create a simulated debit transaction.
      // Online = synced; Offline = pending.
      const transaction = addTransaction({
        type: 'debit',
        amount: paymentAmount,
        currency: 'ZAR',
        source: 'send',
        counterparty: recipientName,
        note: note.trim(),
      });

      Alert.alert(
        'Mock Payment Recorded',
        `${formatMoney(transaction.amount)} sent to ${recipientName} (demo only).\n\nStatus: ${transaction.status.toUpperCase()}`,
        [
          {
            text: 'Back to Home',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      submittingRef.current = false;
      setIsSubmitting(false);

      Alert.alert(
        'Payment Error',
        'Unable to record this mock payment.'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Page heading */}
        <View style={styles.headingSection}>
          <Text style={styles.heading}>Send Money</Text>

          <Text style={styles.subtitle}>
            Transfer demo funds to another person or business.
          </Text>
        </View>

        {/* Available balance */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceIcon}>
            <Ionicons
              name="wallet-outline"
              size={26}
              color={colors.primary}
            />
          </View>

          <View>
            <Text style={styles.balanceLabel}>
              Available Demo Balance
            </Text>

            <Text style={styles.balanceAmount}>
              {formatMoney(balance)}
            </Text>
          </View>
        </View>

        {/* Payment form */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>
            Payment Details
          </Text>

          {/* Recipient */}
          <Text style={styles.label}>
            Recipient Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. Lerato M."
            placeholderTextColor={colors.textMuted}
            value={payee}
            onChangeText={setPayee}
            autoCapitalize="words"
            maxLength={80}
          />

          {/* Amount */}
          <Text style={styles.label}>
            Amount (ZAR)
          </Text>

          <View style={styles.amountInputContainer}>
            <Text style={styles.currencyPrefix}>R</Text>

            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={colors.textMuted}
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              maxLength={12}
            />
          </View>

          {/* Optional note */}
          <Text style={styles.label}>
            Payment Note (Optional)
          </Text>

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

        {/* Connection status */}
        <View style={styles.statusCard}>
          <Ionicons
            name={
              isOnline
                ? 'checkmark-circle-outline'
                : 'cloud-offline-outline'
            }
            size={23}
            color={
              isOnline
                ? colors.statusSynced
                : colors.statusPending
            }
          />

          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle}>
              {isOnline ? 'Online Mode' : 'Offline Mode'}
            </Text>

            <Text style={styles.statusDescription}>
              {isOnline
                ? 'This mock payment will be marked as synced.'
                : 'This mock payment will be pending until synced.'}
            </Text>
          </View>
        </View>

        {/* Send button */}
        <TouchableOpacity
          style={[
            styles.sendButton,
            isSubmitting && styles.disabledButton,
          ]}
          onPress={handleSendMoney}
          disabled={isSubmitting}
          accessibilityRole="button"
        >
          <Ionicons
            name="send-outline"
            size={20}
            color={colors.textOnPrimary}
          />

          <Text style={styles.sendButtonText}>
            {isSubmitting ? 'Payment Recorded' : 'Send Demo Money'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          This is a simulated payment. No real money
          will be transferred.
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

  headingSection: {
    marginBottom: spacing.xl,
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
    lineHeight: 21,
  },

  balanceCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  balanceIcon: {
    width: 54,
    height: 54,
    borderRadius: radii.lg,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },

  balanceLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },

  balanceAmount: {
    fontSize: 23,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.xs,
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

  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    marginBottom: spacing.lg,
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

  noteInput: {
    height: 85,
  },

  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  statusTextContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },

  statusTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },

  statusDescription: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xs,
    lineHeight: 18,
  },

  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },

  sendButtonText: {
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
    marginTop: spacing.lg,
    lineHeight: 18,
  },
});
