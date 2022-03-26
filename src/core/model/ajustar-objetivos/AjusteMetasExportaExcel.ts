import XlsxPopulate from 'xlsx-populate'
import { AjustarProdutoRow } from './AjustarProdutoRow'

enum CoresExcel {
  'COR_FUNDO_CABECALHO' = '1f4e78',
  'COR_TEXTO_CABECALHO' = 'ebf0f7',
  'COR_FUNDO_COLUNAS' = '333f4f',
  'COR_TEXTO_COLUNAS' = 'edf0f2'
}

export class AjusteMetasExportaExcel {
  public gerando: boolean
  constructor() {
    this.gerando = false
  }

  private geraWorkbook(workbook: XlsxPopulate.Workbook, planame: string,
    titulo: string, rows: AjustarProdutoRow[]): XlsxPopulate.Workbook {

    const myIds = rows.map(r => r.Produto.id)
    let unique= new Set(myIds)

    const plan = workbook.sheet('Sheet1');
    plan.name(planame);

    const titlerow = plan.range('A1:S1');
    titlerow.style('horizontalAlignment', 'center');
    titlerow.style('fill', CoresExcel.COR_FUNDO_CABECALHO); // light gray
    titlerow.style('fontColor', CoresExcel.COR_TEXTO_CABECALHO); // dark gray
    titlerow.style('bold', true)

    const title = plan.range('A1:S1');
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
    const nomescolunas = plan.range('A2:S2');
    nomescolunas.style('fill', CoresExcel.COR_FUNDO_COLUNAS);
    nomescolunas.style('fontColor', CoresExcel.COR_TEXTO_COLUNAS);
    nomescolunas.style('bold', true)
    const colunasf = workbook.sheet(0).range('A2:S2');
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
    plan.column(coluna).width(14).style('bold', true).style('fontColor', '808080')

    plan.cell(linha, ++coluna).value('Produto').style('horizontalAlignment', 'center');
    plan.column(coluna).width(40).hidden(unique.size == 1).style('bold', true).style('fontColor', '2F75B5')

    plan.cell(linha, ++coluna).value('Trava').style('horizontalAlignment', 'center');
    plan.column(coluna).width(9).style('horizontalAlignment', 'center').style('bold', true)

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

    plan.cell(linha, ++coluna).value('Gravados').style('horizontalAlignment', 'center');
    plan.column(coluna).width(8).style('bold', true)

    plan.cell(linha, ++coluna).value('Status').style('horizontalAlignment', 'center');
    plan.column(coluna).width(8).style('bold', true)

    plan.cell(linha, ++coluna).value('Responsável').style('horizontalAlignment', 'center');
    plan.column(coluna).width(40).style('fontColor', '7B7B7B')

    nomescolunas.style('fontColor', CoresExcel.COR_TEXTO_COLUNAS);
    linha++

    rows.forEach(r => {

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

      const trava = plan.cell(linha, ++coluna)
      trava.value(r.trava)

      const referencia = plan.cell(linha, ++coluna)
      referencia.value(r.metaReferencia)

      const minima = plan.cell(linha, ++coluna)
      minima.value(r.metaMinima)

      const referencia2 = plan.cell(linha, ++coluna)
      referencia2.value(r.metaReferencia2)

      const ajustada = plan.cell(linha, ++coluna)
      ajustada.value(r.metaAjustada)
      if (rows.length < 130) {
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

      const gravado = plan.cell(linha, ++coluna)
      gravado.value(r.gravado)

      const ativo = plan.cell(linha, ++coluna)
      ativo.value(r.ativo)

      const responsavel = plan.cell(linha, ++coluna)
      responsavel.value(r.userId + ' - ' + r.Usuario.nome)
      linha++
    })
    return workbook
  }

  private export(blob: any, arquivo: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = arquivo;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

   async gerarExcel(nome: string, planame: string, titulo: string, rows: AjustarProdutoRow[] ) {
    const arquivo = `${nome}.xlsx`
    const workbook = await XlsxPopulate.fromBlankAsync()
    this.geraWorkbook(workbook,planame, titulo, rows)
    const blob = await workbook.outputAsync()
    this.export(blob, arquivo)
  }


}
