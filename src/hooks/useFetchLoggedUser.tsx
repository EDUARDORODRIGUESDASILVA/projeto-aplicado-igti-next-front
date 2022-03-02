import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLoggedUser } from '../services/userService';
import { useAppSelector } from '../store/hooks';
import { login, selectUser} from '../store/userSlice';

export const useFetchLoggedUser = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState('');
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchUser() {
      setisLoading(true)
      const retUser = await getLoggedUser()
      dispatch(login(retUser))
      setisLoading(false)
    }

    if (!user && isLoading == false){
      fetchUser()
    }
  }, []);

  return { isLoading, user, error}
}
