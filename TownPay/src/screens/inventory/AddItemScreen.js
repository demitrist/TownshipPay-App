import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';

export default function AddItemScreen({ navigation }) {
  return (
    <FeaturePlaceholder
      title="Add item"
      owner="SG"
      bullets={[
        'Form: name, price, sku, quantity, low-stock threshold.',
        'Save into your local mock products file/state.',
        'Pop back to Inventory after save.',
      ]}
      actions={[{ title: 'Save (pop back)', onPress: () => navigation.goBack(), variant: 'outline' }]}
    />
  );
}
