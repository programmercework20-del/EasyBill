import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetPartiesQuery } from '../redux/api/partyApi';
import { useGetMoneyInSummaryQuery, useGetMoneyOutSummaryQuery } from '../redux/api/dashboardApi';
import { Plus, Users, Search, Phone, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

// Reusable Components
import SalesHeader from '../components/sales/SalesHeader';
import SalesSummaryCard from '../components/sales/SalesSummaryCard';
import BaseDetailCard from '../components/dashboard/detail/BaseDetailCard';
import SearchBar from '../components/ui/SearchBar';
import DetailSkeleton from '../components/dashboard/detail/DetailSkeleton';
import DetailEmptyState from '../components/dashboard/detail/DetailEmptyState';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY = "#2563EB";

const PartyCard = React.memo(({ item, accentColor, onPress }: any) => {
  const initial = (item.name || '?').charAt(0).toUpperCase();
  const balance = Number(item.balance) || 0;
  const isReceivable = balance >= 0;
  const statusColor = isReceivable ? '#16A34A' : '#DC2626';

  return (
    <BaseDetailCard onPress={onPress}>
      <View className="flex-1 flex-row items-center">
        {/* LEFT: Avatar */}
        <View className="w-14 h-14 rounded-full bg-slate-50 items-center justify-center">
          <Text className="text-slate-400 text-xl font-black">{initial}</Text>
        </View>

        {/* CENTER: Details */}
        <View className="ml-4 flex-1">
          <Text className="text-slate-900 font-bold text-lg" numberOfLines={1}>
            {item.name || 'Unknown Party'}
          </Text>
          <View className="flex-row items-center mt-1">
            <Phone size={10} color="#94A3B8" />
            <Text className="text-slate-400 text-[11px] font-medium ml-1">{item.phone || 'No phone'}</Text>
            <View className="mx-2 w-1 h-1 rounded-full bg-slate-300" />
            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{item.type || 'Customer'}</Text>
          </View>
        </View>

        {/* RIGHT: Balance */}
        <View className="items-end ml-2">
          <Text className="font-black text-base" style={{ color: statusColor }}>
            ₹{Math.abs(balance).toLocaleString()}
          </Text>
          <View className="flex-row items-center mt-1">
            {isReceivable ? (
              <ArrowDownLeft size={10} color="#16A34A" />
            ) : (
              <ArrowUpRight size={10} color="#DC2626" />
            )}
            <Text className="text-[10px] font-black ml-1 uppercase" style={{ color: statusColor }}>
              {isReceivable ? 'Receivable' : 'Payable'}
            </Text>
          </View>
        </View>
      </View>
    </BaseDetailCard>
  );
});

export default function PartyScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // API Hooks
  const { data: partiesData, isLoading, refetch } = useGetPartiesQuery(undefined);
  const { data: moneyInData } = useGetMoneyInSummaryQuery(undefined);
  const { data: moneyOutData } = useGetMoneyOutSummaryQuery(undefined);

  const parties = useMemo(() => {
    return (partiesData?.data || []).filter((p: any) =>
      (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.phone || '').toLowerCase().includes(search.toLowerCase())
    );
  }, [partiesData, search]);

  const onRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const renderItem = useCallback(({ item }: any) => (
    <PartyCard
      item={item}
      accentColor={PRIMARY}
      onPress={() => console.log('Party Profile:', item.id)}
    />
  ), []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <SalesHeader
        title="Parties"
        subtitle="Manage your customers & suppliers"
        onFilterPress={() => setIsSearchVisible(!isSearchVisible)}
      />

      <View className="px-6 pb-4">
        <SearchBar
          isVisible={isSearchVisible || search.length > 0}
          value={search}
          onChangeText={setSearch}
          onCancel={() => {
            setSearch('');
            setIsSearchVisible(false);
          }}
          placeholder="Search by name or phone..."
        />
      </View>

      <FlatList
        data={parties}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={[PRIMARY]} />
        }
        ListHeaderComponent={
          <View className="mb-6">
            {/* Summary Row */}
            <View className="flex-row gap-x-4 mb-8">
              <SalesSummaryCard
                label="To Receive"
                value={moneyInData?.data?.total || 0}
                icon="count"
                accentColor="#16A34A"
              />
              <SalesSummaryCard
                label="To Pay"
                value={moneyOutData?.data?.total || 0}
                icon="count"
                accentColor="#DC2626"
              />
            </View>

            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-slate-900 font-black text-xl tracking-tight">All Parties</Text>
              <View className="bg-blue-50 px-3 py-1 rounded-full">
                <Text className="text-blue-600 text-[10px] font-black uppercase">{parties.length} Total</Text>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <DetailSkeleton />
          ) : (
            <DetailEmptyState
              title="No Parties Found"
              subtitle="Add your first customer or supplier to start tracking balances."
            />
          )
        }
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('NewParty')}
        className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-blue-600 items-center justify-center shadow-xl shadow-blue-300"
      >
        <Plus size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
