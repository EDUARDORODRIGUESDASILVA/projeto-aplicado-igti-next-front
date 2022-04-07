import { IProduto } from "../../interfaces/IProduto"
import { IUnidade } from "../../interfaces/IUnidade"
import { IRelatorioTrocas } from "../../interfaces/trocas/IRelatorioTrocas"
import { Troca } from "./Trocas"

export class RelatorioTrocas implements IRelatorioTrocas {
  agregador: IUnidade
  produtos: IProduto[]
  unidadesAumentar: IUnidade[]
  unidadesReduzir: IUnidade[]
  trocas: Troca[]

  constructor(r: IRelatorioTrocas) {
    this.agregador = r.agregador
    this.produtos = r.produtos
    this.unidadesAumentar = r.unidadesAumentar
    this.unidadesReduzir = r.unidadesReduzir
    this.trocas = r.trocas.map(t => new Troca(t, r))
  }
}
