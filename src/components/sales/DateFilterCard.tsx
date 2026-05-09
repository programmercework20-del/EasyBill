import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'lucide-react-native';

interface DateFilterCardProps {
  label: string;
  value: string;
  onPress: () => void;
  isActive: boolean;
}

const DateFilterCard: React.FC<DateFilterCardProps> = ({ label, value, onPress, isActive }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`flex-1 flex-row items-center justify-between p-4 rounded-2xl border ${
        isActive ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-slate-100 shadow-sm'
      }`}
    >
      <View>
        <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</Text>
        <Text className={`text-sm font-bold ${isActive ? 'text-blue-600' : 'text-slate-700'}`}>
          {value || 'Select Date'}
        </Text>
      </View>
      <Calendar size={18} color={isActive ? '#2563EB' : '#94A3B8'} />
    </TouchableOpacity>
  );
};

export default DateFilterCard;
