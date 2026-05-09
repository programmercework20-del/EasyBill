import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface SalesHeaderProps {
  title: string;
  subtitle?: string;
  onFilterPress?: () => void;
}

const SalesHeader: React.FC<SalesHeaderProps> = ({
  title,
  subtitle,
  onFilterPress
}) => {
  const navigation = useNavigation();

  return (
    <View className="px-6 pb-4 bg-white">
      {/* <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-12 h-12 rounded-2xl items-center justify-center border border-slate-100 bg-white shadow-sm"
        >
          <ArrowLeft size={20} color="#1E293B" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={onFilterPress}
          className="w-12 h-12 rounded-2xl items-center justify-center border border-slate-100 bg-white shadow-sm"
        >
          <SlidersHorizontal size={20} color="#1E293B" />
        </TouchableOpacity>
      </View> */}

      <View>
        <Text className="text-slate-900 text-3xl font-black tracking-tight">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-slate-400 text-sm font-medium mt-1">
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

export default SalesHeader;
