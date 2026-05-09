import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const PRIMARY = "#1A73E8";

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
}

export default function SectionHeader({ title, actionText, onActionPress }: SectionHeaderProps) {
  return (
    <View className="flex-row justify-between items-end mb-4 mt-6">
      <Text className="text-slate-800 font-bold text-lg">{title}</Text>
      {actionText && onActionPress && (
        <TouchableOpacity onPress={onActionPress}>
          <Text style={{ color: PRIMARY }} className="text-sm font-semibold">{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
