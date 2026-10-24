import React from 'react';
import { Text } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ItemForm from './ItemForm';
import { colors, spacing, typography } from '../../theme';
import { useInventory } from '../../context/InventoryContext';
 
export default function EditItemScreen({ navigation, route }) {
  const { getProduct, updateProduct } = useInventory();
  const item = getProduct(route.params?.itemId);
 
  if (!item) {
    return (
      <ScreenContainer>
        <Card>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: typography.sizes.md,
              marginBottom: spacing.md,
            }}
          >
            This item could not be found.
          </Text>
          <Button title="Back to inventory" variant="outline" fullWidth onPress={() => navigation.goBack()} />
        </Card>
      </ScreenContainer>
    );
  }
 
  return (
    <ItemForm
      initial={item}
      submitLabel="Save changes"
      onSubmit={(values) => {
        updateProduct(item.id, values);
        navigation.goBack();
      }}
      onCancel={() => navigation.goBack()}
    />
  );
}
 