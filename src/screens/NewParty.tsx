// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     StatusBar,
// } from 'react-native';
// import { ArrowLeft, Mic, ChevronDown, Check } from 'lucide-react-native';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useGetPartyCategoriesQuery, useCreatePartyCategoryMutation } from '../redux/api/partyApi';


// const FloatingInput = React.memo(({
//     label,
//     value,
//     onChangeText,
//     multiline = false,
//     keyboardType = 'default',
// }) => {
//     const [isFocused, setIsFocused] = useState(false);

//     const { data, isLoading } = useGetPartyCategoriesQuery();

//     const categories = data?.data || [];

//     const dropdownData = [
//   { id: 'add', name: '➕ Add Category' }, // manual option
//   ...categories, // API categories
// ];

//     return (
//         <View className="mb-5">
//             {(isFocused || value) && (
//                 <Text className="absolute left-3 -top-2 bg-gray-100 px-1 text-xs text-[#4F46E5] z-10">
//                     {label}
//                 </Text>
//             )}

//             <View className="bg-white border border-gray-300 rounded-xl px-4 py-4 flex-row items-center">
//                 <TextInput
//                     value={value}
//                     onChangeText={onChangeText}
//                     onFocus={() => setIsFocused(true)}
//                     onBlur={() => setIsFocused(false)}
//                     placeholder={!isFocused ? label : ''}
//                     placeholderTextColor="#9CA3AF"
//                     multiline={multiline}
//                     keyboardType={keyboardType}
//                     className="flex-1 text-gray-800"
//                 />
//                 <Mic size={20} color="#6B7280" />
//             </View>
//         </View>
//     );
// });

// export default function NewParty() {
//     const navigation = useNavigation();

//     const [type, setType] = useState<'customer' | 'supplier'>('customer');
//     const [isTable, setIsTable] = useState(true);

//     const [name, setName] = useState('');
//     const [phone, setPhone] = useState('');
//     const [category, setCategory] = useState('');
//     const [address, setAddress] = useState('');

//     const [showDropdown, setShowDropdown] = useState(false);

//     const categories = [
//         { id: 'add', name: 'Add Category' },
//         { id: '1', name: 'Select' },
//         { id: '2', name: 'Fuzail Hussain' },
//         { id: '3', name: 'Sales' },
//     ];

//     return (
//         <SafeAreaView className="flex-1 bg-gray-100">
//             <StatusBar backgroundColor="#1A73E8" barStyle="light-content" />

//             {/* HEADER */}
//             <View className="bg-[#1A73E8] px-4 pt-5 pb-6 rounded-b-3xl">
//                 <View className="flex-row items-center">
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         <ArrowLeft color="#fff" size={24} />
//                     </TouchableOpacity>

//                     <View className="ml-3">
//                         <Text className="text-white text-xl font-bold">New Party</Text>

//                     </View>
//                 </View>
//             </View>

//             <ScrollView className="px-4 mt-6">

//                 {/* TOGGLE + CHECKBOX */}
//                 <View className="flex-row items-center justify-between mb-5">

//                     <View className="flex-row bg-white rounded-xl overflow-hidden border border-gray-300 w-[70%]">

//                         <TouchableOpacity
//                             onPress={() => setType('customer')}
//                             className={`flex-1 py-3 items-center ${type === 'customer' ? 'bg-[#1A73E8]' : ''}`}
//                         >
//                             <Text className={`${type === 'customer' ? 'text-white' : 'text-gray-700'} font-semibold`}>
//                                 CUSTOMER
//                             </Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             onPress={() => setType('supplier')}
//                             className={`flex-1 py-3 items-center ${type === 'supplier' ? 'bg-[#1A73E8]' : ''}`}
//                         >
//                             <Text className={`${type === 'supplier' ? 'text-white' : 'text-gray-700'} font-semibold`}>
//                                 SUPPLIER
//                             </Text>
//                         </TouchableOpacity>

//                     </View>

//                     <TouchableOpacity
//                         onPress={() => setIsTable(!isTable)}
//                         className="flex-row items-center"
//                     >
//                         <View className={`w-6 h-6 rounded-md mr-2 items-center justify-center ${isTable ? 'bg-[#4F46E5]' : 'border border-gray-400'}`}>
//                             {isTable && <Check color="#fff" size={16} />}
//                         </View>
//                         <Text>Table</Text>
//                     </TouchableOpacity>

