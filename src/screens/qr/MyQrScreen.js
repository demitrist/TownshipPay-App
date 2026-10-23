import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';
import { ROUTES } from '../../navigation/routes';

export default function MyQrScreen({ navigation }) {
  return (
    <FeaturePlaceholder
      title="My QR"
      owner="Kateho"
      bullets={[
        'Generate a personal QR with react-native-qrcode-svg.',
        'Encode a mock payee payload (name + wallet id).',
        'Keep this screen as the QR tab root.',
      ]}
      actions={[
        { title: 'Scan a QR', onPress: () => navigation.navigate(ROUTES.SCAN_QR) },
      ]}
    />
  );
}
