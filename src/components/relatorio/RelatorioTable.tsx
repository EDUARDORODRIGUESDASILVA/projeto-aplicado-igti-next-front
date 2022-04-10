import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import RelatorioFilterErrosBadge from "./RelatorioFilterErrosBadge";
import RelatorioTableRow from "./RelatorioTableRow";
import RelatorioTextFilter from "./RelatorioTextFilter";
import SearchIcon from '@mui/icons-material/Search';

import { IUseRelatorio } from "../../hooks/useRelatorioPorAgregador";

export default function RelatorioTable({ actions }: { actions: IUseRelatorio }) {

  if (actions.relatorio)
    return (
      <div>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 260px)' }}>

          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell  padding='none' colSpan={2} sx={{paddingLeft: '8px'}}>
                    <RelatorioTextFilter actions={actions}></RelatorioTextFilter>
                </TableCell>

                <TableCell align="center" >
                  Inicial
                </TableCell>

                <TableCell align="center">
                  Referência
                </TableCell>

                 <TableCell align="center">
                  Negociações
                </TableCell>

                <TableCell align="center"
              >
                  Ajustada
                </TableCell>

                <TableCell align="center" >
                  Saldo
                </TableCell>

                <TableCell align="center" >
                  <RelatorioFilterErrosBadge actions={actions}></RelatorioFilterErrosBadge>
                </TableCell>
              </TableRow>
            </TableHead>

            {actions.rows.length > 0 ? (
              <TableBody>
                {actions.rows
                  .slice(actions.page * actions.rowsPerPage, actions.page * actions.rowsPerPage + actions.rowsPerPage)
                  .map((row, i) => (
                    <RelatorioTableRow row={row} key={row.id} actions={actions}></RelatorioTableRow>
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
      </div>
    )

  return <></>
}
