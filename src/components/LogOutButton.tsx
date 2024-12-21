import { googleLogout } from '@react-oauth/google';
import React, { useEffect } from 'react';

import { Button } from './ui/Button';

export const LogOutButton = () => {
  useEffect(() => {
    console.log('gogg');
    googleLogout();
  }, []);
  return (
    <Button
      // onClick={() =>}
      variant="outline"
      className="scale-75 rounded-full border font-bold text-sky-500 hover:text-sky-500"
    >
      Log out
    </Button>
  );
};
