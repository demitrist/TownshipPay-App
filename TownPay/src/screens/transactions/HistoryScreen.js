import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';
import { ROUTES, TABS } from '../../navigation/routes';
import { useTransactions } from '../../context/TransactionsContext';

export default function HistoryScreen({ navigation }) {
  const { transactions } = useTransactions();

  return (
    <FeaturePlaceholder
      title="Transaction history"
      owner="Christopher"
      bullets={[
        'List transactions from TransactionsContext (pending vs synced).',
        'Filters: date, source (qr/send/receive/sale), status.',
        `Skeleton currently has ${transactions.length} mock item(s).`,
      ]}
      actions={[
        {
          title: 'Open a sample receipt',
          onPress: () =>
            navigation.navigate(TABS.QR, {
              screen: ROUTES.RECEIPT,
              params: { transactionId: 'txn_demo_001' },
            }),
          variant: 'outline',
        },
      ]}
    />
  );
}
