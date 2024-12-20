import { useRef, useState } from 'react';

import { Message, SenderType } from '../lib/types/main.types.';
import { cn, formatDateMessage } from '../lib/utils';
import { Avatar } from './Avatar';
import { MessageButtons } from './MessageButtons';
import { MessageEditForm } from './MessageEditForm';
import { useTheme } from './providers/ThemeProvider';

interface MessageCardProps {
  message: Message;
}

export const MessageCard = ({ message }: MessageCardProps) => {
  const [isShow, setIsShow] = useState(false);
  const isSenderApi = message.sender === SenderType.API;
  const { theme } = useTheme();
  const isUpdated = message.createdAt !== message.updatedAt;
  const ref = useRef<null | HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      className={cn('group flex w-fit flex-col gap-2', {
        'mr-auto': isSenderApi,
        'ml-auto': !isSenderApi,
      })}
    >
      <div className="flex gap-2">
        {isSenderApi && <Avatar avatarUrl={message.conversation?.avatarUrl} />}
        <div className="flex flex-col gap-2">
          {!isShow && (
            <p
              className={cn(
                'break-words rounded-full bg-secondary/50 px-4 py-2',
                {
                  'break-all': !message.content.includes(' '),
                  'bg-white/20': isSenderApi && theme === 'dark',
                  'bg-zinc-800 text-secondary': isSenderApi,
                },
              )}
            >
              {message.content}
            </p>
          )}
          {isShow && (
            <MessageEditForm
              content={message.content}
              messageId={message.id}
              setIsShow={setIsShow}
            />
          )}
          {message.createdAt && !isShow && (
            <p
              className={cn('text-xs', {
                'mr-auto': isSenderApi,
                'ml-auto': !isSenderApi,
              })}
            >
              {isUpdated
                ? formatDateMessage(message.updatedAt)
                : formatDateMessage(message.createdAt)}
              {isUpdated && !isSenderApi && (
                <p className="text-muted-foreground">updated</p>
              )}
            </p>
          )}
        </div>
      </div>
      {!isSenderApi && (
        <MessageButtons setIsShow={setIsShow} messageId={message.id} />
      )}
    </li>
  );
};
