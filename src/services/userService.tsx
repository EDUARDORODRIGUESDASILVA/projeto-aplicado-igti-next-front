import { IUser } from '../core/interfaces/IUser';
import instance from './axiosService'

export async function getLoggedUser(): Promise<IUser> {
  const resp = await instance.get(`/user`)
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  const data: IUser = resp.data
  return data
}
