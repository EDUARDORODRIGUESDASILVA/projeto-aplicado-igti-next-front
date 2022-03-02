import { IUnidade } from "../core/interfaces/IUnidade"


export async function getUnidadeById(unidadeId: number): Promise < IUnidade > {
  const unidade: IUnidade = {
    id: unidadeId,
    nome: 'Florianopolis Ilha',
    tipo: 'SE',
    porte: 1,
    cluster: 'SE_P1',
    nivel: 3,
    se: unidadeId,
    sr: 2625,
    rede: 'FISICA',
  }

  return Promise.resolve(unidade)
}

