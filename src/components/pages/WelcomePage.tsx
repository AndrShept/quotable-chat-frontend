import React from 'react';

export const WelcomePage = () => {
  return (
    <div className="flex flex-1 border-l p-8">
      <div className="m-auto text-muted-foreground">
        <h1 className="text-center text-5xl font-medium">Welcome User</h1>
        <p className="mt-2 text-center text-xl">Create and select your chat</p>

        <div className="mt-8 h-[400px] max-w-[600px] rounded-lg">
          <img
            className="size-full rounded-lg object-cover"
            src={'welcome.png'}
            alt="welcome-image"
          />
        </div>
      </div>
    </div>
  );
};
