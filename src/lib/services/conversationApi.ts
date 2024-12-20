import { Conversation, ResponseServerData } from '../types/main.types.';
import { api } from './api';

export const conversationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createConversation: builder.mutation<
      ResponseServerData<Conversation>,
      Conversation
    >({
      query: (data) => ({
        url: '/conversations',
        method: 'POST',
        body: data,
      }),
    }),
    getConversations: builder.query<Conversation[], void>({
      query: () => ({
        url: '/conversations',
        method: 'GET',
      }),
    }),
    getConversationsById: builder.query<Conversation, string>({
      query: (id) => ({
        url: `/conversations/${id}`,
        method: 'GET',
      }),
    }),
    deleteConversation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/conversations/${id}`,
        method: 'DELETE',
      }),
    }),
    updateConversation: builder.mutation<
      ResponseServerData<undefined>,
      {
        firstName: string;
        lastName: string | undefined;
        id: string;
      }
    >({
      query: (data) => ({
        url: `/conversations`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateConversationMutation,
  useGetConversationsQuery,
  useLazyGetConversationsQuery,
  useGetConversationsByIdQuery,
  useLazyGetConversationsByIdQuery,
  useDeleteConversationMutation,
  useUpdateConversationMutation
} = conversationApi;

export const { getConversations, getConversationsById } =
  conversationApi.endpoints;
