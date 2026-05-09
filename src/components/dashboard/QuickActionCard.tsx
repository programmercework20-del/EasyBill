import React from 'react';
import { TouchableOpacity, Text, View, Animated } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { ChevronRight } from 'lucide-react-native';

interface QuickActionCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  iconName: string;
  onPress: () => void;
  color?: string;
  bgColor?: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ 
  title, 
  value, 
  subtitle,
  iconName,
  onPress, 
  color = '#1A73E8',
  bgColor = 'bg-white'
}) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  
  // Dynamic Icon Loading
  const IconComponent = (LucideIcons as any)[
    iconName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')
  ] || LucideIcons.HelpCircle;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        className={`${bgColor} w-40 h-32 rounded-[32px] p-5 mr-4 mb-2 py-2 justify-between shadow-sm border border-slate-100`}
        style={{
          shadowColor: color,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 2
        }}
      >
        <View className="flex-row justify-between items-start">
          <View 
            className="p-2 rounded-xl"
            style={{ backgroundColor: `${color}15` }}
          >
            <IconComponent size={18} color={color} strokeWidth={2.5} />
          </View>
          <ChevronRight size={14} color="#94A3B8" />
        </View>

        <View>
          <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">
            {title}
          </Text>
          <Text 
            className="text-slate-800 text-lg font-black"
            numberOfLines={1}
          >
            {value}
          </Text>
          {subtitle && (
            <Text className="text-slate-400 text-[9px] font-medium" numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default React.memo(QuickActionCard);
