import XlsxPopulate from 'xlsx-populate'
import { AjustarProdutoRow } from './AjustarProdutoRow'

enum CoresExcel {
  'COR_FUNDO_CABECALHO' = '1f4e78',
  'COR_TEXTO_CABECALHO' = 'ebf0f7',
  'COR_FUNDO_COLUNAS' = '333f4f',
  'COR_TEXTO_COLUNAS' = 'edf0f2'
}
export class AjusteMetasExportaExcelOutliers {
  public gerando: boolean
  constructor() {
    this.gerando = false
  }

  private sortRows(rows: AjustarProdutoRow[]): AjustarProdutoRow[] {
   return rows.sort( (a, b) => {
      if (a.Unidade.cluster < b.Unidade.cluster)
      return  -1

      if (a.Unidade.cluster > b.Unidade.cluster)
        return 1
      return b.metaAjustada - a.metaAjustada
    })
  }
  private geraWorkbook(workbook: XlsxPopulate.Workbook, planame: string,
    titulo: string, rows: AjustarProdutoRow[]): XlsxPopulate.Workbook {

    const srows = this.sortRows(rows)
    const myIds = rows.map(r => r.Produto.id)
    let unique = new Set(myIds)

    const plan = workbook.sheet('Sheet1');
    plan.name(planame);

    const titlerow = plan.range('A1:R1');
    titlerow.style('horizontalAlignment', 'center');
    titlerow.style('fill', CoresExcel.COR_FUNDO_CABECALHO); // light gray
    titlerow.style('fontColor', CoresExcel.COR_TEXTO_CABECALHO); // dark gray
    titlerow.style('bold', true)

    const title = plan.range('A1:R1');
    title.merged(true);
    title.style('horizontalAlignment', 'center');
    title.style('fill', CoresExcel.COR_FUNDO_CABECALHO); // light gray
    // title.style('fontColor', CoresExcel.COR_TEXTO_COLUNAS); // dark gray
    title.style('fontColor', 'FFFFFF')
    title.style({ bold: true, italic: true });
    title.style('fontFamily', 'Segoe UI');
    title.style('fontSize', 11);
    title.value(titulo);

    let coluna = 0
    let linha = 2
    const nomescolunas = plan.range('A2:R2');
    nomescolunas.style('fill', CoresExcel.COR_FUNDO_COLUNAS);
    nomescolunas.style('fontColor', CoresExcel.COR_TEXTO_COLUNAS);
    nomescolunas.style('bold', true)
    const colunasf = workbook.sheet(0).range('A2:R2');
    colunasf.autoFilter();
    plan.freezePanes(4, 2);

    plan.cell(linha, ++coluna).value('SEV').style('horizontalAlignment', 'center');
    plan.column(coluna).width(6).style('bold', true)

    plan.cell(linha, ++coluna).value('Cluster').style('horizontalAlignment', 'center');
    plan.column(coluna).width(12).style('bold', true).style('fontColor', '2F75B5')

    plan.cell(linha, ++coluna).value('CGC').style('horizontalAlignment', 'center');
    plan.column(coluna).width(6).hidden(true).style('bold', true)

    plan.cell(linha, ++coluna).value('Unidade').style('horizontalAlignment', 'center');
    plan.column(coluna).width(43)

    plan.cell(linha, ++coluna).value('Produto').style('horizontalAlignment', 'center');
    plan.column(coluna).width(40).hidden(unique.size == 1).style('bold', true).style('fontColor', '2F75B5')

    plan.cell(linha, ++coluna).value('Inicial').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).hidden(true).style('bold', true).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Ajustada').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('bold', true).style('numberFormat', '#,##0.00;[Red]-#,##0.00');


