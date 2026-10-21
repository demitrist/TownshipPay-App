import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';
import { ROUTES, TABS } from '../../navigation/routes';

export default function ReceiveMoneyScreen({ navigation, route }) {
  return (
    <FeaturePlaceholder
      title="Receive money"
      owner="Christopher"
      params={route.params}
      bullets={[
        'Show a shareable request amount.',
        'Link to My QR so Kateho’s code can be reused.',
        'Add a credit transaction to history when “received”.',
      ]}
      actions={[
        {
          title: 'Open My QR',
          onPress: () => navigation.navigate(TABS.QR, { screen: ROUTES.MY_QR }),
        },
      ]}
    />
  );
}
