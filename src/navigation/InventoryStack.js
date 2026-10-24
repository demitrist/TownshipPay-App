import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './routes';
import { stackScreenOptions } from './screenOptions';
import InventoryScreen from '../screens/inventory/InventoryScreen';
import AddItemScreen from '../screens/inventory/AddItemScreen';
import EditItemScreen from '../screens/inventory/EditItemScreen';
import MakeSaleScreen from '../screens/inventory/MakeSaleScreen';
import SalesSummaryScreen from '../screens/inventory/SalesSummaryScreen';

const Stack = createNativeStackNavigator();

export default function InventoryStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={ROUTES.INVENTORY}
        component={InventoryScreen}
        options={{ title: 'Inventory' }}
      />
      <Stack.Screen name={ROUTES.ADD_ITEM} component={AddItemScreen} options={{ title: 'Add item' }} />
      <Stack.Screen
        name={ROUTES.EDIT_ITEM}
        component={EditItemScreen}
        options={{ title: 'Edit item' }}
      />
      <Stack.Screen
        name={ROUTES.MAKE_SALE}
        component={MakeSaleScreen}
        options={{ title: 'Make a sale' }}
      />
      <Stack.Screen
        name={ROUTES.SALES_SUMMARY}
        component={SalesSummaryScreen}
        options={{ title: 'Sales summary' }}
      />
    </Stack.Navigator>
  );
}
