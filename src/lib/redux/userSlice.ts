import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../types/main.types.';

interface initialState {
  current: User | null;
  isAuthenticated: boolean;
}

// Define the initial state using that type
const initialState: initialState = {
  current: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.current = null;
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.current = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('current', JSON.stringify(action.payload));
    },
  },
});

export const { logout, setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
