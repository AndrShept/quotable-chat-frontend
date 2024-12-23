import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  useCreateConversationMutation,
  useLazyGetConversationsQuery,
  useUpdateConversationMutation,
} from '../lib/services/conversationApi';
import { Dialog } from './ui/Dialog';
import { Input } from './ui/Input';

interface IConversationData {
  firstName: string | undefined;
  lastName: undefined | string;
}

interface ConversationFromProps {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  initialData?: IConversationData & { id: string | undefined };
}

export const ConversationFrom = ({
  setIsOpen,
  initialData,
}: ConversationFromProps) => {
  const [createConversation, { isLoading }] = useCreateConversationMutation();
  const [updateConversation, { isLoading: isLoadingUpdate }] =
    useUpdateConversationMutation();
  const [refetchConversations] = useLazyGetConversationsQuery();
  const [conversationData, setConversationData] = useState<IConversationData>({
    firstName: undefined,
    lastName: undefined,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const onClick = async () => {
    const { firstName, lastName } = conversationData;

    if ((firstName && firstName.length < 3) || !firstName) {
      setErrorMessage('The name must be at least 3 characters long. ');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    try {
      if (!firstName) return;
      let res;
      if (initialData) {
        res = await updateConversation({
          firstName: firstName!,
          id: initialData.id!,
          lastName: lastName,
        }).unwrap();
      } else {
        res = await createConversation({
          firstName,
          lastName,
        }).unwrap();
      }
      await refetchConversations().unwrap();
      setIsOpen(false);
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  useEffect(() => {
    if (initialData) {
      setConversationData(initialData);
    }
  }, []);
  return (
    <>
      <h1 className="mb-10 text-xl font-medium">
        {initialData
          ? "Let's update a custom chat!"
          : "Let's create a custom chat!"}
      </h1>
      <div>
        <p className="text-sm text-muted-foreground">First name</p>
        <Input
          required
          value={conversationData.firstName}
          onChange={(e) =>
            setConversationData((prev) => ({
              ...prev,
              firstName: e.target.value,
            }))
          }
        />
        {errorMessage && (
          <span className="mt-1 text-sm text-red-500">{errorMessage}</span>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Last name</p>
        <Input
          required
          value={conversationData.lastName}
          onChange={(e) =>
            setConversationData((prev) => ({
              ...prev,
              lastName: e.target.value,
            }))
          }
        />
      </div>
      <div className="ml-auto mt-2 flex gap-2">
        <Dialog.ConfirmButton
          isLoading={isLoading || isLoadingUpdate}
          onClick={onClick}
          disabled={isLoading || isLoadingUpdate}
        >
          {initialData ? 'save' : 'ok'}
        </Dialog.ConfirmButton>
        <Dialog.CancelButton disabled={isLoading}>cancel</Dialog.CancelButton>
      </div>
    </>
  );
};
