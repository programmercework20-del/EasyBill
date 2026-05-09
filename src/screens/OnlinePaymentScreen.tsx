import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnlinePaymentScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Text className="text-xl font-bold">Online Payments</Text>
      <Text className="text-slate-400 mt-2">Online payment transactions will appear here.</Text>
    </SafeAreaView>
  );
}
