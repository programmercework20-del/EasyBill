import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Modal,
    FlatList,
    ActivityIndicator,
    Image,
} from 'react-native';
import { ArrowLeft, Mic, ChevronDown, Check, Trash2, Plus, Camera, ImageIcon } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    useCreateItemMutation,
    useUpdateItemMutation,
    useGetCategoriesQuery
} from '../redux/api/inventoryApi';
import CustomAlert from '../components/CustomAlert';
import { launchImageLibrary, launchCamera, type Asset } from 'react-native-image-picker';

// ──────────────────────────────────────────────
// Reusable Sub-Components (outside main function to avoid re-mount)
// ──────────────────────────────────────────────

interface FormInputProps {
    label?: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    icon?: 'mic' | 'chevron';
    flex?: number;
    showLabel?: boolean;
    onFocus?: () => void;
}

const FormInput = ({ label, placeholder, value, onChangeText, icon, flex = 1, showLabel = true, onFocus }: FormInputProps) => (
    <View style={{ flex }} className="mb-4">
        {showLabel && <Text className="text-gray-500 font-bold mb-1 ml-1 text-xs">{label}</Text>}
        <View className="flex-row items-center bg-white rounded border border-gray-300 px-3 py-1.5 shadow-sm">
            <TextInput
                className="flex-1 text-gray-800 text-base py-1"
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChangeText}
                onFocus={onFocus}
            />
            {icon && (
                <View className="p-1">
                    {icon === 'mic' ? <Mic color="#6B7280" size={20} /> : <ChevronDown color="#6B7280" size={20} />}
                </View>
            )}
        </View>
    </View>
);

interface SelectorInputProps {
    label?: string;
    placeholder: string;
    value: string;
    onPress: () => void;
    flex?: number;
    showLabel?: boolean;
}

const SelectorInput = ({ label, placeholder, value, onPress, flex = 1, showLabel = true }: SelectorInputProps) => (
    <TouchableOpacity onPress={onPress} style={{ flex }} className="mb-4 active:opacity-70">
        {showLabel && <Text className="text-gray-500 font-bold mb-1 ml-1 text-xs">{label}</Text>}
        <View className="flex-row items-center bg-white rounded border border-gray-300 px-3 py-1.5 shadow-sm h-[52px]">
            <Text className={`flex-1 ${value ? 'text-gray-800' : 'text-gray-400'} text-base`}>
                {value || placeholder}
            </Text>
            <ChevronDown color="#6B7280" size={20} />
        </View>
    </TouchableOpacity>
);

