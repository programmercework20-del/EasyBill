import React, { useState } from 'react';
import { Modal, Pressable, View, Text, TouchableOpacity } from 'react-native';
import { Sparkles, Star } from 'lucide-react-native';
import PrimaryButton from './PrimaryButton';

const WARNING = '#EAB308';
const PRIMARY = '#1A73E8';

export default function RatingModal({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
}) {
  const [rating, setRating] = useState(0);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/50 items-center justify-center px-6"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-6 w-full"
        >
          <View className="items-center">
            <View className="w-16 h-16 rounded-full bg-yellow-100 items-center justify-center mb-3">
              <Sparkles size={32} color={WARNING} />
            </View>
            <Text className="text-[#0F172A] text-[20px] font-black">
              Rate Your Experience
            </Text>
            <Text className="text-[#64748B] text-[13px] mt-1 text-center">
              How was your sale process today?
            </Text>

            <View className="flex-row gap-2 my-5">
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setRating(s)}
                  activeOpacity={0.7}
                >
                  <Star
                    size={36}
                    color={s <= rating ? WARNING : '#E2E8F0'}
                    fill={s <= rating ? WARNING : 'transparent'}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View className="flex-row gap-3 w-full">
              <PrimaryButton
                title="Skip"
                variant="outlined"
                onPress={onClose}
                style={{
                  flex: 1,
                  borderRadius: 14,
                  borderColor: '#CBD5E1',
                }}
                textStyle={{ color: '#64748B', fontWeight: '700' }}
              />
              <PrimaryButton
                title="Submit"
                variant="filled"
                onPress={() => {
                  onSubmit(rating);
                  setRating(0); // reset after submit
                }}
                style={{
                  flex: 1,
                  borderRadius: 14,
                  backgroundColor: PRIMARY,
                }}
                textStyle={{ fontWeight: '800' }}
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
