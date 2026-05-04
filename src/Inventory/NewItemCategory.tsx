import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { ArrowLeft, Mic } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ✅ RTK API
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../redux/api/inventoryApi';

// ✅ SLICE
import { useDispatch } from 'react-redux';
import { setFilterCategory } from '../redux/slices/inventorySlice';
import CustomAlert from '../components/CustomAlert';

export default function NewItemCategory() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  
  const { category } = route.params || {};
  const isEditing = !!category;

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: 'info' as 'success' | 'error' | 'info',
    title: '',
    message: '',
  });

  const [categoryName, setCategoryName] = useState(category?.name || '');

  // ✅ mutation hooks
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const isLoading = isCreating || isUpdating;

  const showAlert = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    setAlertConfig({ type, title, message });
    setAlertVisible(true);
  };

  const handleSave = async () => {
    if (!categoryName.trim()) {
      showAlert('error', 'Validation Error', 'Please enter category name');
      return;
    }

    console.log('[NewItemCategory] Saving category:', categoryName);

    try {
      if (isEditing) {
        const res = await updateCategory({
          id: category.id || category._id,
          name: categoryName,
        }).unwrap();
        console.log('[NewItemCategory] ✅ Category updated:', JSON.stringify(res));
        showAlert('success', 'Success', 'Category updated successfully!');
      } else {
        const res = await createCategory({
          name: categoryName,
        }).unwrap();
        console.log('[NewItemCategory] ✅ Category created:', JSON.stringify(res));
        dispatch(setFilterCategory(res.data?.id || res.data?._id));
        showAlert('success', 'Success', 'Category created successfully!');
      }
    } catch (error: any) {
      console.error('[NewItemCategory] ❌ Failed:', JSON.stringify(error));
      showAlert('error', 'Error', error.data?.message || 'Failed to save category');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar backgroundColor="#1A73E8" barStyle="light-content" />

      {/* Header */}
      <View className="bg-[#1A73E8] pt-4 pb-4 px-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <View>
          <Text className="text-white text-xl font-bold">
            {isEditing ? 'Update Category' : 'New Item Category'}
          </Text>
        </View>
      </View>

      {/* Form */}
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

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        disabled={isLoading}
        className="absolute bottom-6 right-6 bg-[#1A73E8] rounded-full px-8 py-3 shadow-lg items-center"
      >
        <Text className="text-white font-medium text-base">
          {isLoading ? (isEditing ? 'Updating...' : 'Saving...') : (isEditing ? 'UPDATE' : 'SAVE')}
        </Text>
      </TouchableOpacity>

      <CustomAlert
        visible={alertVisible}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => {
          setAlertVisible(false);
          if (alertConfig.type === 'success') {
            navigation.goBack();
          }
        }}
      />
    </SafeAreaView>
  );
}