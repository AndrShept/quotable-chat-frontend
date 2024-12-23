import { useMemo } from 'react';
import { NavLink, useParams } from 'react-router';

import { Conversation, SenderType } from '../lib/types/main.types.';
import { cn, formatDate } from '../lib/utils';
import { Avatar } from './Avatar';
import { CardButtons } from './CardButtons';
import { NewMessageBade } from './NewMessageBade';

interface ConversationCardProps {
  conversation: Conversation;
}

export const ConversationCard = ({ conversation }: ConversationCardProps) => {
  const params = useParams();
  const IsReadMessage = useMemo(() => {
    return conversation.messages
      .filter((message) => {
        return message.sender === SenderType.API;
      })
      .every((item) => item.isRead);
  }, [conversation.messages]);
  return (
    <NavLink
      to={`conversation/${conversation.id}`}
      key={conversation.id}
      className={({ isActive }) =>
        cn(
          'group flex w-full border-b p-4 text-muted-foreground duration-100 hover:bg-secondary/40',
          {
            'bg-secondary/30 hover:bg-secondary/30': isActive,
          },
        )
      }
    >
      <section className="flex gap-2">
        <Avatar avatarUrl={conversation.avatarUrl} className="size-11" />
        <div className="flex flex-1 flex-col">
          <div className="flex gap-1 font-medium">
            <p className="line-clamp-1 break-all">{conversation.firstName}</p>
            <p className="line-clamp-1 break-all">{conversation.lastName}</p>
          </div>

          {conversation.messages && (
            <p className="line-clamp-2 break-words text-sm text-muted-foreground/70">
              {conversation.messages &&
                conversation.messages[conversation.messages.length - 1]
                  ?.content}
            </p>
          )}
        </div>
      </section>
      <div className="ml-auto flex shrink-0 flex-col">
        {conversation.createdAt && (
          <time className="ml-auto text-sm">
            {formatDate(conversation.createdAt)}
          </time>
        )}
        {conversation.id !== params.id && (
          <NewMessageBade isRead={IsReadMessage} />
        )}

        <CardButtons id={conversation.id} />
      </div>
    </NavLink>
  );
};
