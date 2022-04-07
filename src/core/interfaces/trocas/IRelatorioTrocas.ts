import { IProduto } from "../IProduto"
import { IUnidade } from "../IUnidade"
import { ITroca } from "./ITroca"

export interface IRelatorioTrocas {
  agregador: IUnidade
  produtos: IProduto[]
  unidadesAumentar: IUnidade[]
  unidadesReduzir: IUnidade[]
  trocas: ITroca[]
}
