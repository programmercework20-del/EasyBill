import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { CheckCircle2, User, CreditCard, Banknote, Landmark } from 'lucide-react-native';

interface RecentSaleCardProps {
  sale: any;
  onPress: () => void;
  index: number;
}

const THEMES = [
  { name: 'blue', primary: '#1A73E8', bg: 'bg-blue-600', soft: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  { name: 'green', primary: '#10B981', bg: 'bg-green-600', soft: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
  { name: 'purple', primary: '#8B5CF6', bg: 'bg-purple-600', soft: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  { name: 'orange', primary: '#F59E0B', bg: 'bg-orange-600', soft: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
];

const RecentSaleCard: React.FC<RecentSaleCardProps> = ({ sale, onPress, index }) => {
  const theme = THEMES[index % THEMES.length];
  const scale = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const paymentMethod = (sale.payment_method || sale.paymentMode || sale.paymentMethod || sale.payment_mode || 'cash').toLowerCase();
  const isOnline = ['upi', 'bank', 'card', 'online'].includes(paymentMethod);
  const isCash = paymentMethod === 'cash';
  const isCheque = ['cheque', 'check'].includes(paymentMethod);

  const dateObj = new Date(sale.createdAt || Date.now());
  const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear().toString().slice(2)}`;

  return (
    <Animated.View style={{ transform: [{ scale }] }} className="px-5 mb-4">
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100"
      >
        <View className="flex-row">
          {/* Accent Strip */}
          <View className={`${theme.bg} w-1.5 h-full`} />

          <View className="flex-1 p-5">
            {/* Top Row */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center flex-1">
                {/* Avatar */}
                <View className="relative">
                  <View className={`${theme.bg} w-14 h-14 rounded-full items-center justify-center`}>
                    <Text className="text-white font-bold text-xl uppercase">
                      {(sale.customer?.name || 'C').charAt(0)}
                    </Text>
                  </View>
                  <View className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                    <View className={`${theme.bg} p-1 rounded-full`}>
                      <User color="#fff" size={12} />
                    </View>
                  </View>
                </View>

                {/* Details */}
                <View className="ml-4 flex-1">
                  <Text className="text-slate-800 font-bold text-lg leading-tight" numberOfLines={1}>
                    {sale.customer?.name || 'Cash Sale'}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-slate-400 text-xs font-medium">#{sale.invoiceNumber || 'INV-000'} • </Text>
                    <Text className="text-slate-400 text-xs font-medium">{formattedDate}</Text>
                  </View>
                </View>
              </View>

              {/* Amount & Check */}
              <View className="items-end">
                <Text className={`${theme.text} font-black text-xl`}>
                  ₹{sale.total || 0}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-green-600 font-bold text-xs mr-1">₹{sale.amount_received || 0}</Text>
                  <CheckCircle2 color={theme.primary} size={16} fill={`${theme.primary}20`} />
                </View>
              </View>
            </View>

            {/* Payment Segmented Buttons */}
            <View className="flex-row gap-2">
              <View className={`flex-1 flex-row items-center justify-center py-2.5 rounded-2xl border ${isOnline ? `${theme.border} ${theme.soft}` : 'border-slate-100 bg-slate-50/50'}`}>
                <Landmark size={14} color={isOnline ? theme.primary : '#94A3B8'} />
                <Text className={`ml-1.5 text-[10px] font-black uppercase tracking-widest ${isOnline ? theme.text : 'text-slate-400'}`}>UPI/Bank</Text>
              </View>

              <View className={`flex-1 flex-row items-center justify-center py-2.5 rounded-2xl border ${isCash ? `${theme.border} ${theme.soft}` : 'border-slate-100 bg-slate-50/50'}`}>
                <Banknote size={14} color={isCash ? theme.primary : '#94A3B8'} />
                <Text className={`ml-1.5 text-[10px] font-black uppercase tracking-widest ${isCash ? theme.text : 'text-slate-400'}`}>Cash</Text>
              </View>

              <View className={`flex-1 flex-row items-center justify-center py-2.5 rounded-2xl border ${isCheque ? `${theme.border} ${theme.soft}` : 'border-slate-100 bg-slate-50/50'}`}>
                <CreditCard size={14} color={isCheque ? theme.primary : '#94A3B8'} />
                <Text className={`ml-1.5 text-[10px] font-black uppercase tracking-widest ${isCheque ? theme.text : 'text-slate-400'}`}>Cheque</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RecentSaleCard;