//                 </View>

//                 {/* NAME */}
//                 <FloatingInput
//                     label="Customer/Supplier Name"
//                     value={name}
//                     onChangeText={setName}
//                 />

//                 {/* PHONE */}
//                 <FloatingInput
//                     label="Phone Number"
//                     value={phone}
//                     onChangeText={setPhone}
//                     keyboardType="numeric"
//                 />

//                 {/* CATEGORY */}
// <View className="mb-5">

//   {(category) && (
//     <Text className="absolute left-3 -top-2 bg-gray-100 px-1 text-xs text-[#1A73E8] z-10">
//       Select Party Category
//     </Text>
//   )}

//   <TouchableOpacity
//     onPress={() => setShowDropdown(!showDropdown)}
//     className="bg-white border border-gray-300 rounded-xl px-4 py-4 flex-row items-center"
//   >
//     <Text className={`flex-1 ${category ? 'text-gray-800' : 'text-gray-400'}`}>
//       {category || 'Select Party Category'}
//     </Text>

//     <ChevronDown size={20} color="#6B7280" />
//   </TouchableOpacity>

//   {showDropdown && (
//     <View className="bg-white mt-2 rounded-xl shadow-md border border-gray-200">

//       {dropdownData.map((item) => (
//         <TouchableOpacity
//           key={item.id}
//           onPress={() => {
//             setShowDropdown(false);

//             if (item.id === 'add') {
//               navigation.navigate('NewPartyCategory');
//             } else {
//               setCategory(item.name);
//             }
//           }}
//           className="p-4 border-b border-gray-100"
//         >
//           <Text
//             className={`${
//               item.id === 'add'
//                 ? 'text-[#1A73E8] font-semibold'
//                 : 'text-gray-800'
//             }`}
//           >
//             {item.name}
//           </Text>
//         </TouchableOpacity>
//       ))}

//     </View>
//   )}

// </View>

//                 {/* ADDRESS */}
//                 <FloatingInput
//                     label="Billing Address"
//                     value={address}
//                     onChangeText={setAddress}
//                     multiline
//                 />

//             </ScrollView>

//             {/* SAVE BUTTON */}
//             <TouchableOpacity className="absolute bottom-6 right-6 bg-[#1A73E8] px-12 py-4 rounded-full shadow-lg">
//                 <Text className="text-white font-semibold tracking-widest">
//                     SAVE
//                 </Text>
//             </TouchableOpacity>

//         </SafeAreaView>
//     );
// }





import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { ArrowLeft, Mic, ChevronDown, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetPartiesQuery, useGetPartyCategoriesQuery, useCreatePartyMutation } from '../redux/api/partyApi';

const FloatingInput = React.memo(({
  label,
  value,
  onChangeText,
  multiline = false,
  keyboardType = 'default',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-5">
      {(isFocused || value) && (
        <Text className="absolute left-3 -top-2 bg-gray-100 px-1 text-xs text-[#1A73E8] z-10">
          {label}
        </Text>
      )}

      <View className="bg-white border border-gray-300 rounded-xl px-4 py-4 flex-row items-center">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={!isFocused ? label : ''}
          placeholderTextColor="#9CA3AF"
          multiline={multiline}
          keyboardType={keyboardType}
          className="flex-1 text-gray-800"
        />
        {/* <Mic size={20} color="#6B7280" /> */}
      </View>
    </View>
  );
});

