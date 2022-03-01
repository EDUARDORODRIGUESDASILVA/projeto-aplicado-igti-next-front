import { IProduto } from "../IProduto"
import { IUnidade } from "../IUnidade"

export interface IAjustarProduto {
  unidade: IUnidade
  produto: IProduto
  metaReferencia: number
  metaReferencia2: number
  trocas: number
  metaAjustada: number
  erros: number
  rows: IAjustarProduto[]
}
