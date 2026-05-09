import React from 'react';
import { View, Text, Animated, Pressable } from 'react-native';

interface BaseDetailCardProps {
  children: React.ReactNode;
  onPress?: () => void;
}

const BaseDetailCard: React.FC<BaseDetailCardProps> = ({ children, onPress }) => {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        className="bg-white rounded-[28px] p-5 mb-4 shadow-sm border border-slate-100 flex-row items-center"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.03,
          shadowRadius: 10,
          elevation: 2
        }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default BaseDetailCard;
