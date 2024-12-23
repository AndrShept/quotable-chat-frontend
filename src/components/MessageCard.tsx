import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAppDispatch } from '../hooks/store-hooks';
import {
  updateConversationState,
  updateStateMessage,
} from '../lib/redux/conversationSlice';
import { useUpdateMessageMutation } from '../lib/services/messageApi';
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
  const [updateMessage] = useUpdateMessageMutation();
  const isSenderApi = message.sender === SenderType.API;
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const isUpdated = message.createdAt !== message.updatedAt;
  // const ref = useRef<null | HTMLLIElement>(null);

  useLayoutEffect(() => {
    if (inView && message.sender === SenderType.API && !message.isRead) {
      try {
        updateMessage({ id: message.id, isRead: true });

        dispatch(updateStateMessage({ id: message.id, isRead: true }));
        dispatch(
          updateConversationState({
            messageId: message.id,
            conversationId: message.conversationId,
          }),
        );
      } catch (error) {
        console.log(error);
      }
    }
  }, [
    inView,
    message.conversationId,
    message.id,
    message.isRead,
    message.sender,
  ]);
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
            <div>
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
              <p>{JSON.stringify(message.isRead)}</p>
            </div>
          )}
        </div>
      </div>
      {!isSenderApi && (
        <MessageButtons setIsShow={setIsShow} messageId={message.id} />
      )}
    </li>
  );
};
