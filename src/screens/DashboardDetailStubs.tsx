import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { 
  useGetLoyalCustomersQuery,
  useGetLowStockItemsQuery,
  useGetReceivablePartiesQuery,
  useGetPayablePartiesQuery,
  useGetMoneyInSummaryQuery,
  useGetMoneyOutSummaryQuery,
  useGetTopProductsQuery,
  useGetInventorySummaryQuery
} from '../redux/api/dashboardApi';

// Reusable Detail Components
import DetailScreenWrapper from '../components/dashboard/detail/DetailScreenWrapper';
import CustomerCard from '../components/dashboard/detail/CustomerCard';
import ProductCard from '../components/dashboard/detail/ProductCard';
import StockCard from '../components/dashboard/detail/StockCard';
import BaseDetailCard from '../components/dashboard/detail/BaseDetailCard';
import DetailSkeleton from '../components/dashboard/detail/DetailSkeleton';
import DetailEmptyState from '../components/dashboard/detail/DetailEmptyState';
import LoyalCustomerCard from '../components/dashboard/detail/LoyalCustomerCard';
import TopProductCard from '../components/dashboard/detail/TopProductCard';
import TransactionCard from '../components/dashboard/detail/TransactionCard';

import { Wallet, TrendingUp, Package } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

// --- SCREENS ---

export const LoyalCustomersScreen = () => {
  const [search, setSearch] = useState('');
  const { data, isLoading, refetch } = useGetLoyalCustomersQuery(undefined);
  const customers = (data?.data || []).filter((item: any) => {
    const nameMatch = (item.customer?.name || '').toLowerCase().includes(search.toLowerCase());
    const phoneMatch = (item.customer?.phone || '').toLowerCase().includes(search.toLowerCase());
    return nameMatch || phoneMatch;
  });

  return (
    <DetailScreenWrapper
      title="Loyal Customers"
      subtitle="Top 20 high-value customers"
      count={customers.length}
      accentColor="#7C3AED" // Purple
      data={customers}
      isLoading={isLoading}
      onRefresh={refetch}
      searchQuery={search}
      setSearchQuery={setSearch}
      skeleton={<DetailSkeleton />}
      emptyState={
        <DetailEmptyState 
          title="No Loyal Customers" 
          subtitle="Customer activity will appear here once they complete multiple orders." 
        />
      }
      renderItem={({ item }) => (
        <LoyalCustomerCard
          name={item.customer?.name}
          phone={item.customer?.phone}
          billingType={item.customer?.billing_type}
          loyalSince={item.loyalSince}
          totalPurchases={item.totalPurchases || 0}
          totalSpent={item.totalSpent || 0}
          balance={item.customer?.balance}
          accentColor="#7C3AED"
        />
      )}
    />
  );
};

