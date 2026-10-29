import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import { TransactionsProvider } from './src/context/TransactionsContext';
import { InventoryProvider } from './src/context/InventoryContext';
import RootNavigator from './src/navigation/RootNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';
import { colors, navigationTheme } from './src/theme';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <AuthProvider>
            <TransactionsProvider>
              <InventoryProvider>
                <NavigationContainer theme={navigationTheme}>
                  <StatusBar style="dark" />
                  <RootNavigator />
                </NavigationContainer>
              </InventoryProvider>
            </TransactionsProvider>
          </AuthProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});