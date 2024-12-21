import { Loader2 } from 'lucide-react';
import React from 'react';

export const Spinner = () => {
  return (
    <section className="flex flex-1">
      <div className="m-auto flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin" />
        <p className="text-center text-muted-foreground">Loading</p>
      </div>
    </section>
  );
};
