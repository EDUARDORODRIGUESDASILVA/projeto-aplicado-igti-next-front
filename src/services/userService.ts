import { IUser } from '../core/interfaces/IUser';
import instance from './axiosService'

export async function fetchLoggedUser(): Promise<IUser> {
  console.log('initiate login')
  try {
    const resp = await instance.get(`/user`)

    if (resp.status !== 200) {
      throw new Error(resp.statusText + ' | ' + resp.data.msg);
    }

    const user: IUser = resp.data
    return user

  } catch (error: any) {
    throw new Error('Falha ao buscar usuário!');
  }
}

export async function fetchUsers(unidadeId: number): Promise<IUser[]> {
  console.log('fetch users')
  try {
    const resp = await instance.get(`/user/list`)

    if (resp.status !== 200) {
      throw new Error(resp.statusText + ' | ' + resp.data.msg);
    }

    const users: IUser[] = resp.data
    return users

  } catch (error: any) {
    throw new Error('Falha ao buscar usuários!');
  }
}

