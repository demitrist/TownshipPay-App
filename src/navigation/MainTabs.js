import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TABS } from './routes';
import { colors, radii, shadows, spacing, typography } from '../theme';
import HomeStack from './HomeStack';
import HistoryStack from './HistoryStack';
import QrStack from './QrStack';
import InventoryStack from './InventoryStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

function QrTabButton({ onPress, accessibilityState }) {
  const focused = accessibilityState?.selected;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="QR"
      style={({ pressed }) => [styles.qrHit, pressed && { opacity: 0.9 }]}
    >
      <View style={[styles.qrFab, focused && styles.qrFabFocused, shadows.tab]}>
        <Ionicons name="qr-code-outline" size={28} color={colors.white} />
      </View>
    </Pressable>
  );
}

export default function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: [
          styles.tabBar,
          { height: 64 + insets.bottom, paddingBottom: Math.max(insets.bottom, spacing.sm) },
        ],
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            [TABS.HOME]: focused ? 'home' : 'home-outline',
            [TABS.HISTORY]: focused ? 'time' : 'time-outline',
            [TABS.QR]: 'qr-code-outline',
            [TABS.INVENTORY]: focused ? 'cube' : 'cube-outline',
            [TABS.PROFILE]: focused ? 'person' : 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={route.name === TABS.QR ? 28 : size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={TABS.HOME} component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name={TABS.HISTORY} component={HistoryStack} options={{ title: 'History' }} />
      <Tab.Screen
        name={TABS.QR}
        component={QrStack}
        options={{
          title: 'QR',
          tabBarLabel: () => null,
          tabBarButton: (props) => <QrTabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="qr-code-outline"
              size={28}
              color={focused ? colors.textOnPrimary : colors.white}
            />
          ),
        }}
      />
      <Tab.Screen name={TABS.INVENTORY} component={InventoryStack} options={{ title: 'Inventory' }} />
      <Tab.Screen name={TABS.PROFILE} component={ProfileStack} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBar,
    borderTopColor: colors.border,
    height: 64,
    paddingBottom: spacing.sm,
    paddingTop: spacing.xs,
  },
  label: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },
  qrHit: {
    top: -18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrFab: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrFabFocused: {
    backgroundColor: colors.primaryDark,
  },
});
