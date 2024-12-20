import { useCallback, useEffect, useRef } from 'react';

import { Message, SenderType } from '../lib/types/main.types.';
import { cn, formatDateMessage } from '../lib/utils';
import { Avatar } from './Avatar';
import { CardButtons } from './CardButtons';
import { MessageButtons } from './MessageButtons';
import { useTheme } from './providers/ThemeProvider';

interface MessageCardProps {
  message: Message;
}

export const MessageCard = ({ message }: MessageCardProps) => {
  const isSenderApi = message.sender === SenderType.API;
  const { theme } = useTheme();
  const ref = useRef<null | HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      className={cn('flex gap-2  flex-col w-fit group ', {
        ' mr-auto': isSenderApi,
        ' ml-auto': !isSenderApi,
      })}
    >
      <div className="flex gap-2">
        {isSenderApi && <Avatar avatarUrl={message.conversation?.avatarUrl} />}
        <div className="flex flex-col gap-2 ">
          <p
            className={cn(
              'bg-secondary/50 px-4 py-2 rounded-full break-words  ',
              {
                'break-all': !message.content.includes(' '),
                'bg-white/20': isSenderApi && theme === 'dark',
                'bg-zinc-800 text-secondary': isSenderApi ,
              },
            )}
          >
            {message.content}
          </p>
          {message.createdAt && (
            <p
              className={cn('text-xs  ', {
                ' mr-auto ': isSenderApi,
                ' ml-auto ': !isSenderApi,
              })}
            >
              {formatDateMessage(message.createdAt)}
            </p>
          )}
        </div>
      </div>
      {!isSenderApi && <MessageButtons messageId={message.id} />}
    </li>
  );
};
