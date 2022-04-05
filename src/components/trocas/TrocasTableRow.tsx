import { TableCell, TableRow } from "@mui/material";
import { IUseRelatorioTrocas } from "../../hooks/useRelatorioTrocas";
import { Troca } from "../../services/trocasService";
import NumberTextFormat from "../../utils/NumberTextFormat";

export default function TrocasTableRow({ row }: { row: Troca, actions: IUseRelatorioTrocas }) {
  return (
    <TableRow>
      <TableCell padding='none' colSpan={2} sx={{ paddingLeft: '8px' }}>
      </TableCell>

      <TableCell align="center" >
        {row.incrementa.nome}
      </TableCell>

      <TableCell align="center">
        {row.reduz.nome}
      </TableCell>

      <TableCell align="center">
        {row.produto.nome}
      </TableCell>

      <TableCell align="center"
      >
        <NumberTextFormat value={row.valor} />
      </TableCell>

      <TableCell align="center" >
        {row.userId}
      </TableCell>

      <TableCell align="center" >

      </TableCell>
    </TableRow>
  )
}
