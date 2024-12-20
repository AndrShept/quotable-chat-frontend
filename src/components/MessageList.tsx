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
        className="  gap-2 flex-col-reverse max-h-screen h-full border p-4 overflow-y-auto flex w-full "
      >
        {conversation?.messages?.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </ul>
    </>
  );
};
