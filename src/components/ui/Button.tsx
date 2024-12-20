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
        'h-fit w-fit px-3 py-2 rounded-md bg-primary text-secondary text-base hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-1 ',
        {
          'bg-transparent hover:bg-secondary text-primary': variant === 'ghost',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground':
            variant === 'outline',
          'h-10 w-10 p-2 ': size === 'icon',
        },
        className,
      )}
    >
      {children}
    </button>
  );
};