export const LowStockScreen = () => {
  const [search, setSearch] = useState('');
  const { data, isLoading, refetch } = useGetLowStockItemsQuery(undefined);
  const items = (data?.data || []).filter((i: any) => 
    (i.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DetailScreenWrapper
      title="Low Stock"
      subtitle="Inventory requiring attention"
      count={items.length}
      accentColor="#DC2626" // Red
      data={items}
      isLoading={isLoading}
      onRefresh={refetch}
      searchQuery={search}
      setSearchQuery={setSearch}
      skeleton={<DetailSkeleton />}
      emptyState={
        <DetailEmptyState 
          title="Stock is healthy" 
          subtitle="All items are currently above the minimum threshold." 
        />
      }
      renderItem={({ item }) => (
        <StockCard
          name={item.name}
          stock={item.currentStock || 0}
          lowStockLimit={item.lowStockLimit}
          image={item.images?.[0]}
          price={item.sellPrice}
          sku={item.id?.split('-')[0].toUpperCase()}
          onRestock={() => console.log('Restock:', item.name)}
        />
      )}
    />
  );
};

export const TopProductsScreen = () => {
  const [search, setSearch] = useState('');
  const { data, isLoading, refetch } = useGetTopProductsQuery(undefined);
  const products = (data?.data || []).filter((item: any) => 
    (item.product?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DetailScreenWrapper
      title="Top Products"
      subtitle="Best selling items by volume"
      count={products.length}
      accentColor="#EAB308" // Yellow/Gold
      data={products}
      isLoading={isLoading}
      onRefresh={refetch}
      searchQuery={search}
      setSearchQuery={setSearch}
      skeleton={<DetailSkeleton />}
      emptyState={
        <DetailEmptyState 
          title="No Product Sales Yet" 
          subtitle="Best selling products will appear here once transactions are recorded." 
        />
      }
      renderItem={({ item }) => (
        <TopProductCard
          name={item.product?.name}
          image={item.product?.images?.[0]}
          category={item.product?.category}
          quantitySold={item.quantitySold || 0}
          totalSales={item.totalSales || 0}
          accentColor="#EAB308"
        />
      )}
    />
  );
};

export const ReceivablePartiesScreen = () => {
  const [search, setSearch] = useState('');
  const { data, isLoading, refetch } = useGetReceivablePartiesQuery(undefined);
  const parties = (data?.data || []).filter((p: any) => 
    (p.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DetailScreenWrapper
      title="Receivables"
      subtitle="Pending collections from parties"
      count={parties.length}
      accentColor="#0891B2" // Cyan
      data={parties}
      isLoading={isLoading}
      onRefresh={refetch}
      searchQuery={search}
      setSearchQuery={setSearch}
      skeleton={<DetailSkeleton />}
      renderItem={({ item }) => (
        <CustomerCard
          name={item.name}
          phone={item.phone}
          ordersCount={item.lastTransactionDate ? 1 : 0}
          totalSpent={item.balance || 0}
          accentColor="#0891B2"
        />
      )}
    />
  );
};

export const PayablePartiesScreen = () => {
  const [search, setSearch] = useState('');
  const { data, isLoading, refetch } = useGetPayablePartiesQuery(undefined);
  const parties = (data?.data || []).filter((p: any) => 
    (p.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DetailScreenWrapper
      title="Payables"
      subtitle="Pending payments to vendors"
      count={parties.length}
      accentColor="#4F46E5" // Indigo
      data={parties}
      isLoading={isLoading}
      onRefresh={refetch}
      searchQuery={search}
      setSearchQuery={setSearch}
      skeleton={<DetailSkeleton />}
      renderItem={({ item }) => (
        <CustomerCard
          name={item.name}
          phone={item.phone}
          ordersCount={0}
          totalSpent={item.balance || 0}
          accentColor="#4F46E5"
        />
      )}
    />
  );
};

export const MoneyInScreen = () => {
  const [search, setSearch] = useState('');
  const { data, isLoading, refetch } = useGetMoneyInSummaryQuery(undefined);
  const breakdown = (data?.data?.breakdown || []).filter((b: any) => 
    (b.method || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DetailScreenWrapper
      title="Money In"
      subtitle="Income by payment method"
      count={breakdown.length}
      accentColor="#16A34A" // Green
      data={breakdown}
      isLoading={isLoading}
      onRefresh={refetch}
      searchQuery={search}
      setSearchQuery={setSearch}
      renderItem={({ item }) => (
        <BaseDetailCard>
          <View className="w-14 h-14 rounded-2xl bg-green-50 items-center justify-center">
            <TrendingUp color="#16A34A" size={24} />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-slate-900 font-bold text-lg">{item.method || 'Payment'}</Text>
            <Text className="text-slate-400 text-xs font-medium">{item.count || 0} Transactions</Text>
          </View>
          <Text className="text-green-600 font-black text-lg">₹{item.amount || 0}</Text>
        </BaseDetailCard>
      )}
    />
  );
};

export const MoneyOutScreen = () => {
  const [search, setSearch] = useState('');
  const { data, isLoading, refetch } = useGetMoneyOutSummaryQuery(undefined);
  const breakdown = (data?.data?.breakdown || []).filter((b: any) => 
    (b.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DetailScreenWrapper
      title="Money Out"
      subtitle="Expenses by category"
      count={breakdown.length}
      accentColor="#EA580C" // Orange
      data={breakdown}
      isLoading={isLoading}
      onRefresh={refetch}
      searchQuery={search}
      setSearchQuery={setSearch}
      renderItem={({ item }) => (
        <BaseDetailCard>
          <View className="w-14 h-14 rounded-2xl bg-orange-50 items-center justify-center">
            <TrendingUp color="#EA580C" size={24} />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-slate-900 font-bold text-lg">{item.category || 'Expense'}</Text>
            <Text className="text-slate-400 text-xs font-medium">{item.count || 0} Payments</Text>
          </View>
          <Text className="text-orange-600 font-black text-lg">₹{item.amount || 0}</Text>
        </BaseDetailCard>
      )}
    />
  );
};

export const InventorySummaryScreen = () => {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const { data, isLoading, refetch } = useGetInventorySummaryQuery(undefined);
  const categories = (data?.data?.categories || []).filter((c: any) => 
    (c.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DetailScreenWrapper
      title="Inventory Summary"
      subtitle="Stock valuation by category"
      count={categories.length}
      accentColor="#0D9488" // Teal
      data={categories}
      isLoading={isLoading}
      onRefresh={refetch}
      searchQuery={search}
      setSearchQuery={setSearch}
      renderItem={({ item }) => (
        <BaseDetailCard onPress={() => navigation.navigate('MainTabs', { screen: 'Inventory' })}>
          <View className="w-14 h-14 rounded-2xl bg-teal-50 items-center justify-center">
            <Package color="#0D9488" size={24} />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-slate-900 font-bold text-lg">{item.name}</Text>
            <Text className="text-slate-400 text-xs font-medium">{item.totalItems || 0} Items</Text>
          </View>
          <Text className="text-teal-600 font-black text-lg">₹{item.value || 0}</Text>
        </BaseDetailCard>
      )}
    />
  );
};
