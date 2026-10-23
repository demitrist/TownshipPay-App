import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './routes';
import { stackScreenOptions } from './screenOptions';
import MyQrScreen from '../screens/qr/MyQrScreen';
import ScanQrScreen from '../screens/qr/ScanQrScreen';
import ConfirmPaymentScreen from '../screens/qr/ConfirmPaymentScreen';
import PaymentSuccessScreen from '../screens/qr/PaymentSuccessScreen';
import ReceiptScreen from '../screens/qr/ReceiptScreen';

const Stack = createNativeStackNavigator();

export default function QrStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name={ROUTES.MY_QR} component={MyQrScreen} options={{ title: 'My QR' }} />
      <Stack.Screen name={ROUTES.SCAN_QR} component={ScanQrScreen} options={{ title: 'Scan QR' }} />
      <Stack.Screen
        name={ROUTES.CONFIRM_PAYMENT}
        component={ConfirmPaymentScreen}
        options={{ title: 'Confirm payment' }}
      />
      <Stack.Screen
        name={ROUTES.PAYMENT_SUCCESS}
        component={PaymentSuccessScreen}
        options={{ title: 'Success', headerBackVisible: false }}
      />
      <Stack.Screen name={ROUTES.RECEIPT} component={ReceiptScreen} options={{ title: 'Receipt' }} />
    </Stack.Navigator>
  );
}
