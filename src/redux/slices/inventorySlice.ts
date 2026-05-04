import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedItem: null,
  search: '',
  filterCategory: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    clearInventoryState: (state) => {
      state.selectedItem = null;
      state.search = '';
      state.filterCategory = null;
    },
  },
});

export const {
  setSelectedItem,
  setSearch,
  setFilterCategory,
  clearInventoryState,
} = inventorySlice.actions;

export default inventorySlice.reducer;