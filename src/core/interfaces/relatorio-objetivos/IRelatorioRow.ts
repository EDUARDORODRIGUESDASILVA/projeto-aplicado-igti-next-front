import { IProduto } from "../IProduto";
import { IUnidade } from "../IUnidade";

export interface IRelatorioRow {
  id: number
  unidade: IUnidade
  produto: IProduto
  metaReferencia: number
  metaReferencia2: number
  trocas: number
  metaAjustada: number
  erros: number
  gravado: number
  qtdlinhas: number



}
