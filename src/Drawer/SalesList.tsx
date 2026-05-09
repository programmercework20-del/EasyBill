import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetRecentSalesQuery } from '../redux/api/dashboardApi';
import { Check, X } from 'lucide-react-native';

// Reusable Sales Components
import SalesHeader from '../components/sales/SalesHeader';
import SalesSummaryCard from '../components/sales/SalesSummaryCard';
import SaleTransactionCard from '../components/sales/SaleTransactionCard';
import DateFilterCard from '../components/sales/DateFilterCard';
import FloatingActionBar from '../components/sales/FloatingActionBar';
import DetailSkeleton from '../components/dashboard/detail/DetailSkeleton';
import DetailEmptyState from '../components/dashboard/detail/DetailEmptyState';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY = "#2563EB";

export default function SaleList() {
  const navigation = useNavigation<any>();

  // Filter states
  const [filterType, setFilterType] = useState('All Time');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const getQueryParams = useCallback(() => {
    const params: any = {};
    const today = new Date();

    if (filterType === 'Today') {
      const start = new Date(today.setHours(0, 0, 0, 0)).toISOString();
      const end = new Date(today.setHours(23, 59, 59, 999)).toISOString();
      params.startDate = start;
      params.endDate = end;
    } else if (filterType === 'Yesterday') {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const start = new Date(yesterday.setHours(0, 0, 0, 0)).toISOString();
      const end = new Date(yesterday.setHours(23, 59, 59, 999)).toISOString();
      params.startDate = start;
      params.endDate = end;
    } else if (filterType === 'This Month') {
      const start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
      params.startDate = start;
    } else if (filterType === 'Last Month') {
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString();
      const end = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999).toISOString();
      params.startDate = start;
      params.endDate = end;
    } else if (filterType === 'Custom' && fromDate && toDate) {
      params.startDate = fromDate;
      params.endDate = toDate;
    }
    return params;
  }, [filterType, fromDate, toDate]);

  // API Hooks
  const queryParams = useMemo(() => getQueryParams(), [getQueryParams]);
  const { data, isLoading, refetch } = useGetRecentSalesQuery(queryParams);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const filterOptions = ['All Time', 'Today', 'Yesterday', 'This Month', 'Last Month', 'Custom'];
  const salesData = useMemo(() => data?.data || [], [data]);

  const totalAmount = useMemo(() =>
    salesData.reduce((sum: number, sale: any) => sum + (Number(sale.total) || 0), 0)
    , [salesData]);

  const totalCount = salesData.length;

  const handleFilterSelect = (type: string) => {
    setFilterType(type);
    setShowFilterModal(false);
  };

  const renderItem = useCallback(({ item }: { item: any }) => (
    <SaleTransactionCard
      customerName={item.customer?.name}
      invoiceNumber={item.invoiceNumber || item.id?.split('-')[0]}
      date={item.createdAt}
      amount={item.total || 0}
      paymentMethod={item.payment_method || 'CASH'}
      onPress={() => navigation.navigate('SaleSummary', { saleId: item.id })}
      onReturn={() => console.log('Return Sale:', item.id)}
    />
  ), [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <SalesHeader
        title="Sales Transactions"
        subtitle="Manage and track all recent sales"
        onFilterPress={() => setShowFilterModal(true)}
      />

      <FlatList
        data={salesData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[PRIMARY]} />
        }
        ListHeaderComponent={
          <View className="mb-6">
            {/* Filter Pill Row */}
            <View className="mb-6">
              <TouchableOpacity
                onPress={() => setShowFilterModal(true)}
                activeOpacity={0.7}
                className="bg-slate-50 px-5 py-4 rounded-2xl flex-row items-center justify-between border border-slate-100"
              >
                <View>
                  <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">Time Period</Text>
                  <Text className="text-slate-900 font-bold text-base">{filterType}</Text>
                </View>
                <View className="w-8 h-8 rounded-full bg-white items-center justify-center border border-slate-100 shadow-sm">
                  <Check size={14} color={PRIMARY} />
                </View>
              </TouchableOpacity>

              {filterType === 'Custom' && (
                <View className="flex-row gap-x-3 mt-3">
                  <DateFilterCard
                    label="From"
                    value={fromDate ? new Date(fromDate).toLocaleDateString() : 'Start Date'}
                    onPress={() => console.log('Open from picker')}
                    isActive={!!fromDate}
                  />
                  <DateFilterCard
                    label="To"
                    value={toDate ? new Date(toDate).toLocaleDateString() : 'End Date'}
                    onPress={() => console.log('Open to picker')}
                    isActive={!!toDate}
                  />
                </View>
              )}
            </View>

            {/* Summary Row */}
            <View className="flex-row gap-x-4">
              <SalesSummaryCard
                label="Total Revenue"
                value={totalAmount.toLocaleString()}
                icon="amount"
                isLoading={isLoading}
                accentColor="#16A34A"
                trend="+8.2%"
              />
              <SalesSummaryCard
                label="Total Sales"
                value={totalCount}
                icon="count"
                isLoading={isLoading}
                accentColor="#2563EB"
              />
            </View>

            <View className="mt-8 mb-2">
              <Text className="text-slate-900 font-black text-xl tracking-tight">Recent Transactions</Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <DetailSkeleton />
          ) : (
            <DetailEmptyState
              title="No Sales Found"
              subtitle="Looks like you haven't made any sales in this period."
            />
          )
        }
      />

      <FloatingActionBar
        onVisualize={() => console.log('Visualize')}
        onNewSale={() => navigation.navigate('SelectParty')}
      />

      {/* Filter Modal Redesign */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View className="flex-1 bg-black/40 justify-end">
          <TouchableOpacity className="flex-1" onPress={() => setShowFilterModal(false)} />
          <View className="bg-white rounded-t-[40px] px-8 pt-8 pb-12 shadow-2xl">
            <View className="flex-row items-center justify-between mb-8">
              <View>
                <Text className="text-slate-900 text-2xl font-black">Filter by Time</Text>
                <Text className="text-slate-400 text-sm font-medium">Select a period to view sales</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowFilterModal(false)}
                className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center"
              >
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap gap-3">
              {filterOptions.map((option) => {
                const isActive = filterType === option;
                return (
                  <TouchableOpacity
                    key={option}
                    onPress={() => handleFilterSelect(option)}
                    activeOpacity={0.7}
                    className={`px-6 py-4 rounded-2xl border ${isActive ? 'bg-blue-600 border-blue-600' : 'bg-slate-50 border-slate-100'
                      }`}
                  >
                    <Text className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-600'}`}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}