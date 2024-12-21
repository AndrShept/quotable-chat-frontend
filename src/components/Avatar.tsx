import React from 'react';

import { cn } from '../lib/utils';

interface UserAvatarProps {
  className?: string;
  avatarUrl: string | undefined;
}

export const Avatar = ({ className, avatarUrl }: UserAvatarProps) => {
  return (
    <div
      className={cn('relative size-9 shrink-0 rounded-full border', className)}
    >
      <img
        className="size-full rounded-full object-cover"
        src={avatarUrl || 'no-user-avatar.jpg'}
        alt="avatar-image"
      />
    </div>
  );
};
