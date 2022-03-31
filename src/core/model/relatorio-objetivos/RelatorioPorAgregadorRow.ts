import { IProduto } from "../../interfaces/IProduto";
import { IUnidade } from "../../interfaces/IUnidade";
import { IRelatorioRow } from "../../interfaces/relatorio-objetivos/IRelatorioRow";

export class RelatorioPorAgregadorRow implements IRelatorioRow {
  id: number;
  unidade: IUnidade;
  produto: IProduto;
  metaReferencia: number;
  metaReferencia2: number;
  trocas: number;
  metaAjustada: number;
  private perros: number;
  gravado: number;
  qtdlinhas: number;

  constructor(row: IRelatorioRow) {
      this.id = row.id
      this.unidade = row.unidade
      this.produto = row.produto
      this.metaReferencia = row.metaReferencia
      this.metaReferencia2 = row.metaReferencia2
      this.trocas = row.trocas
      this.metaAjustada = row.metaAjustada
      this.perros = row.erros
      this.gravado = row.gravado
      this.qtdlinhas = row.qtdlinhas
  }

  get saldo() {
    if (this.unidade.tipo=='SR') {
      return (Math.trunc(this.metaAjustada * 100) / 100) - (Math.trunc(this.metaReferencia * 100) / 100)
    }
    return (Math.trunc(this.metaAjustada * 100) / 100) - (Math.trunc(this.metaReferencia2 * 100) / 100)
  }

  get erros() {
    return (this.perros > 0 || Math.abs(this.saldo) > 0.02 ? 1 : 0)
  }

  set erros(erros: number) {
    this.perros = erros

  }
}
