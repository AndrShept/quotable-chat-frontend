import { SearchIcon } from 'lucide-react';

import { useAppSelector } from '../hooks/store-hooks';
import { useGetConversationsQuery } from '../lib/services/conversationApi';
import { ConversationCard } from './ConversationCard';
import { Spinner } from './Spinner';

export const ConversationsList = () => {
  const { isLoading, isError } = useGetConversationsQuery();

  const searchValue = useAppSelector((state) => state.conversation.searchValue);
  const conversations = useAppSelector((state) =>
    state.conversation.conversations?.filter((item) =>
      item.firstName
        .toLocaleLowerCase()
        .includes(searchValue?.toLocaleLowerCase() ?? ''),
    ),
  );

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center">
        Something went wrong while fetching data. Please try again later.
      </p>
    );

  return (
    <>
      <ul className="flex  flex-col h-[70vh]  overflow-y-auto  ">
        {searchValue && !conversations.length ? (
          <div className="text-muted-foreground m-auto flex flex-col items-center gap-2">
            <SearchIcon className="size-7" />
            <p className=" text-sm">Chat not found </p>
          </div>
        ) : (
          conversations?.map((conversation) => (
            <ConversationCard conversation={conversation} />
          ))
        )}
      </ul>
    </>
  );
};
