import { IAjustarProduto } from "../interfaces/ajustar-objetivos/IAjustarProduto";
import { IProduto } from "../interfaces/IProduto";
import { IUnidade } from "../interfaces/IUnidade";
import { AjustarProdutoRow } from "./AjustarProdutoRow";

export class AjusteMetas implements IAjustarProduto {

  private psaldo: number = 0
  private pmetaAjustada: number = 0
  public rows: AjustarProdutoRow[] = []

  public qtdTotalizacoes: number = 0
  constructor(
    public unidade: IUnidade,
    public produto: IProduto,
    public metaReferencia: number,
    public readonly metaReferencia2: number,
    public trocas: number,
    public erros: number = 0,

  ) {
  }

  addRows(rows: AjustarProdutoRow[]) {
    this.rows = rows
    this.rows.forEach(r => {
      r.parent = this
    })
  }

  totalizar() {
    let totalMetaAjustada = 0
    let totalMetaRef = 0
    let totalMetaReferencia2 = 0

    if (this.rows === undefined) {
      this.erros = 1
      throw new Error("Sem linhas para totalizar");
    }

    // totalizar as linhas
    this.rows.forEach( r => {
      totalMetaAjustada += r.metaAjustada
      totalMetaRef += r.metaReferencia
      // totalMetaReferencia2 =+ r.metaReferencia2
    })

    // a meta de referencia deve ser igual a meta das linhas
    if (this.metaReferencia !== totalMetaRef) {
      this.erros = 1
     // throw new Error("O total deve bater com as linhas");
    }

    // this.metaReferencia2 = totalMetaReferencia2
    this.metaReferencia = totalMetaRef
    this.metaAjustada = totalMetaAjustada
    this.psaldo = Math.trunc(((this.metaAjustada - (this.metaReferencia2 + this.trocas)) * 100)) / 100
    this.totalizarErros()
    this.calcularShare()
    this.qtdTotalizacoes++
  }

  private totalizarErros() {
    if (this.rows === undefined) {
      this.erros = 1
      throw new Error("Sem linhas para totalizar");
    }

    this.erros = 0
    this.rows.forEach (r =>  {

      this.erros += r.erros > 0 ? 1 : 0
    })

    if (this.psaldo > 0)  {
      this.erros++
    }




  }

  private calcularShare() {
    this.rows.forEach( r => {
      r.shareRef = (r.metaReferencia / this.metaReferencia) * 100
      r.shareAjustado = (r.metaAjustada / this.metaAjustada) * 100
    })
  }
  get metaAjustada() {
    return this.pmetaAjustada
  }

  set metaAjustada(meta) {
    this.pmetaAjustada=meta
  }

  get saldo() {
    return this.psaldo
  }


}
