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
  private pmetaAjustada: number;
  private perros: number;
  gravado: number;
  qtdlinhas: number;
  private psaldo: number = 0;

  constructor(row: IRelatorioRow) {
      this.id = row.id
      this.unidade = row.unidade
      this.produto = row.produto
    this.metaReferencia = Math.trunc(row.metaReferencia * 100) / 100
    this.metaReferencia2 = Math.trunc(row.metaReferencia2 * 100) / 100
    this.trocas = row.trocas
    this.pmetaAjustada = row.metaAjustada
      this.perros = row.erros
      this.gravado = row.gravado
      this.qtdlinhas = row.qtdlinhas
      this.calculaSaldo()
  }

  get metaAjustada() {
    return this.pmetaAjustada
  }

  get saldo() {
    return this.psaldo
  }

  calculaSaldo() {
    if (this.unidade.tipo == 'SR') {
      this.psaldo = this.metaAjustada - this.metaReferencia
      this.psaldo = Math.abs(this.psaldo) > 0.015 ? this.psaldo : 0
    } else {
      this.psaldo = this.metaAjustada - this.metaReferencia2
    }
  }

  get erros() {
    return (this.perros > 0 || Math.abs(this.saldo) > 0.015  ? 1 : 0)
  }

  set erros(erros: number) {
    this.perros = erros
  }
}
