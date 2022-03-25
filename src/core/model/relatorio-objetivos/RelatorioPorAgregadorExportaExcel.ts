import XlsxPopulate from 'xlsx-populate'
import { RelatorioPorAgregador } from './RelatorioPorAgregador'

export class RelatorioPorAgregadorExportaExcel {
  constructor(private relatorio: RelatorioPorAgregador) { }

  gerarExcel() {
    const arquivo = 'ajustesPorAgregador.xlsx'

    XlsxPopulate.fromBlankAsync().then((workbook: XlsxPopulate.Workbook ) => {
      this.geraWorkbook(workbook)
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

  private geraWorkbook(workbook: XlsxPopulate.Workbook): XlsxPopulate.Workbook {

    let  linha = 2
    this.relatorio.rows.forEach (r => {

      let coluna = 1
      const unidade = workbook.sheet(0).cell(linha, coluna++)
      unidade.value(r.unidade.nome)

      const cluster = workbook.sheet(0).cell(linha, coluna++)
      cluster.value(r.produto.nome)

      const referencia = workbook.sheet(0).cell(linha, coluna++)
      referencia.value(r.metaReferencia)

      const referencia2 = workbook.sheet(0).cell(linha, coluna++)
      referencia2.value(r.metaReferencia2)

      const ajustada = workbook.sheet(0).cell(linha, coluna++)
      ajustada.value(r.metaAjustada)

      const saldo = workbook.sheet(0).cell(linha, coluna++)
      saldo.value(r.saldo)

      const erros = workbook.sheet(0).cell(linha, coluna++)
      erros.value(r.erros)

      const gravadas = workbook.sheet(0).cell(linha, coluna++)
      gravadas.value(r.gravado)

      const qtdlinhas = workbook.sheet(0).cell(linha, coluna++)
      qtdlinhas.value(r.qtdlinhas)
      linha++

    })

    return workbook

  }
}
