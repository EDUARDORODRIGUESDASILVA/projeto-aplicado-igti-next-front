import { TableCell, TableRow, Tooltip } from "@mui/material";
import { Troca } from "../../core/model/troca/Trocas";
import { IUseRelatorioTrocas } from "../../hooks/useRelatorioTrocas";
import NumberTextFormat from "../../utils/NumberTextFormat";

export default function TrocasTableRow({ row, actions }: { row: Troca, actions: IUseRelatorioTrocas }) {
  if (actions)
  return (
    <TableRow
      hover={true}
      onClick={()=> actions.handleSelecionaLinha(row)}
      selected={actions.selectedId === row.id}
    >
      <TableCell padding='none' align='right' colSpan={2} sx={{ paddingLeft: '8px' ,fontWeight: 'bold', color: 'purple' }}>
        {row.id}
      </TableCell>

      <TableCell align="left">
        {row.produto.nome}
      </TableCell>

      <TableCell align="left" >
        {row.incrementa.nome}
      </TableCell>

      <TableCell align="left">
        {row.reduz.nome}
      </TableCell>

      <TableCell align="right"
        sx={{ fontWeight: 'bold' }}
      >
        <NumberTextFormat value={row.valor} />
      </TableCell>

      <TableCell align="right"
        sx={{ paddingLeft: '5px', fontWeight: 'italic', color: 'gray' }}
      >
        <Tooltip title={row.Usuario.nome} placement="left">
          <small>{row.userId}</small>
        </Tooltip>
      </TableCell>

      <TableCell align="center" >

      </TableCell>
    </TableRow>
  )

  return <></>
}
