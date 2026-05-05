import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mic } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useUpdateStockMutation } from '../redux/api/inventoryApi';
import { useDispatch } from 'react-redux';
import { setSelectedItem } from '../redux/slices/inventorySlice';

export default function ModifyItemStock() {
    const navigation = useNavigation();

    const [mode, setMode] = useState<'ADD' | 'REDUCE'>('ADD');
    const [quantity, setQuantity] = useState('');
    const [note, setNote] = useState('');

    const selectedItem = useSelector((state: any) => state.inventory.selectedItem);
    const [updateStock, { isLoading }] = useUpdateStockMutation();

    // const currentStock = selectedItem?.stock || 0;

    const currentStock = selectedItem?.currentStock ?? selectedItem?.stock ?? 0;

    const dispatch = useDispatch();

    console.log('Selected Item for Stock Modification:', selectedItem);
    console.log('Current Stock:', currentStock);


    const finalStock =
        mode === 'ADD'
            ? currentStock + Number(quantity || 0)
            : currentStock - Number(quantity || 0);

    const handleSave = async () => {
        if (!quantity) return;

        try {
            const payload = {
                itemId: selectedItem?._id || selectedItem?.id,
                type: mode, // "ADD" or "REDUCE"
                quantity: Number(quantity),
                note: note,
            };

            await updateStock(payload).unwrap();

            console.log('✅ Stock updated');
            navigation.goBack();

        } catch (error) {
            console.error('❌ Stock update failed:', error);
        }
    };

    if (!selectedItem) {
    return (
        <View className="flex-1 items-center justify-center">
            <Text>No item selected</Text>
        </View>
    );
}

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
                            Modify Item Stock
                        </Text>
                        <Text className="text-white/80 text-xs">
                            FAST v39.08 | 9518795065 | 1043
                        </Text>
                    </View>
                </View>
            </View>

            {/* CONTENT */}
            <View className="px-4 mt-5">

                {/* Selected Item */}
                <Text className="text-lg font-bold text-black mb-2">
                    Selected Item :
                </Text>

            

                <Text>Item Name : {selectedItem?.name}</Text>
                <Text>Sell Price : {selectedItem?.sellPrice}</Text>
                <Text>Purchase Price : {selectedItem?.purchasePrice}</Text>
                <Text>Current Stock : {currentStock}</Text>

                {/* Toggle */}
                <View className="flex-row rounded-xl overflow-hidden border border-gray-300 mb-4">

                    <TouchableOpacity
                        onPress={() => setMode('ADD')}
                        className={`flex-1 py-3 items-center ${mode === 'ADD' ? 'bg-green-600' : 'bg-white'
                            }`}
                    >
                        <Text
                            className={`font-semibold ${mode === 'ADD' ? 'text-white' : 'text-gray-700'
                                }`}
                        >
                            ADD
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setMode('REDUCE')}
                        className={`flex-1 py-3 items-center ${mode === 'REDUCE' ? 'bg-red-500' : 'bg-white'
                            }`}
                    >
                        <Text
                            className={`font-semibold ${mode === 'REDUCE' ? 'text-white' : 'text-gray-700'
                                }`}
                        >
                            REDUCE
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Quantity */}
                <Text className="text-gray-500 mb-1">
                    {mode === 'ADD' ? 'Quantity' : 'Reduce Quantity'}
                </Text>

                <TextInput
                    placeholder="Quantity"
                    placeholderTextColor="#94a3b8"
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={setQuantity}
                    className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-gray-800 mb-3"
                />

                {/* Stock After */}
                {mode === 'REDUCE' && (
                    <Text className="text-gray-800 mb-4">
                        Stock After Reduce : : {finalStock}
                    </Text>
                )}

                {/* Note */}
                <Text className="text-gray-500 mb-1">Note</Text>

                <View className="relative">
                    <TextInput
                        placeholder="Note"
                        placeholderTextColor="#94a3b8"
                        value={note}
                        onChangeText={setNote}
                        className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-gray-800 pr-12"
                    />

                    <View className="absolute right-4 top-4">
                        <Mic size={20} color="#6B7280" />
                    </View>
                </View>
            </View>

            {/* SAVE BUTTON */}
            <TouchableOpacity
                onPress={handleSave}
                disabled={!quantity || isLoading}
                className="absolute bottom-6 right-6 bg-[#1A73E8] px-10 py-4 rounded-full shadow-lg"
            >
                <Text className="text-white font-semibold tracking-widest">
                    {isLoading ? 'SAVING...' : 'SAVE'}
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}



// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     TextInput,
//     StatusBar,
//     Animated,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ArrowLeft, Mic, Package, TrendingUp, TrendingDown, FileText, ChevronRight } from 'lucide-react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { useUpdateStockMutation } from '../redux/api/inventoryApi';
// import { useDispatch } from 'react-redux';
// import { setSelectedItem } from '../redux/slices/inventorySlice';

// export default function ModifyItemStock() {
//     const navigation = useNavigation();

//     const [mode, setMode] = useState<'ADD' | 'REDUCE'>('ADD');
//     const [quantity, setQuantity] = useState('');
//     const [note, setNote] = useState('');

//     const selectedItem = useSelector((state: any) => state.inventory.selectedItem);
//     const [updateStock, { isLoading }] = useUpdateStockMutation();

//     const currentStock = selectedItem?.currentStock ?? selectedItem?.stock ?? 0;

//     const dispatch = useDispatch();

//     console.log('Selected Item for Stock Modification:', selectedItem);
//     console.log('Current Stock:', currentStock);

//     const finalStock =
//         mode === 'ADD'
//             ? currentStock + Number(quantity || 0)
//             : currentStock - Number(quantity || 0);

//     const handleSave = async () => {
//         if (!quantity) return;

//         try {
//             const payload = {
//                 itemId: selectedItem?._id || selectedItem?.id,
//                 type: mode,
//                 quantity: Number(quantity),
//                 note: note,
//             };

//             await updateStock(payload).unwrap();

//             console.log('✅ Stock updated');
//             navigation.goBack();

//         } catch (error) {
//             console.error('❌ Stock update failed:', error);
//         }
//     };

//     if (!selectedItem) {
//         return (
//             <View className="flex-1 items-center justify-center bg-gray-50">
//                 <Package size={48} color="#94a3b8" />
//                 <Text className="text-gray-400 mt-3 text-base">No item selected</Text>
//             </View>
//         );
//     }

//     const isAdd = mode === 'ADD';

//     return (
//         <SafeAreaView className="flex-1 bg-[#F4F6FB]">
//             <StatusBar backgroundColor="#1A73E8" barStyle="light-content" />

//             {/* HEADER */}
//             <View className="bg-[#1A73E8] px-5 pt-4 pb-8 rounded-b-[32px] shadow-lg">
//                 <View className="flex-row items-center mb-6">
//                     <TouchableOpacity
//                         onPress={() => navigation.goBack()}
//                         className="bg-white/20 rounded-full p-2 mr-3"
//                     >
//                         <ArrowLeft color="#fff" size={20} />
//                     </TouchableOpacity>

//                     <View className="flex-1">
//                         <Text className="text-white text-xl font-bold tracking-tight">
//                             Modify Stock
//                         </Text>
//                         <Text className="text-white/60 text-xs mt-0.5">
//                             FAST v39.08 · 9518795065 · 1043
//                         </Text>
//                     </View>
//                 </View>

//                 {/* Item Info Card inside header */}
//                 <View className="bg-white/15 rounded-2xl p-4 border border-white/20">
//                     <View className="flex-row items-center mb-3">
//                         <View className="bg-white/20 rounded-xl p-2 mr-3">
//                             <Package size={20} color="#fff" />
//                         </View>
//                         <View className="flex-1">
//                             <Text className="text-white/70 text-xs uppercase tracking-widest font-medium">
//                                 Selected Item
//                             </Text>
//                             <Text className="text-white text-base font-bold mt-0.5">
//                                 {selectedItem?.name}
//                             </Text>
//                         </View>
//                     </View>

//                     <View className="flex-row justify-between">
//                         <View className="items-center bg-white/10 rounded-xl px-4 py-2 flex-1 mr-2">
//                             <Text className="text-white/60 text-xs">Sell Price</Text>
//                             <Text className="text-white font-bold text-sm mt-0.5">
//                                 ₹{selectedItem?.sellPrice}
//                             </Text>
//                         </View>
//                         <View className="items-center bg-white/10 rounded-xl px-4 py-2 flex-1 mr-2">
//                             <Text className="text-white/60 text-xs">Buy Price</Text>
//                             <Text className="text-white font-bold text-sm mt-0.5">
//                                 ₹{selectedItem?.purchasePrice}
//                             </Text>
//                         </View>
//                         <View className="items-center bg-white/25 rounded-xl px-4 py-2 flex-1">
//                             <Text className="text-white/80 text-xs">In Stock</Text>
//                             <Text className="text-white font-bold text-sm mt-0.5">
//                                 {currentStock}
//                             </Text>
//                         </View>
//                     </View>
//                 </View>
//             </View>

