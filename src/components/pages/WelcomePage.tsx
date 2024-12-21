import React from 'react';

export const WelcomePage = () => {
  return (
    <div className="flex-1 flex border-l p-8">
      <div className="m-auto  text-muted-foreground">
        <h1 className="font-medium text-5xl  text-center">Welcome User</h1>
        <p className='text-center text-xl mt-2'>
            Create and select your chat
        </p>

        <div className="h-[400px] max-w-[600px] rounded-lg mt-8">
          <img
            className="object-cover rounded-lg size-full"
            src={'welcome.png'}
            alt="welcome-image"
          />
        </div>
      </div>
    </div>
  );
};
