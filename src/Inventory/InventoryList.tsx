import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StatusBar, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    ArrowLeft, Search, RefreshCcw, MoreVertical,
    Edit3, Trash2, CheckCircle2, Star, Image as ImageIcon,
    MenuSquare, Plus
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    useGetCategoriesQuery,
    useGetItemsQuery,
    useDeleteItemMutation,
    useDeleteCategoryMutation
} from '../redux/api/inventoryApi';
import { useSearch } from '../hooks/useSearch';
import CustomAlert from '../components/CustomAlert';



export default function InventoryList() {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<'inventory' | 'categories'>('categories');
    const { data: categoryDataRaw, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
    const { data: itemsData, isLoading: itemsLoading, refetch: refetchItems } = useGetItemsQuery();
    const [deleteItem] = useDeleteItemMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        type: 'info' as 'success' | 'error' | 'info',
        title: '',
        message: '',
        onConfirm: () => { },
        confirmText: 'Delete',
    });

    const {
        isSearchOpen,
        search,
        setSearch,
        openSearch,
        closeSearch,
    } = useSearch();

    const items = itemsData?.data || [];
    const categoryData = categoryDataRaw?.data || [];

    console.log('[InventoryList] Screen loaded');
    console.log('[InventoryList] Items raw response:', JSON.stringify(itemsData));
    console.log('[InventoryList] Items count:', items.length, '| Loading:', itemsLoading);
    console.log('[InventoryList] Categories count:', categoryData.length, '| Loading:', isCategoriesLoading);
    console.log('[InventoryList] Active tab:', activeTab, '| Search:', search);

    // Fix localhost URLs for physical device
    const fixImageUrl = (url: string): string => {
        if (!url) return url;
        return url.replace('http://localhost:5000', 'https://4sb8r8b7-5000.inc1.devtunnels.ms');
    };

    const filteredCategories = categoryData.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    const filteredItems = items.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    const renderInventoryItem = ({ item }) => (
        <View className="bg-white rounded-2xl p-3 mb-3 mx-3 shadow-md border border-slate-100 flex-row">

            {/* Image */}
            <View className="w-20 h-24 bg-slate-100 rounded-xl overflow-hidden mr-3">
                {item.images && item.images.length > 0 ? (
                    <Image
                        source={{ uri: fixImageUrl(item.images[0]) }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="flex-1 items-center justify-center">
                        <ImageIcon size={30} color="#94a3b8" />
                    </View>
                )}
            </View>

            {/* Info */}
            <View className="flex-1 justify-between">
                <View className="flex-row justify-between items-start">
                    <Text className="text-slate-900 font-semibold text-sm leading-tight flex-1 mr-2">
                        {item.name}
                    </Text>
                    <View className="flex-row space-x-2 gap-2">
                        <TouchableOpacity onPress={() => {
                            console.log('[InventoryList] ✏️ Editing item:', JSON.stringify(item));
                            navigation.navigate('NewItem', { item });
                        }}>
                            <Edit3 size={18} color="#64748b" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setAlertConfig({
                                type: 'error',
                                title: 'Delete Item',
                                message: `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
                                confirmText: 'Delete',
                                onConfirm: async () => {
                                    try {
                                        await deleteItem(item.id || item._id).unwrap();
                                        console.log('[InventoryList] ✅ Item deleted successfully');
                                    } catch (err) {
                                        console.error('[InventoryList] ❌ Failed to delete item:', err);
                                    }
                                }
                            });
                            setAlertVisible(true);
                        }}>
                            <Trash2 size={18} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-[#1A73E8] font-bold text-base">
                        ₹{item.sellPrice || item.price || 0}
                    </Text>

                    <Text className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                        {item.stockQuantity || item.stock || 0} in stock
                    </Text>
                </View>
                <TouchableOpacity className="mt-2 self-start bg-blue-50 px-3 py-1 rounded-full w-36">
                    <Text className="text-[#1A73E8] text-xs font-semibold">
                        Adjust Stock
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );

    const renderCategoryItem = ({ item }) => (
        <View className="bg-white mx-3 mb-3 p-4 rounded-xl shadow-sm border border-slate-100 flex-row justify-between items-center">

            <Text className="text-slate-800 font-semibold">
                {item.name}
            </Text>

            <View className="flex-row items-center space-x-3 gap-2">
                <Text className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                    {item.count || 0}
                </Text>

                <TouchableOpacity onPress={() => {
                    console.log('[InventoryList] ✏️ Editing category:', JSON.stringify(item));
                    navigation.navigate('NewItemCategory', { category: item });
                }}>
                    <Edit3 size={18} color="#64748b" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setAlertConfig({
                        type: 'error',
                        title: 'Delete Category',
                        message: `Are you sure you want to delete category "${item.name}"? This will not delete the items in this category.`,
                        confirmText: 'Delete',
                        onConfirm: async () => {
                            try {
                                await deleteCategory(item.id || item._id).unwrap();
                                console.log('[InventoryList] ✅ Category deleted successfully');
                            } catch (err) {
                                console.error('[InventoryList] ❌ Failed to delete category:', err);
                            }
                        }
                    });
                    setAlertVisible(true);
                }}>
                    <Trash2 size={18} color="#ef4444" />
                </TouchableOpacity>
            </View>

        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar backgroundColor="#1A73E8" barStyle="light-content" />

            {/* Header */}
            <View className="bg-[#1A73E8] pt-5 pb-4 px-4 rounded-b-3xl shadow-lg">
                <View className="flex-row items-center justify-between">

                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ArrowLeft color="#fff" size={24} />
                        </TouchableOpacity>

                        <Text className="text-white text-xl font-bold ml-3">
                            {activeTab === 'inventory' ? 'Inventory' : 'Categories'}
                        </Text>
                    </View>

                    <View className="flex-row space-x-4">
                        {/* <Search color="#fff" size={22} /> */}
                        <TouchableOpacity onPress={openSearch}>
                            <Search color="#fff" size={22} />
                        </TouchableOpacity>
                        <MoreVertical color="#fff" size={22} />
                    </View>

                </View>
            </View>

            {isSearchOpen && (
                <View className="px-4 mt-3 flex-row items-center bg-white rounded-xl border border-gray-200 mr-4 ml-4">

                    <TextInput
                        placeholder="Search..."
                        placeholderTextColor="#9CA3AF"
                        value={search}
                        onChangeText={setSearch}
                        className="flex-1 px-3 py-2 text-gray-800"
                    />

                    <TouchableOpacity onPress={closeSearch}>
                        <Text className="text-[#1A73E8] px-3">Cancel</Text>
                    </TouchableOpacity>

                </View>
            )}

            {/* Sub Header / Tabs */}
            <View className="px-4 mt-4">
                <View className="flex-row bg-white rounded-full p-1 shadow-sm">

                    <TouchableOpacity
                        onPress={() => setActiveTab('inventory')}
                        className={`flex-1 py-2 rounded-full items-center ${activeTab === 'inventory' ? 'bg-[#1A73E8]' : ''
                            }`}
                    >
                        <Text className={`${activeTab === 'inventory' ? 'text-white' : 'text-gray-600'} font-semibold`}>
                            Inventory
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setActiveTab('categories')}
                        className={`flex-1 py-2 rounded-full items-center ${activeTab === 'categories' ? 'bg-[#1A73E8]' : ''
                            }`}
                    >
                        <Text className={`${activeTab === 'categories' ? 'text-white' : 'text-gray-600'} font-semibold`}>
                            Categories
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View className="flex-1 mb-2 mt-2">
                {activeTab === 'inventory' ? (
                    itemsLoading ? (
                        <View className="flex-1 items-center justify-center">
                            <Text className="text-gray-500 font-medium">Loading inventory...</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={search ? filteredItems : items}
                            keyExtractor={(item) => item._id || item.id}
                            renderItem={renderInventoryItem}
                            contentContainerStyle={{ paddingBottom: 100, paddingTop: 4 }}
                            onRefresh={refetchItems}
                            refreshing={itemsLoading}
                            ListEmptyComponent={
                                <View className="flex-1 items-center justify-center mt-10">
                                    <Text className="text-gray-500">No items found</Text>
                                </View>
                            }
                        />
                    )
                ) : (
                    isCategoriesLoading ? (
                        <View className="flex-1 items-center justify-center">
                            <Text className="text-gray-500 font-medium">Loading categories...</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={search ? filteredCategories : categoryData}
                            keyExtractor={(item) => item._id || item.id}
                            renderItem={renderCategoryItem}
                            contentContainerStyle={{ paddingBottom: 100, paddingTop: 4 }}
                            ListEmptyComponent={
                                <View className="flex-1 items-center justify-center mt-10">
                                    <Text className="text-gray-500">No categories found</Text>
                                </View>
                            }
                        />
                    )
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
                        onPress={() => navigation.navigate('NewItem')}
                        className="absolute bottom-6 right-6 bg-[#1A73E8] w-16 h-16 rounded-full items-center justify-center shadow-xl"
                    >
                        <Plus color="white" size={26} />
                    </TouchableOpacity>
                </View>
            )}

            <CustomAlert
                visible={alertVisible}
                type={alertConfig.type}
                title={alertConfig.title}
                message={alertConfig.message}
                confirmText={alertConfig.confirmText}
                onCancel={() => setAlertVisible(false)}
                onClose={() => {
                    setAlertVisible(false);
                    alertConfig.onConfirm();
                }}
            />

        </SafeAreaView>
    );
}