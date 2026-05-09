import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { FileText } from 'lucide-react-native';

import SplashScreen from '../screens/SplashScreen';
import DrawerNavigator from './DrawerNavigator';

import NewItem from '../Inventory/NewItem';
import NewItemCategory from '../Inventory/NewItemCategory';
import NewParty from '../screens/NewParty';
import NewPartyCategory from '../components/CommonForm';

import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';

// Reports
import SaleReport from '../Drawer/Reports/SaleReport';
import StaffWiseSaleReport from '../Drawer/Reports/StaffWiseSaleReport';
import SaleWiseProfitAndLossStatement from '../Drawer/Reports/SaleWiseProfitAndLossStatement';
import PurchaseReport from '../Drawer/Reports/PurchaseReport';
import MoneyInReport from '../Drawer/Reports/MoneyInReport';
import MoneyOutReport from '../Drawer/Reports/MoneyOutReport';
import ExpenseReport from '../Drawer/Reports/ExpenseReport';
import EstimateReport from '../Drawer/Reports/EstimateReport';

import SelectPartyScreen from '../screens/SelectPartyScreen';
import SelectItemsScreen from '../screens/SelectItemsScreen';
import NewSaleScreen from '../screens/NewSaleScreen';
import SaleDetailsScreen from '../screens/SaleDetailsScreen';
import SaleSummaryScreen from '../screens/SaleSummaryScreen';
import InvoicePDFScreen from '../screens/InvoicePDFScreen';
import ModifyItemStock from '../Inventory/ModifyItemStock';
import TodaySalesScreen from '../screens/TodaySalesScreen';
import OnlinePaymentScreen from '../screens/OnlinePaymentScreen';
import CustomersScreen from '../screens/CustomersScreen';
import * as DashboardStubs from '../screens/DashboardDetailStubs';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { token, isLoading } = useSelector((state: any) => state.auth);

  // 🔹 Loading state
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* 🔹 Auth Flow */}
      {!token && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      )}

      {/* 🔹 Main App Flow */}
      {token && (
        <>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          <Stack.Screen name="NewItem" component={NewItem} />
          <Stack.Screen name="NewItemCategory" component={NewItemCategory} />
          <Stack.Screen name="ModifyItemStock" component={ModifyItemStock} />
          <Stack.Screen name="NewParty" component={NewParty} />
          <Stack.Screen name="NewPartyCategory" component={NewPartyCategory} />

        </>
      )}

      {/* 🔹 Common Screens (ONLY ONCE) */}
      <Stack.Screen name="Splash" component={SplashScreen} />

      {/* 🔹 Reports */}
      <Stack.Screen
        name="SaleReport"
        component={SaleReport}
        options={{
          headerShown: true,
          title: '2.1 Sale Report',
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <FileText color="#1A73E8" size={24} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="StaffWiseSaleReport"
        component={StaffWiseSaleReport}
        options={{ headerShown: true, title: '2.2 Staff Wise Sale Report' }}
      />

      <Stack.Screen
        name="SaleWiseProfitAndLossStatement"
        component={SaleWiseProfitAndLossStatement}
        options={{ headerShown: true, title: '2.3 Sale Wise Profit And Loss Statement' }}
      />

      <Stack.Screen
        name="PurchaseReport"
        component={PurchaseReport}
        options={{ headerShown: true, title: '2.4 Purchase Report' }}
      />

      <Stack.Screen
        name="MoneyInReport"
        component={MoneyInReport}
        options={{ headerShown: true, title: '2.5 Money In Report' }}
      />

      <Stack.Screen
        name="MoneyOutReport"
        component={MoneyOutReport}
        options={{ headerShown: true, title: '2.6 Money Out Report' }}
      />

      <Stack.Screen
        name="ExpenseReport"
        component={ExpenseReport}
        options={{ headerShown: true, title: '2.7 Expense Report' }}
      />

      <Stack.Screen
        name="EstimateReport"
        component={EstimateReport}
        options={{ headerShown: true, title: '2.8 Estimate Report' }}
      />

      <Stack.Screen
        name="SelectParty"
        component={SelectPartyScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SelectItems"
        component={SelectItemsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NewSale"
        component={NewSaleScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SaleDetails"
        component={SaleDetailsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SaleSummary"
        component={SaleSummaryScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="InvoicePDF" component={InvoicePDFScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TodaySalesScreen" component={TodaySalesScreen} options={{ headerShown: true, title: 'Today Sales' }} />
      <Stack.Screen name="OnlinePaymentScreen" component={OnlinePaymentScreen} options={{ headerShown: true, title: 'Online Payments' }} />
      <Stack.Screen name="CustomersScreen" component={CustomersScreen} options={{ headerShown: true, title: 'Customers' }} />
      
      <Stack.Screen name="LoyalCustomersScreen" component={DashboardStubs.LoyalCustomersScreen} options={{ headerShown: true, title: 'Loyal Customers' }} />
      <Stack.Screen name="LowStockScreen" component={DashboardStubs.LowStockScreen} options={{ headerShown: true, title: 'Low Stock' }} />
      <Stack.Screen name="ReceivablePartiesScreen" component={DashboardStubs.ReceivablePartiesScreen} options={{ headerShown: true, title: 'Receivables' }} />
      <Stack.Screen name="PayablePartiesScreen" component={DashboardStubs.PayablePartiesScreen} options={{ headerShown: true, title: 'Payables' }} />
      <Stack.Screen name="MoneyInScreen" component={DashboardStubs.MoneyInScreen} options={{ headerShown: true, title: 'Money In' }} />
      <Stack.Screen name="MoneyOutScreen" component={DashboardStubs.MoneyOutScreen} options={{ headerShown: true, title: 'Money Out' }} />
      <Stack.Screen name="TopProductsScreen" component={DashboardStubs.TopProductsScreen} options={{ headerShown: true, title: 'Top Products' }} />
      <Stack.Screen name="InventorySummaryScreen" component={DashboardStubs.InventorySummaryScreen} options={{ headerShown: true, title: 'Inventory Summary' }} />

    </Stack.Navigator>
  );
}