import { IAjustarProduto } from "../interfaces/ajustar-objetivos/IAjustarProduto";
import { IProduto } from "../interfaces/IProduto";
import { IUnidade } from "../interfaces/IUnidade";
import { AjustarProdutoRow } from "./AjustarProdutoRow";

export class AjusteMetas implements IAjustarProduto {

  constructor(
    public unidade: IUnidade,
    public produto: IProduto,
    public readonly metaReferencia: number,
    public readonly metaReferencia2: number,
    public metaAjustada: number,
    public trocas: number,
    public erros: number = 0,
    public rows: AjustarProdutoRow[]
  ) {
  }


}