//             {/* CONTENT */}
//             <View className="px-5 mt-5 flex-1">

//                 {/* ADD / REDUCE Toggle */}
//                 <View className="flex-row bg-white rounded-2xl p-1.5 mb-5 shadow-sm border border-gray-100">
//                     <TouchableOpacity
//                         onPress={() => setMode('ADD')}
//                         className={`flex-1 flex-row items-center justify-center py-3.5 rounded-xl gap-2 ${isAdd ? 'bg-emerald-500 shadow-md' : 'bg-transparent'}`}
//                     >
//                         <TrendingUp size={17} color={isAdd ? '#fff' : '#94a3b8'} />
//                         <Text className={`font-bold text-sm ${isAdd ? 'text-white' : 'text-gray-400'}`}>
//                             ADD STOCK
//                         </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         onPress={() => setMode('REDUCE')}
//                         className={`flex-1 flex-row items-center justify-center py-3.5 rounded-xl gap-2 ${!isAdd ? 'bg-red-500 shadow-md' : 'bg-transparent'}`}
//                     >
//                         <TrendingDown size={17} color={!isAdd ? '#fff' : '#94a3b8'} />
//                         <Text className={`font-bold text-sm ${!isAdd ? 'text-white' : 'text-gray-400'}`}>
//                             REDUCE
//                         </Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* Quantity Input */}
//                 <View className="bg-white rounded-2xl px-4 py-3 mb-4 border border-gray-100 shadow-sm">
//                     <Text className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">
//                         {isAdd ? 'Add Quantity' : 'Reduce Quantity'}
//                     </Text>
//                     <TextInput
//                         placeholder="Enter quantity..."
//                         placeholderTextColor="#cbd5e1"
//                         keyboardType="numeric"
//                         value={quantity}
//                         onChangeText={setQuantity}
//                         className="text-gray-800 text-2xl font-bold"
//                         style={{ paddingVertical: 0 }}
//                     />
//                 </View>

//                 {/* Stock Preview */}
//                 {quantity !== '' && (
//                     <View className={`rounded-2xl px-4 py-3.5 mb-4 flex-row items-center justify-between ${isAdd ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
//                         <View>
//                             <Text className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${isAdd ? 'text-emerald-600' : 'text-red-500'}`}>
//                                 Stock After {isAdd ? 'Adding' : 'Reducing'}
//                             </Text>
//                             <View className="flex-row items-center gap-2">
//                                 <Text className="text-gray-400 text-sm line-through">{currentStock}</Text>
//                                 <ChevronRight size={14} color="#94a3b8" />
//                                 <Text className={`text-xl font-bold ${isAdd ? 'text-emerald-600' : 'text-red-500'}`}>
//                                     {finalStock}
//                                 </Text>
//                             </View>
//                         </View>
//                         <View className={`rounded-full p-2.5 ${isAdd ? 'bg-emerald-100' : 'bg-red-100'}`}>
//                             {isAdd
//                                 ? <TrendingUp size={20} color="#10b981" />
//                                 : <TrendingDown size={20} color="#ef4444" />
//                             }
//                         </View>
//                     </View>
//                 )}

//                 {/* Note Input */}
//                 <View className="bg-white rounded-2xl px-4 py-3 border border-gray-100 shadow-sm">
//                     <Text className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">
//                         Note (Optional)
//                     </Text>
//                     <View className="flex-row items-center">
//                         <TextInput
//                             placeholder="Add a note..."
//                             placeholderTextColor="#cbd5e1"
//                             value={note}
//                             onChangeText={setNote}
//                             className="flex-1 text-gray-800 text-base"
//                             style={{ paddingVertical: 0 }}
//                         />
//                         <TouchableOpacity className="ml-2 bg-gray-100 rounded-full p-2">
//                             <Mic size={18} color="#6B7280" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>

//             {/* SAVE BUTTON */}
//             <View className="px-5 pb-6 pt-3">
//                 <TouchableOpacity
//                     onPress={handleSave}
//                     disabled={!quantity || isLoading}
//                     className={`w-full py-4 rounded-2xl items-center shadow-lg ${!quantity || isLoading ? 'bg-gray-300' : isAdd ? 'bg-[#1A73E8]' : 'bg-red-500'}`}
//                 >
//                     <Text className="text-white font-bold text-base tracking-widest">
//                         {isLoading ? 'SAVING...' : isAdd ? '✓  SAVE & ADD STOCK' : '✓  SAVE & REDUCE STOCK'}
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//         </SafeAreaView>
//     );
// }