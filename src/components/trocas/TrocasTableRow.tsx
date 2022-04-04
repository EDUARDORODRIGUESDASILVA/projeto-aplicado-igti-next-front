import { TableCell, TableRow } from "@mui/material";
import { IUseRelatorioTrocas } from "../../hooks/useRelatorioTrocas";
import { ITroca } from "../../services/trocasService";

export default function TrocasTableRow({ row }: { row: ITroca, actions: IUseRelatorioTrocas }) {
  return (
    <TableRow>
      <TableCell padding='none' colSpan={2} sx={{ paddingLeft: '8px' }}>
      </TableCell>

      <TableCell align="center" >
        {row.incrementaId}
      </TableCell>

      <TableCell align="center">
        {row.reduzId}
      </TableCell>

      <TableCell align="center">
        {row.produtoId}
      </TableCell>

      <TableCell align="center"
      >
        {row.valor}
      </TableCell>

      <TableCell align="center" >
        {row.userId}
      </TableCell>

      <TableCell align="center" >

      </TableCell>
    </TableRow>
  )
}
