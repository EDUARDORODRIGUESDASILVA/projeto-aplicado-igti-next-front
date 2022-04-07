import { IUser } from "../IUser"


export interface ITroca {
  id: number
  incrementaId: number
  reduzId: number
  produtoId: number
  userId: string
  valor: number
  status: 'OK' | 'Cancelada'
  Usuario: IUser
}
