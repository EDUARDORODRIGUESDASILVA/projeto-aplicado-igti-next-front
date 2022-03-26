import { IProduto } from "../IProduto"
import { IUnidade } from "../IUnidade"
import { IUser } from "../IUser"

export interface IRowAjustar {
  id: number
  unidadeId: number
  produtoId: number
  userId: string
  Produto: IProduto
  Unidade: IUnidade
  Usuario: IUser
  metaReferencia: number
  metaReferencia2: number
  metaAjustada: number
  metaMinima: number
  trocas: number
  trava: string
  erros: number
  gravado: number
  ativo: number
  user: IUser
}
