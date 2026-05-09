import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ShoppingBag, Filter } from 'lucide-react-native';

interface DashboardHeaderProps {
  onFilterPress?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onFilterPress }) => {
  return (
    <View className="px-5 mt-6 mb-4">
      <View 
        className="bg-blue-600 rounded-3xl p-6 flex-row justify-between items-center shadow-md border border-blue-500"
        style={{
          shadowColor: '#1A73E8',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.2,
          shadowRadius: 15,
          elevation: 8
        }}
      >
        <View className="flex-row items-center flex-1">
          <View className="bg-white/20 p-3 rounded-2xl mr-4">
            <ShoppingBag color="#fff" size={28} />
          </View>
          <View>
            <Text className="text-white font-black text-lg tracking-tight uppercase">
              Recent Sale Transactions
            </Text>
            <Text className="text-white/80 text-xs font-medium">
              All your recent sales in one place
            </Text>
          </View>
        </View>
        
        {/* <TouchableOpacity 
          onPress={onFilterPress}
          activeOpacity={0.7}
          className="bg-white/20 p-2.5 rounded-xl"
        >
          <Filter color="#fff" size={20} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default DashboardHeader;
