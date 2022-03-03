import { AjusteMetas } from '../core/model/AjustarProduto';
import { AjustarProdutoRow } from '../core/model/AjustarProdutoRow';
import { getLoggedUser } from './userService';
import { getUnidadeById } from '../services/unidadesService'
import { getProdutoByCodSidem } from '../services/produtosService'


export async function criarAjustePorAgregador(unidadeId: number, codsidem: string): Promise<AjusteMetas> {

  const unidade = await getUnidadeById(unidadeId)
  const produto = await getProdutoByCodSidem(codsidem)
  const user = await getLoggedUser()
  const rows: AjustarProdutoRow[] = [
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0),
    new AjustarProdutoRow(produto, unidade, 50, 50, 50, 10, 0, 0.3, 0, user, 0, 0)
  ]
  const ajuste: AjusteMetas = new AjusteMetas(
    unidade,
    produto,
    250,
    250,
    250,
    0,
    0,
    rows
  )
  console.log(ajuste)

  return Promise.resolve(ajuste)


}

