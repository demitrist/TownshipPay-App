import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './routes';
import { stackScreenOptions } from './screenOptions';
import { useAuth } from '../context/AuthContext';
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import PinScreen from '../screens/auth/PinScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const { user } = useAuth();
  // After logout the mock user still exists — skip the branded splash.
  const initialRouteName = user ? ROUTES.LOGIN : ROUTES.SPLASH;

  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={ROUTES.SPLASH}
        component={SplashScreen}
        options={{ headerShown: false, gestureEnabled: false, animation: 'fade' }}
      />
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} options={{ title: 'Sign in' }} />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={RegisterScreen}
        options={{ title: 'Create account' }}
      />
      <Stack.Screen name={ROUTES.PIN} component={PinScreen} options={{ title: 'PIN' }} />
    </Stack.Navigator>
  );
}
