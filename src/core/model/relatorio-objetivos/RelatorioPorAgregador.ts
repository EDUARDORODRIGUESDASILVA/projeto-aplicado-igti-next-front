import { IProduto } from "../../interfaces/IProduto";
import { IUnidade } from "../../interfaces/IUnidade";
import { IRelatorio } from "../../interfaces/relatorio-objetivos/IRelatorio";
import { RelatorioPorAgregadorRow } from "./RelatorioPorAgregadorRow";

export interface RelatorioPorAgregadorFilter {
  comErros: boolean
  produtos: IProduto[]
  unidades: IUnidade[]
  textSearch: string
}
export class RelatorioPorAgregador implements IRelatorio {
  id: number;
  agregador: IUnidade;
  unidades: IUnidade[];
  produtos: IProduto[];
  prows: RelatorioPorAgregadorRow[];
  pfilteredrows: RelatorioPorAgregadorRow[];
  progresso: number = 0
  qtdlinhas: number = 0
  gravadas: number = 0
  erros: number = 0
  pfilter: RelatorioPorAgregadorFilter

  constructor(irelatorio: IRelatorio) {
    const rows: RelatorioPorAgregadorRow[] = []
    irelatorio.rows.forEach(r => {
      rows.push(new RelatorioPorAgregadorRow(r))
    })
    this.prows = rows
    this.pfilteredrows = []

    this.id = irelatorio.id
    this.unidades = irelatorio.unidades
    this.produtos = irelatorio.produtos
    this.agregador = irelatorio.agregador

    this.pfilter = {
      comErros: false,
      produtos: [],
      unidades: [],
      textSearch: ''
    }


    this.filterRows()
    this.totalizar()

  }

  totalizar() {
    let qtdLinhas = 0
    let gravadas = 0
    let erros = 0
    this.prows.forEach(r => {
      qtdLinhas += r.qtdlinhas
      gravadas += r.gravado
      const errosFilhos = this.prows.filter(l => r.unidade.id == l.unidade.sr
        && r.produto.id == l.produto.id)
        .map(l => l.erros)
        .reduce((p, c) => p + c, 0)
      r.erros = errosFilhos
      erros += (r.erros > 0 || errosFilhos > 0 || r.saldo !== 0 ? 1 : 0)
    })

    if (qtdLinhas == 0) {
      this.progresso = 0
    } else {

      const progress = (gravadas / qtdLinhas) * 100
      this.progresso = Math.trunc(progress * 100) / 100

    }
    this.erros = erros
    this.qtdlinhas = qtdLinhas
    this.gravadas = gravadas
  }

  get rows() {
    return this.pfilteredrows
  }

  set filter(filter: RelatorioPorAgregadorFilter) {
    this.pfilter = filter
    this.filterRows()
  }

  get filter() {
    return this.pfilter
  }

  private filterRows() {

    if (this.filter) {
      if (this.filter.comErros) {
        this.pfilteredrows = this.prows.filter(r => r.erros !== 0)
      } else {
        this.pfilteredrows = this.prows
      }

      if (this.filter.produtos.length > 0) {
        const ids = this.filter.produtos.map(r => r.id)
        this.pfilteredrows = this.prows.filter(
          r => ids.includes(r.produto.id)
        )
      }

      if (this.filter.unidades.length > 0 && this.filter.produtos.length === 0) {
        const ids = this.filter.unidades.map(r => r.id)
        this.pfilteredrows = this.pfilteredrows.filter(
          r => ids.includes(r.unidade.id)
        )
      }

      if (this.filter.textSearch !== '' && this.filter.textSearch.length >= 2) {
        const filtro = this.filter.textSearch.toUpperCase().trim()
        const searchTerms = filtro.split(',').map(v => v.trim())
        this.pfilteredrows = this.pfilteredrows.filter(r => {
          // .filter(row => searchTerms.some(value => row.column1.includes(value)));
          if (searchTerms.some(value => r.produto.nome.toUpperCase().includes(value)))
            return true
          if (searchTerms.some(value => r.unidade.nome.toUpperCase().includes(value)))
            return true

          if (r.produto.nome.toUpperCase().includes(filtro))
            return true
          if (r.produto.codsidem.toUpperCase().includes(filtro))
            return true
          if (r.produto.bloco.toUpperCase().includes(filtro))
            return true
          if (r.unidade.nome.toUpperCase().includes(filtro))
            return true
          if (r.unidade.cluster.toUpperCase().includes(filtro))
            return true
          if (r.unidade.se.toString().toUpperCase().includes(filtro))
            return true
          return false
        })
      }
    }
    this.sortRows()
  }

  private sortRows() {
    this.pfilteredrows = this.pfilteredrows.sort((r1, r2) => {
      if (r1.unidade.nivel - r2.unidade.nivel) {
        return r1.unidade.nivel - r2.unidade.nivel
      }


      if (r2.erros - r1.erros) {
        return r2.erros - r1.erros
      }
      if (r1.produto.codsidem < r2.produto.codsidem) {
        return -1
      }

      if (r1.produto.codsidem > r2.produto.codsidem) {
        return 1
      }

      return r2.metaAjustada - r1.metaAjustada
    })
  }

}
