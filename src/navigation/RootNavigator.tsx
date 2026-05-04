import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import DrawerNavigator from './DrawerNavigator';
import NewItem from '../Inventory/NewItem';
import NewItemCategory from '../Inventory/NewItemCategory';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';

const Stack = createNativeStackNavigator();
export default function RootNavigator() {
  const { token, isLoading } = useSelector((state: any) => state.auth);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> 
        </>
      ) : (
        <>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          <Stack.Screen name="NewItem" component={NewItem} />
          <Stack.Screen name="NewItemCategory" component={NewItemCategory} />
        </>
      )}
    </Stack.Navigator>
  );
}