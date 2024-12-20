import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { conversationApi } from '../services/conversationApi';
import { Conversation, Message } from '../types/main.types.';

interface initialState {
  message: Message | null;
}

// Define the initial state using that type
const initialState: initialState = {
  message: null,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<Message>) => {
      state.message = action.payload;
    },

  },
  extraReducers: (builder) => {
    // builder.addMatcher(
    //   conversationApi.endpoints.getConversations.matchFulfilled,
    //   (state, action) => {
    //     state.conversations = action.payload;
    //   },
    // );

  },
});

export const { } = messageSlice.actions;

export default messageSlice.reducer;
