import { AjusteMetas, IAjusteImportadoExcel } from './AjusteMetas'
import XlsxPopulate from 'xlsx-populate'


export class AjusteMetasImportaExcel {
  constructor(private ajuste: AjusteMetas) {

  }

  async importarExcel(arquivo: File): Promise<Boolean> {
    try {
      const workbook = await XlsxPopulate.fromDataAsync(arquivo)
      const atualizacoes = this.readWorkbook(workbook)
      console.log(atualizacoes)
      this.ajuste.atualizaObjetivosFromExcel(atualizacoes)
      return Promise.resolve(true)
    }
    catch (error) {
      return Promise.reject(error)
    }
  }

  private readWorkbook(workbook: XlsxPopulate.Workbook): IAjusteImportadoExcel[] {
    const atualizacoes: IAjusteImportadoExcel[] = []
    const sheet = workbook.activeSheet();

    const verificaId = sheet.cell("A2").value() == 'id';
    const verificaAjustada = sheet.cell("L2").value() == 'Ajustada';

    if (!(verificaId && verificaAjustada)) {
      throw new Error("Formato inválido!");

    }

    let linha = 3
    let acabou = false
    while ( acabou === false) {
       const id = sheet.cell(`A${linha}`).value()
       const ajustado = sheet.cell(`L${linha}`).value()

      if (typeof (id) == 'undefined'){
        acabou = true
        return atualizacoes
      }

       if(typeof(id)=='number' && typeof(ajustado)=='number') {
         atualizacoes.push({id, ajustado})
       }
      linha++
    }

    return atualizacoes
  }
}

