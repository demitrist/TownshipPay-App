import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SectionHeader from '../../components/SectionHeader';
import { colors, spacing, typography } from '../../theme';
import { useTransactions } from '../../context/TransactionsContext';
import { formatMoney } from '../../utils/format';

const AMOUNT_RE = /^\d+(\.\d{1,2})?$/;

// Records a mock incoming payment (credit). Online = synced, Offline = pending.
export default function ReceiveMoneyScreen({ navigation, route }) {
  const { addTransaction, isOnline } = useTransactions();
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState(route.params?.prefillAmount || '');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const busy = useRef(false);

  const submit = () => {
    if (busy.current) return;
    const e = {};
    const amountText = amount.trim();
    if (!payer.trim()) e.payer = 'Enter who is paying you.';
    if (!AMOUNT_RE.test(amountText) || Number(amountText) <= 0) {
      e.amount = 'Enter an amount above R0.00 with at most two decimals.';
    }
    setErrors(e);
    if (Object.keys(e).length) return;

    busy.current = true;
    const txn = addTransaction({
      type: 'credit',
      amount: Number(amountText),
      source: 'receive',
      counterparty: payer.trim(),
      note: note.trim(),
    });
    Alert.alert(
      'Mock Payment Received',
      `${formatMoney(txn.amount)} received from ${txn.counterparty} (demo only).\n\nStatus: ${txn.status.toUpperCase()}`,
      [{ text: 'Back to Home', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScreenContainer scroll>
      <Text style={styles.title}>Receive Money</Text>
      <Text style={styles.subtitle}>Record demo funds arriving in your TownPay wallet.</Text>

      <Card>
        <SectionHeader title="Payment details" />
        <Input
          label="Payer name"
          value={payer}
          onChangeText={setPayer}
          placeholder="e.g. Lerato M."
          autoCapitalize="words"
          error={errors.payer}
          returnKeyType="next"
        />
        <Input
          label="Amount (ZAR)"
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          keyboardType="decimal-pad"
          error={errors.amount}
          returnKeyType="next"
        />
        <Input
          label="Note (optional)"
          value={note}
          onChangeText={setNote}
          placeholder="What is this payment for?"
          returnKeyType="done"
        />
      </Card>

      <View style={styles.status}>
        <Text style={styles.statusText}>
          {isOnline
            ? 'Online: this payment will be marked as synced.'
            : 'Offline: this payment will be saved as pending until you sync.'}
        </Text>
      </View>

      <Button title="Record payment" icon="checkmark" size="lg" fullWidth onPress={submit} />
      <View style={{ marginTop: spacing.md }}>
        <Button title="Cancel" variant="outline" fullWidth onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: typography.sizes.xxl, fontWeight: typography.weights.bold },
  subtitle: { color: colors.textMuted, fontSize: typography.sizes.md, marginTop: spacing.xs, marginBottom: spacing.lg },
  status: { marginVertical: spacing.lg },
  statusText: { color: colors.textMuted, fontSize: typography.sizes.sm },
});
