import XlsxPopulate from 'xlsx-populate'
import { RelatorioPorAgregador } from './RelatorioPorAgregador'

enum CoresExcel {
  'COR_FUNDO_CABECALHO' = '1f4e78',
  'COR_TEXTO_CABECALHO' = 'ebf0f7',
  'COR_FUNDO_COLUNAS' = '333f4f',
  'COR_TEXTO_COLUNAS' = 'edf0f2'
}
export class RelatorioPorAgregadorExportaExcel {
  constructor(private relatorio: RelatorioPorAgregador) { }

  gerarExcel(nome: string) {
    const arquivo = `${nome}.xlsx`

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

    const plan = workbook.sheet('Sheet1');
    plan.name('Relatorio');

    const titlerow = plan.range('A1:K1');
    titlerow.style('horizontalAlignment', 'center');
    titlerow.style('fill', CoresExcel.COR_FUNDO_CABECALHO); // light gray
    titlerow.style('fontColor', CoresExcel.COR_TEXTO_CABECALHO); // dark gray
    titlerow.style('bold', true)

    const titulo = ' Relatório de ajustes por agregador  -  ' + this.relatorio.agregador.nome
    const title = plan.range('A1:K1');
    title.merged(true);
    title.style('horizontalAlignment', 'center');
    title.style('fill', CoresExcel.COR_FUNDO_CABECALHO); // light gray
    title.style('fontColor', CoresExcel.COR_TEXTO_COLUNAS); // dark gray
    title.style({ bold: true, italic: true });
    title.style('fontFamily', 'Segoe UI');
    title.style('fontSize', 11);
    title.value(titulo);

    let coluna = 0
    let linha = 2
    const nomescolunas = plan.range('A2:K2');
    nomescolunas.style('fill', CoresExcel.COR_FUNDO_COLUNAS);
    nomescolunas.style('fontColor', CoresExcel.COR_TEXTO_COLUNAS);
    nomescolunas.style('bold', true)
    const colunasf = workbook.sheet(0).range('B2:J2');
    colunasf.autoFilter();
    plan.freezePanes(4, 2);

    plan.cell(linha, ++coluna).value('CGC').style('horizontalAlignment', 'center');
    plan.column(coluna).width(9).style('bold', true).style('horizontalAlignment', 'center')

    plan.cell(linha, ++coluna).value('Agregador').style('horizontalAlignment', 'center');
    plan.column(coluna).width(40).style('fontColor', '757171')

    plan.cell(linha, ++coluna).value('Bloco').style('horizontalAlignment', 'center');
    plan.column(coluna).width(20).style('bold', true).style('fontColor', '57257C')

    plan.cell(linha, ++coluna).value('SIDEM').style('horizontalAlignment', 'center');
    plan.column(coluna).width(14).style('bold', true).style('fontColor', '808080')

    plan.cell(linha, ++coluna).value('Produto').style('horizontalAlignment', 'center');
    plan.column(coluna).width(40).style('bold', true).style('fontColor', '2F75B5')

    plan.cell(linha, ++coluna).value('Inicial').style('horizontalAlignment', 'center');
    plan.column(coluna).width(16).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Referência').style('horizontalAlignment', 'center');
    plan.column(coluna).width(16).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Ajustada').style('horizontalAlignment', 'center');
    plan.column(coluna).width(16).style('bold', true).style('numberFormat', '#,##0.00;[Red]-#,##0.00')

    plan.cell(linha, ++coluna).value('Saldo').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('bold', true).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Erros').style('horizontalAlignment', 'center');
    plan.column(coluna).width(9).style('bold', true).style('horizontalAlignment', 'center')

    plan.cell(linha, ++coluna).value('Gravadas').style('horizontalAlignment', 'center');
    plan.column(coluna).width(13).style('fontColor', '7B7B7B').style('horizontalAlignment', 'center')


    nomescolunas.style('fontColor', CoresExcel.COR_TEXTO_COLUNAS);
    linha++

    this.relatorio.rows.forEach (r => {

      let coluna = 1

      if (r.erros > 0) {
        const address = `A${linha}:K${linha}`
        plan.range(address).style('bold', true).style('fill', 'FFEBEE')
      }

      const cgc = workbook.sheet(0).cell(linha, coluna++)
      cgc.value(r.unidade.id)

      const unidade = workbook.sheet(0).cell(linha, coluna++)
      unidade.value(r.unidade.nome)

      const bloco = workbook.sheet(0).cell(linha, coluna++)
      bloco.value(r.produto.bloco)

      const sidem = workbook.sheet(0).cell(linha, coluna++)
      sidem.value(r.produto.codsidem)

      const cluster = workbook.sheet(0).cell(linha, coluna++)
      cluster.value(r.produto.nome)

      const referencia = workbook.sheet(0).cell(linha, coluna++)
      referencia.value(r.metaReferencia)

      const referencia2 = workbook.sheet(0).cell(linha, coluna++)
      referencia2.value(r.metaReferencia2)

      const ajustada = workbook.sheet(0).cell(linha, coluna++)
      ajustada.value(r.metaAjustada)

      if (this.relatorio.rows.length < 1000) {
        ajustada.style('fill', 'FFF2CC')
      }

      const saldo = workbook.sheet(0).cell(linha, coluna++)
      saldo.value(r.saldo)

      const erros = workbook.sheet(0).cell(linha, coluna++)
      erros.value(r.erros)

      const gravadas = workbook.sheet(0).cell(linha, coluna++)
      gravadas.value(r.gravado + '/' + r.qtdlinhas)

      if (r.erros == 0 && r.qtdlinhas == r.gravado) {
        gravadas.style('bold', true).style('fill', 'E2EFDA')
      }

      linha++

    })

    return workbook

  }
}
