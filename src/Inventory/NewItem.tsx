import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { ArrowLeft, Mic, ChevronDown } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewItem() {
  const navigation = useNavigation();

  // State for form fields (basic setup)
  const [productName, setProductName] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [acSalePrice, setAcSalePrice] = useState('');
  const [nonAcSellPrice, setNonAcSellPrice] = useState('');
  const [onlineDelivery, setOnlineDelivery] = useState('');
  const [onlineSell, setOnlineSell] = useState('');

  // Reusable Input Component
  const FormInput = ({ label, placeholder, value, onChangeText, icon, flex = 1, showLabel = true }: any) => (
    <View style={{ flex }} className="mb-4">
      {showLabel && <Text className="text-gray-500 font-bold mb-1 ml-1 text-xs">{label}</Text>}
      <View className="flex-row items-center bg-white rounded border border-gray-300 px-3 py-1.5 shadow-sm">
        <TextInput
          className="flex-1 text-gray-800 text-base py-1"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
        />
        {icon && (
          <TouchableOpacity className="p-1">
            {icon === 'mic' ? <Mic color="#6B7280" size={20} /> : <ChevronDown color="#6B7280" size={20} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar backgroundColor="#1A73E8" barStyle="light-content" />

      {/* Header */}
      <View className="bg-[#6C4EFF] pt-4 pb-4 px-4 flex-row items-center z-10 shadow-sm">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <View>
          <Text className="text-white text-xl font-bold">New Item</Text>
          <Text className="text-indigo-200 text-xs mt-0.5">FAST v39.08 | 9518795065 | 1043</Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Product/Service Name */}
        <FormInput
          showLabel={false}
          placeholder="Product/Service Name *"
          value={productName}
          onChangeText={setProductName}
          icon="mic"
        />

        {/* Sell Price & Item Unit */}
        <View className="flex-row space-x-3 w-full">
          <View className="flex-1 mr-2">
            <FormInput
              showLabel={false}
              placeholder="Sell Price *"
              value={sellPrice}
              onChangeText={setSellPrice}
            />
          </View>
          <View className="flex-1 ml-2">
            <FormInput
              showLabel={false}
              placeholder="Item Un..."
              value=""
              onChangeText={() => { }}
              icon="chevron"
            />
          </View>
        </View>

        {/* Select Item Category */}
        <FormInput
          showLabel={false}
          placeholder="Select Item Category"
          value=""
          onChangeText={() => { }}
          icon="chevron"
        />

        {/* MRP & Purchase Price */}
        <View className="flex-row space-x-3 w-full">
          <View className="flex-1 mr-2">
            <FormInput
              showLabel={false}
              placeholder="MRP:"
              value={mrp}
              onChangeText={setMrp}
            />
          </View>
          <View className="flex-1 ml-2">
            <FormInput
              showLabel={false}
              placeholder="Purchase Pri..."
              value={purchasePrice}
              onChangeText={setPurchasePrice}
            />
          </View>
        </View>

        {/* AC Sale Price */}
        <FormInput
          label="AC Sale Price"
          placeholder="AC Sale Price"
          value={acSalePrice}
          onChangeText={setAcSalePrice}
        />

        {/* Non AC Sell Price */}
        <FormInput
          label="Non AC Sell Price"
          placeholder="Non AC Sell Price"
          value={nonAcSellPrice}
          onChangeText={setNonAcSellPrice}
        />

        {/* Online Delivery Sell Price */}
        <FormInput
          label="Online Delivery Sell Price"
          placeholder="Online Delivery Sell Price"
          value={onlineDelivery}
          onChangeText={setOnlineDelivery}
        />

        {/* Online Sell Price */}
        <FormInput
          label="Online Sell Price"
          placeholder="Online Sell Price"
          value={onlineSell}
          onChangeText={setOnlineSell}
        />

      </ScrollView>

      {/* Floating Save Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-[#4c3ce8] rounded-full px-8 py-3 shadow-lg elevation-4 items-center justify-center"
      >
        <Text className="text-white font-medium text-base tracking-wider">SAVE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
