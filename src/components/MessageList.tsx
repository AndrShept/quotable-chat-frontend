import { useEffect, useRef } from 'react';

import { Conversation } from '../lib/types/main.types.';
import { MessageCard } from './MessageCard';

interface MessageListProps {
  conversation: Conversation | null;
}

export const MessageList = ({ conversation }: MessageListProps) => {
  const ref = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    const firstChild = ref.current?.firstElementChild;
    if (firstChild instanceof HTMLElement) {
      firstChild.scrollIntoView();
    }
  }, [conversation?.messages]);
  return (
    <>
      <ul
        ref={ref}
        className="flex h-full max-h-screen w-full flex-col-reverse gap-2 overflow-y-auto border p-4"
      >
        {conversation?.messages?.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </ul>
    </>
  );
};
