import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './routes';
import { stackScreenOptions } from './screenOptions';
import HomeScreen from '../screens/home/HomeScreen';
import SendMoneyScreen from '../screens/home/SendMoneyScreen';
import ReceiveMoneyScreen from '../screens/home/ReceiveMoneyScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen
        name={ROUTES.SEND_MONEY}
        component={SendMoneyScreen}
        options={{ title: 'Send money' }}
      />
      <Stack.Screen
        name={ROUTES.RECEIVE_MONEY}
        component={ReceiveMoneyScreen}
        options={{ title: 'Receive money' }}
      />
    </Stack.Navigator>
  );
}
