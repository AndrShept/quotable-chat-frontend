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
        {conversations?.map((conversation) => (
          <ConversationCard conversation={conversation} />
        ))}
      </ul>
    </>
  );
};
