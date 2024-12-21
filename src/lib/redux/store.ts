import { configureStore } from '@reduxjs/toolkit';

import { api } from '../services/api';
import conversationSlice from './conversationSlice';
import userSlice, { setCurrentUser } from './userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    conversation: conversationSlice,

    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

const currentUser = localStorage.getItem('current');
if (currentUser) {
  store.dispatch(setCurrentUser(JSON.parse(currentUser)));
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
