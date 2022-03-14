import { AjusteMetas } from './AjusteMetas'
import XlsxPopulate from 'xlsx-populate'

export class AjusteMetasExportaExcel {
  constructor(private ajustes: AjusteMetas) { }

  gerarExcel() {
    const arquivo = 'exporta.xlsx'

    XlsxPopulate.fromBlankAsync().then((workbook: XlsxPopulate.Workbook ) => {

      workbook.sheet(0).cell("A1").value("This was created in the browser!").style("fontColor", "ff0000");
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
}
