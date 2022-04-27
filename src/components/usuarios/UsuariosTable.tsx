import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { IUseUsuarios } from "../../hooks/useUsuarios";
import TrocasTableRow from "../trocas/TrocasTableRow";
import UsuariosTableRow from "./UsuariosTableRow";

export default function UsuariosTable({actions}: {actions: IUseUsuarios}) {
  return (
    <div>
      <>
        <TableContainer sx={{ maxHeight: '60vh' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell padding='none' colSpan={2} sx={{ paddingLeft: '8px' }}>
                </TableCell>

                <TableCell align="center">
                 Matrícula
                </TableCell>

                <TableCell align="center" >
                  Empregado
                </TableCell>

                <TableCell align="center">
                  Função
                </TableCell>

                <TableCell align="center"
                >
                 Unidade
                </TableCell>

                <TableCell align="center"
                >
                  Autorização
                </TableCell>

                <TableCell align="center" colSpan={2} >
                 Admin
                </TableCell>

                <TableCell align="center" colSpan={2} >
                 Leitura
                </TableCell>

                <TableCell align="center" colSpan={2} >
                  Gravação
                </TableCell>

                <TableCell align="center" colSpan={2} >
                  Prazo
                </TableCell>
              </TableRow>
            </TableHead>

            {actions.usuarios.length > 0 ? (
              <TableBody>
                {actions.usuarios
                  .slice(actions.page * actions.rowsPerPage, actions.page * actions.rowsPerPage + actions.rowsPerPage)
                  .map((row, i) => (
                    <UsuariosTableRow row={row} key={row.matricula} actions={actions}></UsuariosTableRow>
                  ))}
              </TableBody>
            ) : <></>
            }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={actions.usuarios.length}
          rowsPerPage={actions.rowsPerPage}
          page={actions.page}
          labelRowsPerPage={'Linhas por página: '}
          onPageChange={actions.handleChangePage}
          onRowsPerPageChange={actions.handleChangeRowsPerPage}
        />
      </>
    </div>
  )
}
