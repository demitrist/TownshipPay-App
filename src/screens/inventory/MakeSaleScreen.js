import React, { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ListItem from '../../components/ListItem';
import SectionHeader from '../../components/SectionHeader';
import StatusBadge from '../../components/StatusBadge';
import { colors, spacing, typography } from '../../theme';
import { ROUTES } from '../../navigation/routes';
import { useTransactions } from '../../context/TransactionsContext';
import { useInventory, isLowStock } from '../../context/InventoryContext';
import { formatMoney } from '../../utils/format';

export default function MakeSaleScreen({ navigation }) {
  const { products, completeSale } = useInventory();
  const { addTransaction } = useTransactions();

  const [cart, setCart] = useState({}); // { [itemId]: qty }
  const [error, setError] = useState('');
  const [result, setResult] = useState(null); 

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([itemId, qty]) => ({ product: products.find((p) => p.id === itemId), itemId, qty }))
        .filter((l) => l.product),
    [cart, products]
  );
  const total = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);

  const add = (p) => {
    setError('');
    setCart((c) => {
      const qty = c[p.id] || 0;
      return qty >= p.quantity ? c : { ...c, [p.id]: qty + 1 };
    });
  };

  const remove = (p) => {
    setError('');
    setCart((c) => {
      const qty = (c[p.id] || 0) - 1;
      const next = { ...c };
      if (qty <= 0) delete next[p.id];
      else next[p.id] = qty;
      return next;
    });
  };

  const confirmSale = () => {
    const res = completeSale(lines.map((l) => ({ itemId: l.itemId, qty: l.qty })));
    if (!res.ok) {
      setError(res.error);
      return;
    }
    // So History can show it.
    addTransaction({
      type: 'credit',
      amount: res.sale.total,
      status: 'pending',
      source: 'sale',
      counterparty: 'Walk-in customer',
      note: res.sale.items.map((i) => `${i.qty} × ${i.name}`).join(', '),
    });
    setCart({});
    setResult(res);
  };

  const closeModal = (goToSummary) => {
    setResult(null);
    if (goToSummary) navigation.navigate(ROUTES.SALES_SUMMARY);
  };

  return (
    <ScreenContainer keyboard={false}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        <SectionHeader title="Select items" />
        {products.map((p) => {
          const inCart = cart[p.id] || 0;
          const unavailable = p.quantity <= 0 || inCart >= p.quantity;
          const remaining = p.quantity - inCart;
          return (
            <View key={p.id} style={[styles.item, unavailable && styles.dim]}>
              <Card padding="sm">
                <ListItem
                  title={p.name}
                  subtitle={`${formatMoney(p.price)} · ${remaining} available`}
                  showChevron={false}
                  onPress={unavailable ? undefined : () => add(p)}
                  right={
                    <View style={styles.rightRow}>
                      {p.quantity <= 0 ? (
                        <StatusBadge status="low-stock" label="Out of stock" />
                      ) : isLowStock(p) ? (
                        <StatusBadge status="low-stock" label="Low stock" />
                      ) : null}
                      <Ionicons
                        name={inCart ? 'checkmark-circle' : 'add-circle-outline'}
                        size={26}
                        color={colors.primary}
                        style={styles.addIcon}
                      />
                    </View>
                  }
                />
              </Card>
            </View>
          );
        })}
      </ScrollView>

      <Card style={styles.cart}>
        <Text style={styles.cartTitle}>Cart ({itemCount})</Text>

        {lines.length === 0 ? (
          <Text style={styles.hint}>Tap an item above to add it to the sale.</Text>
        ) : (
          <ScrollView style={styles.cartLines} showsVerticalScrollIndicator={false}>
            {lines.map(({ product, qty }) => (
              <View key={product.id} style={styles.cartRow}>
                <Text style={styles.cartName} numberOfLines={1}>
                  {product.name}
                </Text>
                <Pressable
                  onPress={() => remove(product)}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove one ${product.name}`}
                  style={styles.stepBtn}
                >
                  <Ionicons name="remove" size={18} color={colors.primary} />
                </Pressable>
                <Text style={styles.qty}>{qty}</Text>
                <Pressable
                  onPress={() => add(product)}
                  disabled={qty >= product.quantity}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel={`Add one more ${product.name}`}
                  style={[styles.stepBtn, qty >= product.quantity && { opacity: 0.4 }]}
                >
                  <Ionicons name="add" size={18} color={colors.primary} />
                </Pressable>
                <Text style={styles.lineTotal}>{formatMoney(product.price * qty)}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatMoney(total)}</Text>
        </View>

        <Button
          title="Complete sale"
          icon="cash-outline"
          size="lg"
          fullWidth
          disabled={lines.length === 0}
          onPress={confirmSale}
        />
        {lines.length > 0 ? (
          <View style={{ marginTop: spacing.sm }}>
            <Button title="Clear cart" variant="ghost" size="sm" fullWidth onPress={() => setCart({})} />
          </View>
        ) : null}
      </Card>

      <Modal visible={!!result} transparent animationType="fade" onRequestClose={() => closeModal(false)}>
        <View style={styles.overlay}>
          <Card padding="lg" style={styles.modalCard}>
            <Text style={styles.modalTitle}>Sale complete</Text>
            <Text style={styles.modalTotal}>{formatMoney(result?.sale.total ?? 0)}</Text>

            {result?.lowStock.length ? (
              <View style={styles.modalLow}>
                <View style={styles.lowHeader}>
                  <Ionicons name="warning-outline" size={18} color={colors.lowStock} />
                  <Text style={styles.lowTitle}>Low stock alert</Text>
                </View>
                {result.lowStock.map((p) => (
                  <View key={p.id} style={styles.lowRow}>
                    <Text style={styles.lowName}>{p.name}</Text>
                    <StatusBadge
                      status="low-stock"
                      label={p.quantity <= 0 ? 'Out of stock' : `${p.quantity} left`}
                    />
                  </View>
                ))}
              </View>
            ) : null}

            <View style={{ marginTop: spacing.lg }}>
              <Button title="View sales summary" fullWidth onPress={() => closeModal(true)} />
            </View>
            <View style={{ marginTop: spacing.sm }}>
              <Button title="New sale" variant="ghost" fullWidth onPress={() => closeModal(false)} />
            </View>
          </Card>
        </View>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  item: { marginBottom: spacing.sm },
  dim: { opacity: 0.5 },
  rightRow: { flexDirection: 'row', alignItems: 'center' },
  addIcon: { marginLeft: spacing.sm },
  cart: { marginTop: spacing.sm },
  cartTitle: { color: colors.text, fontSize: typography.sizes.md, fontWeight: typography.weights.bold },
  hint: { color: colors.textMuted, fontSize: typography.sizes.sm, marginTop: spacing.sm },
  cartLines: { maxHeight: 150, marginTop: spacing.sm },
  cartRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  cartName: { flex: 1, color: colors.text, fontSize: typography.sizes.sm },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    minWidth: 28,
    textAlign: 'center',
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  lineTotal: {
    minWidth: 72,
    textAlign: 'right',
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  error: { color: colors.danger, fontSize: typography.sizes.xs, marginTop: spacing.sm },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  totalLabel: { color: colors.textMuted, fontSize: typography.sizes.md },
  totalValue: { color: colors.text, fontSize: typography.sizes.xl, fontWeight: typography.weights.bold },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: { width: '100%', maxWidth: 420 },
  modalTitle: { color: colors.text, fontSize: typography.sizes.xl, fontWeight: typography.weights.bold },
  modalTotal: {
    color: colors.primary,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    marginTop: spacing.xs,
  },
  modalLow: { marginTop: spacing.lg },
  lowHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  lowTitle: {
    marginLeft: spacing.sm,
    color: colors.lowStock,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  lowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  lowName: { flex: 1, color: colors.text, fontSize: typography.sizes.sm, marginRight: spacing.sm },
});