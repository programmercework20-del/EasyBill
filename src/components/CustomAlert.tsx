import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { CheckCircle, AlertCircle, Info } from 'lucide-react-native';

const PRIMARY = "#1A73E8";

export default function CustomAlert({
  visible,
  type = 'info',
  title,
  message,
  onClose,
  onCancel,
  confirmText = 'Okay',
  cancelText = 'Cancel',
}: {
  visible: boolean;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  onClose: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}) {

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={42} color={PRIMARY} />;
      case 'error': return <AlertCircle size={42} color="#E11D24" />;
      case 'info': return <Info size={42} color={PRIMARY} />;
      default: return <Info size={42} color={PRIMARY} />;
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      
      {/* Overlay */}
      <View className="flex-1 bg-black/50 items-center justify-center px-6">

        {/* Card */}
        <View className="w-full bg-white rounded-3xl p-6 shadow-2xl shadow-black/20 border border-slate-100">

          {/* Icon */}
          <View className="items-center mb-4">
            <View className="bg-blue-50 p-4 rounded-full">
              {getIcon()}
            </View>
          </View>

          {/* Title */}
          <Text className="text-xl font-bold text-slate-900 text-center mb-2">
            {title}
          </Text>

          {/* Message */}
          <Text className="text-slate-500 text-center mb-6 leading-5">
            {message}
          </Text>

          {/* Buttons */}
          {onCancel ? (
            <View className="flex-row justify-between gap-3">

              {/* Cancel */}
              <TouchableOpacity
                onPress={onCancel}
                className="flex-1 h-12 rounded-xl bg-slate-100 items-center justify-center active:scale-95"
              >
                <Text className="text-slate-600 font-semibold">
                  {cancelText}
                </Text>
              </TouchableOpacity>

              {/* Confirm */}
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 h-12 rounded-xl items-center justify-center active:scale-95"
                style={{ backgroundColor: PRIMARY }}
              >
                <Text className="text-white font-semibold">
                  {confirmText}
                </Text>
              </TouchableOpacity>

            </View>
          ) : (

            <TouchableOpacity
              onPress={onClose}
              className="h-12 rounded-xl items-center justify-center active:scale-95"
              style={{ backgroundColor: PRIMARY }}
            >
              <Text className="text-white font-semibold">
                {confirmText}
              </Text>
            </TouchableOpacity>

          )}

        </View>
      </View>
    </Modal>
  );
}