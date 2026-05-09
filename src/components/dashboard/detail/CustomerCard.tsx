import React from 'react';
import { View, Text } from 'react-native';
import { ChevronRight, Star } from 'lucide-react-native';
import BaseDetailCard from './BaseDetailCard';

interface CustomerCardProps {
  name: string;
  phone?: string;
  email?: string;
  ordersCount: number;
  totalSpent: number | string;
  accentColor: string;
  onPress?: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  name,
  phone,
  ordersCount,
  totalSpent,
  accentColor,
  onPress
}) => {
  const initial = (name || '?').charAt(0).toUpperCase();

  return (
    <BaseDetailCard onPress={onPress}>
      {/* LEFT: Gradient Avatar */}
      <View 
        className="w-14 h-14 rounded-full items-center justify-center relative"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <Text className="text-lg font-black" style={{ color: accentColor }}>{initial}</Text>
        <View className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
          <View className="p-1 rounded-full bg-yellow-400">
            <Star size={10} color="white" fill="white" />
          </View>
        </View>
      </View>

      {/* CENTER: Details */}
      <View className="ml-4 flex-1">
        <Text className="text-slate-900 font-bold text-lg leading-tight" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-slate-400 text-xs font-medium mt-0.5">{phone || 'No phone'}</Text>
        
        <View className="flex-row items-center mt-2">
          <View className="bg-slate-100 px-2 py-0.5 rounded-md">
            <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              {ordersCount} Orders
            </Text>
          </View>
        </View>
      </View>

      {/* RIGHT: Values */}
      <View className="items-end ml-2">
        <Text className="font-black text-lg" style={{ color: accentColor }}>
          ₹{totalSpent}
        </Text>
        <ChevronRight size={16} color="#CBD5E1" style={{ marginTop: 4 }} />
      </View>
    </BaseDetailCard>
  );
};

export default CustomerCard;
