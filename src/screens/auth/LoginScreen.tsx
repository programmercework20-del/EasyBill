import React, { useState } from 'react';
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
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react-native';
import { useLoginMutation } from '../../redux/api/authApi';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../../components/CustomAlert';

const PRIMARY = "#1A73E8";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigation = useNavigation<any>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: 'info',
    title: '',
    message: '',
  });

    const showAlert = (type: any, title: any, message: any) => {
        setAlertConfig({ type, title, message });
        setAlertVisible(true);
    };

    const handleLogin = async () => {
    if (!email || !password) {
      // Alert.alert("Error", "Please fill all fields");
      showAlert('error', 'Error', 'Please fill all fields');
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();
      console.log('Login Result:', result);
      if (result.success) {
        navigation.replace('Drawer');
      } else {
        // Alert.alert("Login Failed", result.message || "Invalid credentials");
        showAlert('error', 'Login Failed', result.message || "Invalid credentials");
      }
    } catch (err: any) {
      console.error('Login Error:', err);
      // Alert.alert("Error", err.data?.message || "Something went wrong");
      showAlert('error', 'Error', err.data?.message || "Something went wrong");
    }
  };

  return (
    // <SafeAreaView className="flex-1 bg-white">
    //   <KeyboardAvoidingView
    //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //     className="flex-1"
    //   >
    //     <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-10">
    //       <View className="mb-10">
    //         <Text className="text-4xl font-bold text-slate-900 mb-2">Welcome Back</Text>
    //         <Text className="text-slate-500 text-lg">Sign in to continue billing</Text>
    //       </View>

    //       <View className="space-y-6">
    //         {/* Email Field */}
    //         <View>
    //           <Text className="text-slate-700 font-semibold mb-2 ml-1">Email Address</Text>
    //           <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-1">
    //             <Mail size={20} color="#64748b" />
    //             <TextInput
    //               placeholder="name@company.com"
    //               placeholderTextColor="#94a3b8"
    //               className="flex-1 h-12 ml-3 text-slate-900"
    //               value={email}
    //               onChangeText={setEmail}
    //               autoCapitalize="none"
    //               keyboardType="email-address"
    //             />
    //           </View>
    //         </View>

    //         {/* Password Field */}
    //         <View className="mt-4">
    //           <Text className="text-slate-700 font-semibold mb-2 ml-1">Password</Text>
    //           <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-1">
    //             <Lock size={20} color="#64748b" />
    //             <TextInput
    //               placeholder="••••••••"
    //               placeholderTextColor="#94a3b8"
    //               className="flex-1 h-12 ml-3 text-slate-900"
    //               value={password}
    //               onChangeText={setPassword}
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

    //         <TouchableOpacity className="items-end mt-2">
    //           <Text style={{ color: PRIMARY }} className="font-semibold">Forgot Password?</Text>
    //         </TouchableOpacity>

    //         <TouchableOpacity
    //           onPress={handleLogin}
    //           disabled={isLoading}
    //           style={{ backgroundColor: PRIMARY }}
    //           className="mt-8 h-14 rounded-2xl flex-row items-center justify-center shadow-lg shadow-blue-500/30"
    //         >
    //           {isLoading ? (
    //             <ActivityIndicator color="white" />
    //           ) : (
    //             <>
    //               <Text className="text-white font-bold text-lg mr-2">Login</Text>
    //               <ArrowRight size={20} color="white" />
    //             </>
    //           )}
    //         </TouchableOpacity>
    //       </View>

    //       <View className="flex-1 justify-end items-center mt-10">
    //         <View className="flex-row">
    //           <Text className="text-slate-500">Don't have an account? </Text>
    //           <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
    //             <Text style={{ color: PRIMARY }} className="font-bold">Sign Up</Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </ScrollView>
    //   </KeyboardAvoidingView>
    // </SafeAreaView>

    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-10">

          {/* HEADER */}
          <View className="mb-10">
            <Text className="text-4xl font-extrabold text-slate-900 mb-2">
              Welcome Back
            </Text>
            <Text className="text-slate-500 text-base">
              Sign in to continue billing
            </Text>
          </View>

          {/* CARD CONTAINER */}
          <View className="bg-white rounded-3xl p-5 shadow-xl shadow-slate-200 border border-slate-100">

            {/* Email */}
            <View className="mb-5">
              <Text className="text-slate-700 font-semibold mb-2 ml-1">
                Email Address
              </Text>

              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 h-14 focus-within:border-blue-500">
                <Mail size={20} color="#64748b" />
                <TextInput
                  placeholder="name@company.com"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-3 text-slate-900 text-base"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password */}
            <View className="mb-2">
              <Text className="text-slate-700 font-semibold mb-2 ml-1">
                Password
              </Text>

              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 h-14">
                <Lock size={20} color="#64748b" />
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-3 text-slate-900 text-base"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot */}
            <TouchableOpacity className="items-end mt-3" onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={{ color: PRIMARY }} className="font-semibold text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* LOGIN BUTTON */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              style={{ backgroundColor: PRIMARY }}
              className="mt-6 h-14 rounded-xl flex-row items-center justify-center active:scale-95 shadow-lg shadow-blue-500/40"
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text className="text-white font-bold text-lg mr-2">
                    Login
                  </Text>
                  <ArrowRight size={20} color="white" />
                </>
              )}
            </TouchableOpacity>

          </View>

          {/* FOOTER */}
          <View className="flex-1 justify-end items-center mt-10">
            <View className="flex-row">
              <Text className="text-slate-500">Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{ color: PRIMARY }} className="font-bold">
                  Sign Up
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
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>

  );
}
