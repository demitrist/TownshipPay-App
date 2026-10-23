import React from 'react';
import ItemForm from './ItemForm';
import { useInventory } from '../../context/InventoryContext';

export default function AddItemScreen({ navigation }) {
  const { addProduct } = useInventory();

  return (
    <ItemForm
      submitLabel="Save item"
      onSubmit={(values) => {
        addProduct(values);
        navigation.goBack();
      }}
      onCancel={() => navigation.goBack()}
    />
  );
}