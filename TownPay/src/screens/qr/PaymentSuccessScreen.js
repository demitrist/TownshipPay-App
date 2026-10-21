import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';
import { ROUTES } from '../../navigation/routes';

export default function PaymentSuccessScreen({ navigation, route }) {
  return (
    <FeaturePlaceholder
      title="Payment success"
      owner="Kateho"
      params={route.params}
      bullets={[
        'Celebrate the mock payment (check animation is enough).',
        'CTA to receipt and back to Home/My QR.',
      ]}
      actions={[
        {
          title: 'View receipt',
          onPress: () =>
            navigation.navigate(ROUTES.RECEIPT, {
              transactionId: route.params?.transactionId || 'txn_demo_001',
            }),
        },
      ]}
    />
  );
}
