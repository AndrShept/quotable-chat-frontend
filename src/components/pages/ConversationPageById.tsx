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

  const { isLoading, isError } = useGetConversationsByIdQuery(id);
  const conversation = useAppSelector(
    (state) => state.conversation.conversation,
  );

  useEffect(() => {
    if (!conversation && !isLoading) {
      navigate('/');
    }
  }, [conversation, isLoading, navigate]);

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center">
        Something went wrong while fetching data. Please try again later.
      </p>
    );

  return (
    <section className="flex flex-1 flex-col">
      <div className="flex w-full items-center gap-2 border border-b-0 bg-secondary/40 px-10 py-7 text-lg">
        <Avatar className="size-14" avatarUrl={conversation?.avatarUrl} />
        <p>{conversation?.firstName}</p>
        <p>{conversation?.lastName}</p>
      </div>
      <MessageList conversation={conversation} />
      <MessageInput id={id} />
    </section>
  );
};
