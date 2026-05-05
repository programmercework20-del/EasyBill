import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mic } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCreatePartyCategoryMutation } from '../redux/api/partyApi';


export default function NewPartyCategory() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { type } = route.params || {};
  const [name, setName] = useState('');

  const [createCategory, { isLoading }] = useCreatePartyCategoryMutation();


  const handleSave = async () => {
    if (!name) return;

    try {
      await createCategory({
        name: name,
        type: type || 'customer',
      }).unwrap();

      console.log('✅ Category Created');
      navigation.goBack();

    } catch (err) {
      console.log('❌ Error:', err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar backgroundColor="#1A73E8" barStyle="light-content" />

      {/* HEADER */}
      <View className="bg-[#1A73E8] px-4 pt-5 pb-6 rounded-b-3xl">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>

          <View className="ml-3">
            <Text className="text-white text-xl font-bold">
              New Party Category
            </Text>
          </View>
        </View>
      </View>

      {/* INPUT */}
      <View className="px-4 mt-6">
        <Text className="text-gray-600 font-semibold mb-2">
          Category Name
        </Text>

        <View className="bg-white border border-[#C7C4F5] rounded-xl px-4 py-4 flex-row items-center">
          <TextInput
            placeholder="Category Name"
            value={name}
            onChangeText={setName}
            className="flex-1 text-gray-800 text-lg"
            placeholderTextColor="#9CA3AF"
          />
          <Mic size={20} color="#6B7280" />
        </View>
      </View>

      {/* SAVE */}
      <TouchableOpacity
        onPress={handleSave}
        disabled={isLoading}
        className={`absolute bottom-6 right-6 bg-[#1A73E8] px-12 py-4 rounded-full shadow-lg ${isLoading ? 'opacity-50' : ''}`}
      >
        <Text className="text-white font-semibold tracking-widest">
          {isLoading ? 'SAVING...' : 'SAVE'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}