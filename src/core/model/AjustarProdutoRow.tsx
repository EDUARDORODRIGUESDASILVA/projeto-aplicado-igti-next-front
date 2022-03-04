import { IRowAjustar } from "../interfaces/ajustar-objetivos/IRowAjustar";
import { IProduto } from "../interfaces/IProduto";
import { IUnidade } from "../interfaces/IUnidade";
import { IUser } from "../interfaces/IUser";
import { AjusteMetas } from "./AjusteMetas";

export class AjustarProdutoRow implements IRowAjustar {

  private pshareRef: number = 0
  private pshareAjustado: number = 0
  private pparent: AjusteMetas | undefined
  private ppctChange: number = 0
  constructor(
    public id: number,
    public produto: IProduto,
    public iUnidade: IUnidade,
    public metaReferencia: number,
    public metaReferencia2: number,
    public metaAjustada: number,
    public metaMinima: number,
    public trocas: number,
    public trava: string | number,
    public erros: number,
    public user: IUser,
    private ipct: number,
    private ivalor: number
  ) {
  }

  get inputValor(): number {
    return this.ivalor
  }
  set inputValor(valor: number) {
    this.ivalor = valor
    this.calculaMetaAjustada()
    if(this.parent){
      this.parent.totalizar()
    }


  }

  get inputPct(): number {
    return this.ipct
  }

  set inputPct(pct: number) {
    this.ipct = pct
    this.calculaMetaAjustada()
    if(this.parent){
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
  private calculaMetaAjustada() {
    this.metaAjustada = this.metaReferencia2 + this.trocas +
    this.metaReferencia * (this.inputPct / 100) + this.inputValor
    this.verificaErros()
    this.calcPctChange()

  }

  private calcPctChange() {

    this.ppctChange = ((this.metaAjustada / this.metaReferencia) - 1) * 100
    this.ppctChange = Math.trunc(this.ppctChange * 100) / 100
    const sign = Math.sign(this.ppctChange)
    let value = Math.abs(this.ppctChange)
    if(value > 9999.99) {
      value = 9999.99
      this.ppctChange = sign * value
    }
  }
  private verificaErros() {
    const erroPct = this.verificaTravaPercentual()
    const erroPiso = this.verificaPiso()
    this.erros = erroPct + erroPiso
  }

  private verificaTravaPercentual(): 0 | 1 {
    if (this.trava === 'Livre') {
      return 0
    }

    let travaPct: number = 0
    if (typeof this.trava == 'number') {
      travaPct = this.trava
    } this.trava
    if (typeof (this.trava) == 'string' && this.trava !== 'Livre') {
      travaPct = parseFloat(this.trava)
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


}
