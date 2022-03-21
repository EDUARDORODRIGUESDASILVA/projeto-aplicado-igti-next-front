import { IProduto } from "../IProduto";
import { IUnidade } from "../IUnidade";
import { IRelatorioRow } from "./IRelatorioRow";

export interface IRelatorio {
  id: number
  agregador: IUnidade
  unidades: IUnidade[]
  produtos: IProduto[]
  rows: IRelatorioRow[]
}
