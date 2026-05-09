import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface ProductHorizontalCardProps {
  image?: string;
  name: string;
  price?: number | string;
  stock?: number;
  badgeText?: string;
  badgeTheme?: 'red' | 'blue' | 'green' | 'gray' | 'orange';
  onPress?: () => void;
}

export default function ProductHorizontalCard({ 
  image, 
  name, 
  price, 
  stock, 
  badgeText, 
  badgeTheme = 'gray', 
  onPress 
}: ProductHorizontalCardProps) {
  
  const getBadgeColors = () => {
    switch(badgeTheme) {
      case 'red': return 'bg-red-100 text-red-700';
      case 'orange': return 'bg-orange-100 text-orange-700';
      case 'blue': return 'bg-blue-100 text-blue-700';
      case 'green': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={onPress}
      className="bg-white border border-slate-200 rounded-2xl p-3 mr-4 flex-row items-center w-72 shadow-sm"
    >
      {image ? (
        <Image source={{ uri: image }} className="w-16 h-16 rounded-xl bg-slate-100" />
      ) : (
        <View className="w-16 h-16 rounded-xl bg-slate-100 items-center justify-center">
          <Text className="text-2xl">📦</Text>
        </View>
      )}
      
      <View className="ml-3 flex-1 justify-center">
        <Text className="text-slate-800 font-bold text-base mb-1" numberOfLines={1}>{name}</Text>
        
        {price !== undefined && (
          <Text className="text-slate-500 font-medium text-sm">₹{price}</Text>
        )}
        
        {stock !== undefined && (
          <Text className="text-slate-400 text-xs mt-0.5">Stock: {stock}</Text>
        )}
      </View>
      
      {badgeText && (
        <View className={`px-2 py-1 rounded-md absolute top-3 right-3 ${getBadgeColors().split(' ')[0]}`}>
          <Text className={`text-[10px] font-bold ${getBadgeColors().split(' ')[1]}`}>{badgeText}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
