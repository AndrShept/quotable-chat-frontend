import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useAppSelector } from '../../hooks/store-hooks';
import { useGetConversationsByIdQuery } from '../../lib/services/conversationApi';
import { Avatar } from '../Avatar';
import { MessageInput } from '../MessageInput';
import { MessageList } from '../MessageList';
import { Spinner } from '../Spinner';

export const ConversationPageById = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) return;

  const { isLoading, isError } = useGetConversationsByIdQuery(id);
  const conversation = useAppSelector(
    (state) => state.conversation.conversation,
  );

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center">
        Something went wrong while fetching data. Please try again later.
      </p>
    );

  return (
    <section className="flex flex-col flex-1">
      <div className="flex gap-2 items-center text-lg w-full  px-10 py-7 bg-secondary/40 border border-b-0 ">
        <Avatar className="size-14" avatarUrl={conversation?.avatarUrl} />
        <p>{conversation?.firstName}</p>
        <p>{conversation?.lastName}</p>
      </div>
      <MessageList conversation={conversation} />
      <MessageInput id={id} />
    </section>
  );
};
