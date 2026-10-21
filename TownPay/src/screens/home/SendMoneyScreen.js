import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';
import { ROUTES, TABS } from '../../navigation/routes';

export default function SendMoneyScreen({ navigation, route }) {
  return (
    <FeaturePlaceholder
      title="Send money"
      owner="Christopher"
      params={route.params}
      bullets={[
        'Amount + payee form with validation.',
        'Create a mock debit transaction (status pending until sync).',
        'To reuse Kateho’s confirmation UI, nest-navigate into the QR tab.',
      ]}
      actions={[
        {
          title: 'Pretend send → Confirm',
          onPress: () =>
            navigation.navigate(TABS.QR, {
              screen: ROUTES.CONFIRM_PAYMENT,
              params: {
                amount: route.params?.prefillAmount || '120.00',
                payee: route.params?.prefillPayee || 'Lerato M.',
                source: 'send',
              },
            }),
        },
      ]}
    />
  );
}
