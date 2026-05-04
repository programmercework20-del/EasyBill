import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Phone, Lock, Briefcase, Store, ArrowRight, Eye, EyeOff } from 'lucide-react-native';
import { useRegisterMutation } from '../../redux/api/authApi';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../../components/CustomAlert';

const PRIMARY = "#1A73E8";

export default function SignupScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    businessName: '',
    businessType: '',
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: 'info',
    title: '',
    message: '',
    onConfirm: null as any,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();
  const navigation = useNavigation<any>();
  const scrollRef = useRef<ScrollView>(null);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

    const showAlert = (type, title, message, onConfirm = null) => {
  setAlertConfig({ type, title, message, onConfirm });
  setAlertVisible(true);
};

  const handleSignup = async () => {
    const { fullName, email, phone, password, businessName, businessType } = formData;

    if (!fullName || !email || !phone || !password || !businessName || !businessType) {
      // Alert.alert("Error", "Please fill all fields");
      showAlert('error', 'Error', 'Please fill all fields');  
      return;
    }

    try {
      const result = await register(formData).unwrap();
      console.log('Registration Result:', result);
      if (result.success) {
        // Alert.alert("Success", "Account created successfully", [
        //   { text: "Login Now", onPress: () => navigation.navigate('Login') }
        // ]);
        showAlert(
  'success',
  'Success',
  'Account created successfully',
  () => navigation.replace('Login') // 🔥 redirect here
);
      } else {
        // Alert.alert("Registration Failed", result.message || "Something went wrong");
        showAlert('error', 'Registration Failed', result.message || "Something went wrong");
      }
    } catch (err: any) {
      console.error('Registration Error:', err);
      // Alert.alert("Error", err.data?.message || "Registration failed. Please try again.");
      showAlert('error', 'Error', err.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleFocus = (y: number) => {
  scrollRef.current?.scrollTo({
    y: y - 300,
    animated: true,
  });
};

  return (
    // <SafeAreaView className="flex-1 bg-white">
    //   <KeyboardAvoidingView
    //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //     className="flex-1"
    //   >
    //     <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-6">
    //       <View className="mb-8">
    //         <Text className="text-4xl font-bold text-slate-900 mb-2">Create Account</Text>
    //         <Text className="text-slate-500 text-lg">Join EasyBill and manage your business</Text>
    //       </View>

    //       <View className="space-y-4">
    //         {/* Full Name */}
    //         <View>
    //           <Text className="text-slate-700 font-semibold mb-1.5 ml-1">Full Name</Text>
    //           <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-0.5">
    //             <User size={18} color="#64748b" />
    //             <TextInput
    //               placeholder="Your Full Name"
    //               placeholderTextColor="#94a3b8"
    //               className="flex-1 h-11 ml-3 text-slate-900"
    //               value={formData.fullName}
    //               onChangeText={(val) => handleChange('fullName', val)}
    //             />
    //           </View>
    //         </View>

    //         {/* Email */}
    //         <View className="mt-3">
    //           <Text className="text-slate-700 font-semibold mb-1.5 ml-1">Email Address</Text>
    //           <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-0.5">
    //             <Mail size={18} color="#64748b" />
    //             <TextInput
    //               placeholder="avesh@gmail.com"
    //               placeholderTextColor="#94a3b8"
    //               className="flex-1 h-11 ml-3 text-slate-900"
    //               value={formData.email}
    //               onChangeText={(val) => handleChange('email', val)}
    //               autoCapitalize="none"
    //               keyboardType="email-address"
    //             />
    //           </View>
    //         </View>

    //         {/* Phone */}
    //         <View className="mt-3">
    //           <Text className="text-slate-700 font-semibold mb-1.5 ml-1">Phone Number</Text>
    //           <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-0.5">
    //             <Phone size={18} color="#64748b" />
    //             <TextInput
    //               placeholder="9518795065"
    //               placeholderTextColor="#94a3b8"
    //               className="flex-1 h-11 ml-3 text-slate-900"
    //               value={formData.phone}
    //               onChangeText={(val) => handleChange('phone', val)}
    //               keyboardType="phone-pad"
    //             />
    //           </View>
    //         </View>

    //         {/* Password */}
    //         <View className="mt-3">
    //           <Text className="text-slate-700 font-semibold mb-1.5 ml-1">Password</Text>
    //           <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-0.5">
    //             <Lock size={18} color="#64748b" />
    //             <TextInput
    //               placeholder="••••••••"
    //               placeholderTextColor="#94a3b8"
    //               className="flex-1 h-11 ml-3 text-slate-900"
    //               value={formData.password}
    //               onChangeText={(val) => handleChange('password', val)}
    //               secureTextEntry={!showPassword}
    //             />
    //             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    //               {showPassword ? (
    //                 <EyeOff size={20} color="#64748b" />
    //               ) : (
    //                 <Eye size={20} color="#64748b" />
    //               )}
    //             </TouchableOpacity>
    //           </View>
    //         </View>

    //         {/* Business Name */}
    //         <View className="mt-3">
    //           <Text className="text-slate-700 font-semibold mb-1.5 ml-1">Business Name</Text>
    //           <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-0.5">
    //             <Store size={18} color="#64748b" />
    //             <TextInput
    //               placeholder="EasyBean Shop"
    //               placeholderTextColor="#94a3b8"
    //               className="flex-1 h-11 ml-3 text-slate-900"
    //               value={formData.businessName}
    //               onChangeText={(val) => handleChange('businessName', val)}
    //             />
    //           </View>
    //         </View>

    //         {/* Business Type */}
    //         <View className="mt-3">
    //           <Text className="text-slate-700 font-semibold mb-1.5 ml-1">Business Type</Text>
    //           <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-0.5">
    //             <Briefcase size={18} color="#64748b" />
    //             <TextInput
    //               placeholder="Clothing Shop"
    //               placeholderTextColor="#94a3b8"
    //               className="flex-1 h-11 ml-3 text-slate-900"
    //               value={formData.businessType}
    //               onChangeText={(val) => handleChange('businessType', val)}
    //             />
    //           </View>
    //         </View>

    //         <TouchableOpacity
    //           onPress={handleSignup}
    //           disabled={isLoading}
    //           style={{ backgroundColor: PRIMARY }}
    //           className="mt-8 h-14 rounded-2xl flex-row items-center justify-center shadow-lg shadow-blue-500/30"
    //         >
    //           {isLoading ? (
    //             <ActivityIndicator color="white" />
    //           ) : (
    //             <>
    //               <Text className="text-white font-bold text-lg mr-2">Create Account</Text>
    //               <ArrowRight size={20} color="white" />
    //             </>
    //           )}
    //         </TouchableOpacity>
    //       </View>

    //       <View className="items-center mt-8 mb-4">
    //         <View className="flex-row">
    //           <Text className="text-slate-500">Already have an account? </Text>
    //           <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    //             <Text style={{ color: PRIMARY }} className="font-bold">Login</Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </ScrollView>
    //   </KeyboardAvoidingView>
    // </SafeAreaView>
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 200 }}
          keyboardShouldPersistTaps="handled"
          className="px-6 py-6"
        > 

          {/* HEADER */}
          <View className="mb-8">
            <Text className="text-4xl font-extrabold text-slate-900 mb-2">
              Create Account
            </Text>
            <Text className="text-slate-500 text-base">
              Start managing your business smartly
            </Text>
          </View>

          {/* CARD */}
          <View className="bg-white rounded-3xl p-5 shadow-xl shadow-slate-200 border border-slate-100">

            {/* USER INFO */}
            <Text className="text-slate-800 font-bold mb-3">Personal Info</Text>

            {/* Full Name */}
            <View className="mb-4">
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 h-14">
                <User size={18} color="#64748b" />
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-3 text-slate-900"
                  onFocus={() => handleFocus(250)}   
                  value={formData.fullName}
                  onChangeText={(val) => handleChange('fullName', val)}
                />
              </View>
            </View>

            {/* Email */}
            <View className="mb-4">
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 h-14">
                <Mail size={18} color="#64748b" />
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-3 text-slate-900"
                  onFocus={() => handleFocus(350)}
                  value={formData.email}
                  onChangeText={(val) => handleChange('email', val)}
                />
              </View>
            </View>

            {/* Phone */}
            <View className="mb-4">
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 h-14">
                <Phone size={18} color="#64748b" />
                <TextInput
                  placeholder="Phone Number"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-3 text-slate-900"
                  onFocus={() => handleFocus(450)}
                  value={formData.phone}
                  onChangeText={(val) => handleChange('phone', val)}
                />
              </View>
            </View>

            {/* Password */}
            <View className="mb-5">
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 h-14">
                <Lock size={18} color="#64748b" />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-3 text-slate-900"
                  value={formData.password}
                  onFocus={() => handleFocus(550)}
                  onChangeText={(val) => handleChange('password', val)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
                </TouchableOpacity>
              </View>
            </View>

            {/* BUSINESS SECTION */}
            <Text className="text-slate-800 font-bold mb-3 mt-2">Business Info</Text>

            {/* Business Name */}
            <View className="mb-4">
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 h-14">
                <Store size={18} color="#64748b" />
                <TextInput
                  placeholder="Business Name"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-3 text-slate-900"
                  value={formData.businessName}
                  onFocus={() => handleFocus(750)}
                  onChangeText={(val) => handleChange('businessName', val)}
                />
              </View>
            </View>

            {/* Business Type */}
            <View className="mb-6">
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 h-14">
                <Briefcase size={18} color="#64748b" />
                <TextInput
                  placeholder="Business Type"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-3 text-slate-900"
                  onFocus={() => handleFocus(850)}  
                  value={formData.businessType}
                  onChangeText={(val) => handleChange('businessType', val)}
                />
              </View>
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              onPress={handleSignup}
              disabled={isLoading}
              style={{ backgroundColor: PRIMARY }}
              className="h-14 rounded-xl flex-row items-center justify-center active:scale-95 shadow-lg shadow-blue-500/40"
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text className="text-white font-bold text-lg mr-2">
                    Create Account
                  </Text>
                  <ArrowRight size={20} color="white" />
                </>
              )}
            </TouchableOpacity>

          </View>

          {/* FOOTER */}
          <View className="items-center mt-8">
            <View className="flex-row">
              <Text className="text-slate-500">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: PRIMARY }} className="font-bold">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
 <CustomAlert
  visible={alertVisible}
  type={alertConfig.type}
  title={alertConfig.title}
  message={alertConfig.message}
  onClose={() => {
    setAlertVisible(false);
    alertConfig.onConfirm?.(); // 🔥 executes redirect
  }}
/>
    </SafeAreaView>
  );
}
