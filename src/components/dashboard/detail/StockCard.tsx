import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AlertTriangle, PlusCircle, Package } from 'lucide-react-native';
import BaseDetailCard from './BaseDetailCard';

interface StockCardProps {
  name: string;
  stock: number;
  lowStockLimit?: number;
  sku?: string;
  image?: string;
  price?: number | string;
  onRestock?: () => void;
}

const StockCard: React.FC<StockCardProps> = ({
  name,
  stock,
  lowStockLimit = 5,
  sku,
  image,
  price,
  onRestock
}) => {
  const isCritical = stock <= lowStockLimit;
  const accentColor = isCritical ? '#DC2626' : '#EA580C';

  return (
    <BaseDetailCard>
      {/* LEFT: Product Image or Warning Icon */}
      <View className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 items-center justify-center relative">
        {image ? (
          <Image 
            source={{ uri: image }} 
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View 
            className="w-full h-full items-center justify-center"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <Package size={24} color={accentColor} strokeWidth={2.5} />
          </View>
        )}
        
        {/* Critical Badge Overlay */}
        <View className="absolute top-0 right-0 p-1">
          <View className="bg-white rounded-full p-0.5 shadow-sm">
            <AlertTriangle size={12} color={accentColor} />
          </View>
        </View>
      </View>

      {/* CENTER: Details */}
      <View className="ml-4 flex-1">
        <Text className="text-slate-900 font-bold text-lg leading-tight" numberOfLines={1}>
          {name || 'Unknown Item'}
        </Text>
        <View className="flex-row items-center mt-0.5">
          <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{sku || 'No SKU'}</Text>
          {price && (
            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest ml-2 border-l border-slate-200 pl-2">
              ₹{price}
            </Text>
          )}
        </View>
        
        <View className="flex-row items-center mt-2">
          <View 
            className="px-2.5 py-1 rounded-lg"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <Text 
              className="text-[11px] font-black uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Current Stock: {stock}
            </Text>
          </View>
        </View>
      </View>

      {/* RIGHT: Action */}
      <TouchableOpacity 
        onPress={onRestock}
        activeOpacity={0.7}
        className="bg-slate-900 w-10 h-10 rounded-2xl items-center justify-center shadow-sm"
      >
        <PlusCircle size={20} color="white" />
      </TouchableOpacity>
    </BaseDetailCard>
  );
};

export default React.memo(StockCard);
