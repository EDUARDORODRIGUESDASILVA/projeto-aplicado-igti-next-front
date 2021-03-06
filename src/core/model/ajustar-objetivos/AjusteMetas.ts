import { IAjustarProduto } from "../../interfaces/ajustar-objetivos/IAjustarProduto";
import { IProduto } from "../../interfaces/IProduto";
import { IUnidade } from "../../interfaces/IUnidade";
import { IUser } from "../../interfaces/IUser";
import { AjustarProdutoRow } from "./AjustarProdutoRow";

export interface IAjusteMetasFiltro {
  sevs: number[]
  unidades: IUnidade[]
  cluster: string[]
  erros: boolean
}
export interface IAjusteImportadoExcel {
  id: number,
  ajustado: number
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
  public metaReferencia: number
  public trocas: number
  public readonly metaReferencia2: number

  constructor(
    public visao: 'AG' | 'SE',
    public unidade: IUnidade,
    public produto: IProduto,
    metaReferencia: number,
    metaReferencia2: number,
    trocas: number,
    public erros: number = 0
  ) {

    this.metaReferencia = Math.trunc(metaReferencia * 100) / 100
    this.metaReferencia2 = Math.trunc(metaReferencia2 * 100) / 100
    this.trocas = Math.trunc(trocas * 100) / 100
    this.pauxiliarTroca = 0
    this.checkbox = false
    this.pfilter = {
      sevs: [],
      unidades: [],
      cluster: [],
      erros: false
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
    this.pauxiliarTroca = Math.trunc(valor * 100) / 100
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
    this.calculaSaldo()
    this.totalizarErros()
    this.calcularShare()
    this.calcularOutliers()
    this.qtdTotalizacoes++
  }

  private filtrar(f: IAjusteMetasFiltro) {

    let rows: AjustarProdutoRow[] = [...this.pallrows]

    if(f.erros) {
      rows = rows.filter(r => r.erros > 0)
    }

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

    // if (this.saldo > 0) {
    //   this.erros++
    // }
  }

  updateUser(user: IUser) {
    this.pallrows.forEach( r => { r.Usuario = user, r.userId = user.matricula} )
  }

  private calcularShare() {
    this.pallrows.forEach(r => {
      if(this.metaReferencia)
      r.shareRef = (r.metaReferencia / this.metaReferencia) * 100

      if (this.metaAjustada)
      r.shareAjustado = (r.metaAjustada / this.metaAjustada) * 100
    })
  }

  get metaAjustada() {
    return this.pmetaAjustada
  }

  set metaAjustada(meta) {
    this.pmetaAjustada = Math.trunc(meta * 100) / 100
  }

  calculaSaldo() {
    if (this.unidade.tipo== 'SR' )
      this.psaldo = (this.metaAjustada - (this.metaReferencia + this.pauxiliarTroca))
    else
      this.psaldo = (this.metaAjustada - (this.metaReferencia2 + this.pauxiliarTroca))
    this.psaldo = Math.trunc(this.psaldo * 100) / 100
      return this.psaldo
  }

  get saldo() {
    return Math.trunc(this.psaldo * 100) / 100
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

  atualizaObjetivosFromExcel(input: IAjusteImportadoExcel[]) {
    if(input.length > 0) {
      input.forEach ( i => {
        const r = this.rows.find( j => j.id == i.id)
        if (r) {
          r.inputMetaAjustada = i.ajustado
        }
      })
    }

  }

  distribuirProporcional(contagem?: number) {
    if (typeof(contagem)=='undefined') {
      contagem = 20
    }
    let totalSelecionado = 0
    const saldo = this.calculaSaldoDistribuir()
    this.rows.forEach(r => {
      if (r.checked) {
        totalSelecionado += r.metaAjustada
      }
    })

    let qtdUnidades = 0
    this.rows.forEach(r => {
      if (r.checked) {
        const adicionar = (r.metaAjustada / totalSelecionado) * (saldo * -1)
        r.adicionarValor(adicionar)
        qtdUnidades++
      }
    })
    if(qtdUnidades > 0) {
      if (this.auxiliarTroca !== 0) {
        this.auxiliarTroca = 0
      }
      else {
        this.totalizar()
        const saldo =this.calculaSaldoDistribuir()
        if ( saldo !== 0 && contagem > 0) {
          this.distribuirProporcional(contagem - 1)
        }
      }
    }
  }
  calculaSaldoDistribuir(): number {
    let distribuir = 0
    if (this.visao == 'SE')
      distribuir =  (this.pmetaAjustada - (this.metaReferencia +  this.trocas + this.pauxiliarTroca))
    else
      distribuir = (this.pmetaAjustada - (this.metaReferencia2 + this.pauxiliarTroca))
    return Math.trunc(distribuir * 100) / 100
  }

  zerar() {
    this.rows.forEach(r => {
      r.zerar()
    })
    this.totalizar()
  }

  inicial() {
      this.rows.forEach( r=> {
        r.inicial()
      })
    this.totalizar()
  }

  calcularOutliers () {
    const clustersMap = this.pallrows.map(r => r.Unidade.cluster)
    let clusters = new Set(clustersMap);

    clusters.forEach((cluster) => {
      const rows  = this.pallrows.filter( r => r.Unidade.cluster == cluster)
      const values = rows.map(r => r.metaAjustada)
      const total = rows.reduce( (acc, r: AjustarProdutoRow) => acc + r.metaAjustada, 0);
      const media = (total / rows.length) || 0;
      const desvio = this.standardDeviation(values)
      const minimo = media - desvio
      const maximo = media + desvio
      const v = {minimo, maximo, media, desvio }
      rows.forEach(r => r.setOutliersClusterValues(v))
    });
  }

   standardDeviation(arr: number[]) {
      // Creating the mean with Array.reduce
      let mean = arr.reduce((acc, curr) => {
        return acc + curr
      }, 0) / arr.length;

      // Assigning (value - mean) ^ 2 to every array item
      arr = arr.map((k) => {
        return (k - mean) ** 2
      })
      // Calculating the sum of updated array
      let sum = arr.reduce((acc, curr) => acc + curr, 0);
      // Calculating the variance
      let variance = sum / arr.length
      // Returning the Standered deviation
      return Math.sqrt(sum / arr.length)
    }


}
