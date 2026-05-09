import React from 'react';
import { View, Text } from 'react-native';
import { TrendingUp, BarChart3, Wallet } from 'lucide-react-native';

interface SummaryFooterProps {
  totalSales: string | number;
  totalTransactions: string | number;
  totalMoneyIn: string | number;
}

const SummaryFooter: React.FC<SummaryFooterProps> = ({ 
  totalSales, 
  totalTransactions, 
  totalMoneyIn 
}) => {
  return (
    <View className="px-5 mb-32">
      <View className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex-row">
        {/* Total Sales */}
        <View className="flex-1 items-center">
          <View className="bg-blue-50 p-2.5 rounded-2xl mb-2">
            <TrendingUp color="#1A73E8" size={20} />
          </View>
          <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center">
            Total Sales
          </Text>
          <Text className="text-slate-800 font-black text-sm mt-0.5">
            ₹{totalSales}
          </Text>
        </View>

        {/* Divider */}
        <View className="w-[1px] h-12 bg-slate-100 self-center mx-2" />

        {/* Total Transactions */}
        <View className="flex-1 items-center">
          <View className="bg-green-50 p-2.5 rounded-2xl mb-2">
            <BarChart3 color="#10B981" size={20} />
          </View>
          <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center">
            Transactions
          </Text>
          <Text className="text-slate-800 font-black text-sm mt-0.5">
            {totalTransactions}
          </Text>
        </View>

        {/* Divider */}
        <View className="w-[1px] h-12 bg-slate-100 self-center mx-2" />

        {/* Total Money In */}
        <View className="flex-1 items-center">
          <View className="bg-orange-50 p-2.5 rounded-2xl mb-2">
            <Wallet color="#F59E0B" size={20} />
          </View>
          <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center">
            Money In
          </Text>
          <Text className="text-slate-800 font-black text-sm mt-0.5">
            ₹{totalMoneyIn}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SummaryFooter;
