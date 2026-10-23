import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ListItem from '../../components/ListItem';
import SectionHeader from '../../components/SectionHeader';
import StatusBadge from '../../components/StatusBadge';
import { colors, spacing, typography } from '../../theme';
import { ROUTES } from '../../navigation/routes';
import { useInventory, isLowStock } from '../../context/InventoryContext';
import { formatMoney } from '../../utils/format';
 
export default function Inventoryscreen({ navigation }) {
  const { products, lowStockProducts } = useInventory();
 
  return (
    <ScreenContainer scroll>
      <Button
        title="Add item"
        icon="add"
        fullWidth
        onPress={() => navigation.navigate(ROUTES.ADD_ITEM)}
      />
      <View style={styles.gap}>
        <Button
          title="Make a sale"
          icon="cart-outline"
          variant="outline"
          fullWidth
          onPress={() => navigation.navigate(ROUTES.MAKE_SALE)}
        />
      </View>
      <View style={styles.gap}>
        <Button
          title="Daily sales summary"
          icon="stats-chart-outline"
          variant="ghost"
          fullWidth
          onPress={() => navigation.navigate(ROUTES.SALES_SUMMARY)}
        />
      </View>
 
      {lowStockProducts.length > 0 ? (
        <View style={styles.gap}>
          <Card padding="sm">
            <View style={styles.alertRow} accessibilityRole="alert">
              <Ionicons name="warning-outline" size={20} color={colors.lowStock} />
              <Text style={styles.alertText}>
                {lowStockProducts.length} item{lowStockProducts.length === 1 ? '' : 's'} low or out of
                stock
              </Text>
            </View>
          </Card>
        </View>
      ) : null}
 
      <View style={styles.section}>
        <SectionHeader title={`Items (${products.length})`} />
        {products.length === 0 ? (
          <Card>
            <Text style={styles.empty}>No items yet. Tap "Add item" to create your first one.</Text>
          </Card>
        ) : (
          products.map((p) => (
            <View key={p.id} style={styles.item}>
              <Card padding="sm">
                <ListItem
                  title={p.name}
                  subtitle={`${p.sku ? `${p.sku} · ` : ''}${formatMoney(p.price)} · ${p.quantity} in stock`}
                  onPress={() => navigation.navigate(ROUTES.EDIT_ITEM, { itemId: p.id })}
                  right={
                    isLowStock(p) ? (
                      <View style={styles.badge}>
                        <StatusBadge
                          status="low-stock"
                          label={p.quantity <= 0 ? 'Out of stock' : 'Low stock'}
                        />
                      </View>
                    ) : null
                  }
                />
              </Card>
            </View>
          ))
        )}
      </View>
    </ScreenContainer>
  );
}
 
const styles = StyleSheet.create({
  gap: { marginTop: spacing.md },
  section: { marginTop: spacing.xl },
  item: { marginBottom: spacing.sm },
  badge: { marginRight: spacing.sm },
  alertRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.xs },
  alertText: {
    marginLeft: spacing.sm,
    color: colors.lowStock,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  empty: { color: colors.textMuted, fontSize: typography.sizes.md },
});