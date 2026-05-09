import { useMemo } from 'react';

/**
 * Custom hook to filter an array of items by a search query.
 * Reusable across any list screen that needs client-side text filtering.
 *
 * @param data - The data array to filter
 * @param search - The search string
 * @param keys - The object keys to match against (e.g., ['name', 'description'])
 * @returns The filtered data array
 */
export function useFilteredList<T extends Record<string, any>>(
  data: T[],
  search: string,
  keys: (keyof T)[]
): T[] {
  return useMemo(() => {
    if (!search.trim()) return data;

    const lowerSearch = search.toLowerCase();
    return data.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerSearch);
        }
        if (typeof value === 'number') {
          return value.toString().includes(lowerSearch);
        }
        return false;
      })
    );
  }, [data, search, keys]);
}
