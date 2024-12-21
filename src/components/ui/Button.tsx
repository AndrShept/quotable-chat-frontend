import React, { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  size?: 'default' | 'icon';
  variant?: 'default' | 'ghost' | 'outline';
}

export const Button = ({
  children,
  className,
  size = 'default',
  variant = 'default',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex h-fit w-fit items-center justify-center gap-1 rounded-md bg-primary px-3 py-2 text-base text-secondary transition-colors hover:bg-primary/90',
        {
          'bg-transparent text-primary hover:bg-secondary': variant === 'ghost',
          'border border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground':
            variant === 'outline',
          'h-10 w-10 p-2': size === 'icon',
        },
        className,
      )}
    >
      {children}
    </button>
  );
};
