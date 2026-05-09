import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TrendingUp, ChevronRight, Package } from 'lucide-react-native';
import BaseDetailCard from './BaseDetailCard';

interface TopProductCardProps {
  name: string;
  image?: string;
  category?: string;
  quantitySold: number | string;
  totalSales: number | string;
  accentColor: string;
  onPress?: () => void;
}

const TopProductCard: React.FC<TopProductCardProps> = ({
  name,
  image,
  category,
  quantitySold,
  totalSales,
  accentColor,
  onPress
}) => {
  const soldCount = parseInt(quantitySold.toString()) || 0;

  return (
    <BaseDetailCard onPress={onPress}>
      <View className="flex-1">
        <View className="flex-row items-center">
          {/* LEFT: Product Image */}
          <View className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 items-center justify-center">
            {image ? (
              <Image 
                source={{ uri: image }} 
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Package size={24} color="#94A3B8" />
            )}
          </View>

          {/* CENTER: Details */}
          <View className="ml-4 flex-1">
            <Text className="text-slate-900 font-bold text-lg leading-tight" numberOfLines={1}>
              {name || 'Unknown Product'}
            </Text>
            <Text className="text-slate-400 text-xs font-medium mt-0.5">
              {category || 'General'}
            </Text>
            
            <View className="flex-row items-center mt-2">
              <View className="bg-slate-100 px-2 py-0.5 rounded-md">
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  {soldCount} Sold
                </Text>
              </View>
            </View>
          </View>

          {/* RIGHT: Sales Info */}
          <View className="items-end ml-2">
            <Text className="text-slate-900 font-black text-lg">
              ₹{totalSales}
            </Text>
            <View className="flex-row items-center mt-1">
              <TrendingUp size={12} color="#16A34A" />
              <Text className="text-green-600 text-[11px] font-black ml-1 uppercase">Top</Text>
            </View>
          </View>
        </View>

        {/* BOTTOM: Progress Bar */}
        <View className="mt-4">
          <View className="flex-row justify-between mb-1.5">
            <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Market Share / Popularity</Text>
            <Text className="text-slate-600 text-[9px] font-bold">{Math.min(soldCount * 5, 100)}%</Text>
          </View>
          <View className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <View 
              className="h-full rounded-full" 
              style={{ 
                backgroundColor: accentColor, 
                width: `${Math.min(soldCount * 5, 100)}%` 
              }} 
            />
          </View>
        </View>
      </View>
    </BaseDetailCard>
  );
};

export default React.memo(TopProductCard);
