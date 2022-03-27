import { Checkbox, IconButton, TableCell, TableHead, TableRow } from "@mui/material"
import { useState } from "react";
import NumberInputFormat from "../../utils/NumberInputFormat"
import NumberTextFormat from "../../utils/NumberTextFormat"
import CalculateIcon from '@mui/icons-material/Calculate';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { IUseAjuste } from "../../hooks/useAjustePorAgregador";
import AjusteMetasTableSortLabel from "./AjusteMetasTableSortLabel";

export default function AjusteMetasTableHeader({ actions }: { actions: IUseAjuste }) {
  const [showAuxiliarInput, setshowAuxiliarInput] = useState(false);
  if (actions.ajuste)
  return (
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

          <AjusteMetasTableSortLabel
            actions={actions}
            options={{
              chave: 'Unidade',
              label: 'Unidade',
              enabled: true,
              fisrtSort: 'desc'
            }
            }

          ></AjusteMetasTableSortLabel>
          {actions.sortOptions.chave} {actions.sortOptions.sortOrder}

        </TableCell>
        <TableCell >
            Cluster
          {/* <AjusteMetasTableSortLabel
            actions={actions}
            options={{
              chave: 'Cluster',
              label: 'Cluster',
              enabled: true
            }
            }
          ></AjusteMetasTableSortLabel> */}
        </TableCell>
        <TableCell align="right">

          <AjusteMetasTableSortLabel
            actions={actions}
            options={{
              chave: 'Referencia',
              label: 'Referencia',
              enabled: true,
              fisrtSort: 'desc'
            }
            }
          ></AjusteMetasTableSortLabel>
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
          <AjusteMetasTableSortLabel
            actions={actions}
            options={{
              chave: 'Ajustada',
              label: <h2>
                <NumberTextFormat value={actions.ajuste.metaAjustada} />
              </h2>,
              enabled: true,
              fisrtSort: 'desc'
            }
            }
          ></AjusteMetasTableSortLabel>
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
  )

  return <></>
}
