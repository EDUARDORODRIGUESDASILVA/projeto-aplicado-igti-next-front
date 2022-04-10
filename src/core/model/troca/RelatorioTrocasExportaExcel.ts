import XlsxPopulate from 'xlsx-populate'
import { RelatorioTrocas } from './RelatorioTrocas';

enum CoresExcel {
  'COR_FUNDO_CABECALHO' = '1f4e78',
  'COR_TEXTO_CABECALHO' = 'ebf0f7',
  'COR_FUNDO_COLUNAS' = '333f4f',
  'COR_TEXTO_COLUNAS' = 'edf0f2'
}
export class RelatorioTrocasExportaExcel {
  constructor(private relatorio: RelatorioTrocas) { }

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
    plan.name('Trocas');

    const titlerow = plan.range('A1:K1');
    titlerow.style('horizontalAlignment', 'center');
    titlerow.style('fill', CoresExcel.COR_FUNDO_CABECALHO); // light gray
    titlerow.style('fontColor', CoresExcel.COR_TEXTO_CABECALHO); // dark gray
    titlerow.style('bold', true)

    const titulo = ' Relatório de negociações  -  ' + this.relatorio.agregador.nome
    const title = plan.range('A1:I1');
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
    const colunasf = workbook.sheet(0).range('A2:K2');
    colunasf.autoFilter();
    plan.freezePanes(3, 2);

    plan.cell(linha, ++coluna).value('Id').style('horizontalAlignment', 'center');
    plan.column(coluna).width(3).style('bold', true).style('horizontalAlignment', 'center')

    plan.cell(linha, ++coluna).value('CodSidem').style('horizontalAlignment', 'center');
    plan.column(coluna).width(14).style('fontColor', '757171')

    plan.cell(linha, ++coluna).value('Produto').style('horizontalAlignment', 'center');
    plan.column(coluna).width(38).style('bold', true).style('fontColor', '2F75B5')

    plan.cell(linha, ++coluna).value('').style('horizontalAlignment', 'center');
    plan.column(coluna).width(5).style('bold', true).style('fontColor', '808080')

    plan.cell(linha, ++coluna).value('Aumenta').style('horizontalAlignment', 'center');
    plan.column(coluna).width(36).style('bold', true).style('fontColor', '57257C')

    plan.cell(linha, ++coluna).value('').style('horizontalAlignment', 'center');
    plan.column(coluna).width(5).style('bold', true).style('fontColor', '808080')

    plan.cell(linha, ++coluna).value('Reduz').style('horizontalAlignment', 'center');
    plan.column(coluna).width(36).style('bold', true).style('fontColor', '57257C')

    plan.cell(linha, ++coluna).value('Ajustada').style('horizontalAlignment', 'center');
    plan.column(coluna).width(16).style('bold', true).style('numberFormat', '#,##0.00;[Red]-#,##0.00')

    plan.cell(linha, ++coluna).value('Status').style('horizontalAlignment', 'center');
    plan.column(coluna).width(12).style('bold', true)

    plan.cell(linha, ++coluna).value('Criado por').style('horizontalAlignment', 'center');
    plan.column(coluna).width(35).style('fontColor', '7B7B7B')

    plan.cell(linha, ++coluna).value('Homologado por').style('horizontalAlignment', 'center');
    plan.column(coluna).width(35).style('fontColor', '7B7B7B')

    nomescolunas.style('fontColor', CoresExcel.COR_TEXTO_COLUNAS);
    linha++

    this.relatorio.trocas.forEach (r => {

      let coluna = 1
      const id = workbook.sheet(0).cell(linha, coluna++)
      id.value(r.id)

      const codsidem = workbook.sheet(0).cell(linha, coluna++)
      codsidem.value(r.produto.codsidem)

      const produto = workbook.sheet(0).cell(linha, coluna++)
      produto.value(r.produto.nome)

      const aumentarId = workbook.sheet(0).cell(linha, coluna++)
      aumentarId.value(r.incrementaId)

      const aumentarNome = workbook.sheet(0).cell(linha, coluna++)
      aumentarNome.value(r.incrementa.nome)

      const reduzirId = workbook.sheet(0).cell(linha, coluna++)
      reduzirId.value(r.reduzId)

      const reduzirNome = workbook.sheet(0).cell(linha, coluna++)
      reduzirNome.value(r.reduz.nome)

      const valor = workbook.sheet(0).cell(linha, coluna++)
      valor.value(r.valor)
      if (this.relatorio.trocas.length < 1000) {
        valor.style('fill', 'FFF2CC')
      }

      const status = workbook.sheet(0).cell(linha, coluna++)
      status.value(r.status)

      const criador = workbook.sheet(0).cell(linha, coluna++)
      criador.value(r.criadoUserId + ' - ' + r.criador?.nome)

      const homologador = workbook.sheet(0).cell(linha, coluna++)
      if (r.homologador)
        homologador.value(r.homologadoUserId + ' - ' + r.homologador?.nome )
      linha++
    })
    return workbook
  }
}
