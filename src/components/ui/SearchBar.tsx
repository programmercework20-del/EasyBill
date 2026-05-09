import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

interface SearchBarProps {
  /** The current search query */
  value: string;
  /** Callback triggered when text changes */
  onChangeText: (text: string) => void;
  /** Callback triggered when Cancel is pressed */
  onCancel: () => void;
  /** Optional placeholder text */
  placeholder?: string;
  /** Whether the search bar is currently visible */
  isVisible: boolean;
}

/**
 * A reusable search bar component with a "Cancel" button.
 * Designed to be used conditionally (isVisible).
 */
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onCancel,
  placeholder = "Search...",
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <View className="px-4 mt-3 flex-row items-center bg-white rounded-xl border border-gray-200 mx-4 shadow-sm">
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        className="flex-1 px-3 py-2 text-gray-800 text-base"
      />
      <TouchableOpacity onPress={onCancel} activeOpacity={0.7}>
        <Text className="text-[#1A73E8] px-3 font-bold">Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
