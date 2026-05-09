import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  TextInput, 
  ActivityIndicator, 
  RefreshControl 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface DashboardDetailLayoutProps {
  title: string;
  data: any[];
  isLoading: boolean;
  onRefresh: () => void;
  renderItem: ({ item, index }: { item: any, index: number }) => React.ReactElement;
  searchKey?: string;
  placeholder?: string;
}

const DashboardDetailLayout: React.FC<DashboardDetailLayoutProps> = ({
  title,
  data,
  isLoading,
  onRefresh,
  renderItem,
  searchKey = 'name',
  placeholder = 'Search...'
}) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const filteredData = data?.filter(item => {
    const val = item[searchKey] || '';
    return val.toString().toLowerCase().includes(searchQuery.toLowerCase());
  }) || [];

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
      {/* Header */}
      <View className="bg-white px-5 py-4 flex-row items-center justify-between border-b border-slate-100">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="mr-4 p-2 rounded-xl bg-slate-50"
          >
            <ArrowLeft size={20} color="#1E293B" />
          </TouchableOpacity>
          <Text className="text-xl font-black text-slate-800">{title}</Text>
        </View>
        <View className="bg-blue-50 px-3 py-1 rounded-full">
          <Text className="text-blue-600 font-bold text-xs">{filteredData.length}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-5 py-3">
        <View className="flex-row items-center bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <Search size={18} color="#94A3B8" />
          <TextInput
            placeholder={placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-slate-700 font-medium"
            placeholderTextColor="#94A3B8"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#1A73E8" />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#1A73E8']} />
          }
          ListEmptyComponent={
            <View className="py-20 items-center justify-center">
              <Text className="text-slate-400 font-medium">No records found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default DashboardDetailLayout;
