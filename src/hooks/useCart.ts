import { useState, useCallback, useMemo } from 'react';

export interface CartItem {
  id: string;
  _id?: string;
  name: string;
  price?: number;
  sellPrice?: number;
  images?: string[];
  currentStock?: number;
  stock?: number;
  category_id?: string;
  categoryName?: string;
  [key: string]: any;
}

export interface CartEntry {
  item: CartItem;
  quantity: number;
}

/**
 * Custom hook for cart/selection management.
 * Handles add, remove, increment, decrement, quantity lookup, and total calculation.
 */
export function useCart() {
  const [cartMap, setCartMap] = useState<Map<string, CartEntry>>(new Map());

  const getItemId = useCallback((item: CartItem): string => {
    return item.id || item._id || '';
  }, []);

  const getQuantity = useCallback((item: CartItem): number => {
    const id = item.id || item._id || '';
    return cartMap.get(id)?.quantity || 0;
  }, [cartMap]);

  const addItem = useCallback((item: CartItem) => {
    setCartMap((prev) => {
      const next = new Map(prev);
      const id = item.id || item._id || '';
      const existing = next.get(id);
      if (existing) {
        next.set(id, { ...existing, quantity: existing.quantity + 1 });
      } else {
        next.set(id, { item, quantity: 1 });
      }
      return next;
    });
  }, []);

  const removeItem = useCallback((item: CartItem) => {
    setCartMap((prev) => {
      const next = new Map(prev);
      const id = item.id || item._id || '';
      const existing = next.get(id);
      if (existing && existing.quantity > 1) {
        next.set(id, { ...existing, quantity: existing.quantity - 1 });
      } else {
        next.delete(id);
      }
      return next;
    });
  }, []);

  const setQuantity = useCallback((item: CartItem, qty: number) => {
    setCartMap((prev) => {
      const next = new Map(prev);
      const id = item.id || item._id || '';
      if (qty <= 0) {
        next.delete(id);
      } else {
        next.set(id, { item, quantity: qty });
      }
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartMap(new Map());
  }, []);

  /** Fully removes a single item from the cart (regardless of quantity) */
  const clearItem = useCallback((item: CartItem) => {
    setCartMap((prev) => {
      const next = new Map(prev);
      const id = item.id || item._id || '';
      next.delete(id);
      return next;
    });
  }, []);

  const cartEntries = useMemo(() => Array.from(cartMap.values()), [cartMap]);

  const totalQuantity = useMemo(
    () => cartEntries.reduce((sum, e) => sum + e.quantity, 0),
    [cartEntries]
  );

  const totalAmount = useMemo(
    () =>
      cartEntries.reduce((sum, e) => {
        const price = e.item.sellPrice || e.item.price || 0;
        return sum + price * e.quantity;
      }, 0),
    [cartEntries]
  );

  return {
    cartEntries,
    totalQuantity,
    totalAmount,
    getQuantity,
    addItem,
    removeItem,
    setQuantity,
    clearItem,
    clearCart,
  };
}
