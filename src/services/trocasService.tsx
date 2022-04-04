import { IProduto } from "../core/interfaces/IProduto"
import { IUnidade } from "../core/interfaces/IUnidade"
import { IUser } from "../core/interfaces/IUser"
import instance from "./axiosService"


export interface ITroca {
  id: number
  incrementaId: number
  reduzId: number
  produtoId: number
  userId: string
  valor: number
  status: 'OK' | 'Cancelada'
}


export interface IRelatorioTrocas {
  agregador: IUnidade
  produtos: IProduto[]
  unidadesAumentar: IUnidade[]
  unidadesReduzir: IUnidade[]
  trocas: ITroca[]
}

export async function fetchRelatorioTrocas(unidadeId: number): Promise<IRelatorioTrocas> {
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
  throw new Error('Falha ao buscar ajuste');
}
}

