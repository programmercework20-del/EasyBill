import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { Home, Package, Users, Settings, ArrowLeft, ShoppingBag, FileText } from 'lucide-react-native';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import CustomDrawerContent from '../components/CustomDrawer';
import SaleList from '../Drawer/SalesList';
import ReportsList from '../Drawer/ReportsList';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { 
          backgroundColor: '#1A73E8',
          width: 280
        },
        drawerActiveTintColor: '#ffffff',
        drawerInactiveTintColor: '#e0e7ff',
        drawerActiveBackgroundColor: 'rgba(255,255,255,0.2)',
        drawerInactiveBackgroundColor: 'transparent',
        drawerItemStyle: {
          borderRadius: 8,
          marginHorizontal: 12,
          marginVertical: 4,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        }
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ 
          title: 'Dashboard',
          drawerIcon: ({ color, size }) => <Home color={color} size={size} />
        }}
      />
      <Drawer.Screen
        name="SaleList"
        component={SaleList}
        options={({ navigation }) => ({ 
          headerShown: true,
          title: 'Sale List',
          drawerIcon: ({ color, size }) => <ShoppingBag color={color} size={size} />,
          headerStyle: {
            backgroundColor: '#1A73E8',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 20,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('MainTabs')}
              style={{ marginLeft: 16 }}
            >
              <ArrowLeft color="#fff" size={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="ReportsList"
        component={ReportsList}
        options={({ navigation }) => ({ 
          headerShown: true,
          title: 'Reports',
          drawerIcon: ({ color, size }) => <FileText color={color} size={size} />,
          headerStyle: {
            backgroundColor: '#7C3AED',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 20,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('MainTabs')}
              style={{ marginLeft: 16 }}
            >
              <ArrowLeft color="#fff" size={24} />
            </TouchableOpacity>
          ),
        })}
      />
      
            
    </Drawer.Navigator>
  );
}
