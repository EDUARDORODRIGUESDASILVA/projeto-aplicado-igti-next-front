import { IUnidade } from "../core/interfaces/IUnidade"


export function geraFakeUnidade(unidadeId: number, tipo: string) {
  const unidade: IUnidade = {
    id: unidadeId,
    nome: 'Unidade Teste com nome ' + unidadeId,
    tipo: tipo,
    porte: 1,
    cluster: tipo + '_P1',
    nivel: 3,
    se: 0,
    sr: 0,
    rede: 'FISICA',
  }
  return unidade
}

export async function getUnidadeById(unidadeId: number): Promise < IUnidade > {

  const unidade = geraFakeUnidade(unidadeId,'SE')

  return Promise.resolve(unidade)
}

