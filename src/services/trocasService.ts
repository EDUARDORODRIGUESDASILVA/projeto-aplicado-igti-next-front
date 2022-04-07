import { IRelatorioTrocas } from "../core/interfaces/trocas/IRelatorioTrocas"
import { ITroca } from "../core/interfaces/trocas/ITroca"
import { RelatorioTrocas } from "../core/model/troca/RelatorioTrocas"
import instance from "./axiosService"



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
    throw new Error('Falha ao buscar os dados de trocas.');
  }
}


export async function gravarTroca(troca: ITroca) {

  try {
    let url = `/troca`

    delete troca.id
    const resp = await instance.post(url, troca)

    if (resp.status !== 201) {
      throw new Error(resp.statusText + ' | ' + resp.data.msg);
    }

    const dados: ITroca = resp.data
    return dados
  } catch (error: any) {
    throw new Error('Falha ao buscar os dados de trocas.');
  }
}

export async function cancelarTroca(troca: ITroca) {

  try {
    let url = `/troca/${troca.id}`

    const resp = await instance.delete(url)

    if (resp.status !== 200) {
      throw new Error(resp.statusText + ' | ' + resp.data.msg);
    }

    const savedTroca: ITroca = resp.data
    return savedTroca
  } catch (error: any) {
    throw new Error(`Falha ao cancelar troca ${troca.id}.`);
  }
}

export async function homologarTroca(troca: ITroca) {

  try {
    let url = `/troca/${troca.id}`

    const resp = await instance.patch(url)

    if (resp.status !== 200) {
      throw new Error(resp.statusText + ' | ' + resp.data.msg);
    }

    const savedTroca: ITroca = resp.data
    return savedTroca
  } catch (error: any) {
    throw new Error(`Falha ao homologar troca ${troca.id}.`);
  }
}


