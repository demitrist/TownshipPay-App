import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';
import { TABS, ROUTES } from '../../navigation/routes';

export default function SalesSummaryScreen({ navigation }) {
  return (
    <FeaturePlaceholder
      title="Sales summary"
      owner="SG"
      bullets={[
        'Today’s totals: revenue, items sold, low-stock warnings.',
        'Optional filter by date (mock).',
      ]}
      actions={[
        {
          title: 'See sales in history',
          onPress: () => navigation.navigate(TABS.HISTORY, { screen: ROUTES.HISTORY }),
          variant: 'outline',
        },
      ]}
    />
  );
}
