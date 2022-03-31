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
        <Link href={`/relatorio/?un=${row.unidade.id}`} passHref>
          <Tooltip title={row.unidade.nome} placement="right">
            <Button color="secondary" size="small">{row.unidade.id}</Button>
          </Tooltip>
        </Link>
        {row.unidade.tipo == 'SR' ? (
        <Link href={`/relatorio/?un=${row.unidade.id}&prod=${row.produto.id}`}>
          <Button size="small">{row.produto.nome}</Button>
          </Link>
        ):<>
            <Link href={`/ajustes/?un=${row.unidade.id}&prod=${row.produto.id}`}>
              <Button size="small">{row.produto.nome}</Button>
            </Link>
        </>
      }
      </TableCell>
      <TableCell padding='none'>
        <Stack direction="row" spacing={0}>
          {row.unidade.tipo == 'SR' ? (
            <>
              <Link href={`/ajustes/?un=${row.unidade.id}&prod=${row.produto.id}`}>
                <Button size="small" color='secondary'>Agência</Button>
              </Link>
               <Link href={`/ajustes/?un=${row.unidade.id}&prod=${row.produto.id}`}>
                <Button size="small" disabled={true} color='secondary'>SEV</Button>
              </Link>
            </>
          ) : (<></>)}
        </Stack>


      </TableCell>

      <TableCell align="right" sx={{
        color: (row.metaReferencia2 < 0 ? 'red' : '')
      }}

      >

        <NumberTextFormat value={row.metaReferencia} />
      </TableCell>

      <TableCell align="right" sx={{
        color: (row.metaReferencia2 < 0 ? 'red' : '')
      }}

      >

        <NumberTextFormat value={row.metaReferencia2} />
      </TableCell>

      <TableCell align="right"
        sx={{
          fontWeight: (row.trocas !== 0 ? 'bold': ''),
          color: (row.trocas < 0 ? 'red' : '')
        }}

      >
        <NumberTextFormat value={row.trocas} />
      </TableCell>


      <TableCell align="right"
        sx={{
        fontWeight: 'bold',
        color: (row.metaAjustada < 0 ? 'red' : '')
      }}
      >

        <NumberTextFormat value={row.metaAjustada} />
      </TableCell>

      <TableCell align="right" sx={{
        paddingLeft: '13px',
        fontWeight: (row.saldo !== 0 ? 'bold' : ''),
        color: (row.saldo !== 0 ? 'red' : '')
      }}
>

        <NumberTextFormat value={row.saldo} />
      </TableCell>

      <TableCell padding="none" align="center" sx={{ backgroundColor: cellBackgroundColor() }} >

        <Chip variant="outlined" size="small" label={row.gravado + '/' + row.qtdlinhas} />
        {/* {row.gravado}/{row.qtdlinhas} */}
      </TableCell>

    </TableRow>
  )
}
