import React, { ReactNode, useState } from 'react';

import { Button } from './ui/Button';
import { Dialog } from './ui/Dialog';

interface ConfirmDialogProps {
  children: ReactNode;
  onConfirm: () => void;
  isLoading: boolean;
}
export const ConfirmDialog = ({
  children,
  onConfirm,
  isLoading,
}: ConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} openOnChange={setIsOpen}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="gap-2 rounded-lg">
        <p className="text-red-500">
          Are you sure you want to delete this item?
        </p>
        <div className="ml-auto mt-6 flex gap-2">
          <Dialog.ConfirmButton isLoading={isLoading} onClick={onConfirm}>
            delete
          </Dialog.ConfirmButton>
          <Dialog.CancelButton variant="outline">cancel</Dialog.CancelButton>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
