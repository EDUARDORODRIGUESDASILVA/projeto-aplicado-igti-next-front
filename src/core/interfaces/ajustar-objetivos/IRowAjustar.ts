import { IProduto } from "../IProduto"
import { IUnidade } from "../IUnidade"
import { IUser } from "../IUser"

export interface IRowAjustar {
  produto: IProduto
  iUnidade: IUnidade
  metaReferencia: number
  metaReferencia2: number
  metaAjustada: number
  metaMinima: number
  trocas: number
  trava: string | number
  erros: number
  user: IUser
  ipct: number
  ivalor: number
}
