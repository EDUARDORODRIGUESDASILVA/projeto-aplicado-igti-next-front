import { IRowAjustar } from "../interfaces/ajustar-objetivos/IRowAjustar";
import { IProduto } from "../interfaces/IProduto";
import { IUnidade } from "../interfaces/IUnidade";
import { IUser } from "../interfaces/IUser";

export class AjustarProdutoRow implements IRowAjustar {

  constructor(
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
  }

  get inputPct(): number {
    return this.ipct
  }

  set inputPct(pct: number) {
    this.ipct = pct
    this.calculaMetaAjustada()
  }

  private calculaMetaAjustada() {
    this.metaAjustada = this.metaReferencia2 + this.trocas +
      this.metaReferencia * (this.inputPct / 100) + this.inputValor
    this.verificaErros()
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
