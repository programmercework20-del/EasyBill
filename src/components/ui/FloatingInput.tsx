import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  ViewStyle,
} from 'react-native';
import { useFloatingLabel } from '../../hooks/useFloatingLabel';

const PRIMARY = '#1A73E8';

interface FloatingInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  editable?: boolean;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  /** Optional extra action triggered on change (e.g., DOB formatting) */
  formatValue?: (text: string) => string;
}

/**
 * Reusable floating-label text input.
 * The placeholder shifts to the border when the field is focused or has a value.
 */
export default function FloatingInput({
  label,
  value,
  onChangeText,
  multiline = false,
  keyboardType = 'default',
  secureTextEntry = false,
  editable = true,
  rightIcon,
  containerStyle,
  formatValue,
}: FloatingInputProps) {
  const { isFocused, onFocus, onBlur } = useFloatingLabel();

  const isLabelFloated = isFocused || Boolean(value);

  const handleChange = (text: string) => {
    const formatted = formatValue ? formatValue(text) : text;
    onChangeText(formatted);
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {isLabelFloated && (
        <Text style={styles.floatedLabel}>{label}</Text>
      )}

      <View
        style={[
          styles.inputBox,
          isFocused && styles.inputBoxFocused,
          multiline && styles.inputBoxMultiline,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={isLabelFloated ? '' : label}
          placeholderTextColor="#9CA3AF"
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={editable}
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            !editable && styles.inputDisabled,
          ]}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    position: 'relative',
  },
floatedLabel: {
  position: 'absolute',
  left: 16,
  top: -9,
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 6,
  fontSize: 11,
  fontWeight: '700',
  color: PRIMARY,
  zIndex: 10,
  letterSpacing: 0.3,
},
  inputBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
 inputBoxFocused: {
  borderColor: PRIMARY,
  borderWidth: 1.5,
  backgroundColor: '#FFFFFF',
},
  inputBoxMultiline: {
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1E293B',
    padding: 0,
    margin: 0,
  },
  inputMultiline: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  inputDisabled: {
    color: '#94A3B8',
  },
  rightIcon: {
    marginLeft: 8,
  },
});



