import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Plus, BarChart3 } from 'lucide-react-native';

interface FloatingActionBarProps {
  onVisualize: () => void;
  onNewSale: () => void;
}

const FloatingActionBar: React.FC<FloatingActionBarProps> = ({ onVisualize, onNewSale }) => {
  return (
    <View className="absolute bottom-6 left-6 right-6 flex-row items-center gap-x-4">
      <TouchableOpacity
        onPress={onVisualize}
        activeOpacity={0.8}
        className="flex-1 bg-white h-16 rounded-3xl flex-row items-center justify-center border border-slate-100 shadow-lg"
      >
        <BarChart3 size={20} color="#64748B" />
        <Text className="text-slate-600 font-black text-xs uppercase tracking-widest ml-2">Visualize</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onNewSale}
        activeOpacity={0.9}
        className="flex-[1.2] bg-blue-600 h-16 rounded-3xl flex-row items-center justify-center shadow-lg shadow-blue-300"
      >
        <Plus size={20} color="white" />
        <Text className="text-white font-black text-xs uppercase tracking-widest ml-2">New Sale</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingActionBar;
