import { AjusteMetas } from './AjusteMetas'
import XlsxPopulate from 'xlsx-populate'

export class AjusteMetasExportaExcel {
  static gerarExcel(nome: string, ajustes: AjusteMetas) {
    const arquivo = `${nome}.xlsx`

    XlsxPopulate.fromBlankAsync().then((workbook: XlsxPopulate.Workbook ) => {
      AjusteMetasExportaExcel.geraWorkbook(workbook, ajustes)
      workbook.outputAsync()
        .then((blob: any) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.href = url;
          a.download = arquivo;
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
        )
        .catch((err: any) => {
          alert(err.message || err);
          throw err;
        });
    })
  }

  private static geraWorkbook(workbook: XlsxPopulate.Workbook, ajustes: AjusteMetas): XlsxPopulate.Workbook {
    let  linha = 2
    ajustes.rows.forEach (r => {

      let coluna = 1
      const unidade = workbook.sheet(0).cell(linha, coluna++)
      unidade.value(r.Unidade.nome)

      const cluster = workbook.sheet(0).cell(linha, coluna++)
      cluster.value(r.Unidade.cluster)

      const referencia = workbook.sheet(0).cell(linha, coluna++)
      referencia.value(r.metaReferencia)

      const minima = workbook.sheet(0).cell(linha, coluna++)
      minima.value(r.metaMinima)

      const referencia2 = workbook.sheet(0).cell(linha, coluna++)
      referencia2.value(r.metaReferencia2)

      const ajustada = workbook.sheet(0).cell(linha, coluna++)
      ajustada.value(r.metaAjustada)

          const erros = workbook.sheet(0).cell(linha, coluna++)
      erros.value(r.erros)

      linha++

    })

    return workbook

  }
}
