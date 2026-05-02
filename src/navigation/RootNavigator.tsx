import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import DrawerNavigator from './DrawerNavigator';
import NewItem from '../Inventory/NewItem';
import NewItemCategory from '../Inventory/NewItemCategory';
// import NewItem from '../Inventory/NewItem';
// import NewItemCategory from '../Inventory/NewItemCategory';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="NewItem" component={NewItem} />
      <Stack.Screen name="NewItemCategory" component={NewItemCategory} />
    </Stack.Navigator>
  );
}
