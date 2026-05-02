import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Package, Users, Settings, Menu } from 'lucide-react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import DashboardScreen from '../screens/DashboardScreen';

import PartyScreen from '../screens/PartyScreen';
import SettingsScreen from '../screens/SettingsScreen';
import InventoryList from '../Inventory/InventoryList';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1A73E8', // slate-900 (You can change to your desired color)
          borderBottomWidth: 1,
          borderBottomColor: '#1e293b', // slate-800
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 20,
        },
        headerShadowVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ marginLeft: 16 }}
          >
            <Menu color="#fff" size={26} />
          </TouchableOpacity>
        ),
        tabBarStyle: {
          backgroundColor: '#1A73E8', // Bottom bar color
          borderTopWidth: 2,
          borderTopColor: '#fff',
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#A5B4FC',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          headerTitle: "Dashboard",
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryList}
        options={{
          tabBarIcon: ({ color, size }) => <Package color={color} size={size} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Parties"
        component={PartyScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
          headerTitle: "Parties",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
          headerTitle: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}