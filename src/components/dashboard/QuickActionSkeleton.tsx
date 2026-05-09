import React from 'react';
import { View, Animated } from 'react-native';

const QuickActionSkeleton = () => {
  const opacity = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View 
      style={{ opacity }}
      className="bg-white w-40 h-32 rounded-[32px] p-5 mr-4 shadow-sm border border-slate-100"
    >
      <View className="w-8 h-8 rounded-xl bg-slate-100 mb-3" />
      <View className="w-20 h-3 bg-slate-100 rounded-full mb-2" />
      <View className="w-12 h-5 bg-slate-100 rounded-full" />
    </Animated.View>
  );
};

export default QuickActionSkeleton;
