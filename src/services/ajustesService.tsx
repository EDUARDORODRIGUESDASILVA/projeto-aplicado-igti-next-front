import { AjusteMetas } from '../core/model/AjusteMetas';
import { AjustarProdutoRow } from '../core/model/AjustarProdutoRow';

import { geraFakeUnidade, getUnidadeById } from '../services/unidadesService'
import { getProdutoByCodSidem } from '../services/produtosService'
import { IProduto } from '../core/interfaces/IProduto';
import { IUser } from '../core/interfaces/IUser';
import instance from './axiosService';
import { IUnidade } from '../core/interfaces/IUnidade';
import { IAjustarProduto } from '../core/interfaces/ajustar-objetivos/IAjustarProduto';

// function randomIntFromInterval(min: number, max: number) { // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

// function geraFakeProdutoRow(id: number, produto: IProduto, user: IUser): AjustarProdutoRow {
//   const maximo = 10000
//   const unidade = geraFakeUnidade(randomIntFromInterval(1, 9999), 'AG')
//   const meta = randomIntFromInterval(100, 100000)
//   const minimo = randomIntFromInterval(1, 1000)
//   return new AjustarProdutoRow(id, produto, unidade, meta, meta, meta, minimo, 0, 0.3, 0, user, 0, 0)
// }


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

// export async function criarAjustePorAgregador(unidadeId: number, codsidem: string, user: IUser): Promise<AjusteMetas> {

//   const unidade = await getUnidadeById(unidadeId)
//   const produto = await getProdutoByCodSidem(codsidem)

//   const rows: AjustarProdutoRow[] = []
//   let i = 0
//   let total = 0
//   while (i < 127) {
//     const r = geraFakeProdutoRow(i, produto, user)
//     total += r.metaReferencia
//     rows.push(r)
//     i++

//   }

//   const ajuste: AjusteMetas = new AjusteMetas(
//     unidade,
//     produto,
//     total,
//     0,
//     total,
//     0
//   )
//   ajuste.addRows(rows)
//   ajuste.totalizar()
//   return Promise.resolve(ajuste)


// }

