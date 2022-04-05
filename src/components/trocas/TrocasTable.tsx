import {  Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { IUseRelatorioTrocas } from "../../hooks/useRelatorioTrocas";
import TrocasTableIncluir from "./TrocasTableIncluir";
import TrocasTableRow from "./TrocasTableRow";



export default function TrocasTable({actions}: { actions: IUseRelatorioTrocas }) {
  const relatorio = true
  if (relatorio)
    return (
      <>
        <TableContainer sx={{ maxHeight: '60vh'  }}>

          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell padding='none' colSpan={2} sx={{ paddingLeft: '8px' }}>
                </TableCell>

                <TableCell align="center" >
                  Aumentar
                </TableCell>

                <TableCell align="center">
                  Reduzir
                </TableCell>

                <TableCell align="center">
                  Produto
                </TableCell>

                <TableCell align="center"
                >
                  Valor
                </TableCell>

                <TableCell align="center" >
                  Responsável
                </TableCell>

                <TableCell align="center" >

                </TableCell>
              </TableRow>
              <TrocasTableIncluir actions={actions}></TrocasTableIncluir>


            </TableHead>

            {actions.rows.length > 0 ? (
              <TableBody>
                {actions.rows
                  .slice(actions.page * actions.rowsPerPage, actions.page * actions.rowsPerPage + actions.rowsPerPage)
                  .map((row, i) => (
                    <TrocasTableRow row={row} key={row.id} actions={actions}></TrocasTableRow>
                  ))}
              </TableBody>
            ) : <></>
            }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25, 130]}
          component="div"
          count={actions.rows.length}
          rowsPerPage={actions.rowsPerPage}
          page={actions.page}
          labelRowsPerPage={'Linhas por página: '}
          onPageChange={actions.handleChangePage}
          onRowsPerPageChange={actions.handleChangeRowsPerPage}
        />
      </>
    )

  return <></>
}
