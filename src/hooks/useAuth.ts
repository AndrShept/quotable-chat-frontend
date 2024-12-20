import { useAppSelector } from './store-hooks';

export const useAuth = () => {
  const current = useAppSelector((state) => state.user.current ?? null);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return {
    current,
    isAuthenticated,
  };
};
