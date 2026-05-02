import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { ArrowLeft, Mic } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function NewItemCategory() {
  const navigation = useNavigation();
  const [categoryName, setCategoryName] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar backgroundColor="#1A73E8" barStyle="light-content" />

      {/* Header */}
      <View className="bg-[#1A73E8] pt-4 pb-4 px-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <View>
          <Text className="text-white text-xl font-bold">New Item Category</Text>
          <Text className="text-indigo-200 text-xs mt-0.5">FAST v39.08 | 9518795065 | 1043</Text>
        </View>
      </View>

      {/* Form Content */}
      <View className="p-4">
        <Text className="text-gray-500 font-bold mb-1 ml-1 text-sm">Category Name</Text>
        <View className="flex-row items-center bg-white rounded border border-gray-300 px-3 py-1 shadow-sm">
          <TextInput
            className="flex-1 text-gray-800 text-base"
            placeholder="Category Name"
            placeholderTextColor="#9CA3AF"
            value={categoryName}
            onChangeText={setCategoryName}
          />
          <TouchableOpacity className="p-2">
            <Mic color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating Save Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-[#4c3ce8] rounded-full px-8 py-3 shadow-lg elevation-4 items-center justify-center"
      >
        <Text className="text-white font-medium text-base tracking-wider">SAVE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
