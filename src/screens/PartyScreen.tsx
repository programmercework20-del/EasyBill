import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Search, UserCircle } from 'lucide-react-native';

const USERS_DATA = [
  { id: '1', name: 'Acme Corp', balance: '+$4,500.00' },
  { id: '2', name: 'Tech Solutions', balance: '-$1,200.50' },
  { id: '3', name: 'Global Industries', balance: '+$850.00' },
  { id: '4', name: 'John Doe', balance: '-$120.00' },
  { id: '5', name: 'Retail Plus', balance: '+$3,250.00' },
  { id: '6', name: 'Supply Chain Co.', balance: '+$0.00' },
];

export default function PartyScreen() {
  return (
    <View className="flex-1 bg-slate-900">
      <View className="px-6 py-6">
        <View className="flex-row items-center bg-slate-800 rounded-xl px-4 py-3 border border-slate-700/50 shadow-sm shadow-black/20">
          <Search color="#94a3b8" size={20} />
          <TextInput 
            placeholder="Search parties..." 
            placeholderTextColor="#94a3b8"
            className="flex-1 text-white ml-3 text-base h-full py-0"
          />
        </View>
      </View>

      <FlatList
        data={USERS_DATA}
        keyExtractor={item => item.id}
        contentContainerClassName="px-6 pb-6"
        renderItem={({ item }) => (
          <TouchableOpacity 
            activeOpacity={0.7}
            className="flex-row items-center bg-slate-800 p-4 mb-3 rounded-xl border border-slate-700/50 shadow-sm shadow-black/20"
          >
            <View className="bg-slate-900/50 p-3 rounded-xl mr-4 border border-slate-700/30">
              <UserCircle color="#14b8a6" size={24} />
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg font-semibold">{item.name}</Text>
              <Text className="text-slate-400 mt-1">ID: #{item.id.padStart(4, '0')}</Text>
            </View>
            <Text className="text-teal-400 font-bold text-lg">{item.balance}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
