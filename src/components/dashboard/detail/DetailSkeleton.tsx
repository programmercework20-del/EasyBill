import React from 'react';
import { View, Text, Animated } from 'react-native';

const DetailSkeleton = () => {
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
    <View className="gap-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Animated.View 
          key={i}
          style={{ opacity }}
          className="bg-white rounded-[28px] p-5 border border-slate-100 flex-row items-center"
        >
          <View className="w-14 h-14 rounded-full bg-slate-100" />
          <View className="ml-4 flex-1 gap-y-2">
            <View className="w-32 h-4 bg-slate-100 rounded-full" />
            <View className="w-20 h-3 bg-slate-100 rounded-full" />
          </View>
          <View className="w-16 h-6 bg-slate-100 rounded-full" />
        </Animated.View>
      ))}
    </View>
  );
};

export default DetailSkeleton;
