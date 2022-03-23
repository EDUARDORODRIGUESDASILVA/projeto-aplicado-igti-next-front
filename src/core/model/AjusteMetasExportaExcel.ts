import { AjusteMetas } from './AjusteMetas'
import XlsxPopulate from 'xlsx-populate'

enum CoresExcel {
  'COR_FUNDO_CABECALHO' = '1f4e78',
  'COR_TEXTO_CABECALHO' = 'ebf0f7',
  'COR_FUNDO_COLUNAS' = '333f4f',
  'COR_TEXTO_COLUNAS' = 'edf0f2'
}

export class AjusteMetasExportaExcel {
  public gerando: boolean
  constructor( private ajustes: AjusteMetas) {
    this.gerando = false
  }
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
    plan.name(this.ajustes.produto.codsidem + '_' + this.ajustes.unidade.id);

    const titlerow = plan.range('A1:P1');
    titlerow.style('horizontalAlignment', 'center');
    titlerow.style('fill', CoresExcel.COR_FUNDO_CABECALHO); // light gray
    titlerow.style('fontColor', CoresExcel.COR_TEXTO_CABECALHO); // dark gray
    titlerow.style('bold', true)

    const titulo = this.ajustes.produto.codsidem + '  -  ' + this.ajustes.produto.nome + '  -  ' + this.ajustes.unidade.nome
    const title = plan.range('A1:P1');
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
    const nomescolunas = plan.range('A2:P2');
    nomescolunas.style('fill', CoresExcel.COR_FUNDO_COLUNAS);
    nomescolunas.style('fontColor', CoresExcel.COR_TEXTO_COLUNAS);
    nomescolunas.style('bold', true)
    const colunasf = workbook.sheet(0).range('A2:P2');
    colunasf.autoFilter();
    plan.freezePanes(4, 2);


    plan.cell(linha, ++coluna).value('id').style('horizontalAlignment', 'center');
    plan.column(coluna).width(7).style('bold', true)

    plan.cell(linha, ++coluna).value('SEV').style('horizontalAlignment', 'center');
    plan.column(coluna).width(7).style('bold', true).style('fontColor', '57257C')

    plan.cell(linha, ++coluna).value('CGC').style('horizontalAlignment', 'center');
    plan.column(coluna).width(7).hidden(true).style('bold', true)

    plan.cell(linha, ++coluna).value('Unidade').style('horizontalAlignment', 'center');
    plan.column(coluna).width(43)

    plan.cell(linha, ++coluna).value('Cluster').style('horizontalAlignment', 'center');
    plan.column(coluna).width(14).style('bold', true).style('fontColor', '57257C')

    plan.cell(linha, ++coluna).value('SIDEM').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('bold', true)

    plan.cell(linha, ++coluna).value('Produto').style('horizontalAlignment', 'center');
    plan.column(coluna).width(42).hidden(true)

    plan.cell(linha, ++coluna).value('Inicial').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Mínima').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Referência').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Ajustada').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('bold', true).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Var.').style('horizontalAlignment', 'center');
    plan.column(coluna).width(8)

    plan.cell(linha, ++coluna).value('Inicial').style('horizontalAlignment', 'center');
    plan.column(coluna).width(9).style('bold', true).style('numberFormat', '#,##0.0000;[Red]-#,##0.0000');

    plan.cell(linha, ++coluna).value('Final').style('horizontalAlignment', 'center');
    plan.column(coluna).width(9).style('bold', true).style('numberFormat', '#,##0.0000;[Red]-#,##0.0000');


    plan.cell(linha, ++coluna).value('Erros').style('horizontalAlignment', 'center');
    plan.column(coluna).width(8).style('bold', true)

    plan.cell(linha, ++coluna).value('Matr.')
    plan.column(coluna).width(9).style('fontColor', '7B7B7B')

    nomescolunas.style('fontColor', CoresExcel.COR_TEXTO_COLUNAS);
    linha++

    this.ajustes.rows.forEach (r => {

      let coluna = 0

      if (r.erros > 0) {
        const address = `A${linha}:M${linha}`
        plan.range(address).style('bold', true).style('fill', 'FFEBEE')
      }


      const id = plan.cell(linha, ++coluna)
      id.value(r.id)

      const se = plan.cell(linha, ++coluna)
      se.value(r.Unidade.se)

      const cgc = plan.cell(linha, ++coluna)
      cgc.value(r.Unidade.id)

      const unidade = plan.cell(linha, ++coluna)
      unidade.value(r.Unidade.nome)

      const cluster = plan.cell(linha, ++coluna)
      cluster.value(r.Unidade.cluster)

      const sidem = plan.cell(linha, ++coluna)
      sidem.value(r.Produto.codsidem)

      const produto = plan.cell(linha, ++coluna)
      produto.value(r.Produto.nome)

      const referencia = plan.cell(linha, ++coluna)
      referencia.value(r.metaReferencia)

      const minima = plan.cell(linha, ++coluna)
      minima.value(r.metaMinima)

      const referencia2 = plan.cell(linha, ++coluna)
      referencia2.value(r.metaReferencia2)

      const ajustada = plan.cell(linha, ++coluna)
      ajustada.value(r.metaAjustada)
      if (this.ajustes.rows.length <  130) {
        ajustada.style('fill', 'FFF2CC')
      }


      const pctchange = plan.cell(linha, ++coluna)
      pctchange.value(r.pctChange)

      const shareRef = plan.cell(linha, ++coluna)
      shareRef.value(r.shareRef)

      const shareAjustado = plan.cell(linha, ++coluna)
      shareAjustado.value(r.shareAjustado)


      const erros = plan.cell(linha, ++coluna)
      erros.value(r.erros)

      const responsavel = plan.cell(linha, ++coluna)
      responsavel.value(r.userId)

      linha++

    })

    return workbook

  }
}
