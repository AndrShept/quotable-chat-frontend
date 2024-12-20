import { Loader2 } from 'lucide-react';
import React from 'react';

export const Spinner = () => {
  return (
    <section className="flex-1 flex   ">
      <div className="m-auto flex flex-col items-center gap-2 ">
        <Loader2 className="animate-spin size-8" />
        <p className="text-center text-muted-foreground">Loading</p>
      </div>
    </section>
  );
};
