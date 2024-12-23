export interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Conversation {
  id?: string;
  firstName: string;
  lastName?: string | undefined;
  avatarUrl?: string;

  messages?: Message[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface Message {
  id: string;
  content?: string;
  isRead?: boolean

  sender?: SenderType;

  conversation?: Conversation;
  conversationId?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResponseServerData<T> {
  success: boolean;
  data?: T;
  message: string;
}

export enum SenderType {
  USER = 'USER',
  API = 'API',
}
