import React from 'react';

interface NewMessageBadeProps {
  isRead: boolean;
}
export const NewMessageBade = ({ isRead }: NewMessageBadeProps) => {
  return (
    <>
      {!isRead && (
        <div className="m-auto my-1 size-2 animate-pulse rounded-full bg-sky-600" />
      )}
    </>
  );
};
