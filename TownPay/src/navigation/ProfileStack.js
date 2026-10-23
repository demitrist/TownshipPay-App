import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './routes';
import { stackScreenOptions } from './screenOptions';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ComponentShowcaseScreen from '../screens/profile/ComponentShowcaseScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen
        name={ROUTES.COMPONENT_SHOWCASE}
        component={ComponentShowcaseScreen}
        options={{ title: 'Component showcase' }}
      />
    </Stack.Navigator>
  );
}
