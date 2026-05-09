import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'primary' | 'neutral';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const VARIANT_COLORS: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
  success: { bg: '#DCFCE7', text: '#15803D', border: '#BBF7D0' },
  warning: { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' },
  error: { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA' },
  info: { bg: '#DBEAFE', text: '#1D4ED8', border: '#BFDBFE' },
  primary: { bg: '#E8F0FE', text: '#1A73E8', border: '#BDD5F7' },
  neutral: { bg: '#F1F5F9', text: '#64748B', border: '#E2E8F0' },
};

export default function StatusBadge({
  label,
  variant = 'neutral',
  size = 'sm',
  icon,
  style,
  textStyle,
}: StatusBadgeProps) {
  const colors = VARIANT_COLORS[variant];

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
        size === 'md' && styles.sizeMd,
        style,
      ]}
    >
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      <Text
        style={[
          styles.text,
          { color: colors.text },
          size === 'md' && styles.textMd,
          textStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  sizeMd: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  iconWrapper: {
    marginRight: 4,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  textMd: {
    fontSize: 13,
  },
});
