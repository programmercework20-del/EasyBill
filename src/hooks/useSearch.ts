import { useState } from 'react';

export const useSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState('');

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearch('');
  };

  return {
    isSearchOpen,
    search,
    setSearch,
    openSearch,
    closeSearch,
  };
};