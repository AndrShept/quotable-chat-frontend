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
    deleteMessage: builder.mutation<string, string>({
      query: (id) => ({
        url: `/messages/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreateMessageMutation, useDeleteMessageMutation } =
  messageApi;

export const { createMessage } = messageApi.endpoints;
