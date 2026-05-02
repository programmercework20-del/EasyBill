import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    // Navigate to Drawer after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Drawer');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-[#007AFF]">
      <Text className="text-white text-[32px] font-bold">EasyBill</Text>
    </View>
  );
}
