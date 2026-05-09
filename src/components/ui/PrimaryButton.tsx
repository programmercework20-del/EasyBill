import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

const PRIMARY = '#1A73E8';

type ButtonVariant = 'filled' | 'outlined' | 'soft';
type ButtonSize = 'sm' | 'md' | 'lg';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  variant = 'filled',
  size = 'md',
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}: PrimaryButtonProps) {

  const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
    sm: {
      container: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
      text: { fontSize: 12 },
    },
    md: {
      container: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 24 },
      text: { fontSize: 14 },
    },
    lg: {
      container: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 28 },
      text: { fontSize: 16 },
    },
  };

  const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
    filled: {
      container: {
        backgroundColor: disabled ? '#93B5E8' : PRIMARY,
        shadowColor: PRIMARY,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: disabled ? 0 : 0.25,
        shadowRadius: 6,
        elevation: disabled ? 0 : 4,
      },
      text: { color: '#FFFFFF' },
    },
    outlined: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: disabled ? '#93B5E8' : PRIMARY,
      },
      text: { color: disabled ? '#93B5E8' : PRIMARY },
    },
    soft: {
      container: {
        backgroundColor: disabled ? '#F0F4FA' : '#E8F0FE',
      },
      text: { color: disabled ? '#93B5E8' : PRIMARY },
    },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.base,
        sizeStyles[size].container,
        variantStyles[variant].container,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {icon && icon}
      <Text
        style={[
          styles.baseText,
          sizeStyles[size].text,
          variantStyles[variant].text,
          icon ? { marginLeft: 6 } : undefined,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  fullWidth: {
    width: '100%',
  },
});
