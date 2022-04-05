import { IProduto } from "../core/interfaces/IProduto"
import { IUnidade } from "../core/interfaces/IUnidade"
import { IUser } from "../core/interfaces/IUser"
import instance from "./axiosService"


interface ITroca {
  id: number
  incrementaId: number
  reduzId: number
  produtoId: number
  userId: string
  valor: number
  status: 'OK' | 'Cancelada'

}


interface IRelatorioTrocas {
  agregador: IUnidade
  produtos: IProduto[]
  unidadesAumentar: IUnidade[]
  unidadesReduzir: IUnidade[]
  trocas: ITroca[]
}

export class Troca implements ITroca {
  id: number
  incrementaId: number
  reduzId: number
  produtoId: number
  userId: string
  valor: number
  status: "OK" | "Cancelada"

  produto!: IProduto
  incrementa!: IUnidade
  reduz!: IUnidade

  constructor(t: ITroca, r: IRelatorioTrocas) {
    this.id = t.id
    this.incrementaId = t.incrementaId
    this.reduzId = t.reduzId
    this.status = t.status
    this.userId = t.userId
    this.valor = t.valor
    this.produtoId = t.produtoId

    const p = r.produtos.find(p => p.id == t.produtoId)
    if (p)
      this.produto = p

    const reduz = r.unidadesReduzir.find( u => u.id = t.reduzId)
    if(reduz)
      this.reduz = reduz

    const incrementa = r.unidadesReduzir.find( u => u.id = t.incrementaId)
    if (incrementa)
      this.incrementa = incrementa
  }
}
export class RelatorioTrocas implements IRelatorioTrocas {
  agregador: IUnidade
  produtos: IProduto[]
  unidadesAumentar: IUnidade[]
  unidadesReduzir: IUnidade[]
  trocas: Troca[]

  constructor(r: IRelatorioTrocas) {
    this.agregador = r.agregador
    this.produtos = r.produtos
    this.unidadesAumentar = r.unidadesAumentar
    this.unidadesReduzir = r.unidadesReduzir
    this.trocas = r.trocas.map( t => new Troca(t, r))
  }


}

export async function criarRelatorioTrocas(unidadeId: number): Promise<RelatorioTrocas> {
  const r = await fetchRelatorioTrocas(unidadeId)
  return new RelatorioTrocas(r)
}
async function fetchRelatorioTrocas(unidadeId: number): Promise<IRelatorioTrocas> {
  try {
    let url = `/troca/relatorio/${unidadeId}`

    const resp = await instance.get(url)

    if (resp.status !== 200) {
      throw new Error(resp.statusText + ' | ' + resp.data.msg);
    }

    const dados: IRelatorioTrocas = resp.data
    return dados
} catch (error: any) {
  console.log(error)
  throw new Error('Falha ao buscar os dados de trocas.');
}



}

