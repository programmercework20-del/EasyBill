import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Receipt, Clock, ChevronRight, FileText, Download } from 'lucide-react-native';
import BaseDetailCard from './BaseDetailCard';

interface TransactionCardProps {
  customerName: string;
  invoiceNumber: string | number;
  amount: number | string;
  paymentMethod: string;
  date: string;
  pdfUrl?: string;
  accentColor: string;
  onPress?: () => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  customerName,
  invoiceNumber,
  amount,
  paymentMethod,
  date,
  pdfUrl,
  accentColor,
  onPress
}) => {
  const initial = (customerName || '?').charAt(0).toUpperCase();
  
  const getMethodTheme = (method: string) => {
    const m = method.toLowerCase();
    if (m.includes('upi') || m.includes('bank') || m.includes('card')) return { color: '#2563EB', bg: 'bg-blue-50' };
    if (m.includes('cash')) return { color: '#16A34A', bg: 'bg-green-50' };
    if (m.includes('cheque')) return { color: '#EA580C', bg: 'bg-orange-50' };
    return { color: '#64748B', bg: 'bg-slate-50' };
  };

  const theme = getMethodTheme(paymentMethod);
  const formattedDate = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleOpenPDF = () => {
    if (pdfUrl) {
      Linking.openURL(pdfUrl).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <BaseDetailCard onPress={onPress}>
      <View className="flex-1">
        <View className="flex-row items-center">
          {/* LEFT: Avatar */}
          <View 
            className="w-14 h-14 rounded-full items-center justify-center bg-slate-100"
          >
            <Text className="text-slate-600 text-lg font-black">{initial}</Text>
          </View>

          {/* CENTER: Info */}
          <View className="ml-4 flex-1">
            <Text className="text-slate-900 font-bold text-lg leading-tight" numberOfLines={1}>
              {customerName || 'Cash Customer'}
            </Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                #{invoiceNumber}
              </Text>
              <View className="ml-2 bg-slate-100 px-1.5 py-0.5 rounded-md flex-row items-center">
                <Clock size={10} color="#94A3B8" />
                <Text className="text-slate-400 text-[10px] ml-1 font-bold">{formattedDate}</Text>
              </View>
            </View>
          </View>

          {/* RIGHT: Amount & Method */}
          <View className="items-end">
            <Text className="text-slate-900 font-black text-xl">₹{amount}</Text>
            <View className={`${theme.bg} px-2 py-0.5 rounded-md mt-1`}>
              <Text className="text-[9px] font-black uppercase tracking-widest" style={{ color: theme.color }}>
                {paymentMethod}
              </Text>
            </View>
          </View>
        </View>

        {/* BOTTOM: Actions */}
        <View className="mt-4 pt-4 border-t border-slate-50 flex-row items-center gap-x-3">
          <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-1 flex-row items-center justify-center bg-slate-50 py-2.5 rounded-xl border border-slate-100"
          >
            <Receipt size={14} color="#64748B" />
            <Text className="text-slate-600 text-[10px] font-black uppercase tracking-widest ml-2">View Sale</Text>
          </TouchableOpacity>

          {pdfUrl && (
            <TouchableOpacity 
              onPress={handleOpenPDF}
              activeOpacity={0.7}
              className="flex-1 flex-row items-center justify-center bg-blue-600 py-2.5 rounded-xl"
            >
              <FileText size={14} color="white" />
              <Text className="text-white text-[10px] font-black uppercase tracking-widest ml-2">PDF Invoice</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BaseDetailCard>
  );
};

export default React.memo(TransactionCard);
