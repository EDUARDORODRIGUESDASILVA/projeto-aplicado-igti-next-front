import { AjusteMetas } from '../core/model/AjusteMetas';
import { AjustarProdutoRow } from '../core/model/AjustarProdutoRow';
import instance from './axiosService';
import { IAjustarProduto } from '../core/interfaces/ajustar-objetivos/IAjustarProduto';

export async function fetchAjustesAgregador(unidadeId: number, produtoId: number): Promise<IAjustarProduto> {
  try {
    const resp = await instance.get(`/objetivo/ajustar/${unidadeId}/${produtoId}`)

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

export async function criarAjustePorAgregador(unidadeId: number, produtoId: number): Promise<AjusteMetas> {
  const fetched: IAjustarProduto = await fetchAjustesAgregador(unidadeId, produtoId)

  const rows: AjustarProdutoRow[] = []

  fetched.rows.forEach(
    r=> rows.push (new AjustarProdutoRow(r))
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

interface IUpdateObjetivosLote  {
  id: number,
  metaAjustada: number
}

export async function atualizarObjetivosLote (unidadeId: number, produtoId: number, ajuste: AjusteMetas): Promise<Boolean> {
  try {
    const lote: IUpdateObjetivosLote[] = []

    ajuste.rows.forEach ( r => {
      lote.push( {id: r.id, metaAjustada: r.metaAjustada})
    })
    const resp = await instance.post(`/objetivo/ajustar/${unidadeId}/${produtoId}`, lote)

    if (resp.status !== 200) {
      throw new Error(resp.statusText + ' | ' + resp.data.msg);
    }

    return Promise.resolve(true)

  } catch (error: any) {
    throw new Error('Falha ao atualizar objetivos');
  }
}
