import { SearchIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import { useAppDispatch } from '../hooks/store-hooks';
import { setSearchValue } from '../lib/redux/conversationSlice';
import { Input } from './ui/Input';

export const Search = () => {
  const dispatch = useAppDispatch();
  const [debouncedValue, setDebouncedValue] = useDebounceValue('', 400);

  useEffect(() => {
    dispatch(setSearchValue(debouncedValue));
  }, [debouncedValue]);
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-2 size-5 text-muted-foreground" />
      <Input
        defaultValue={debouncedValue}
        onChange={(e) => {
          setDebouncedValue(e.target.value);
        }}
        placeholder="Search or start new chat"
        className="rounded-full border h-9 pl-10 "
      />
    </div>
  );
};
