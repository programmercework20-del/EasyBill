import { useState, useCallback } from 'react';

/**
 * Custom hook to handle "Pull to Refresh" logic for RTK Query
 * @param refetch The refetch function from the query hook
 */
export const useRefresh = (refetch: () => Promise<any>) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return { refreshing, onRefresh };
};
