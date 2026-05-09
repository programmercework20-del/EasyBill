import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  bgColor?: string; // Tailwind class like 'bg-red-50'
  borderColor?: string; // Tailwind class like 'border-red-200'
  textColor?: string; // Tailwind class like 'text-red-600'
  titleColor?: string; // Tailwind class like 'text-red-800'
  onPress?: () => void;
}

export default function MetricCard({ 
  title, 
  value, 
  subtitle, 
  bgColor = "bg-white", 
  borderColor = "border-slate-200", 
  textColor = "text-slate-800",
  titleColor = "text-slate-500",
  onPress 
}: MetricCardProps) {
  
  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent 
      // @ts-ignore
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex-1 rounded-2xl p-4 border shadow-sm ${bgColor} ${borderColor}`}
    >
      <Text className={`text-xs font-bold uppercase tracking-wider mb-2 ${titleColor}`}>
        {title}
      </Text>
      <Text className={`font-extrabold text-2xl ${textColor}`}>
        {value}
      </Text>
      {subtitle && (
        <Text className={`text-xs mt-1 ${titleColor} opacity-80 font-medium`}>
          {subtitle}
        </Text>
      )}
    </CardComponent>
  );
}
