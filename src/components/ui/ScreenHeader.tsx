import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  backgroundColor?: string;
  style?: ViewStyle;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  onBack,
  rightElement,
  backgroundColor = '#1A73E8',
  style,
}) => {
  return (
    <View
      style={[{ backgroundColor, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }, style]}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {onBack && (
            <TouchableOpacity
              onPress={onBack}
              className="w-11 h-11 rounded-2xl bg-white/15 items-center justify-center mr-3"
              activeOpacity={0.7}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          <View className="flex-1">
            <Text className="text-white text-[24px] font-black tracking-wide">
              {title}
            </Text>
            {subtitle && (
              <Text className="text-white/70 text-xs mt-1">
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {rightElement && (
          <View className="flex-row items-center gap-2">
            {rightElement}
          </View>
        )}
      </View>
    </View>
  );
};

export default ScreenHeader;
