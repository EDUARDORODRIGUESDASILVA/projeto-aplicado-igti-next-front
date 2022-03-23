import { IAjustarProduto } from "../interfaces/ajustar-objetivos/IAjustarProduto";
import { IProduto } from "../interfaces/IProduto";
import { IUnidade } from "../interfaces/IUnidade";
import { AjustarProdutoRow } from "./AjustarProdutoRow";

export interface IAjusteMetasFiltro {
  sevs: number[]
  unidades: IUnidade[]
  cluster: string[]
}
export class AjusteMetas implements IAjustarProduto {

  private psaldo: number = 0
  private pmetaAjustada: number = 0

  private pallrows: AjustarProdutoRow[] = []
  private prows: AjustarProdutoRow[] = []

  private checkbox: boolean

  private pauxiliarTroca: number
  private pfilter: IAjusteMetasFiltro
  public qtdTotalizacoes: number = 0
  constructor(
    public unidade: IUnidade,
    public produto: IProduto,
    public metaReferencia: number,
    public readonly metaReferencia2: number,
    public trocas: number,
    public erros: number = 0
  ) {
    this.pauxiliarTroca = 0
    this.checkbox = false
    this.pfilter = {
      sevs: [],
      unidades: [],
      cluster: []
    }
  }

  set rows(rows: AjustarProdutoRow[]) {
    this.prows = rows
    this.rows.forEach(r => {
      r.parent = this
    })
  }

  get rows() {
    return this.prows
  }

  addRows(rows: AjustarProdutoRow[]) {
    this.pallrows = rows
    this.rows = rows
  }

  get auxiliarTroca(): number {
    return this.pauxiliarTroca
  }
  set auxiliarTroca(valor: number) {
    this.pauxiliarTroca = valor
    this.totalizar()
  }
  get filter() {
    return this.pfilter
  }
  set filter(f: IAjusteMetasFiltro) {
    this.pfilter = f
    this.filtrar(f)
  }

  totalizar() {
    let totalMetaAjustada = 0
    let totalMetaRef = 0
    let totalMetaRef2 = 0

    if (this.pallrows === undefined) {
      this.erros = 1
      throw new Error("Sem linhas para totalizar");
    }

    // totalizar as linhas
    this.pallrows.forEach(r => {
      totalMetaAjustada += r.metaAjustada
      totalMetaRef += r.metaReferencia
      totalMetaRef2 += r.metaReferencia
    })

    // a meta de referencia deve ser igual a meta das linhas
    if (this.metaReferencia2 !== totalMetaRef2) {
      this.erros = 1
    }

    this.metaAjustada = totalMetaAjustada
    this.psaldo = Math.trunc(((this.metaAjustada - (this.metaReferencia2 + this.trocas + this.pauxiliarTroca)) * 100)) / 100
    this.totalizarErros()
    this.calcularShare()
    this.qtdTotalizacoes++
  }

  private filtrar(f: IAjusteMetasFiltro) {

    let rows: AjustarProdutoRow[] = [...this.pallrows]

    if (f.cluster.length > 0) {
      rows = rows.filter(r => f.cluster.includes(r.Unidade.cluster))
    }

    if (f.sevs.length > 0) {
      rows = rows.filter(r => f.sevs.includes(r.Unidade.se))
    }

    if (f.unidades.length > 0 ) {
      rows = rows.filter(r => f.unidades.map(un => un.id).includes(r.Unidade.id))
    }
    this.rows = rows
  }

  private totalizarErros() {
    if (this.rows === undefined) {
      this.erros = 1
      throw new Error("Sem linhas para totalizar");
    }

    this.erros = 0
    this.pallrows.forEach(r => {
      this.erros += r.erros > 0 ? 1 : 0
    })

    if (this.psaldo > 0) {
      this.erros++
    }
  }

  private calcularShare() {
    this.pallrows.forEach(r => {
      r.shareRef = (r.metaReferencia / this.metaReferencia) * 100
      r.shareAjustado = (r.metaAjustada / this.metaAjustada) * 100
    })
  }
  get metaAjustada() {
    return this.pmetaAjustada
  }

  set metaAjustada(meta) {
    this.pmetaAjustada = meta
  }

  get saldo() {
    return this.psaldo
  }

  get checked() {
    return this.checkbox
  }

  set checked(v: boolean) {
    this.checkbox = v
    this.rows.forEach(r => r.checked = this.checkbox)
  }

  toggleCheckbox() {
    this.checked = !this.checkbox

  }
  sincronizarCheckbox() {
    let allChecked = true
    this.rows.forEach(r => {
      if (!r.checked) {
        allChecked = false
      }
    })
    this.checkbox = allChecked
  }

  distribuirProporcional(contagem?: number) {
    if (typeof(contagem)=='undefined') {
      contagem = 3
    }
    let totalSelecionado = 0
    const saldo = this.saldo
    this.rows.forEach(r => {
      if (r.checked) {
        totalSelecionado += r.metaAjustada
      }
    })

    this.rows.forEach(r => {
      if (r.checked) {
        const adicionar = (r.metaAjustada / totalSelecionado) * saldo * -1
        r.adicionarValor(adicionar)

      }
    })
    if(this.auxiliarTroca !==0) {
      this.auxiliarTroca = 0
    } else {
      // garantir o arredondamento zero
      if (this.saldo !== 0 && contagem > 0) {
        this.distribuirProporcional(contagem - 1)
      }
    }



  }
  zerar() {
    this.rows.forEach(r => {
      r.zerar()
    })

    this.totalizar()
  }
}
