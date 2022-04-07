import { IProduto } from "../../interfaces/IProduto"
import { IUnidade } from "../../interfaces/IUnidade"
import { IUser } from "../../interfaces/IUser"
import { IRelatorioTrocas } from "../../interfaces/trocas/IRelatorioTrocas"
import { ITroca, TrocaStatus } from "../../interfaces/trocas/ITroca"

export class Troca implements ITroca {
  id?: number
  incrementaId: number
  reduzId: number
  produtoId: number
  valor: number
  criadoUserId: string
  status: TrocaStatus
  homologadoUserId: string | null
  criador?: IUser | undefined
  homologador?: IUser | null | undefined
  produto!: IProduto
  incrementa!: IUnidade
  reduz!: IUnidade

  constructor(t: ITroca, r: IRelatorioTrocas) {
    this.id = t.id
    this.incrementaId = t.incrementaId
    this.reduzId = t.reduzId
    this.status = t.status
    this.criadoUserId = t.criadoUserId
    this.criador = t.criador
    this.homologadoUserId = t.homologadoUserId
    this.homologador = t.homologador

    this.valor = t.valor
    this.produtoId = t.produtoId

    const p = r.produtos.find(p => p.id === t.produtoId)
    if (p)
      this.produto = p

    const reduz = r.unidadesReduzir.find(u => u.id === t.reduzId)
    if (reduz)
      this.reduz = reduz

    const incrementa = r.unidadesReduzir.find(u => u.id === t.incrementaId)
    if (incrementa)
      this.incrementa = incrementa
  }
}
