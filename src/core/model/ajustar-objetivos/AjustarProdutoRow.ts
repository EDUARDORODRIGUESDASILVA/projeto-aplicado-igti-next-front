import { IRowAjustar } from "../../interfaces/ajustar-objetivos/IRowAjustar"
import { IProduto } from "../../interfaces/IProduto"
import { IUnidade } from "../../interfaces/IUnidade"
import { IUser } from "../../interfaces/IUser"
import { AjusteMetas } from "./AjusteMetas"


export class AjustarProdutoRow implements IRowAjustar {
  private pshareRef: number = 0
  private pshareAjustado: number = 0
  private pparent: AjusteMetas | undefined
  private ppctChange: number = 0
  public id: number
  public unidadeId: number
  public userId: string
  public produtoId: number
  public Produto: IProduto
  public Unidade: IUnidade
  public Usuario: IUser
  public metaReferencia: number
  public metaReferencia2: number
  public metaAjustada: number
  public metaMinima: number
  public trocas: number
  public trava: string
  public erros: number
  public user: IUser
  private ipct: number
  private ivalor: number

  private linhaSelecionada: boolean
  constructor(r: IRowAjustar) {
    this.id = r.id
    this.unidadeId = r.unidadeId
    this.produtoId = r.produtoId
    this.userId = r.userId
    this.Produto = r.Produto
    this.Unidade = r.Unidade
    this.Usuario = r.Usuario
    this.metaReferencia = r.metaReferencia
    this.metaReferencia2 = r.metaReferencia2
    this.metaAjustada = r.metaAjustada
    this.metaMinima = r.metaMinima
    this.trocas = r.trocas
    this.trava = r.trava
    this.erros = r.erros
    this.user = r.user

    this.ipct = 0
    this.ivalor = this.metaAjustada - (this.metaReferencia2 + this.trocas)
    this.verificaErros()
    this.calcPctChange()
    this.linhaSelecionada = false;
  }


  get inputValor(): number {
    return this.ivalor
  }

  set inputValor(valor: number) {
    this.ivalor = valor
    this.calculaMetaAjustada()
    if (this.parent) {
      this.parent.totalizar()
    }
  }

  set inputMetaAjustada(metaAjustada: number) {
    this.ivalor = 0
    this.ipct = 0


    const novoValor = metaAjustada - this.metaReferencia2 - this.trocas

    this.inputValor = novoValor
    if (!(this.metaAjustada == metaAjustada)) {
      console.log('meta não bate', this.metaAjustada, metaAjustada, )
      throw new Error("Meta ajustada calculada incorreta");
    }
  }

  get inputPct(): number {
    return this.ipct
  }

  set inputPct(pct: number) {
    this.ipct = pct
    this.calculaMetaAjustada()
    if (this.parent) {
      this.parent.totalizar()
    }
  }

  get shareRef(): number {
    return this.pshareRef
  }

  set shareRef(share: number) {
    this.pshareRef = share
  }

  get shareAjustado(): number {
    return this.pshareAjustado
  }

  set shareAjustado(share: number) {
    this.pshareAjustado = share
  }

  get parent(): AjusteMetas | undefined {
    return this.pparent
  }

  set parent(p: AjusteMetas | undefined) {
    this.pparent = p
  }

  get pctChange(): number {
    return this.ppctChange
  }

  adicionarValor(valor: number) {
    const novaMeta = this.metaAjustada + valor
    this.ipct = 0
    this.ivalor = 0
    const novoValor = novaMeta - (this.metaReferencia2 + this.trocas)
    this.inputValor = novoValor
  }
  private calculaMetaAjustada() {
    this.metaAjustada = this.metaReferencia2 + this.trocas +
    this.metaReferencia * (this.inputPct / 100) + this.inputValor
    this.verificaErros()
    this.calcPctChange()
  }

  private calcPctChange() {

    if (this.metaAjustada == 0) {
      this.ppctChange = 0
      return
    }

    this.ppctChange = ((this.metaAjustada / this.metaReferencia) - 1) * 100
    this.ppctChange = Math.trunc(this.ppctChange * 100) / 100
    const sign = Math.sign(this.ppctChange)
    let value = Math.abs(this.ppctChange)
    if (value > 9999.99) {
      value = 9999.99
      this.ppctChange = sign * value
    }
  }
  private verificaErros() {
    const erroPct = this.verificaTravaPercentual()
    const erroPiso = this.verificaPiso()
    this.erros = (erroPct + erroPiso)  > 0 ? 1 : 0
  }

  private verificaTravaPercentual(): 0 | 1 {
    if (this.trava === 'Livre') {
      return 0
    }

    let travaPct: number = 0

   if (typeof (this.trava) == 'string' && this.trava.endsWith('%')) {
    const strava = this.trava.replace('%','')
     travaPct = parseFloat(strava)/100
    } else {
      return 1
    }

    if (this.metaAjustada == 0 && this.metaReferencia == 0) {
      return 0
    }
    const metaMaxima = this.metaReferencia * (1 + travaPct)
    const metaMinima = this.metaReferencia * (1 - travaPct)

    if (this.metaAjustada > metaMaxima) {
      return 1
    }

    if (this.metaAjustada < metaMinima) {
      return 1
    }
    return 0
  }

  private verificaPiso(): 0 | 1 {
    if (this.metaAjustada == 0 && this.metaReferencia == 0) {
      return 0
    }

    if (this.metaAjustada < this.metaMinima) {
      return 1
    }
    return 0
  }

  get checked() {
    return this.linhaSelecionada
  }

  set checked(v: boolean) {
    this.linhaSelecionada = v
  }

  toggleChecked() {
    this.linhaSelecionada = !this.linhaSelecionada
  }

  zerar() {
    this.ipct = 0
    this.ivalor = 0
    this.calculaMetaAjustada()
  }
}
