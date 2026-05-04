import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // 👈 important
};

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {

        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isLoading = false;
        },

        finishLoading: (state) => {
            state.isLoading = false;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },

    },
});

export const { setCredentials, logout, finishLoading } = authSlice.actions;
export default authSlice.reducer;