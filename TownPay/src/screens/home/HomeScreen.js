import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';
import { ROUTES } from '../../navigation/routes';

export default function HomeScreen({ navigation }) {
  return (
    <FeaturePlaceholder
      title="Home"
      owner="Christopher"
      bullets={[
        'Dashboard with balance, recent activity, and quick actions.',
        'Offline/online banner plus a mock sync toggle.',
        'Wire Send and Receive into this stack using ROUTES.',
      ]}
      actions={[
        { title: 'Send money', onPress: () => navigation.navigate(ROUTES.SEND_MONEY) },
        {
          title: 'Receive money',
          onPress: () => navigation.navigate(ROUTES.RECEIVE_MONEY),
          variant: 'outline',
        },
      ]}
    />
  );
}
