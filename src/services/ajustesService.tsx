import instance from './axiosService';
import { IAjustarProduto } from '../core/interfaces/ajustar-objetivos/IAjustarProduto';
import { AjustarProdutoRow } from '../core/model/ajustar-objetivos/AjustarProdutoRow';
import { AjusteMetas } from '../core/model/ajustar-objetivos/AjusteMetas';
import { IRowAjustar } from '../core/interfaces/ajustar-objetivos/IRowAjustar';
import { IUser } from '../core/interfaces/IUser';

export async function fetchAjustesAgregador(tipo: 'AG' | 'SE', unidadeId: number, produtoId: number): Promise<IAjustarProduto> {
  try {
    const resp = await instance.get(`/objetivo/ajustar/${tipo}/${unidadeId}/${produtoId}`)

    if (resp.status !== 200) {
      throw new Error(resp.statusText + ' | ' + resp.data.msg);
    }

    const ajustar: IAjustarProduto = resp.data
    return ajustar

  } catch (error: any) {
    console.log(error)
    throw new Error('Falha ao buscar ajuste');
  }
}

export async function criarAjustePorAgregador(tipo: 'AG' | 'SE',unidadeId: number, produtoId: number): Promise<AjusteMetas> {
  const fetched: IAjustarProduto = await fetchAjustesAgregador(tipo, unidadeId, produtoId)

  const rows: AjustarProdutoRow[] = []

  fetched.rows.forEach(
    r => rows.push(new AjustarProdutoRow(r))
  )

  const ajuste: AjusteMetas = new AjusteMetas(
    fetched.unidade,
    fetched.produto,
    fetched.metaReferencia,
    fetched.metaReferencia2,
    fetched.trocas
  )
  ajuste.addRows(rows)
  ajuste.totalizar()
  return ajuste
}

interface IUpdateObjetivosLote {
  id: number,
  metaAjustada: number
}

export async function atualizarObjetivosLote(unidadeId: number, produtoId: number,
   ajuste: AjusteMetas, gravaReferencia: boolean): Promise<IUser> {
  try {
    const lote: IUpdateObjetivosLote[] = []

    ajuste.rows.forEach(r => {
      const l: any = { id: r.id, metaAjustada: r.metaAjustada }
      if (gravaReferencia) {
        l.metaReferencia2 = r.metaAjustada
      }
      lote.push(l)
    })
    const resp = await instance.post(`/objetivo/ajustar/${unidadeId}/${produtoId}`, lote)

    if (resp.status !== 200) {
      throw new Error(resp.statusText + ' | ' + resp.data.msg);
    }
    const user = resp.data
    return Promise.resolve(user)

  } catch (error: any) {
    throw new Error('Falha ao atualizar objetivos');
  }
}

export interface IFetchBaseCompletaQuery {
  sr?: number,
  se?: number,
  vinc?: number
  produtoId?: number
}
export async function fetchBaseCompleta(query: IFetchBaseCompletaQuery): Promise<AjustarProdutoRow[]> {
  try {

    let squery = ""

    if (query.vinc) {
      squery = `?vinc=${query.vinc}`
    }

    if (query.sr) {
      squery = `?sr=${query.sr}`
    }

    if (query.se) {
      squery = `?se=${query.se}`
    }

     if (query.produtoId) {
      squery += `&produtoId=${query.produtoId}`
    }


    const resp = await instance.get(`/objetivo${squery}`)
    console.log(resp.status)
    if (resp.status !== 200) {
      throw new Error(resp.statusText + ' | ' + resp.data.msg);
    }

    const ajustes: IRowAjustar[] = resp.data
    return baseCompletaCalcula(ajustes)

  } catch (error: any) {
    throw new Error('Falha ao buscar ajuste');
  }
}

function baseCompletaCalcula(ajustes: IRowAjustar[]): AjustarProdutoRow[] {
  const rows: AjustarProdutoRow[] = []

  ajustes.forEach(
    r => rows.push(new AjustarProdutoRow(r))
  )

  rows.forEach( r => {
    const totalRef = rows.map( j => j.Produto.id == r.Produto.id ? j.metaReferencia : 0).reduce( (p, c) => p + c, 0)
    const totalAjustado = rows.map( j => j.Produto.id == r.Produto.id ? j.metaAjustada : 0).reduce( (p, c) => p + c, 0)
    r.shareRef = (r.metaReferencia / (totalRef ? totalRef : 1)) * 100
    r.shareAjustado = (r.metaAjustada / (totalAjustado ? totalAjustado: 1)) * 100
  })

  rows.sort( (a: AjustarProdutoRow, b: AjustarProdutoRow) => {
    if (a.erros > b.erros) {
      return -1
    }
    if (a.erros < b.erros) {
      return 1
    }

    if (a.Produto.codsidem < b.Produto.codsidem) {
      return -1
    }

    if (a.Produto.codsidem > b.Produto.codsidem) {
      return 1
    }

    if (a.metaAjustada > b.metaAjustada) {
      return -1
    }

    if (a.metaAjustada < b.metaAjustada) {
      return 1
    }

    if (a.Unidade.nome < b.Unidade.nome) {
      return -1
    }

     if (a.Unidade.nome > b.Unidade.nome) {
      return 1
    }

    return 0
  })

  return rows

}
