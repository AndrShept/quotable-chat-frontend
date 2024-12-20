import React from 'react';

import { cn } from '../lib/utils';

interface UserAvatarProps {
  className?: string;
  avatarUrl: string | undefined;
}

export const Avatar = ({ className, avatarUrl }: UserAvatarProps) => {
  return (
    <div className={cn('size-9 relative border rounded-full shrink-0', className)}>
      <img
        className="size-full object-cover rounded-full"
        src={avatarUrl || 'no-user-avatar.jpg'}
        alt="avatar-image"
      />
    </div>
  );
};
