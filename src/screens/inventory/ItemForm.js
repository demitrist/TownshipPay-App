import React, { useState } from 'react';
import { View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Card from '../../components/Card';
import SectionHeader from '../../components/SectionHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { spacing } from '../../theme';
import { DEFAULT_LOW_STOCK_THRESHOLD } from '../../context/InventoryContext';

// Shared by AddItemScreen and EditItemScreen.
export default function ItemForm({ initial, submitLabel, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name ?? '');
  const [price, setPrice] = useState(initial ? String(initial.price) : '');
  const [sku, setSku] = useState(initial?.sku ?? '');
  const [quantity, setQuantity] = useState(initial ? String(initial.quantity) : '');
  const [threshold, setThreshold] = useState(
    initial ? String(initial.lowStockThreshold) : String(DEFAULT_LOW_STOCK_THRESHOLD)
  );
  const [errors, setErrors] = useState({});

  const submit = () => {
    const e = {};
    const priceText = price.trim().replace(',', '.');
    const priceNum = Number(priceText);
    if (!name.trim()) e.name = 'Name is required';
    // Digits with up to 2 decimals only - rejects 'Infinity', '1e9', '0x10', '-5', etc.
    if (!/^\d+(\.\d{1,2})?$/.test(priceText) || !Number.isFinite(priceNum) || priceNum > 1000000) {
      e.price = 'Enter a valid price (e.g. 25 or 25.50)';
    }
    if (!/^\d+$/.test(quantity.trim())) e.quantity = 'Enter a whole number (0 or more)';
    if (!/^\d+$/.test(threshold.trim())) e.threshold = 'Enter a whole number (0 or more)';
    setErrors(e);
    if (Object.keys(e).length) return;

    onSubmit({
      name,
      sku,
      price: Math.round(priceNum * 100) / 100,
      quantity: parseInt(quantity, 10),
      lowStockThreshold: parseInt(threshold, 10),
    });
  };

  return (
    <ScreenContainer scroll>
      <Card>
        <SectionHeader title="Item details" />
        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="e.g. Cappuccino"
          autoCapitalize="words"
          error={errors.name}
          returnKeyType="next"
        />
        <Input
          label="Price"
          value={price}
          onChangeText={setPrice}
          placeholder="0.00"
          keyboardType="decimal-pad"
          error={errors.price}
          returnKeyType="next"
        />
        <Input
          label="SKU (optional)"
          value={sku}
          onChangeText={setSku}
          placeholder="e.g. BEV-001"
          autoCapitalize="characters"
          returnKeyType="next"
        />
        <Input
          label="Quantity in stock"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="0"
          keyboardType="number-pad"
          error={errors.quantity}
          returnKeyType="next"
        />
        <Input
          label="Low-stock threshold"
          value={threshold}
          onChangeText={setThreshold}
          placeholder="5"
          keyboardType="number-pad"
          error={errors.threshold}
          onSubmitEditing={submit}
        />
      </Card>

      <View style={{ marginTop: spacing.lg }}>
        <Button title={submitLabel} icon="checkmark" size="lg" fullWidth onPress={submit} />
      </View>
      <View style={{ marginTop: spacing.md }}>
        <Button title="Cancel" variant="outline" fullWidth onPress={onCancel} />
      </View>
    </ScreenContainer>
  );
}