const SelectionModal = ({ visible, title, data, onSelect, onClose, selectedValue }: any) => (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-3xl h-[60%] p-6">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-bold text-gray-800">{title}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text className="text-blue-600 font-semibold text-base">Done</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => (item._id || item.id || String(index))}
                    renderItem={({ item }) => {
                        const label = item.name || item;
                        const val = item.id || item._id || item;
                        const isSelected = selectedValue === val;
                        return (
                            <TouchableOpacity
                                onPress={() => onSelect(item)}
                                className={`flex-row items-center justify-between p-4 border-b border-gray-100 ${isSelected ? 'bg-blue-50 rounded-xl border-b-0' : ''}`}
                            >
                                <Text className={`text-base ${isSelected ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>
                                    {label}
                                </Text>
                                {isSelected && <Check size={20} color="#1A73E8" />}
                            </TouchableOpacity>
                        );
                    }}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                />
            </View>
        </View>
    </Modal>
);

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────

export default function NewItem() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { item } = route.params || {};
    const scrollRef = useRef<ScrollView>(null);

    const [createItem, { isLoading: isCreating }] = useCreateItemMutation();
    const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation();
    const { data: categoryDataRaw } = useGetCategoriesQuery();

    const categories = categoryDataRaw?.data || [];
    const units = ['Pcs', 'Kg', 'Gm', 'Mtr', 'Ltr', 'Box', 'Pack', 'Doz', 'Set', 'SqFt', 'CuFt'];

    console.log('[NewItem] Screen loaded | Mode:', item ? 'EDIT' : 'CREATE');
    console.log('[NewItem] Categories fetched:', categories.length);

    // Form States
    const [productName, setProductName] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [mrp, setMrp] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [acSalePrice, setAcSalePrice] = useState('');
    const [nonAcSellPrice, setNonAcSellPrice] = useState('');
    const [onlineDelivery, setOnlineDelivery] = useState('');
    const [onlineSell, setOnlineSell] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedUnit, setSelectedUnit] = useState('');

    // Image States
    const [pickedImages, setPickedImages] = useState<Asset[]>([]); // New images from device
    const [existingImages, setExistingImages] = useState<string[]>([]); // URLs from server (edit mode)

    // Alert State
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        type: 'info' as 'success' | 'error' | 'info',
        title: '',
        message: '',
        onConfirm: null as any,
    });

    // Modal Visibility
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [unitModalVisible, setUnitModalVisible] = useState(false);
    const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);

    // Fix server image URLs for physical device (replace localhost with dev tunnel)
    const fixImageUrl = (url: string): string => {
        if (!url) return url;
        return url.replace(
            'http://localhost:5000',
            'https://4sb8r8b7-5000.inc1.devtunnels.ms'
        );
    };

    // Fill form if editing
    useEffect(() => {
        if (item) {
            console.log('[NewItem] Filling edit form with item:', JSON.stringify(item));
            setProductName(item.name || '');
            setSellPrice(item.sellPrice?.toString() || item.price?.toString() || '');
            setMrp(item.mrp?.toString() || '');
            setPurchasePrice(item.purchasePrice?.toString() || '');
            setAcSalePrice(item.acSalePrice || item.acPrice?.toString() || '');
            setNonAcSellPrice(item.nonAcSellPrice || item.nonAcPrice?.toString() || '');
            setOnlineDelivery(item.onlineDelivery || item.onlineDeliveryPrice?.toString() || '');
            setOnlineSell(item.onlineSell || item.onlinePrice?.toString() || '');
            setSelectedUnit(item.unit || '');

            // Set existing server images (fix localhost URL for physical device)
            if (item.images?.length > 0) {
                setExistingImages(item.images.map(fixImageUrl));
            } else if (item.image) {
                setExistingImages([fixImageUrl(item.image)]);
            }

            if (item.categoryId && categories.length > 0) {
                const foundCat = categories.find((c: any) => (c.id || c._id) === item.categoryId);
                if (foundCat) setSelectedCategory(foundCat);
            }
        }
    }, [item, categories]);

    const handleFocus = useCallback((y: number) => {
        scrollRef.current?.scrollTo({ y, animated: true });
    }, []);

    const showAlert = useCallback((type: 'success' | 'error' | 'info', title: string, message: string, onConfirm: any = null) => {
        setAlertConfig({ type, title, message, onConfirm });
        setAlertVisible(true);
    }, []);

    // ──────────────────────────────────────────────
    // Image Picker Logic
    // ──────────────────────────────────────────────

    const handlePickFromGallery = () => {
        setImagePickerModalVisible(false);
        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit: 5,
                quality: 0.3,
                maxWidth: 600,
                maxHeight: 600,
            },
            (response) => {
                console.log('[NewItem] Gallery response:', JSON.stringify(response));
                if (response.didCancel) {
                    console.log('[NewItem] User cancelled gallery');
                    return;
                }
                if (response.errorCode) {
                    console.error('[NewItem] Gallery error:', response.errorMessage);
                    showAlert('error', 'Gallery Error', response.errorMessage || 'Could not open gallery');
                    return;
                }
                if (response.assets) {
                    setPickedImages(prev => [...prev, ...response.assets!]);
                    console.log('[NewItem] ✅ Picked', response.assets.length, 'images from gallery');
                }
            }
        );
    };

    const handlePickFromCamera = () => {
        setImagePickerModalVisible(false);
        launchCamera(
            {
                mediaType: 'photo',
                quality: 0.3,
                maxWidth: 600,
                maxHeight: 600,
                saveToPhotos: true,
            },
            (response) => {
                console.log('[NewItem] Camera response:', JSON.stringify(response));
                if (response.didCancel) {
                    console.log('[NewItem] User cancelled camera');
                    return;
                }
                if (response.errorCode) {
                    console.error('[NewItem] Camera error:', response.errorMessage);
                    showAlert('error', 'Camera Error', response.errorMessage || 'Could not open camera');
                    return;
                }
                if (response.assets) {
                    setPickedImages(prev => [...prev, ...response.assets!]);
                    console.log('[NewItem] ✅ Captured image from camera');
                }
            }
        );
    };

    const removePickedImage = (index: number) => {
        setPickedImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    // ──────────────────────────────────────────────
    // Save Logic — Build FormData
    // ──────────────────────────────────────────────

    const handleSave = async () => {
        if (!productName.trim() || !sellPrice.trim()) {
            showAlert('error', 'Required Fields', 'Please enter Product Name and Sell Price.');
            return;
        }

        const fd = new FormData();
        fd.append('name', productName);
        fd.append('sellPrice', sellPrice);
        if (mrp) fd.append('mrp', mrp);
        if (purchasePrice) fd.append('purchasePrice', purchasePrice);
        if (acSalePrice) fd.append('acSalePrice', acSalePrice);
        if (nonAcSellPrice) fd.append('nonAcSellPrice', nonAcSellPrice);
        if (onlineDelivery) fd.append('onlineDeliveryPrice', onlineDelivery);
        if (onlineSell) fd.append('onlinePrice', onlineSell);
        const catId = selectedCategory?.id || selectedCategory?._id;
        if (catId) fd.append('categoryId', catId);
        if (selectedUnit) fd.append('unit', selectedUnit);

        // Append new picked images as files
        pickedImages.forEach((img, index) => {
            fd.append('images', {
                uri: img.uri,
                type: img.type || 'image/jpeg',
                name: img.fileName || `image_${index}.jpg`,
            } as any);
        });

        console.log('[NewItem] handleSave | FormData built with', pickedImages.length, 'new images');
        console.log('[NewItem] handleSave | Fields:', { productName, sellPrice, mrp, purchasePrice, category: selectedCategory?.name, unit: selectedUnit });

        try {
            if (item) {
                await updateItem({ id: item.id || item._id, formData: fd }).unwrap();
                console.log('[NewItem] ✅ Item UPDATED successfully');
                showAlert('success', 'Success', 'Item updated successfully!', () => navigation.goBack());
            } else {
                await createItem(fd).unwrap();
                console.log('[NewItem] ✅ Item CREATED successfully');
                showAlert('success', 'Success', 'Item added to inventory!', () => navigation.goBack());
            }
        } catch (error: any) {
            console.error('[NewItem] ❌ Save FAILED:', JSON.stringify(error));
            showAlert('error', 'Failed', error.data?.message || 'Could not save item. Check your connection.');
        }
    };

    const isLoading = isCreating || isUpdating;
    const totalImages = existingImages.length + pickedImages.length;

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar backgroundColor="#1A73E8" barStyle="light-content" />

            {/* Header */}
            <View className="bg-[#1A73E8] pt-4 pb-4 px-4 flex-row items-center z-10 shadow-sm">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4 active:opacity-60">
                    <ArrowLeft color="#fff" size={24} />
                </TouchableOpacity>
                <View>
                    <Text className="text-white text-xl font-bold">{item ? 'Edit Item' : 'New Item'}</Text>
                    <Text className="text-indigo-200 text-xs mt-0.5">Manage your product details</Text>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
            >
                <ScrollView
                    ref={scrollRef}
                    className="flex-1 p-4"
                    contentContainerStyle={{ paddingBottom: 120 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* ─── Basic Info ─── */}
                    <Text className="text-slate-800 font-bold mb-3 ml-1">Basic Details</Text>

                    <FormInput
                        showLabel={false}
                        placeholder="Product/Service Name *"
                        value={productName}
                        onChangeText={setProductName}
                        onFocus={() => handleFocus(0)}
                        icon="mic"
                    />

                    <View className="flex-row space-x-3 w-full">
                        <View className="flex-1 mr-2">
                            <FormInput
                                showLabel={false}
                                placeholder="Sell Price *"
                                value={sellPrice}
                                onChangeText={setSellPrice}
                                onFocus={() => handleFocus(60)}
                            />
                        </View>
                        <View className="flex-1 ml-2">
                            <SelectorInput
                                showLabel={false}
                                placeholder="Item Unit"
                                value={selectedUnit}
                                onPress={() => setUnitModalVisible(true)}
                            />
                        </View>
                    </View>

                    <SelectorInput
                        showLabel={false}
                        placeholder="Select Item Category"
                        value={selectedCategory?.name}
                        onPress={() => setCategoryModalVisible(true)}
                    />

                    <View className="flex-row space-x-3 w-full">
                        <View className="flex-1 mr-2">
                            <FormInput
                                showLabel={false}
                                placeholder="MRP"
                                value={mrp}
                                onChangeText={setMrp}
                                onFocus={() => handleFocus(180)}
                            />
                        </View>
                        <View className="flex-1 ml-2">
                            <FormInput
                                showLabel={false}
                                placeholder="Purchase Price"
                                value={purchasePrice}
                                onChangeText={setPurchasePrice}
                                onFocus={() => handleFocus(180)}
                            />
                        </View>
                    </View>

                    {/* ─── Additional Pricing ─── */}
                    <Text className="text-slate-800 font-bold mb-3 mt-4 ml-1">Additional Pricing</Text>

                    <FormInput
                        label="AC Sale Price"
                        placeholder="0.00"
                        value={acSalePrice}
                        onChangeText={setAcSalePrice}
                        onFocus={() => handleFocus(350)}
                    />

                    <FormInput
                        label="Non AC Sell Price"
                        placeholder="0.00"
                        value={nonAcSellPrice}
                        onChangeText={setNonAcSellPrice}
                        onFocus={() => handleFocus(420)}
                    />

                    <FormInput
                        label="Online Delivery Sell Price"
                        placeholder="0.00"
                        value={onlineDelivery}
                        onChangeText={setOnlineDelivery}
                        onFocus={() => handleFocus(490)}
                    />

                    <FormInput
                        label="Online Sell Price"
                        placeholder="0.00"
                        value={onlineSell}
                        onChangeText={setOnlineSell}
                        onFocus={() => handleFocus(560)}
                    />

                    {/* ─── Product Images ─── */}
                    <View className="mt-6 mb-6">
                        <View className="flex-row justify-between items-center mb-3">
                            <Text className="text-slate-800 font-bold ml-1">
                                Product Images {totalImages > 0 ? `(${totalImages})` : ''}
                            </Text>
                            <TouchableOpacity
                                onPress={() => setImagePickerModalVisible(true)}
                                className="bg-blue-50 px-3 py-2 rounded-lg flex-row items-center active:bg-blue-100"
                            >
                                <Plus size={16} color="#1A73E8" />
                                <Text className="text-[#1A73E8] font-bold text-xs ml-1">ADD IMAGES</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Existing Server Images (edit mode) */}
                        {existingImages.length > 0 && (
                            <View>
                                <Text className="text-gray-400 text-xs mb-2 ml-1">Current Images</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
                                    {existingImages.map((uri, index) => (
                                        <View key={`existing-${index}`} className="mr-3 relative">
                                            <Image
                                                source={{ uri }}
                                                className="w-24 h-24 rounded-xl"
                                                resizeMode="cover"
                                            />
                                            <TouchableOpacity
                                                onPress={() => removeExistingImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center shadow-md"
                                            >
                                                <Text className="text-white text-xs font-bold">✕</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        )}

                        {/* Newly Picked Images */}
                        {pickedImages.length > 0 && (
                            <View>
                                <Text className="text-gray-400 text-xs mb-2 ml-1">New Images</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
                                    {pickedImages.map((img, index) => (
                                        <View key={`picked-${index}`} className="mr-3 relative">
                                            <Image
                                                source={{ uri: img.uri }}
                                                className="w-24 h-24 rounded-xl"
                                                resizeMode="cover"
                                            />
                                            <TouchableOpacity
                                                onPress={() => removePickedImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center shadow-md"
                                            >
                                                <Text className="text-white text-xs font-bold">✕</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        )}

                        {/* Empty State */}
                        {totalImages === 0 && (
                            <TouchableOpacity
                                onPress={() => setImagePickerModalVisible(true)}
                                className="bg-white border-2 border-dashed border-gray-200 rounded-2xl py-8 items-center justify-center active:bg-gray-50"
                            >
                                <View className="bg-blue-50 p-3 rounded-full mb-3">
                                    <ImageIcon size={28} color="#1A73E8" />
                                </View>
                                <Text className="text-gray-500 font-medium">Tap to add product images</Text>
                                <Text className="text-gray-400 text-xs mt-1">Camera or Gallery</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            {/* Floating Save Button */}
            <TouchableOpacity
                onPress={handleSave}
                disabled={isLoading}
                className={`absolute bottom-8 right-6 bg-[#1A73E8] rounded-full px-10 py-4 shadow-xl elevation-5 items-center justify-center flex-row ${isLoading ? 'opacity-70' : 'active:scale-95'}`}
            >
                {isLoading && <ActivityIndicator color="white" size="small" className="mr-2" />}
                <Text className="text-white font-bold text-lg tracking-wider">
                    {isLoading ? 'SAVING...' : 'SAVE ITEM'}
                </Text>
            </TouchableOpacity>

            {/* ─── Modals ─── */}
            <SelectionModal
                visible={categoryModalVisible}
                title="Select Category"
                data={categories}
                selectedValue={selectedCategory?.id || selectedCategory?._id}
                onSelect={(cat: any) => {
                    setSelectedCategory(cat);
                    setCategoryModalVisible(false);
                }}
                onClose={() => setCategoryModalVisible(false)}
            />

            <SelectionModal
                visible={unitModalVisible}
                title="Select Item Unit"
                data={units}
                selectedValue={selectedUnit}
                onSelect={(unit: any) => {
                    setSelectedUnit(unit);
                    setUnitModalVisible(false);
                }}
                onClose={() => setUnitModalVisible(false)}
            />

            {/* Image Picker Modal (Camera / Gallery chooser) */}
            <Modal
                visible={imagePickerModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setImagePickerModalVisible(false)}
            >
                <View className="flex-1 justify-end bg-black/50">
                    <View className="bg-white rounded-t-3xl p-6 pb-10">
                        <Text className="text-xl font-bold text-gray-800 mb-1">Add Images</Text>
                        <Text className="text-gray-400 text-sm mb-6">Choose how you want to add product images</Text>

                        <TouchableOpacity
                            onPress={handlePickFromCamera}
                            className="flex-row items-center bg-blue-50 p-4 rounded-2xl mb-3 active:bg-blue-100"
                        >
                            <View className="bg-[#1A73E8] p-3 rounded-full mr-4">
                                <Camera size={22} color="white" />
                            </View>
                            <View>
                                <Text className="text-slate-800 font-bold text-base">Take a Photo</Text>
                                <Text className="text-gray-400 text-xs">Open camera to capture image</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handlePickFromGallery}
                            className="flex-row items-center bg-purple-50 p-4 rounded-2xl mb-3 active:bg-purple-100"
                        >
                            <View className="bg-[#6C4EFF] p-3 rounded-full mr-4">
                                <ImageIcon size={22} color="white" />
                            </View>
                            <View>
                                <Text className="text-slate-800 font-bold text-base">Choose from Gallery</Text>
                                <Text className="text-gray-400 text-xs">Select multiple photos at once</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setImagePickerModalVisible(false)}
                            className="items-center p-4 mt-2 active:opacity-60"
                        >
                            <Text className="text-gray-500 font-semibold text-base">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* CustomAlert */}
            <CustomAlert
                visible={alertVisible}
                type={alertConfig.type}
                title={alertConfig.title}
                message={alertConfig.message}
                onClose={() => {
                    setAlertVisible(false);
                    if (alertConfig.onConfirm) alertConfig.onConfirm();
                }}
            />
        </SafeAreaView>
    );
}
