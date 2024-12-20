import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  useDeleteConversationMutation,
  useLazyGetConversationsQuery,
} from '../../lib/services/conversationApi';
import { ConfirmDialog } from '../ConfirmDialog';
import { Button } from './Button';

interface DeleteButtonProps {
  id: string | undefined;
}

export const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [deleteConversation, { isLoading }] = useDeleteConversationMutation();
  const [refetchConversations] = useLazyGetConversationsQuery();
  const onDelete = async () => {
    if (!id) return;
    try {
      await deleteConversation(id).unwrap();
      await refetchConversations().unwrap();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <ConfirmDialog onConfirm={() => onDelete()} isLoading={isLoading}>
      <Button
        disabled={isLoading}
        className="size-[24px] p-1"
        size="icon"
        variant="ghost"
      >
        <Trash2 />
      </Button>
    </ConfirmDialog>
  );
};
