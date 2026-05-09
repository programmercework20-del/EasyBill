import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { ChevronRight, Clock, User, CornerUpLeft } from 'lucide-react-native';

interface SaleTransactionCardProps {
  customerName: string;
  invoiceNumber: string | number;
  date: string;
  amount: number | string;
  paymentMethod: string;
  onPress: () => void;
  onReturn?: () => void;
}

const SaleTransactionCard: React.FC<SaleTransactionCardProps> = ({
  customerName,
  invoiceNumber,
  date,
  amount,
  paymentMethod,
  onPress,
  onReturn
}) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const initial = (customerName || 'C').charAt(0).toUpperCase();

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const getMethodTheme = (method: string) => {
    const m = method.toLowerCase();
    if (['upi', 'bank', 'card'].includes(m)) return { color: '#2563EB', bg: 'bg-blue-50', border: 'border-blue-100' };
    if (m === 'cash') return { color: '#16A34A', bg: 'bg-green-50', border: 'border-green-100' };
    return { color: '#64748B', bg: 'bg-slate-50', border: 'border-slate-100' };
  };

  const theme = getMethodTheme(paymentMethod);
  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: '2-digit'
  });

  return (
    <Animated.View style={{ transform: [{ scale }] }} className="mb-4">
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100"
      >
        <View className="flex-row items-center">
          {/* LEFT: Avatar/Indicator */}
          <View className="relative">
            <View className="w-14 h-14 rounded-full bg-slate-50 items-center justify-center">
              <Text className="text-slate-400 text-xl font-black">{initial}</Text>
            </View>
            <View 
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white items-center justify-center ${theme.bg}`}
            >
              <View className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }} />
            </View>
          </View>

          {/* CENTER: Info */}
          <View className="ml-4 flex-1">
            <View className="flex-row items-center justify-between">
              <Text className="text-slate-900 font-bold text-lg" numberOfLines={1}>
                {customerName || 'Cash Sale'}
              </Text>
              <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                #{invoiceNumber}
              </Text>
            </View>
            
            <View className="flex-row items-center mt-1">
              <View className="flex-row items-center mr-3">
                <Clock size={10} color="#94A3B8" />
                <Text className="text-slate-400 text-[10px] font-medium ml-1">{formattedDate}</Text>
              </View>
              <View className="flex-row items-center">
                <User size={10} color="#94A3B8" />
                <Text className="text-slate-400 text-[10px] font-medium ml-1">Admin</Text>
              </View>
            </View>
          </View>

          {/* RIGHT: Amount */}
          <View className="items-end ml-2">
            <Text className="text-slate-900 font-black text-lg">₹{amount}</Text>
            <View className="bg-green-50 px-2 py-0.5 rounded-full mt-1">
              <Text className="text-green-600 text-[9px] font-black uppercase">PAID</Text>
            </View>
          </View>
        </View>

        {/* BOTTOM: Actions & Payment Pill */}
        <View className="mt-4 pt-4 border-t border-slate-50 flex-row items-center justify-between">
          <View className={`px-3 py-1 rounded-xl border ${theme.border} ${theme.bg}`}>
            <Text className="text-[10px] font-black tracking-widest uppercase" style={{ color: theme.color }}>
              {paymentMethod}
            </Text>
          </View>

          <TouchableOpacity 
            onPress={onReturn}
            activeOpacity={0.7}
            className="flex-row items-center bg-slate-50 px-3 py-2 rounded-xl border border-slate-100"
          >
            <CornerUpLeft size={14} color="#64748B" />
            <Text className="text-slate-600 text-[10px] font-black uppercase tracking-widest ml-1.5">Return</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default React.memo(SaleTransactionCard);
