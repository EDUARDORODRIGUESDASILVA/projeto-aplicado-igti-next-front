import { AjusteMetas } from '../core/model/AjusteMetas';
import { AjustarProdutoRow } from '../core/model/AjustarProdutoRow';
import { getLoggedUser } from './userService';
import { geraFakeUnidade, getUnidadeById } from '../services/unidadesService'
import { getProdutoByCodSidem } from '../services/produtosService'
import { IUnidade } from '../core/interfaces/IUnidade';
import { IProduto } from '../core/interfaces/IProduto';
import { IUser } from '../core/interfaces/IUser';

function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function geraFakeProdutoRow(id: number, produto: IProduto, user: IUser): AjustarProdutoRow {
  const maximo = 10000
  const unidade = geraFakeUnidade(randomIntFromInterval(1, 9999), 'AG')
  const meta = randomIntFromInterval(100, 100000)
  const minimo = randomIntFromInterval(1, 1000)
  return new AjustarProdutoRow(id, produto, unidade, meta, meta, meta, minimo, 0, 0.3, 0, user, 0, 0)
}

export async function criarAjustePorAgregador(unidadeId: number, codsidem: string): Promise<AjusteMetas> {

  const unidade = await getUnidadeById(unidadeId)
  const produto = await getProdutoByCodSidem(codsidem)
  const user = await getLoggedUser()



  const rows: AjustarProdutoRow[] = []
  let i= 0
  let total = 0
  while (i < 127) {
    const r = geraFakeProdutoRow(i, produto, user)
    total += r.metaReferencia
    rows.push(r)
    i++

  }

  const ajuste: AjusteMetas = new AjusteMetas(
    unidade,
    produto,
    total,
    0,
    total,
    0
  )
  ajuste.addRows(rows)
  ajuste.totalizar()
  return Promise.resolve(ajuste)


}

