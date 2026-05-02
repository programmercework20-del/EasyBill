import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY = "#1A73E8";

export default function DashboardScreen() {

  // Data for the horizontal top scroll
  const topMetrics = [
    { id: 1, title: "Reports", value: "View All", bgTone: "bg-slate-50", valueColor: "text-slate-800" },
    { id: 2, title: "Sale (TD)", value: "₹1100", icon: "📈", isLink: false, bgTone: "bg-blue-50", valueColor: "text-blue-600" },
    { id: 3, title: "Online Pay", value: "₹600", icon: "📱", isLink: false, bgTone: "bg-green-50", valueColor: "text-green-600" },
    { id: 4, title: "Offline Pay", value: "₹500", icon: "💵", isLink: false, bgTone: "bg-yellow-50", valueColor: "text-yellow-600" },
    { id: 5, title: "Pending Dues", value: "₹0", icon: "⏳", isLink: false, bgTone: "bg-red-50", valueColor: "text-red-600" },
  ];

  const recentTransactions = [
    { id: "476", name: "Fuzail Hussain", date: "27/04/26", saleAmount: 1100, paymentMethod: "CASH" }
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <ScrollView className="flex-1 pt-2" showsVerticalScrollIndicator={false}>

        {/* HORIZONTAL SCROLLABLE METRICS CARDS */}
        <View className="mb-6 mt-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }} // Adds padding to start and end of scroll
          >
            {topMetrics.map((metric) => (
              <TouchableOpacity
                key={metric.id}
                activeOpacity={metric.isLink ? 0.7 : 1}
                className="bg-white w-36 rounded-2xl p-5 shadow-sm border border-slate-400 mr-4"
              >

                <Text className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                  {metric.title}
                </Text>
                <Text className={`font-extrabold text-xl ${metric.valueColor}`}>
                  {metric.value}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* The rest of your app content goes below but wrapped in px-5 to maintain layout */}
        <View className="px-5">
          {/* END DAY BUTTON */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-white border-2 border-dashed border-blue-200 rounded-2xl py-3.5 items-center mb-8"
          >
            <Text style={{ color: PRIMARY }} className="font-bold tracking-wide">
              CLOSE REGISTER (END DAY)
            </Text>
          </TouchableOpacity>

          {/* SECTION TITLE */}
          <View className="flex-row justify-between items-end mb-4">
            <Text className="text-slate-800 font-bold text-lg">Recent Sales</Text>
            <TouchableOpacity>
              <Text style={{ color: PRIMARY }} className="text-sm font-semibold">See All</Text>
            </TouchableOpacity>
          </View>



          {/* TRANSACTION CARD */}
          <View className="border border-gray-300 rounded-xl p-4 mb-4">

            {/* NAME + RECEIPT + DATE */}
            <View className="flex-row justify-between mb-2">
              <Text className="text-black font-semibold">
                Fuzail Hussain
              </Text>

              <Text className="text-gray-500">
                476 | 27/04/26
              </Text>
            </View>

            {/* SALE + MONEY IN */}
            <View className="flex-row justify-between mb-3">
              <Text style={{ color: PRIMARY }}>
                Sale: ₹1100
              </Text>

              <Text className="text-green-600 font-medium">
                MoneyIn: ₹1100
              </Text>
            </View>

            {/* PAYMENT TYPE */}
            <View className="flex-row gap-2">
              <View className="flex-1 border border-gray-300 rounded-lg py-2 items-center">
                <Text className="text-gray-400">UPI/BANK</Text>
              </View>

              <View className="flex-1 border rounded-lg py-2 items-center"
                style={{ borderColor: PRIMARY }}>
                <Text style={{ color: PRIMARY }} className="font-semibold">
                  CASH
                </Text>
              </View>

              <View className="flex-1 border border-gray-300 rounded-lg py-2 items-center">
                <Text className="text-gray-400">CHEQUE</Text>
              </View>
            </View>
          </View>

          {/* CONNECT PRINTER */}
          <TouchableOpacity className="flex-row justify-center items-center gap-2 bg-slate-50 rounded-2xl py-4 mb-10">
            <Text className="text-xl">🖨️</Text>
            <Text className="text-slate-600 font-semibold">
              Connect Thermal Printer
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* FLOATING BOTTOM BUTTON */}
      <View className="p-5 bg-white border-t border-slate-100">
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ backgroundColor: PRIMARY, shadowColor: PRIMARY, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 }}
          className="py-4 rounded-2xl items-center flex-row justify-center gap-2"
        >
          <Text className="text-white font-black text-xl mb-1">+</Text>
          <Text className="text-white font-bold text-lg tracking-wide">
            NEW INVOICE
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}