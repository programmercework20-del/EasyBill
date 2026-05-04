import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, KeyRound, ArrowRight, EyeOff, Eye } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../../components/CustomAlert';

const PRIMARY = "#1A73E8";

export default function ForgotPasswordScreen() {
    const navigation = useNavigation<any>();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        type: 'info',
        title: '',
        message: '',
    });


    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // 🔹 Fake API handlers (replace with real)
    const sendOTP = async () => {
        if (!email) return showAlert('error', 'Error', 'Enter email');

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
            // Alert.alert("OTP Sent", "Check your email");
            showAlert('success', 'OTP Sent', 'Check your email');
        }, 1000);
    };

    const showAlert = (type: any, title: any, message: any) => {
        setAlertConfig({ type, title, message });
        setAlertVisible(true);
    };

    const verifyOTP = async () => {
        // if (!otp) return Alert.alert("Error", "Enter OTP");
        if (!otp) return showAlert('error', 'Error', 'Enter OTP');

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 1000);
    };

    const resetPassword = async () => {
        if (!password || !confirmPassword)
            // return Alert.alert("Error", "Fill all fields");
            return showAlert('error', 'Error', 'Fill all fields');

        if (password !== confirmPassword)
            // return Alert.alert("Error", "Passwords do not match");
            return showAlert('error', 'Error', 'Passwords do not match');

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // showAlert("Success", "Password Updated", () => {
            //     navigation.replace('Login');
            // });
            showAlert('success', 'Password Updated', 'Your password has been updated');
            // Alert.alert("Success", "Password Updated", [
            //     { text: "Login", onPress: () => navigation.replace('Login') }
            // ]);
        }, 1000);
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-6 py-6">

            {/* HEADER */}
            <View className="mb-8">
                <Text className="text-3xl font-extrabold text-slate-900">
                    Forgot Password 🔐
                </Text>
                <Text className="text-slate-500 mt-2">
                    Step {step} of 3
                </Text>
            </View>

            {/* CARD */}
            <View className="bg-white rounded-3xl p-5 shadow-xl shadow-slate-200 border border-slate-100">

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        <Text className="text-slate-700 font-semibold mb-3">
                            Enter your registered email
                        </Text>

                        <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 h-14 mb-5">
                            <Mail size={18} color="#64748b" />
                            <TextInput
                                placeholder="Email Address"
                                placeholderTextColor="#94a3b8"
                                className="flex-1 ml-3 text-slate-900"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={sendOTP}
                            style={{ backgroundColor: PRIMARY }}
                            className="h-14 rounded-xl flex-row items-center justify-center"
                        >
                            {loading ? <ActivityIndicator color="white" /> : (
                                <>
                                    <Text className="text-white font-bold mr-2">Send OTP</Text>
                                    <ArrowRight color="white" size={20} />
                                </>
                            )}
                        </TouchableOpacity>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <>
                        <Text className="text-slate-700 font-semibold mb-3">
                            Enter OTP sent to your email
                        </Text>

                        <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 h-14 mb-5">
                            <KeyRound size={18} color="#64748b" />
                            <TextInput
                                placeholder="Enter OTP"
                                placeholderTextColor="#94a3b8"
                                className="flex-1 ml-3 text-slate-900"
                                value={otp}
                                onChangeText={setOtp}
                                keyboardType="number-pad"
                            />
                        </View>

                        <TouchableOpacity
                            onPress={verifyOTP}
                            style={{ backgroundColor: PRIMARY }}
                            className="h-14 rounded-xl flex-row items-center justify-center"
                        >
                            {loading ? <ActivityIndicator color="white" /> : (
                                <>
                                    <Text className="text-white font-bold mr-2">Verify OTP</Text>
                                    <ArrowRight color="white" size={20} />
                                </>
                            )}
                        </TouchableOpacity>
                    </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <>
                        <Text className="text-slate-700 font-semibold mb-3">
                            Set new password
                        </Text>

                        <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 h-14 mb-4">
                            <Lock size={18} color="#64748b" />
                            <TextInput
                                placeholder="New Password"
                                placeholderTextColor="#94a3b8"
                                className="flex-1 ml-3 text-slate-900"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showNewPassword}
                            />

                            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                                {showNewPassword ? (
                                    <EyeOff size={20} color="#64748b" />
                                ) : (
                                    <Eye size={20} color="#64748b" />
                                )}
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 h-14 mb-5">
                            <Lock size={18} color="#64748b" />
                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor="#94a3b8"
                                className="flex-1 ml-3 text-slate-900"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                            />

                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? (
                                    <EyeOff size={20} color="#64748b" />
                                ) : (
                                    <Eye size={20} color="#64748b" />
                                )}
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={resetPassword}
                            style={{ backgroundColor: PRIMARY }}
                            className="h-14 rounded-xl flex-row items-center justify-center"
                        >
                            {loading ? <ActivityIndicator color="white" /> : (
                                <>
                                    <Text className="text-white font-bold mr-2">Set Password</Text>
                                    <ArrowRight color="white" size={20} />
                                </>
                            )}
                        </TouchableOpacity>
                    </>
                )}

            </View>

            {/* FOOTER */}
            <View className="mt-8 items-center">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text className="text-slate-500">Back to Login</Text>
                </TouchableOpacity>
            </View>

            <CustomAlert
  visible={alertVisible}
  type={alertConfig.type}
  title={alertConfig.title}
  message={alertConfig.message}
  onClose={() => {
    setAlertVisible(false);

    if (alertConfig.title === 'Password Updated') {
      navigation.replace('Login');
    }
  }}
/>

        </SafeAreaView>
    );
}