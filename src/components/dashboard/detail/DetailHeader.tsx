import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'react-native-svg'; // Standard for the project or solid color

interface DetailHeaderProps {
  title: string;
  subtitle?: string;
  count?: number;
  accentColor: string;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ 
  title, 
  subtitle, 
  count, 
  accentColor 
}) => {
  const navigation = useNavigation();

  return (
    <View className="px-6 pt-4 pb-6">
      {/* <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-12 h-12 rounded-2xl items-center justify-center border border-slate-100 bg-white shadow-sm"
        >
          <ArrowLeft size={20} color="#1E293B" />
        </TouchableOpacity>
        
        {count !== undefined && (
          <View 
            className="px-4 py-2 rounded-2xl"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <Text 
              className="font-black text-sm"
              style={{ color: accentColor }}
            >
              {count}
            </Text>
          </View>
        )}
      </View> */}

      <View>
        <Text className="text-slate-900 text-4xl font-black tracking-tight">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-slate-400 text-base font-medium mt-1">
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

export default DetailHeader;
