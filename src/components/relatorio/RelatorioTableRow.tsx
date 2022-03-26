import { Button, Chip, Grid, Stack, TableCell, TableRow, Tooltip } from "@mui/material";
import Link from "next/link";
import NumberTextFormat from "../../utils/NumberTextFormat";
import { IUseRelatorio } from "../../hooks/useRelatorioPorAgregador";
import { RelatorioPorAgregadorRow } from "../../core/model/relatorio-objetivos/RelatorioPorAgregadorRow";

export default function RelatorioTableRow({ row, actions }: { row: RelatorioPorAgregadorRow, actions: IUseRelatorio }) {

  const rowBackgroundColor = () => {
    if (row.erros > 0 || row.saldo !== 0)
      return '#ffebee'

    // if (row.gravado  === row.qtdlinhas)
    //   return '#dfffdb'
    // return ''
  }

  const cellBackgroundColor = () => {
    if (row.erros > 0 || row.saldo !== 0)
      return '#ffebee'

    if (row.gravado === row.qtdlinhas)
      return '#dfffdb'
    return ''
  }

  return (
    <TableRow
      hover={true}
      sx={{ backgroundColor: rowBackgroundColor() }}
    >

      <TableCell colSpan={1} padding='none'>
        <Link href={`/relatorio/${row.unidade.id}`} passHref>
          <Tooltip title={row.unidade.nome} placement="right">
            <Button color="secondary" size="small">{row.unidade.id}</Button>
          </Tooltip>
        </Link>
        <Link href={`/relatorio/${row.unidade.id}/${row.produto.id}`}>
          <Button size="small">{row.produto.nome}</Button></Link>
      </TableCell>
      <TableCell padding='none'>
        <Stack direction="row" spacing={0}>
          {row.unidade.tipo !== 'SR' ? (
            <Link href={`/ajustes/${row.unidade.id}/${row.produto.id}`}>
              <Button size="small" color='secondary'>Ajustar</Button>

            </Link>
          ) : <></>}
          {row.unidade.tipo == 'SR' ? (
            <>


              <Link href={`/ajustes/${row.unidade.id}/${row.produto.id}`}>
                <Button size="small" color='secondary'>Agência</Button>
              </Link>

              <Link href={`/ajustes/${row.unidade.id}/${row.produto.id}`}>
                <Button size="small" disabled={true} color='secondary'>SEV</Button>
              </Link>
            </>
          ) : (<></>)}
        </Stack>


      </TableCell>

      <TableCell align="right">

        <NumberTextFormat value={row.metaReferencia} />
      </TableCell>

      <TableCell align="right" >

        <NumberTextFormat value={row.metaReferencia2} />
      </TableCell>

      <TableCell align="right" >
        <NumberTextFormat value={row.trocas} />
      </TableCell>


      <TableCell align="right"
        sx={{ fontWeight: 'bold' }}
      >

        <NumberTextFormat value={row.metaAjustada} />
      </TableCell>

      <TableCell align="right" >

        <NumberTextFormat value={row.metaAjustada - row.metaReferencia2} />
      </TableCell>

      <TableCell padding="none" align="center" sx={{ backgroundColor: cellBackgroundColor() }} >

        <Chip variant="outlined" size="small" label={row.gravado + '/' + row.qtdlinhas} />
        {/* {row.gravado}/{row.qtdlinhas} */}
      </TableCell>

    </TableRow>
  )
}
