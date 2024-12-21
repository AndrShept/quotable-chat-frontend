import { Message, ResponseServerData } from '../types/main.types.';
import { api } from './api';

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation<
      ResponseServerData<Message>,
      { conversationId: string; content: string }
    >({
      query: (data) => ({
        url: '/messages',
        method: 'POST',
        body: data,
      }),
    }),
    updateMessage: builder.mutation<
      ResponseServerData<Message>,
      { messageId: string; content: string }
    >({
      query: (data) => ({
        url: '/messages',
        method: 'PUT',
        body: data,
      }),
    }),
    deleteMessage: builder.mutation<string, string>({
      query: (id) => ({
        url: `/messages/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useDeleteMessageMutation,
  useUpdateMessageMutation,
} = messageApi;

export const { createMessage } = messageApi.endpoints;
