import { PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';

import { ConversationFrom } from './ConversationFrom';
import { Button } from './ui/Button';
import { Dialog } from './ui/Dialog';

export const AddConversationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Dialog open={isOpen} openOnChange={setIsOpen}>
        <Dialog.Trigger>
          <Button className="w-full h-12" variant="outline">
            <PlusCircleIcon className="mr-1" />
            Add conversation
          </Button>
        </Dialog.Trigger>
        <Dialog.Content className=" gap-2 rounded-lg">
          <ConversationFrom setIsOpen={setIsOpen} />
        </Dialog.Content>
      </Dialog>
    </>
  );
};
