import { IProduto } from "../../interfaces/IProduto"
import { IUnidade } from "../../interfaces/IUnidade"
import { IUser } from "../../interfaces/IUser"
import { IRelatorioTrocas } from "../../interfaces/trocas/IRelatorioTrocas"
import { ITroca } from "../../interfaces/trocas/ITroca"

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
  Usuario!: IUser
  constructor(t: ITroca, r: IRelatorioTrocas) {
    this.id = t.id
    this.incrementaId = t.incrementaId
    this.reduzId = t.reduzId
    this.status = t.status
    this.userId = t.userId
    this.valor = t.valor
    this.produtoId = t.produtoId
    this.Usuario = t.Usuario
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
