import React from 'react';
import { View, Text, FlatList, RefreshControl, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../ui/SearchBar';
import DetailHeader from './DetailHeader';

interface DetailScreenWrapperProps {
  title: string;
  subtitle?: string;
  count?: number;
  accentColor: string;
  data: any[];
  isLoading: boolean;
  onRefresh: () => void;
  renderItem: ({ item, index }: { item: any, index: number }) => React.ReactElement;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  placeholder?: string;
  skeleton?: React.ReactNode;
  emptyState?: React.ReactNode;
}

const DetailScreenWrapper: React.FC<DetailScreenWrapperProps> = ({
  title,
  subtitle,
  count,
  accentColor,
  data,
  isLoading,
  onRefresh,
  renderItem,
  searchQuery,
  setSearchQuery,
  placeholder = "Search...",
  skeleton,
  emptyState
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Premium Header */}
      <DetailHeader 
        title={title} 
        subtitle={subtitle} 
        count={count} 
        accentColor={accentColor} 
      />

      {/* Sticky Search Bar Container */}
      <View className="bg-white pb-4 px-2">
        <SearchBar 
          isVisible={true}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onCancel={() => setSearchQuery('')}
          placeholder={placeholder}
        />
      </View>

      {/* Content */}
      <View className="flex-1 bg-slate-50/50">
        {isLoading ? (
          <View className="p-6">
            {skeleton || <Text className="text-center text-slate-400">Loading...</Text>}
          </View>
        ) : (
          <Animated.FlatList
            style={{ opacity: fadeAnim }}
            data={data}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={handleRefresh} 
                colors={[accentColor]} 
              />
            }
            ListEmptyComponent={
              <View className="flex-1 mt-20">
                {emptyState || <Text className="text-center text-slate-400">No records found</Text>}
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DetailScreenWrapper;
