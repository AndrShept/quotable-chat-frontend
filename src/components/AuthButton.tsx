import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';

import { useAppDispatch } from '../hooks/store-hooks';
import { setCurrentUser } from '../lib/redux/userSlice';

export const AuthButton = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const res = jwtDecode(credentialResponse.credential ?? '') as any;
          dispatch(
            setCurrentUser({
              avatarUrl: res.picture,
              name: res.name,
              email: res.email,
            }),
          );
          toast.success(`Hi ${res.name} you success login!`);
        }}
        onError={() => {
          console.log('Login Failed');
          toast.error('Something went wrong');
        }}
        auto_select={true}
      />
    </>
  );
};
