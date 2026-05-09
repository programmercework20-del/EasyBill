import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const PRIMARY = "#1A73E8";

interface UserListCardProps {
  name: string;
  phone?: string;
  metricLabel?: string;
  metricValue?: string | number;
  icon?: string;
  onPress?: () => void;
}

export default function UserListCard({ 
  name, 
  phone, 
  metricLabel, 
  metricValue, 
  icon = "👤",
  onPress 
}: UserListCardProps) {
  
  const initials = name ? name.substring(0, 2).toUpperCase() : 'U';

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-center bg-white border border-slate-200 rounded-xl p-3 mb-3 shadow-sm"
    >
      <View className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center mr-3 border border-blue-100">
        <Text className="text-lg font-bold text-blue-600">{initials}</Text>
      </View>
      
      <View className="flex-1">
        <Text className="text-slate-800 font-bold text-base mb-0.5">{name}</Text>
        {phone && <Text className="text-slate-500 text-xs font-medium">{phone}</Text>}
      </View>
      
      {(metricLabel || metricValue) && (
        <View className="items-end">
          {metricLabel && <Text className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">{metricLabel}</Text>}
          {metricValue && <Text className="text-slate-800 font-black text-base mt-0.5">{metricValue}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
}
