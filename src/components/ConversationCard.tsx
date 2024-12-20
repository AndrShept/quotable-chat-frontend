import { NavLink } from 'react-router';

import { useAppSelector } from '../hooks/store-hooks';
import { Conversation } from '../lib/types/main.types.';
import { cn, formatDate } from '../lib/utils';
import { Avatar } from './Avatar';
import { CardButtons } from './CardButtons';

interface ConversationCardProps {
  conversation: Conversation;
}

export const ConversationCard = ({ conversation }: ConversationCardProps) => {

  return (
    <NavLink
      to={`conversation/${conversation.id}`}
      key={conversation.id}
      className={({ isActive }) =>
        cn(
          'flex w-full text-muted-foreground p-4 border-b hover:bg-secondary/40 duration-100 group',
          {
            ' bg-secondary/30 hover:bg-secondary/30': isActive,
          },
        )
      }
    >
      <section className="flex gap-2 ">
        <Avatar avatarUrl={conversation.avatarUrl} className="size-11" />
        <div className="flex flex-col flex-1  ">
          <div className="flex gap-1 font-medium ">
            <p className="line-clamp-1 break-all ">{conversation.firstName}</p>
            <p className="line-clamp-1 break-all ">{conversation.lastName}</p>
          </div>

          {conversation.messages && (
            <p className="text-muted-foreground/70 line-clamp-2 break-words text-sm">
              {conversation.messages &&
                conversation.messages[conversation.messages.length - 1]
                  ?.content}
            </p>
          )}
        </div>
      </section>
      <div className="flex flex-col  shrink-0 ml-auto">
        {conversation.createdAt && (
          <time className="text-sm ml-auto">
            {formatDate(conversation.createdAt)}
          </time>
        )}
        <CardButtons id={conversation.id} />
      </div>
    </NavLink>
  );
};
