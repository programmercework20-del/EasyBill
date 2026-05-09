import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  RefreshControl, 
  ActivityIndicator, 
  FlatList,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';

// API Hooks
import { 
  useGetDashboardSummaryQuery, 
  useGetRecentSalesQuery,
} from '../redux/api/dashboardApi';
import { useDashboardQuickActions } from '../hooks/useDashboardQuickActions';

// Dashboard Components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import QuickActionCard from '../components/dashboard/QuickActionCard';
import QuickActionSkeleton from '../components/dashboard/QuickActionSkeleton';
import RecentSaleCard from '../components/dashboard/RecentSaleCard';
import SummaryFooter from '../components/dashboard/SummaryFooter';

const PRIMARY = "#1A73E8";

export default function DashboardScreen({ navigation }: any) {
  // API Queries for main dashboard flow
  const { 
    data: summaryRes, 
    refetch: refetchSummary, 
    isLoading: isSummaryLoading 
  } = useGetDashboardSummaryQuery(undefined);

  const { 
    data: recentSalesRes, 
    refetch: refetchSales, 
    isLoading: isSalesLoading 
  } = useGetRecentSalesQuery(undefined);

  // Dynamic Quick Actions
  const { actions, isLoading: isActionsLoading } = useDashboardQuickActions();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      refetchSummary(), 
      refetchSales()
    ]);
    setRefreshing(false);
  }, [refetchSummary, refetchSales]);

  // Extract Data
  const summaryData = summaryRes?.data || {};
  const recentSales = useMemo(() => recentSalesRes?.data || [], [recentSalesRes]);

  const renderHeader = () => (
    <View className="bg-[#F8FAFC]">
      {/* Dynamic Quick Actions Scroll */}
      <View className="py-4">
        {isActionsLoading ? (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {[1, 2, 3, 4].map((i) => <QuickActionSkeleton key={i} />)}
          </ScrollView>
        ) : (
          <FlatList
            data={actions}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <QuickActionCard
                title={item.title}
                value={item.value}
                subtitle={item.subtitle}
                iconName={item.icon}
                color={item.color}
                bgColor={item.bgColor}
                onPress={() => navigation.navigate(item.screen)}
              />
            )}
          />
        )}
      </View>

      {/* Recent Sales Header */}
      <DashboardHeader onFilterPress={() => navigation.navigate('SaleList')} />
      
      {isSalesLoading && recentSales.length === 0 && (
        <View className="py-20 items-center justify-center">
          <ActivityIndicator size="large" color={PRIMARY} />
        </View>
      )}

      {recentSales.length === 0 && !isSalesLoading && (
        <View className="mx-5 py-10 items-center justify-center border-2 border-dashed border-slate-200 rounded-[32px] bg-white mb-6">
          <Text className="text-slate-400 font-medium">No recent sales found</Text>
        </View>
      )}
    </View>
  );

  const renderFooter = () => (
    <SummaryFooter 
      totalSales={summaryData.totalSalesAmount || 0}
      totalTransactions={summaryData.totalSalesCount || 0}
      totalMoneyIn={summaryData.totalAmountReceived || 0}
    />
  );

  const renderItem = useCallback(({ item, index }: { item: any, index: number }) => (
    <RecentSaleCard 
      sale={item} 
      index={index}
      onPress={() => navigation.navigate('SaleSummary', { saleId: item.id })} 
    />
  ), [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY} />
      
      <FlatList
        data={recentSales}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[PRIMARY]} />
        }
      />

      {/* FLOATING BOTTOM BUTTON */}
      <View 
        className="absolute bottom-8 left-0 right-0 px-8 bg-transparent"
        style={{ pointerEvents: 'box-none' }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('SelectParty')}
          className="bg-blue-600 rounded-[24px] py-5 items-center flex-row justify-center shadow-2xl border border-blue-500"
          style={{ 
            shadowColor: '#1A73E8', 
            shadowOffset: { width: 0, height: 15 }, 
            shadowOpacity: 0.4, 
            shadowRadius: 20, 
            elevation: 15,
          }}
        >
          <View className="bg-white/20 p-1.5 rounded-lg mr-3">
            <Plus color="#fff" size={24} strokeWidth={3} />
          </View>
          <Text className="text-white font-black text-lg tracking-[2px] uppercase">
            New Invoice
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}