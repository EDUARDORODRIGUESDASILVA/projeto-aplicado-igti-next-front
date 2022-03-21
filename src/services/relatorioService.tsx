

import { IProduto } from '../core/interfaces/IProduto';
import { IUnidade } from '../core/interfaces/IUnidade';
import { IRelatorio } from '../core/interfaces/relatorio-objetivos/IRelatorio';
import { IRelatorioRow } from '../core/interfaces/relatorio-objetivos/IRelatorioRow';
import { RelatorioPorAgregador } from '../core/model/RelatorioPorAgregador';
import instance from './axiosService';

interface IRelatorioInputRow {
  metaReferencia: number,
  metaAjustada: number,
  metaReferencia2: number
  trocas: number,
  erros: number,
  gravado: number,
  qtdlinhas: number
  produtoId: number,
  Unidade: {
    sr?: number
    vinc?: number
  }
}
interface IRelatorioInput {
  agregador: IUnidade
  unidades: IUnidade[]
  produtos: IProduto[]
  rows: IRelatorioInputRow[]
}

async function fetchRelatorioAgregador(unidadeId: number): Promise<IRelatorioInput> {
  try {
    const resp = await instance.get(`/objetivo/relatorio/${unidadeId}`)

    if (resp.status !== 200) {
      throw new Error(resp.statusText + ' | ' + resp.data.msg);
    }

    const dados: IRelatorioInput = resp.data
    return dados

  } catch (error: any) {
    console.log(error)
    throw new Error('Falha ao buscar ajuste');
  }
}

export async function criarRelatorioPorAgregador(unidadeId: number, produtoId?: number): Promise<RelatorioPorAgregador> {
  const dados = await fetchRelatorioAgregador(unidadeId)
  const unidades = dados.unidades
  const produtos = dados.produtos
  const agregador = dados.agregador
  const rows: IRelatorioRow[] = []
  let i = 0;
  dados.rows.forEach( r => {
    const unidadeId = r.Unidade.sr || r.Unidade.vinc
    const unidade =  unidades.find( u=> u.id == unidadeId)

    const produtoId = r.produtoId
    const produto = produtos.find( p=> p.id == produtoId)
    if (unidade && produto) {
      const row: IRelatorioRow = {
        id: i++,
        unidade,
        produto,
        metaReferencia: r.metaReferencia,
        metaReferencia2: r.metaReferencia2,
        trocas: r.trocas,
        metaAjustada: r.metaAjustada,
        erros: r.erros,
        qtdlinhas: r.qtdlinhas,
        gravado: r.gravado
      }
      rows.push(row)
    }
  })

  const irelatorio: IRelatorio = {
    id: unidadeId,
    agregador,
    unidades,
    produtos,
    rows

  }

  const relatorio = new RelatorioPorAgregador(irelatorio)

  console.log('ajustar filtro', produtoId)
  if (produtoId !== 0) {
    const f = relatorio.filter
    const produto = relatorio.produtos.find( p => p.id == produtoId)
    if (produto) {
      f.produtos = [produto]
      relatorio.filter = f
    }

  }
  return Promise.resolve(relatorio)
}
