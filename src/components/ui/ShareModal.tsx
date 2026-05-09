import React from 'react';
import { Modal, Pressable, View, Text, TouchableOpacity } from 'react-native';
import {
  MessageCircle,
  Mail,
  Share2,
  X,
  Copy,
  ChevronRight,
  Download,
} from 'lucide-react-native';

export default function ShareModal({
  visible,
  onClose,
  onWhatsApp,
  onEmail,
  onSms,
  onMore,
  onCopyLink,
  onDownloadPdf,
}: {
  visible: boolean;
  onClose: () => void;
  onWhatsApp: () => void;
  onEmail: () => void;
  onSms: () => void;
  onMore: () => void;
  onCopyLink: () => void;
  onDownloadPdf: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/50 justify-end"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="bg-white rounded-t-[32px] pt-3 pb-8"
        >
          <View className="items-center mb-2">
            <View className="w-12 h-1.5 rounded-full bg-[#CBD5E1]" />
          </View>
          <View className="flex-row items-center justify-between px-6 py-3 border-b border-[#E2E8F0]">
            <Text className="text-[#0F172A] text-[20px] font-black">
              Share Invoice
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-9 h-9 rounded-full bg-[#F1F5F9] items-center justify-center"
            >
              <X size={18} color="#64748B" />
            </TouchableOpacity>
          </View>

          <View className="px-6 pt-4">
            <View className="flex-row flex-wrap justify-between mb-2">
              {[
                {
                  icon: MessageCircle,
                  label: 'WhatsApp',
                  color: '#25D366',
                  bg: '#DCFCE7',
                  onPress: onWhatsApp,
                },
                {
                  icon: Mail,
                  label: 'Email',
                  color: '#EA580C',
                  bg: '#FFEDD5',
                  onPress: onEmail,
                },
                {
                  icon: MessageCircle,
                  label: 'SMS',
                  color: '#3B82F6',
                  bg: '#DBEAFE',
                  onPress: onSms,
                },
                {
                  icon: Share2,
                  label: 'More',
                  color: '#7C3AED',
                  bg: '#EDE9FE',
                  onPress: onMore,
                },
              ].map((opt) => {
                const Icon = opt.icon;
                return (
                  <TouchableOpacity
                    key={opt.label}
                    onPress={opt.onPress}
                    className="items-center mb-4"
                    style={{ width: '23%' }}
                    activeOpacity={0.7}
                  >
                    <View
                      className="w-14 h-14 rounded-2xl items-center justify-center mb-1.5"
                      style={{ backgroundColor: opt.bg }}
                    >
                      <Icon size={24} color={opt.color} />
                    </View>
                    <Text className="text-[#0F172A] text-[12px] font-bold">
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="h-px bg-[#E2E8F0] my-1" />

            <TouchableOpacity
              onPress={onCopyLink}
              className="flex-row items-center py-4"
              activeOpacity={0.7}
            >
              <View className="w-10 h-10 rounded-xl bg-[#F1F5F9] items-center justify-center mr-3">
                <Copy size={20} color="#64748B" />
              </View>
              <View className="flex-1">
                <Text className="text-[#0F172A] font-extrabold text-[15px]">
                  Copy Link
                </Text>
                <Text className="text-[#64748B] text-[12px]">
                  Share invoice link anywhere
                </Text>
              </View>
              <ChevronRight size={20} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onDownloadPdf}
              className="flex-row items-center py-4"
              activeOpacity={0.7}
            >
              <View className="w-10 h-10 rounded-xl bg-[#FEF3C7] items-center justify-center mr-3">
                <Download size={20} color="#D97706" />
              </View>
              <View className="flex-1">
                <Text className="text-[#0F172A] font-extrabold text-[15px]">
                  Download PDF
                </Text>
                <Text className="text-[#64748B] text-[12px]">
                  Save to your device
                </Text>
              </View>
              <ChevronRight size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
