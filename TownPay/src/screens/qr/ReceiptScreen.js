import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';
import { TABS, ROUTES } from '../../navigation/routes';
import { useTransactions } from '../../context/TransactionsContext';

export default function ReceiptScreen({ navigation, route }) {
  const { getTransactionById } = useTransactions();
  const txn = getTransactionById(route.params?.transactionId);

  return (
    <FeaturePlaceholder
      title="Receipt"
      owner="Kateho"
      params={{ ...route.params, found: Boolean(txn) }}
      bullets={[
        'Look up the transaction by id via getTransactionById().',
        'Show amount, payee, status, timestamp — printable mock layout.',
      ]}
      actions={[
        {
          title: 'Back to history',
          onPress: () => navigation.navigate(TABS.HISTORY, { screen: ROUTES.HISTORY }),
          variant: 'outline',
        },
      ]}
    />
  );
}
