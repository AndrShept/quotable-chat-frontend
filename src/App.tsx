import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';

import { AddConversationButton } from './components/AddConversationButton';
import { AuthButton } from './components/AuthButton';
import { Avatar } from './components/Avatar';
import { ConversationsList } from './components/ConversationsList';
import { LogOutButton } from './components/LogOutButton';
import { Search } from './components/Search';
import { useAuth } from './hooks/useAuth';
import { addConversationMessage } from './lib/redux/conversationSlice';
import { socket } from './lib/socket';
import { Message } from './lib/types/main.types.';

function App() {
  const { isAuthenticated, current } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    function onConnect() {}

    function onDisconnect() {}
    const socketListener = (data: string) => {
      const parsedData = JSON.parse(data) as Message;
      dispatch(addConversationMessage(parsedData));
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('go', socketListener);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('go', socketListener);
    };
  }, []);

  return (
    <main className="flex w-full">
      <aside className="flex w-[500px] flex-col">
        <section className="flex flex-col gap-3 border bg-secondary/50 p-3">
          <div className="flex justify-between">
            <Avatar avatarUrl={current?.avatarUrl} />
            {!isAuthenticated && <AuthButton />}
            {isAuthenticated && <LogOutButton />}

            
          </div>
          <Search />
        </section>

        <section className="flex flex-1 flex-col">
          <div className="p-4">
            <h3 className="text-sky-500">Chats</h3>
          </div>

          <ConversationsList />
          <div className="mt-auto p-4">
            <AddConversationButton />
          </div>
        </section>
      </aside>

      <Outlet />
    </main>
  );
}

export default App;
