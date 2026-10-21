import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';
import { ROUTES } from '../../navigation/routes';
import { useTransactions } from '../../context/TransactionsContext';

export default function ConfirmPaymentScreen({ navigation, route }) {
  const { addTransaction } = useTransactions();
  const amount = route.params?.amount || '0.00';
  const payee = route.params?.payee || 'Unknown';
  const source = route.params?.source || 'qr';

  function confirm() {
    const txn = addTransaction({
      type: 'debit',
      amount: Number(amount),
      status: 'pending',
      source,
      counterparty: payee,
      note: 'Placeholder QR/send confirmation',
    });
    navigation.navigate(ROUTES.PAYMENT_SUCCESS, {
      amount,
      payee,
      transactionId: txn.id,
    });
  }

  return (
    <FeaturePlaceholder
      title="Confirm payment"
      owner="Kateho"
      params={route.params}
      bullets={[
        'Show amount, payee, and source before charging the mock wallet.',
        'On confirm, call addTransaction() then go to PaymentSuccess.',
      ]}
      actions={[{ title: 'Confirm payment', onPress: confirm }]}
    />
  );
}
