import { Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

import { IUseAjuste } from "../../hooks/useAjustePorAgregador";
import AjusteMetasTableHeader from "./AjusteMetasTableHeader";
import AjusteMetasTableRow from './AjusteMetasTableRow'

export default function AjusteMetasTable({ actions }: { actions: IUseAjuste }) {
  if (actions.ajuste) {
    return (
      <>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 310px)', marginTop: '2px' }}>
          <Table stickyHeader size="small">
            <AjusteMetasTableHeader
              actions={actions}
            ></AjusteMetasTableHeader>
            {actions.rows.length > 0 ? (
              <TableBody>
                {actions.rows
                  .slice(actions.page * actions.rowsPerPage,
                    actions.page * actions.rowsPerPage + actions.rowsPerPage)
                  .map((row, _i) => (
                    <AjusteMetasTableRow row={row}
                      key={row.id}
                      actions={actions}/>
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
  }
  return <></>
}
