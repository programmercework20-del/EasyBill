import { useState } from 'react';

/**
 * Custom hook for floating label input UX.
 * Tracks focus state so labels animate to the border when the field is active.
 *
 * Usage:
 *   const { isFocused, onFocus, onBlur } = useFloatingLabel();
 */
export function useFloatingLabel() {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return { isFocused, onFocus, onBlur };
}
