import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';
import { ROUTES } from '../../navigation/routes';

export default function ScanQrScreen({ navigation }) {
  return (
    <FeaturePlaceholder
      title="Scan QR"
      owner="Kateho"
      bullets={[
        'Use expo-camera or a mock scanner button if camera permission is awkward in Expo Go.',
        'Parse the payload into amount/payee when present.',
        'Always continue to ConfirmPayment with ROUTES.CONFIRM_PAYMENT params.',
      ]}
      actions={[
        {
          title: 'Mock a successful scan',
          onPress: () =>
            navigation.navigate(ROUTES.CONFIRM_PAYMENT, {
              amount: '85.00',
              payee: 'Sipho Traders',
              source: 'qr',
            }),
        },
      ]}
    />
  );
}
