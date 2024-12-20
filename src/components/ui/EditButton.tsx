import { Edit3Icon } from 'lucide-react';
import React, { useState } from 'react';

import { useAppSelector } from '../../hooks/store-hooks';
import { ConversationFrom } from '../ConversationFrom';
import { Button } from './Button';
import { Dialog } from './Dialog';

interface EditButtonProps {
  id: string | undefined;
}

export const EditButton = ({ id }: EditButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const findData = useAppSelector((state) =>
    state.conversation.conversations?.find((item) => item.id === id),
  );
  const firstName = findData?.firstName;
  const lastName = findData?.lastName;
  return (
    <Dialog  open={isOpen} openOnChange={setIsOpen}>
      <Dialog.Trigger>
        <Button  className="size-[24px] p-1" size="icon" variant="ghost">
          <Edit3Icon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className=" gap-2 rounded-lg">
        <ConversationFrom
          setIsOpen={setIsOpen}
          initialData={{ firstName, lastName, id }}
        />
      </Dialog.Content>
    </Dialog>
  );
};
