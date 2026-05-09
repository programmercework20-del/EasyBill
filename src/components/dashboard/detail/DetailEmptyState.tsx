import React from 'react';
import { View, Text } from 'react-native';
import { Search } from 'lucide-react-native';

interface DetailEmptyStateProps {
  title: string;
  subtitle: string;
}

const DetailEmptyState: React.FC<DetailEmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View className="items-center justify-center p-10">
      <View className="w-24 h-24 bg-slate-100 rounded-full items-center justify-center mb-6">
        <Search size={40} color="#94A3B8" strokeWidth={1.5} />
      </View>
      <Text className="text-slate-900 text-xl font-black text-center">
        {title}
      </Text>
      <Text className="text-slate-400 text-sm font-medium text-center mt-2 leading-relaxed">
        {subtitle}
      </Text>
    </View>
  );
};

export default DetailEmptyState;
