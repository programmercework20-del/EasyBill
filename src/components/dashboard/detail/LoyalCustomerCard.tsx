import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight, Star, Phone, Calendar, Wallet } from 'lucide-react-native';
import BaseDetailCard from './BaseDetailCard';

interface LoyalCustomerCardProps {
  name: string;
  phone?: string;
  billingType?: string;
  loyalSince?: string;
  totalPurchases: number;
  totalSpent: number | string;
  balance?: number | string;
  accentColor: string;
  onPress?: () => void;
}

const LoyalCustomerCard: React.FC<LoyalCustomerCardProps> = ({
  name,
  phone,
  billingType,
  loyalSince,
  totalPurchases,
  totalSpent,
  balance,
  accentColor,
  onPress
}) => {
  const initial = (name || '?').charAt(0).toUpperCase();
  const formattedDate = loyalSince ? new Date(loyalSince).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : 'N/A';

  return (
    <BaseDetailCard onPress={onPress}>
      <View className="flex-1">
        <View className="flex-row items-center">
          {/* LEFT: Gradient Avatar */}
          <View 
            className="w-16 h-16 rounded-full items-center justify-center relative"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <Text className="text-xl font-black" style={{ color: accentColor }}>{initial}</Text>
            <View className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
              <View className="p-1 rounded-full bg-yellow-400">
                <Star size={12} color="white" fill="white" />
              </View>
            </View>
          </View>

          {/* CENTER: Details */}
          <View className="ml-4 flex-1">
            <Text className="text-slate-900 font-bold text-xl leading-tight" numberOfLines={1}>
              {name || 'Unknown Customer'}
            </Text>
            
            <View className="flex-row items-center mt-1">
              <Phone size={10} color="#94A3B8" />
              <Text className="text-slate-400 text-xs font-medium ml-1">{phone || 'No phone'}</Text>
            </View>

            <View className="flex-row items-center mt-2 gap-x-2">
              <View className="bg-slate-100 px-2 py-0.5 rounded-md">
                <Text className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">
                  {billingType || 'Regular'}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Calendar size={10} color="#94A3B8" />
                <Text className="text-slate-400 text-[10px] ml-1">{formattedDate}</Text>
              </View>
            </View>
          </View>

          {/* RIGHT: Values */}
          <View className="items-end ml-2">
            <Text className="font-black text-xl" style={{ color: accentColor }}>
              ₹{totalSpent}
            </Text>
            <View 
              className="mt-2 px-2 py-1 rounded-lg flex-row items-center"
              style={{ backgroundColor: `${accentColor}10` }}
            >
              <Text className="text-[10px] font-black" style={{ color: accentColor }}>
                {totalPurchases} ORDERS
              </Text>
            </View>
          </View>
        </View>

        {/* BOTTOM: Balance & Action */}
        <View className="mt-4 pt-4 border-t border-slate-50 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="p-1.5 rounded-lg bg-red-50 mr-2">
              <Wallet size={12} color="#DC2626" />
            </View>
            <View>
              <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Outstanding</Text>
              <Text className="text-slate-900 font-black text-sm">₹{balance || 0}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            activeOpacity={0.7}
            className="flex-row items-center bg-slate-900 px-4 py-2 rounded-xl"
          >
            <Text className="text-white text-[10px] font-black uppercase tracking-widest mr-1">View Profile</Text>
            <ChevronRight size={14} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </BaseDetailCard>
  );
};

export default React.memo(LoyalCustomerCard);
