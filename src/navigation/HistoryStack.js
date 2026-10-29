import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './routes';
import { stackScreenOptions } from './screenOptions';
import HistoryScreen from '../screens/transactions/HistoryScreen';
import ReceiptScreen from '../screens/qr/ReceiptScreen';

const Stack = createNativeStackNavigator();

export default function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={ROUTES.HISTORY}
        component={HistoryScreen}
        options={{ title: 'History' }}
      />
      <Stack.Screen
        name={ROUTES.RECEIPT}
        component={ReceiptScreen}
        options={{ title: 'Receipt' }}
      />
    </Stack.Navigator>
  );
}
