import { IProduto } from "../core/interfaces/IProduto"


export async function getProdutoByCodSidem(codsidem: string ): Promise<IProduto> {
  const produto: IProduto = {
    id: 10,
    codsidem: codsidem,
    nome: 'Produto de teste',
    bloco: 'Bloco de teste',
    conquiste: 'Testes'
  }

  return Promise.resolve(produto)

}

