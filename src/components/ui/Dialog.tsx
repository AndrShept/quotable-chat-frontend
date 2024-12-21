/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  Dispatch,
  FC,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../../lib/utils';
import { Button, ButtonProps } from './Button';

interface DialogProps {
  children: ReactNode;
  open: boolean;
  openOnChange: Dispatch<SetStateAction<boolean>>;
}

interface ConfirmPopoverCompound {
  Content: React.FC<{
    children: ReactNode;
    className?: string;
  }>;
  Trigger: React.FC<HTMLAttributes<HTMLButtonElement>>;
  Message: React.FC<HTMLAttributes<HTMLParagraphElement>>;
  CancelButton: React.FC<ButtonProps>;
  ConfirmButton: React.FC<ButtonProps & { isLoading?: boolean }>;
}

const DialogContext = createContext<null | {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}>(null);

export const useDialog = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('DialogContext context not found');
  }
  return context;
};

export const Dialog: FC<DialogProps> & ConfirmPopoverCompound = ({
  children,
  open,
  openOnChange,
}) => {
  const onClose = () => {
    openOnChange(false);
  };
  const onOpen = () => {
    openOnChange(true);
  };
  return (
    <DialogContext.Provider value={{ open, onClose, onOpen }}>
      <div>{children}</div>
    </DialogContext.Provider>
  );
};

Dialog.Trigger = ({ children, ...props }) => {
  const { onOpen } = useDialog();
  return (
    <button className="cursor-default w-full" onClick={onOpen} {...props}>
      {children}
    </button>
  );
};

Dialog.Content = ({ children, className }) => {
  const { open, onClose } = useDialog();
  return createPortal(
    <>
      {open && (
        <div
          onClick={onClose}
          className={cn(
            'fixed inset-0 z-50  backdrop-blur-[2px] bg-black/40 flex items-center justify-center animate-in  fade-in  ',
            {},
          )}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'bg-background size-fit flex flex-col p-10 border animate-in zoom-in-90  fade-in ',
              className,
            )}
          >
            {children}
          </div>
        </div>
      )}
    </>,
    document.body,
  );
};

Dialog.Message = ({ children, ...props }) => {
  return <p {...props}>{children}</p>;
};
Dialog.CancelButton = ({ children, ...props }) => {
  const { onClose } = useDialog();
  return (
    <Button onClick={onClose} {...props}>
      {children}
    </Button>
  );
};
Dialog.ConfirmButton = ({ children, isLoading, ...props }) => {
  return (
    <Button {...props}>
      {isLoading && <p className="text-sm">Loading...</p>}
      {!isLoading && children}
    </Button>
  );
};
