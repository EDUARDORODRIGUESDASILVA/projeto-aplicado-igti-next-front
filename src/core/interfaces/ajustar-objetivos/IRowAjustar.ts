import { IProduto } from "../IProduto"
import { IUnidade } from "../IUnidade"
import { IUser } from "../IUser"

export interface IRowAjustar {
  id: number,
  unidadeId: number,
  produtoId: number,
  Produto: IProduto
  Unidade: IUnidade
  metaReferencia: number
  metaReferencia2: number
  metaAjustada: number
  metaMinima: number
  trocas: number
  trava: string
  erros: number
  user: IUser
}
