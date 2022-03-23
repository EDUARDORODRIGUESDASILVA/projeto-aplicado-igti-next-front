import { Button, TableCell, TableRow, Tooltip } from "@mui/material";
import Link from "next/link";
import NumberTextFormat from "../../utils/NumberTextFormat";

import { RelatorioPorAgregadorRow } from "../../core/model/RelatorioPorAgregadorRow";
import { IUseRelatorio } from "../../hooks/useRelatorioPorAgregador";

export default function RelatorioTableRow( {row, actions}: { row: RelatorioPorAgregadorRow, actions: IUseRelatorio }) {

  const rowBackgroundColor = () => {
    if (row.erros > 0 || row.saldo !== 0)
      return '#ffebee'

    if (row.gravado  === row.qtdlinhas)
      return '#dfffdb'
    return ''
  }

  return (
    <TableRow
      sx={{ backgroundColor: rowBackgroundColor() }}
    >
      <TableCell>
        <Link href={`/relatorio/${row.unidade.id}`}  passHref>
          <Tooltip title={row.unidade.nome} placement="right">
            <Button color="secondary" size="small">{row.unidade.id}</Button>
          </Tooltip>
        </Link>
      </TableCell>
      <TableCell>
       <Link href={`/relatorio/${row.unidade.id}/${row.produto.id}`}>
          <Button size="small">{row.produto.nome}</Button></Link>

      </TableCell>
      <TableCell>
        <Link href={`/ajustes/${row.unidade.id}/${row.produto.id}`}>
          <Button size="small" color='secondary'>Ajustar</Button></Link>

      </TableCell>

      <TableCell align="right">

        <NumberTextFormat value={row.metaReferencia} />
      </TableCell>

      <TableCell align="right" >

        <NumberTextFormat value={row.metaReferencia2} />
      </TableCell>

      <TableCell align="right" >

        <NumberTextFormat value={row.metaAjustada} />
      </TableCell>

      <TableCell align="right" >

        <NumberTextFormat value={row.metaAjustada - row.metaReferencia2} />
      </TableCell>

      <TableCell align="right" >
       {row.gravado}/{row.qtdlinhas}
      </TableCell>
    </TableRow>
  )
}