    plan.cell(linha, ++coluna).value('Pct.').style('horizontalAlignment', 'center');
    plan.column(coluna).width(7).style('bold',false).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Dif.').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('bold', true).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Desvio').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('italic', true).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Média').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('italic', true).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Mínimo').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('italic', true).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Máximo').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('italic', true).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Out').style('horizontalAlignment', 'center');
    plan.column(coluna).width(7).style('bold', true).style('horizontalAlignment', 'center').style('numberFormat', '#,##0;[Red]-#,##0');

    plan.cell(linha, ++coluna).value('Min').style('horizontalAlignment', 'center');
    plan.column(coluna).width(7).style('bold', true).style('horizontalAlignment', 'center').style('numberFormat', '#,##0;[Red]-#,##0');

    plan.cell(linha, ++coluna).value('Max').style('horizontalAlignment', 'center');
    plan.column(coluna).width(7).style('bold', true).style('horizontalAlignment', 'center').style('numberFormat', '#,##0;[Red]-#,##0');

    plan.cell(linha, ++coluna).value('Aumentar').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('bold', true).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    plan.cell(linha, ++coluna).value('Diminuir').style('horizontalAlignment', 'center');
    plan.column(coluna).width(15).style('bold', true).style('numberFormat', '#,##0.00;[Red]-#,##0.00');

    nomescolunas.style('fontColor', CoresExcel.COR_TEXTO_COLUNAS);
    linha++

    srows.forEach(r => {

      let coluna = 0
      if (r.isOutlier() > 0) {
        const address = `A${linha}:R${linha}`
        plan.range(address).style('fill', 'FFEBEE')
      }

      const se = plan.cell(linha, ++coluna)
      se.value(r.Unidade.se)

      const cluster = plan.cell(linha, ++coluna)
      cluster.value(r.Unidade.cluster)


      const cgc = plan.cell(linha, ++coluna)
      cgc.value(r.Unidade.id)

      const unidade = plan.cell(linha, ++coluna)
      unidade.value(r.Unidade.nome)

      const produto = plan.cell(linha, ++coluna)
      produto.value(r.Produto.nome)

      const inicial = plan.cell(linha, ++coluna)
      inicial.value(r.metaReferencia)

      const ajustada = plan.cell(linha, ++coluna)
      ajustada.value(r.metaAjustada)
      if (rows.length < 130) {
        ajustada.style('fill', 'FFF2CC')
        cluster.style('fill', 'F2F2F2')
        se.style('fontColor', '57257C')
      }

      const pctChange = plan.cell(linha, ++coluna)
      pctChange.value(r.pctChange)

      const diff = plan.cell(linha, ++coluna)
      diff.value( (r.metaAjustada - r.metaReferencia))

      const media = plan.cell(linha, ++coluna)
      media.value(r.clusterMedia)

      const desvio = plan.cell(linha, ++coluna)
      desvio.value(r.clusterDesvio)

      const minimo = plan.cell(linha, ++coluna)
      minimo.value(r.clusterMinimo)

      const maximo = plan.cell(linha, ++coluna)
      maximo.value(r.clusterMaximo)

      const isOutlier = plan.cell(linha, ++coluna)
      isOutlier.value(r.isOutlier())
      this.destacaOut(isOutlier)

      const isMinOutlier = plan.cell(linha, ++coluna)
      isMinOutlier.value(r.isMinOutlier())
      this.destacaOut(isMinOutlier)

      const isMaxOutlier = plan.cell(linha, ++coluna)
      isMaxOutlier.value(r.isMaxOutlier())
      this.destacaOut(isMaxOutlier)

      const aumentar = plan.cell(linha, ++coluna)
      aumentar.value(r.outlierValorAumentar())

      const reduzir = plan.cell(linha, ++coluna)
      reduzir.value(r.outlierValorReduzir())
      linha++
    })
    return workbook
  }

  private destacaOut(cell: XlsxPopulate.Cell ) {
    if (cell.value() == 1) {
      cell.style('fill', 'C00000').style('fontColor', 'FFFFFF')
    } else {
      cell.style('fill', 'E7E6E6').style('fontColor', 'E7E6E6')
    }
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

  async gerarExcel(nome: string, planame: string, titulo: string, rows: AjustarProdutoRow[]) {
    const arquivo = `${nome}.xlsx`
    const workbook = await XlsxPopulate.fromBlankAsync()
    this.geraWorkbook(workbook, planame, titulo, rows)
    const blob = await workbook.outputAsync()
    this.export(blob, arquivo)
  }
}
