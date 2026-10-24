import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import SectionHeader from '../../components/SectionHeader';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import ListItem from '../../components/ListItem';
import Divider from '../../components/Divider';
import BalanceCard from '../../components/BalanceCard';
import { colors, spacing, typography } from '../../theme';

export default function ComponentShowcaseScreen() {
  const [text, setText] = useState('');
  const [secret, setSecret] = useState('townpay');

  return (
    <ScreenContainer scroll>
      <Text style={styles.lead}>
        Shared components for the team. Copy these imports — do not restyle with raw hex.
      </Text>

      <SectionHeader title="Buttons" />
      <Button title="Primary" onPress={() => {}} fullWidth />
      <View style={styles.gap} />
      <Button title="Secondary" variant="secondary" onPress={() => {}} fullWidth />
      <View style={styles.gap} />
      <Button title="Outline" variant="outline" onPress={() => {}} fullWidth />
      <View style={styles.gap} />
      <Button title="Danger" variant="danger" onPress={() => {}} fullWidth />
      <View style={styles.gap} />
      <Button title="Ghost" variant="ghost" onPress={() => {}} fullWidth />
      <View style={styles.gap} />
      <Button title="Loading" loading onPress={() => {}} fullWidth />
      <View style={styles.gap} />
      <Button title="Disabled" disabled onPress={() => {}} fullWidth />

      <SectionHeader title="Inputs" />
      <Input label="Plain" value={text} onChangeText={setText} placeholder="Amount or name" />
      <Input
        label="Password"
        value={secret}
        onChangeText={setSecret}
        secureTextEntry
        error={secret.length < 6 ? 'Too short' : ''}
      />

      <SectionHeader title="Cards & balance" />
      <BalanceCard amount={12850.4} footer="Includes pending QR payments" />
      <View style={styles.gap} />
      <Card>
        <Text style={styles.body}>Elevated card using theme shadows and radii.</Text>
      </Card>

      <SectionHeader title="Status badges" />
      <View style={styles.row}>
        <StatusBadge status="pending" />
        <StatusBadge status="synced" />
        <StatusBadge status="low-stock" />
        <StatusBadge status="success" />
        <StatusBadge status="failed" />
      </View>

      <SectionHeader title="List row" />
      <Card padding="sm">
        <ListItem title="Lerato M." subtitle="Sent ZAR 120.00" onPress={() => {}} />
        <Divider />
        <ListItem title="Walk-in sale" subtitle="Synced till sale" showChevron={false} />
      </Card>

      <EmptyState
        title="No activity yet"
        message="This is the empty state teammates should reuse on History and Inventory."
        actionTitle="Primary action"
        onAction={() => {}}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  lead: {
    color: colors.textMuted,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  gap: {
    height: spacing.sm,
  },
  body: {
    color: colors.text,
    fontSize: typography.sizes.md,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
});
