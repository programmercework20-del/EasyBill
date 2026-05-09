import React from 'react';
import { View, Text } from 'react-native';
import { Package, TrendingUp } from 'lucide-react-native';
import BaseDetailCard from './BaseDetailCard';

interface ProductCardProps {
  name: string;
  category?: string;
  soldCount: number;
  revenue: number | string;
  stock?: number;
  accentColor: string;
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  category,
  soldCount,
  revenue,
  stock,
  accentColor,
  onPress
}) => {
  return (
    <BaseDetailCard onPress={onPress}>
      {/* LEFT: Icon Container */}
      <View 
        className="w-14 h-14 rounded-2xl items-center justify-center"
        style={{ backgroundColor: `${accentColor}10` }}
      >
        <Package size={24} color={accentColor} strokeWidth={2.5} />
      </View>

      {/* CENTER: Details */}
      <View className="ml-4 flex-1">
        <Text className="text-slate-900 font-bold text-lg leading-tight" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-slate-400 text-xs font-medium mt-0.5">{category || 'General'}</Text>
        
        {stock !== undefined && (
          <Text className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-widest">
            Stock: <Text className="text-slate-600">{stock}</Text>
          </Text>
        )}

        {/* Progress Bar (Simulated Trend) */}
        <View className="w-24 h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
          <View 
            className="h-full rounded-full" 
            style={{ 
              backgroundColor: accentColor, 
              width: `${Math.min((soldCount / 100) * 100, 100)}%` 
            }} 
          />
        </View>
      </View>

      {/* RIGHT: Stats */}
      <View className="items-end ml-2">
        <Text className="text-slate-900 font-black text-lg">
          ₹{revenue}
        </Text>
        <View className="flex-row items-center mt-1">
          <TrendingUp size={12} color="#16A34A" />
          <Text className="text-green-600 text-[11px] font-black ml-1">
            {soldCount} SOLD
          </Text>
        </View>
      </View>
    </BaseDetailCard>
  );
};

export default ProductCard;
