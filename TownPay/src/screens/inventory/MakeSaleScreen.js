import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';
import { ROUTES } from '../../navigation/routes';
import { useTransactions } from '../../context/TransactionsContext';

export default function MakeSaleScreen({ navigation, route }) {
  const { addTransaction } = useTransactions();

  function completeSale() {
    addTransaction({
      type: 'credit',
      amount: 45,
      status: 'pending',
      source: 'sale',
      counterparty: 'Walk-in customer',
      note: 'Placeholder till sale',
    });
    navigation.navigate(ROUTES.SALES_SUMMARY);
  }

  return (
    <FeaturePlaceholder
      title="Make a sale"
      owner="SG"
      params={route.params}
      bullets={[
        'Cart UI: add products, decrease stock on confirm.',
        'Call addTransaction({ source: "sale" }) so History can show it.',
      ]}
      actions={[{ title: 'Complete mock sale', onPress: completeSale }]}
    />
  );
}
