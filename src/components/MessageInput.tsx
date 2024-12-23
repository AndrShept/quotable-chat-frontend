import { SendHorizontalIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { useAppDispatch } from '../hooks/store-hooks';
import { addMessage } from '../lib/redux/conversationSlice';
import { useCreateMessageMutation } from '../lib/services/messageApi';
import { cn } from '../lib/utils';
import { Input } from './ui/Input';

interface MessageInputProps {
  id: string;
}

export const MessageInput = ({ id }: MessageInputProps) => {
  const [content, setContent] = useState<undefined | string>(undefined);
  const [createMessage, { isLoading }] = useCreateMessageMutation();
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onClick = async () => {
    if (!content) return;
    try {
      const res = await createMessage({ conversationId: id, content }).unwrap();
      if (res.data) {
        dispatch(addMessage(res.data));
        setContent('');
      }
    } catch (error) {
      console.log(error);
      toast('Something went wrong');
    }
  };

  return (
    <section className="w-full border border-t-0 bg-secondary/50 p-6">
      <div className="relative">
        <Input
          value={content}
          onChange={onChange}
          placeholder="Type your message"
          className="pr-8"
        />
        <button disabled={isLoading} onClick={onClick}>
          <SendHorizontalIcon
            className={cn(
              'absolute right-2 top-1.5 fill-secondary/60 hover:fill-primary/70',
              {
                'opacity-30': isLoading,
              },
            )}
          />
        </button>
      </div>
    </section>
  );
};
