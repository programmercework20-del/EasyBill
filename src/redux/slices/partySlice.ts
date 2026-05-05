import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PartyState {
  selectedParty: any | null;
}

const initialState: PartyState = {
  selectedParty: null,
};

const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {
    setSelectedParty: (state, action: PayloadAction<any>) => {
      state.selectedParty = action.payload;
    },
    clearSelectedParty: (state) => {
      state.selectedParty = null;
    },
  },
});

export const { setSelectedParty, clearSelectedParty } = partySlice.actions;
export default partySlice.reducer;
