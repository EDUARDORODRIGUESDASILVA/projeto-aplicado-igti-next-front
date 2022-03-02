import { IProduto } from "../IProduto"
import { IUnidade } from "../IUnidade"
import { IRowAjustar } from "./IRowAjustar"

export interface IAjustarProduto {
  unidade: IUnidade
  produto: IProduto
  metaReferencia: number
  metaReferencia2: number
  trocas: number
  metaAjustada: number
  erros: number
  rows: IRowAjustar[]
}
