import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import Card from '../../components/Card';
import Button from '../../components/Button';
import BalanceCard from '../../components/BalanceCard';
import ListItem from '../../components/ListItem';
import SectionHeader from '../../components/SectionHeader';
import StatusBadge from '../../components/StatusBadge';
import { colors, spacing, typography } from '../../theme';
import { TABS, ROUTES } from '../../navigation/routes';
import { useInventory } from '../../context/InventoryContext';
import { formatMoney } from '../../utils/format';
import { formatDay, formatTime, isSameDay, startOfDay } from '../../utils/salesDates';

export default function SalesSummaryScreen({ navigation }) {
  const { sales, lowStockProducts } = useInventory();
  const [day, setDay] = useState(startOfDay(new Date()));

  const isToday = isSameDay(day, new Date());
  const shift = (delta) =>
    setDay((d) => {
      const next = new Date(d);
      next.setDate(next.getDate() + delta);
      return next;
    });

  const daySales = useMemo(() => sales.filter((s) => isSameDay(s.createdAt, day)), [sales, day]);
  const revenue = daySales.reduce((sum, s) => sum + s.total, 0);
  const itemsSold = daySales.reduce((sum, s) => sum + s.items.reduce((n, i) => n + i.qty, 0), 0);

  return (
    <ScreenContainer scroll>
      <View style={styles.dayNav}>
        <Pressable
          onPress={() => shift(-1)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Previous day"
          style={styles.navBtn}
        >
          <Ionicons name="chevron-back" size={22} color={colors.primary} />
        </Pressable>
        <Text style={styles.dayLabel}>{isToday ? 'Today' : formatDay(day)}</Text>
        <Pressable
          onPress={() => shift(1)}
          disabled={isToday}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Next day"
          style={[styles.navBtn, isToday && { opacity: 0.3 }]}
        >
          <Ionicons name="chevron-forward" size={22} color={colors.primary} />
        </Pressable>
      </View>

      <BalanceCard
        label={isToday ? 'Sales today' : `Sales on ${formatDay(day)}`}
        amount={revenue}
        footer={`${daySales.length} sale${daySales.length === 1 ? '' : 's'} · ${itemsSold} item${
          itemsSold === 1 ? '' : 's'
        } sold`}
      />

      {lowStockProducts.length > 0 ? (
        <View style={styles.section}>
          <SectionHeader title="Low-stock warnings" />
          <Card padding="sm">
            {lowStockProducts.map((p) => (
              <ListItem
                key={p.id}
                title={p.name}
                subtitle={`Alert at ${p.lowStockThreshold} or fewer`}
                showChevron={false}
                right={
                  <StatusBadge
                    status="low-stock"
                    label={p.quantity <= 0 ? 'Out of stock' : `${p.quantity} left`}
                  />
                }
              />
            ))}
          </Card>
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionHeader title="Sales" />
        {daySales.length === 0 ? (
          <Card>
            <Text style={styles.empty}>No sales recorded for this day.</Text>
          </Card>
        ) : (
          daySales.map((s) => (
            <View key={s.id} style={styles.sale}>
              <Card padding="sm">
                <ListItem
                  title={formatTime(s.createdAt)}
                  subtitle={s.items.map((i) => `${i.qty} × ${i.name}`).join(', ')}
                  showChevron={false}
                  right={<Text style={styles.saleTotal}>{formatMoney(s.total)}</Text>}
                />
              </Card>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Button
          title="See sales in history"
          variant="outline"
          fullWidth
          onPress={() => navigation.navigate(ROUTES.HISTORY)}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  dayNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  navBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  dayLabel: { color: colors.text, fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold },
  section: { marginTop: spacing.xl },
  sale: { marginBottom: spacing.sm },
  saleTotal: { color: colors.text, fontSize: typography.sizes.md, fontWeight: typography.weights.bold },
  empty: { color: colors.textMuted, fontSize: typography.sizes.md },
});