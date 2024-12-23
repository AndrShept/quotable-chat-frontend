import { CheckIcon, XIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

import { useAppDispatch } from '../hooks/store-hooks';
import { updateStateMessage } from '../lib/redux/conversationSlice';
import { useUpdateMessageMutation } from '../lib/services/messageApi';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface MessageEditFormProps {
  content: string;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  messageId: string;
}

export const MessageEditForm = ({
  content,
  setIsShow,
  messageId,
}: MessageEditFormProps) => {
  const [updatedContent, setUpdatedContent] = useState(content);
  const [updateMessage, { isLoading }] = useUpdateMessageMutation();
  const dispatch = useAppDispatch();

  const onConfirm = async () => {
    if (!updatedContent) return;
    try {
      dispatch(updateStateMessage({id: messageId, content:updatedContent, updatedAt: new Date() }));
      await updateMessage({ content: updatedContent, id:messageId }).unwrap();

      setIsShow(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went Wrong');
    }
  };

  return (
    <section className="flex flex-col gap-1">
      <Input
        className="min-w-72"
        value={updatedContent}
        onChange={(e) => {
          setUpdatedContent(e.target.value);
        }}
      />
      <div className="ml-auto flex">
        <Button
          disabled={isLoading}
          onClick={onConfirm}
          className="size-7 p-1 hover:bg-secondary/40 hover:text-green-600"
          size="icon"
          variant="ghost"
        >
          <CheckIcon />
        </Button>
        <Button
          onClick={() => setIsShow(false)}
          className="size-7 p-1 hover:bg-secondary/40 hover:text-red-600"
          size="icon"
          variant="ghost"
        >
          <XIcon />
        </Button>
      </div>
    </section>
  );
};
