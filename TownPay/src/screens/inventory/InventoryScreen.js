import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';
import { ROUTES } from '../../navigation/routes';

export default function InventoryScreen({ navigation }) {
  return (
    <FeaturePlaceholder
      title="Inventory"
      owner="SG"
      bullets={[
        'List mock products from src/data (your file).',
        'Low-stock badge using StatusBadge status="low-stock".',
        'Row press → EditItem with { itemId }.',
      ]}
      actions={[
        { title: 'Add item', onPress: () => navigation.navigate(ROUTES.ADD_ITEM) },
        {
          title: 'Edit sample item',
          onPress: () => navigation.navigate(ROUTES.EDIT_ITEM, { itemId: 'item_001' }),
          variant: 'outline',
        },
        { title: 'Make a sale', onPress: () => navigation.navigate(ROUTES.MAKE_SALE) },
        {
          title: 'Daily sales summary',
          onPress: () => navigation.navigate(ROUTES.SALES_SUMMARY),
          variant: 'ghost',
        },
      ]}
    />
  );
}
