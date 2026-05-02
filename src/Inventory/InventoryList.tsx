import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StatusBar, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    ArrowLeft, Search, RefreshCcw, MoreVertical,
    Edit3, Trash2, CheckCircle2, Star, Image as ImageIcon,
    MenuSquare, Plus
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InventoryList() {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<'inventory' | 'categories'>('categories');

    // MOCK DATA for Inventory
    const inventoryData = [
        { id: '1', name: 'AMANTARAN KOTHI KURTA PAJAMA 2500', price: 2500, stock: 50, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf' },
        { id: '2', name: 'Amantran Koti', price: 2800, stock: 1, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7' },
        { id: '3', name: 'Bahubali', price: 1850, stock: 50, image: null },
        { id: '4', name: 'BAHUBALI', price: 1580, stock: 50, image: null },
        { id: '5', name: 'Bahubali', price: 1500, stock: 50, image: null },
    ];

    // MOCK DATA for Categories
    const categoryData = [
        { id: '1', name: 'Amantaran Kothi Set', count: 3 },
        { id: '2', name: 'Bahubali Kids Ethnic', count: 6 },
        { id: '3', name: 'Blazer', count: 3 },
        { id: '4', name: 'Brand Codra (basic)', count: 1 },
        { id: '5', name: 'Branded Cargo', count: 1 },
        { id: '6', name: 'Branded Jeans', count: 6 },
        { id: '7', name: 'Branded Trouser', count: 2 },
        { id: '8', name: 'Cargo', count: 3 },
        { id: '9', name: 'Fardin Taj', count: 0 },
        { id: '10', name: 'Hoodies', count: 2 },
        { id: '11', name: 'Jeans', count: 6 },
        { id: '12', name: 'Jodhpuri', count: 4 },
    ];

    const renderInventoryItem = ({ item }) => (
        <View className="bg-[#F8F9FA] flex-row p-3 mb-2 rounded-md border border-gray-300 shadow-sm mx-2 mt-1">
            {/* Image container */}
            <View className="w-[80px] h-[100px] bg-[#E8E7EE] mr-3 items-center justify-center rounded-sm overflow-hidden">
                {item.image ? (
                    <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
                ) : (
                    <ImageIcon color="#A0A0B0" size={40} />
                )}
            </View>

            {/* Details */}
            <View className="flex-1 justify-between py-1">
                <View>
                    <Text className="text-black font-extrabold text-sm uppercase leading-tight">{item.name}</Text>
                    <Text className="text-[#38A6D3] text-sm mt-1">₹ {item.price}</Text>
                    <Text className="text-green-600 text-[13px] font-medium mt-1">Current Stock: {item.stock}</Text>
                </View>
                <TouchableOpacity className="border border-[#1A73E8] rounded-md px-3 py-1 self-start mt-2">
                    <Text className="text-[#1A73E8] text-xs font-semibold">Adjust Stock</Text>
                </TouchableOpacity>
            </View>

            {/* Action Icons */}
            <View className="justify-end items-center flex-col ml-2 space-y-4 pb-2">
                <Star color="#EAB308" size={22} className="mb-2" />
                <CheckCircle2 color="#22C55E" size={22} />
            </View>
        </View>
    );

    const renderCategoryItem = ({ item }) => (
        <View className="bg-white flex-row justify-between items-center px-4 py-3 mb-2 rounded border border-gray-700 shadow-sm mx-2">
            <Text className="text-black text-[17px] flex-1">{item.name} ({item.count})</Text>
            <View className="flex-row items-center space-x-4">
                <TouchableOpacity><Edit3 color="#000" size={22} /></TouchableOpacity>
                <TouchableOpacity><Trash2 color="#EF4444" size={22} /></TouchableOpacity>
                <TouchableOpacity><CheckCircle2 color="#22C55E" size={22} /></TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar backgroundColor="#1A73E8" barStyle="light-content" />

            {/* Header */}
            <View className="bg-[#1A73E8] pt-4 pb-3 px-4 flex-row items-center justify-between z-10">
                <View className="flex-row items-center flex-1">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                        <ArrowLeft color="#fff" size={24} />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-white text-[19px] font-bold">
                            {activeTab === 'inventory' ? 'Item List' : 'Item Categories List'}
                        </Text>
                        <Text className="text-indigo-200 text-xs mt-0.5 tracking-tight">FAST v39.08 | 9518795065 | 1043</Text>
                    </View>
                </View>

                <View className="flex-row space-x-4 items-center">
                    {activeTab === 'inventory' && (
                        <TouchableOpacity><Search color="#fff" size={22} /></TouchableOpacity>
                    )}
                    <TouchableOpacity><RefreshCcw color="#fff" size={22} /></TouchableOpacity>
                    {activeTab === 'inventory' && (
                        <TouchableOpacity><MoreVertical color="#fff" size={22} /></TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Sub Header / Tabs */}
            <View className="bg-white px-2 py-2 flex-row justify-between items-center shadow-sm z-0 relative">
                <View className="text-xs text-gray-800 font-medium absolute left-2 top-0"><Text className="text-[10px] text-gray-500">📥 27/04/26 04:12:00 PM</Text></View>
            </View>

            <View className="px-2 pt-2 pb-2 bg-gray-50">
                <View className="flex-row border border-gray-300 rounded-sm overflow-hidden bg-white">
                    <TouchableOpacity
                        className={`flex-1 py-3 items-center justify-center ${activeTab === 'inventory' ? 'bg-[#1A73E8]' : 'bg-white'}`}
                        onPress={() => setActiveTab('inventory')}
                    >
                        <Text className={`font-bold ${activeTab === 'inventory' ? 'text-white' : 'text-gray-800'}`}>INVENTORY (145)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`flex-1 py-3 items-center justify-center border-l border-gray-300 ${activeTab === 'categories' ? 'bg-[#1A73E8]' : 'bg-white'}`}
                        onPress={() => setActiveTab('categories')}
                    >
                        <Text className={`font-bold ${activeTab === 'categories' ? 'text-white' : 'text-gray-800'}`}>CATEGORIES (24)</Text>
                    </TouchableOpacity>
                </View>

                {/* Filter Dropdown (Only for Inventory) */}
                {activeTab === 'inventory' && (
                    <View className="mt-2 bg-white border border-gray-300 rounded-md px-3 py-2 flex-row justify-between items-center">
                        <Text className="text-gray-600 font-semibold uppercase text-xs">Filter</Text>
                        <MoreVertical color="#9CA3AF" size={16} style={{ transform: [{ rotate: '90deg' }] }} />
                    </View>
                )}
            </View>

            {/* List Content */}
            <View className="flex-1 mb-2">
                {activeTab === 'inventory' ? (
                    <FlatList
                        data={inventoryData}
                        keyExtractor={item => item.id}
                        renderItem={renderInventoryItem}
                        contentContainerStyle={{ paddingBottom: 100, paddingTop: 4 }}
                    />
                ) : (
                    <FlatList
                        data={categoryData}
                        keyExtractor={item => item.id}
                        renderItem={renderCategoryItem}
                        contentContainerStyle={{ paddingBottom: 100, paddingTop: 4 }}
                    />
                )}
            </View>

            {/* Floating Action Buttons */}
            {activeTab === 'categories' ? (
                <TouchableOpacity
                    // @ts-ignore
                    onPress={() => navigation.navigate('NewItemCategory')}
                    className="absolute bottom-6 self-center bg-[#1A73E8] rounded-full px-12 py-4 shadow-lg elevation-4 flex-row items-center"
                >
                    <Text className="text-white font-medium text-[15px] tracking-wider uppercase">New Item Category</Text>
                </TouchableOpacity>
            ) : (
                <View className="absolute bottom-6 left-0 right-0 flex-row justify-between px-4">
                    <TouchableOpacity className="bg-white rounded-full pl-3 pr-5 py-3 shadow-lg elevation-4 flex-row items-center border border-indigo-100">
                        <View className="bg-[#F0EEFF] p-1.5 rounded-full mr-2 relative">
                            <MenuSquare color="#1A73E8" size={24} />
                            <View className="absolute bottom-0 right-0 bg-[#1A73E8] rounded-full p-0.5">
                                <Plus color="#fff" size={10} />
                            </View>
                        </View>
                        <Text className="text-[#1A73E8] font-semibold text-sm">UPLOAD{'\n'}MENU</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // @ts-ignore
                        onPress={() => navigation.navigate('NewItem')}
                        className="bg-[#4c3ce8] rounded-full px-8 py-3 shadow-lg elevation-4 flex-row items-center justify-center min-w-[150px]"
                    >
                        <Text className="text-white font-medium text-base tracking-wider uppercase">New Item</Text>
                    </TouchableOpacity>
                </View>
            )}

        </SafeAreaView>
    );
}