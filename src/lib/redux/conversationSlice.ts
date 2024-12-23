import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { conversationApi } from '../services/conversationApi';
import { Conversation, Message } from '../types/main.types.';

interface initialState {
  conversations: Conversation[] | null;
  conversation: Conversation | null;
  searchValue: string | undefined;
}

// Define the initial state using that type
const initialState: initialState = {
  conversations: null,
  conversation: null,
  searchValue: undefined,
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      if (state.conversation) {
        state.conversation.messages = [
          action.payload,
          ...state.conversation.messages!,
        ];
      }
    },
    updateConversationState: (
      state,
      action: PayloadAction<{ conversationId: string; messageId: string }>,
    ) => {
      state.conversations = state.conversations.map((conversation) => {
        if (conversation.id === action.payload.conversationId) {
          return {
            ...conversation,
            messages: conversation.messages.map((message) => {
              if (message.id === action.payload.messageId) {
                return { ...message, isRead: true };
              }
              return message;
            }),
          };
        }
        return conversation;
      });
    },

    updateStateMessage: (state, action: PayloadAction<Message>) => {
      if (state.conversation) {
        state.conversation.messages = state.conversation.messages.map(
          (message) => {
            if (message.id === action.payload.id) {
              return {
                ...message,
                ...action.payload,
              };
            }
            return message;
          },
        );
      }
    },
    addConversationMessage: (state, action: PayloadAction<Message>) => {
      if (state.conversations) {
        state.conversations = state.conversations.map((conversation) => {
          if (conversation.id === action.payload.conversationId) {
            return {
              ...conversation,
              messages: [...(conversation.messages || []), action.payload],
            };
          }
          return { ...conversation };
        });
        if (
          state.conversation &&
          state.conversation.id === action.payload.conversationId
        ) {
          state.conversation = {
            ...state.conversation,
            messages: [action.payload, ...(state.conversation.messages || [])],
          };
        }
      }
    },
    deleteMessageOnState: (state, action: PayloadAction<string>) => {
      if (state.conversation) {
        state.conversation = {
          ...state.conversation,
          messages: state.conversation?.messages?.filter(
            (message) => message.id !== action.payload,
          ),
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      conversationApi.endpoints.getConversations.matchFulfilled,
      (state, action) => {
        state.conversations = action.payload;
      },
    );
    builder.addMatcher(
      conversationApi.endpoints.getConversationsById.matchFulfilled,
      (state, action) => {
        state.conversation = action.payload;
      },
    );
  },
});

export const {
  setConversations,
  setSearchValue,
  addMessage,
  addConversationMessage,
  deleteMessageOnState,
  updateStateMessage,
  updateConversationState,
} = conversationSlice.actions;

export default conversationSlice.reducer;
