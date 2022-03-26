import { useEffect, useState } from 'react';

import { fetchLoggedUser } from '../services/userService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, logout, selectUser } from '../store/userSlice';
export const useFetchLoggedUser = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState<Error>();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchUser() {
      try {
        if (!user) {
         setisLoading(true)
          const user = await fetchLoggedUser()
          dispatch(login(user))
        }
      } catch (error: any) {
        dispatch(logout())
        seterror(new Error('Não foi possível autenticar o usuário!'))
      } finally {
        setisLoading(false)
      }
    }

    if (!user) {
      fetchUser()
    }
  }, []);

  return { isLoading, user, error }
}
