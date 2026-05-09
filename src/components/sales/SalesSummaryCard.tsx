import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { TrendingUp, ShoppingBag } from 'lucide-react-native';

interface SalesSummaryCardProps {
  label: string;
  value: string | number;
  icon: 'amount' | 'count';
  isLoading?: boolean;
  accentColor: string;
  trend?: string;
}

const SalesSummaryCard: React.FC<SalesSummaryCardProps> = ({
  label,
  value,
  icon,
  isLoading,
  accentColor,
  trend
}) => {
  return (
    <View 
      className="flex-1 bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm"
      style={{
        shadowColor: accentColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2
      }}
    >
      <View className="flex-row items-center justify-between mb-4">
        <View 
          className="w-10 h-10 rounded-xl items-center justify-center"
          style={{ backgroundColor: `${accentColor}10` }}
        >
          {icon === 'amount' ? (
            <TrendingUp size={20} color={accentColor} />
          ) : (
            <ShoppingBag size={20} color={accentColor} />
          )}
        </View>
        {trend && (
          <View className="bg-green-50 px-2 py-1 rounded-lg">
            <Text className="text-green-600 text-[10px] font-black">{trend}</Text>
          </View>
        )}
      </View>

      <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
        {label}
      </Text>
      
      {isLoading ? (
        <ActivityIndicator size="small" color={accentColor} style={{ alignSelf: 'flex-start', marginTop: 8 }} />
      ) : (
        <Text className="text-slate-900 text-xl font-black mt-1">
          {icon === 'amount' ? `₹${value}` : value}
        </Text>
      )}
    </View>
  );
};

export default SalesSummaryCard;
