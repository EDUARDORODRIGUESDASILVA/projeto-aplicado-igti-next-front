import { TableRow, TableCell } from "@mui/material";
import { IUser } from "../../core/interfaces/IUser";
import { IUseUsuarios } from "../../hooks/useUsuarios";
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
export default function UsuariosTableRow({ row, actions }: { row: IUser, actions: IUseUsuarios }) {
  return (
    <TableRow hover={true} >
      <TableCell padding='none' colSpan={2} sx={{ paddingLeft: '8px' }}>
      </TableCell>


      <TableCell align="center">
       {row.matricula}
      </TableCell>

      <TableCell align="center" >
        {row.nome}
      </TableCell>

      <TableCell align="center">
        {row.funcao}
      </TableCell>

      <TableCell align="center"
      >
        {row.unidadeId}
      </TableCell>

      <TableCell align="center"
      >
        {row.autorizadoId}
      </TableCell>

      <TableCell align="center" colSpan={2} >
        {row.admin }
        <CheckIcon></CheckIcon>
      </TableCell>

      <TableCell align="center" colSpan={2} >
        {row.leitura}
        <CheckIcon></CheckIcon>
      </TableCell>

      <TableCell align="center" colSpan={2} >
        {row.gravacao}
        <CheckIcon></CheckIcon>
      </TableCell>

      <TableCell align="center" colSpan={2} >
        {new Date(row.prazo).toLocaleString()}
      </TableCell>

    </TableRow>

  )
}
