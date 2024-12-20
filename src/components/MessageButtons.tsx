import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { useAppDispatch } from '../hooks/store-hooks';
import { deleteMessageOnState } from '../lib/redux/conversationSlice';
import { useDeleteMessageMutation } from '../lib/services/messageApi';
import { Button } from './ui/Button';
import { Dialog } from './ui/Dialog';

interface MessageButtonsProps {
  messageId: string | undefined;
}

export const MessageButtons = ({ messageId }: MessageButtonsProps) => {
  const [deleteMessage, { isLoading }] = useDeleteMessageMutation();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const onDelete = async () => {
    if (!messageId) return;
    try {
      dispatch(deleteMessageOnState(messageId));
      await deleteMessage(messageId).unwrap();

      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="ml-auto group-hover:opacity-100 opacity-0">
      <Dialog open={isOpen} openOnChange={setIsOpen}>
        <Dialog.Trigger>
          {' '}
          <Button
            disabled={isLoading}
            className="size-[24px] p-1"
            size="icon"
            variant="ghost"
          >
            <Trash2 />
          </Button>
        </Dialog.Trigger>
        <Dialog.Content className=" gap-2 rounded-lg">
          <p className="text-red-500">
            Are you sure you want to delete this item?
          </p>
          <div className="flex gap-2 ml-auto mt-6">
            <Dialog.ConfirmButton isLoading={isLoading} onClick={onDelete}>
              delete
            </Dialog.ConfirmButton>
            <Dialog.CancelButton variant="outline">cancel</Dialog.CancelButton>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};
