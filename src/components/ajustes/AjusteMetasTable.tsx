import { Checkbox, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import NumberTextFormat from "../../utils/NumberTextFormat";
import AjusteMetasTableRow from './AjusteMetasTableRow'
import CalculateIcon from '@mui/icons-material/Calculate';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { IUseAjuste } from "../../hooks/useAjustePorAgregador";
import NumberInputFormat from "../../utils/NumberInputFormat";
import { useState } from "react";

export default function AjusteMetasTable({ actions }: { actions: IUseAjuste }) {
  const [showAuxiliarInput, setshowAuxiliarInput] = useState(false);
  if (actions.ajuste) {
    return (
      <>
        <TableContainer sx={{ maxHeight: '60vh', marginTop: '2px' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" >
                  <Checkbox
                    color="primary"
                    checked={actions.ajuste.checked}
                    onChange={() => { actions.handleMainCheckbox() }}
                    disabled={false} />
                </TableCell>
                {actions.ajuste && actions.ajuste.unidade.tipo == 'SR' ? (
                  <TableCell align="center" padding="none">
                    SE
                  </TableCell>
                ) : <></>}
                <TableCell>
                  Unidade
                </TableCell>
                <TableCell >
                  Cluster

                </TableCell>
                <TableCell>
                  Referencia
                </TableCell>

                <TableCell align="center" >
                  Mínima
                </TableCell>

                <TableCell align="center">
                  Trava
                </TableCell>

                <TableCell align="center">
                  %
                </TableCell>

                <TableCell align="center" >
                  <IconButton
                    onClick={() => setshowAuxiliarInput(!showAuxiliarInput)}
                    color={showAuxiliarInput ? 'primary' : 'default'} component="span">
                    <ShuffleIcon fontSize="small" />
                  </IconButton>

                  Valor
                  <IconButton disabled={actions.ajuste.saldo == 0}
                    onClick={() => actions.handleCalc()}
                    color="primary" aria-label="upload picture" component="span">
                    <CalculateIcon />
                  </IconButton>

                </TableCell>

                <TableCell align="right" colSpan={3}>
                  <h2>
                    <NumberTextFormat value={actions.ajuste.metaAjustada} />
                  </h2>
                </TableCell>
                <TableCell align="center" padding='none'
                  sx={{ backgroundColor: actions.ajuste.saldo !== 0 ? "#ffebee" : "" }}
                  colSpan={2}>
                  <h2>
                    <NumberTextFormat value={actions.ajuste.saldo} />
                  </h2>
                </TableCell>

              </TableRow>
              {showAuxiliarInput ? (
                <TableRow>
                  <TableCell style={{ top: 71 }} align="center"
                    colSpan={(actions.ajuste.unidade.tipo == 'SR' ? 7 : 6)}
                    padding='none'>

                  </TableCell>
                  <TableCell style={{ top: 71 }} padding='none' colSpan={2}>
                    <NumberInputFormat
                      value={actions.ajuste.auxiliarTroca}
                      handleInputChanges={(_row: undefined, value: number) => {
                        actions.handleInputAuxiliarTroca(value)
                      }}
                    ></NumberInputFormat>
                  </TableCell>
                  <TableCell style={{ top: 71 }} align="left" colSpan={5} padding='none'>

                  </TableCell>

                </TableRow>
              ) : (<></>)
              }
            </TableHead>

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
