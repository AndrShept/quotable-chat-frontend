import React from 'react';

import { Button } from './ui/Button';

export const LogOutButton = () => {
  return (
    <Button
      variant="outline"
      className="text-sky-500 hover:text-sky-500 rounded-full  border scale-75 font-bold"
    >
      Log out
    </Button>
  );
};
