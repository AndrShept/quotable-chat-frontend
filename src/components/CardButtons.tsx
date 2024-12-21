import React from 'react';

import { DeleteButton } from './ui/DeleteButton';
import { EditButton } from './ui/EditButton';

interface CardButtonsProps {
  id: string | undefined;
}

export const CardButtons = ({ id }: CardButtonsProps) => {
  return (
    <div className="ml-auto mt-auto flex opacity-0 group-hover:opacity-100">
      <EditButton id={id} />
      <DeleteButton id={id} />
    </div>
  );
};
