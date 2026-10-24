import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ListItem from '../../components/ListItem';
import Divider from '../../components/Divider';
import { colors, radii, spacing, typography } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { initialsFromName } from '../../utils/format';
import { ROUTES } from '../../navigation/routes';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <ScreenContainer scroll>
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initialsFromName(user?.name)}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'TownPay merchant'}</Text>
        <Text style={styles.meta}>{user?.email}</Text>
        <Text style={styles.meta}>{user?.phone}</Text>
      </View>

      <Card>
        <ListItem
          title="Component showcase"
          subtitle="Dev-only gallery of shared UI"
          onPress={() => navigation.navigate(ROUTES.COMPONENT_SHOWCASE)}
        />
        <Divider />
        <ListItem
          title="Mock session"
          subtitle="Logout returns you to the login screen"
          showChevron={false}
        />
      </Card>

      <View style={styles.logout}>
        <Button title="Log out" variant="danger" onPress={logout} fullWidth icon="log-out-outline" />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.textOnPrimary,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  name: {
    color: colors.text,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  meta: {
    color: colors.textMuted,
    marginTop: 2,
  },
  logout: {
    marginTop: spacing.xl,
  },
});