export default function NewParty() {
  const navigation = useNavigation();

  const [type, setType] = useState<'customer' | 'salesman'>('customer');
  const [isTable, setIsTable] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ API CALLS
  const { data: catData } = useGetPartyCategoriesQuery();
  const [createParty, { isLoading: isSaving }] = useCreatePartyMutation();

  // Handle various API response shapes
  const apiCategories = Array.isArray(catData)
    ? catData
    : catData?.data || catData?.partyCategories || catData?.categories || [];

  // ✅ NORMALIZE
  const normalizedCategories = apiCategories
    .map((cat: any, index: number) => ({
      id: cat.id || cat._id || `cat-${index}`,
      name: cat.name || cat.category_name || 'Unnamed',
    }));

  // ✅ MERGE DATA
  const dropdownData = [
    { id: 'add', name: '➕ Add Category' },
    ...normalizedCategories,
  ];

  const handleSave = async () => {
    if (!name || !phone) {
      Alert.alert('Error', 'Please fill Name and Phone Number');
      return;
    }

    try {
      const payload = {
        name,
        phone,
        type,
        is_table: isTable,
        category_id: selectedCategoryId,
        billing_address: address,
        billing_type: 'regular', // Default based on Postman
      };

      await createParty(payload).unwrap();
      Alert.alert('Success', 'Party created successfully');
      navigation.goBack();
    } catch (err: any) {
      console.log('❌ Error creating party:', err);
      Alert.alert('Error', err?.data?.message || 'Failed to create party');
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
            <Text className="text-white text-xl font-bold">New Party</Text>
          </View>
        </View>
      </View>

      <ScrollView className="px-4 mt-6">

        {/* TOGGLE */}
        <View className="flex-row items-center justify-between mb-5">

          <View className="flex-row bg-white rounded-xl overflow-hidden border border-gray-300 w-[70%]">
            <TouchableOpacity
              onPress={() => setType('customer')}
              className={`flex-1 py-3 items-center ${type === 'customer' ? 'bg-[#1A73E8]' : ''}`}
            >
              <Text className={`${type === 'customer' ? 'text-white' : 'text-gray-700'} font-semibold`}>
                CUSTOMER
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setType('salesman')}
              className={`flex-1 py-3 items-center ${type === 'salesman' ? 'bg-[#1A73E8]' : ''}`}
            >
              <Text className={`${type === 'salesman' ? 'text-white' : 'text-gray-700'} font-semibold`}>
                Sales Man
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => setIsTable(!isTable)}
            className="flex-row items-center"
          >
            <View className={`w-6 h-6 rounded-md mr-2 items-center justify-center ${isTable ? 'bg-[#1A73E8]' : 'border border-gray-400'}`}>
              {isTable && <Check color="#fff" size={16} />}
            </View>
            <Text>Table</Text>
          </TouchableOpacity>

        </View>

        {/* INPUTS */}
        <FloatingInput
          label="Customer/Salesman Name"
          value={name}
          onChangeText={setName}
        />

        <FloatingInput
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
        />

        {/* CATEGORY DROPDOWN */}
        <View className="mb-5">

          {(category) && (
            <Text className="absolute left-3 -top-2 bg-gray-100 px-1 text-xs text-[#1A73E8] z-10">
              Select Party Category
            </Text>
          )}

          <TouchableOpacity
            onPress={() => setShowDropdown(!showDropdown)}
            className="bg-white border border-gray-300 rounded-xl px-4 py-4 flex-row items-center"
          >
            <Text className={`flex-1 ${category ? 'text-gray-800' : 'text-gray-400'}`}>
              {category || 'Select Party Category'}
            </Text>
            <ChevronDown size={20} color="#6B7280" />
          </TouchableOpacity>

          {showDropdown && (
            <View className="bg-white mt-2 rounded-xl shadow-md border border-gray-200">

              {dropdownData.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setShowDropdown(false);

                    if (item.id === 'add') {
                      navigation.navigate('NewPartyCategory', { type });
                    } else {
                      setCategory(item.name);
                      setSelectedCategoryId(item.id.toString());
                    }
                  }}
                  className="p-4 border-b border-gray-100"
                >
                  <Text className={`${item.id === 'add' ? 'text-[#1A73E8] font-semibold' : 'text-gray-800'}`}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}

            </View>
          )}

        </View>

        <FloatingInput
          label="Billing Address"
          value={address}
          onChangeText={setAddress}
          multiline
        />

      </ScrollView>

      {/* SAVE */}
      <TouchableOpacity 
        onPress={handleSave}
        disabled={isSaving}
        className={`absolute bottom-6 right-6 bg-[#1A73E8] px-12 py-4 rounded-full shadow-lg ${isSaving ? 'opacity-50' : ''}`}
      >
        <Text className="text-white font-semibold tracking-widest">
          {isSaving ? 'SAVING...' : 'SAVE'}
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
