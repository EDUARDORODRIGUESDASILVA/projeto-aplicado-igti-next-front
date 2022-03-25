import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { IUseRelatorio } from "../../hooks/useRelatorioPorAgregador";
import RelatorioFilterErrosBadge from "./RelatorioFilterErrosBadge";
import RelatorioTableRow from "./RelatorioTableRow";

export default function RelatorioTable({ actions }: { actions: IUseRelatorio }) {

  if(actions.relatorio)
  return (
    <div>
      <TableContainer sx={{ maxHeight: '66vh' }}>

      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              Unidade
            </TableCell>
            <TableCell >
              Produto
              {/* <RelatorioFilterProduto actions={actions} ></RelatorioFilterProduto> */}

            </TableCell>
            <TableCell>

            </TableCell>

            <TableCell align="center" >
              Inicial
            </TableCell>

            <TableCell align="center">
              Referência
            </TableCell>

            <TableCell align="center">
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

       { actions.rows.length > 0 ? (
          <TableBody>
            {actions.rows
             .slice(actions.page * actions.rowsPerPage, actions.page * actions.rowsPerPage + actions.rowsPerPage)
            .map((row, i) => (
              <RelatorioTableRow row={row} key={row.id} actions={actions}></RelatorioTableRow>
            ))}
          </TableBody>
       ): <></>
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
