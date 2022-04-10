import { Box, Checkbox, IconButton, TableCell, TableHead, TableRow, Tooltip } from "@mui/material"
import { useState } from "react";
import NumberInputFormat from "../../utils/NumberInputFormat"
import NumberTextFormat from "../../utils/NumberTextFormat"
import CalculateIcon from '@mui/icons-material/Calculate';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { IUseAjuste } from "../../hooks/useAjustePorAgregador";
import AjusteMetasTableSortLabel from "./AjusteMetasTableSortLabel";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { selectSidebarState } from '../../store/sidebarSlice';
import { useAppSelector } from "../../store/hooks";

export default function AjusteMetasTableHeader({ actions }: { actions: IUseAjuste }) {
  const [showAuxiliarInput, setshowAuxiliarInput] = useState(false);
  const sidebarOpen = useAppSelector(selectSidebarState);

  if (actions.ajuste)
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" sx={{ paddingRight: '0px', paddingLeft: '0px', marginLeft: '0px' }} >
            <Checkbox
              color="primary"
              checked={actions.ajuste.checked}
              onChange={() => { actions.handleMainCheckbox() }}
              disabled={false} />
          </TableCell>

          <TableCell padding='none' align="center">
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
          </TableCell>

          {actions.tipo == 'AG' ? (
          <TableCell padding='none' align="center" >
            Cluster
            <AjusteMetasTableSortLabel
              actions={actions}
              options={{
                chave: 'Cluster',
                label: 'Cluster',
                enabled: false,
                fisrtSort: 'desc'
              }
              }
            ></AjusteMetasTableSortLabel>
          </TableCell> ):<></>}

          <TableCell padding='none' align="right">
            <AjusteMetasTableSortLabel
              actions={actions}
              options={{
                chave: 'Referencia',
                label: actions.tipo == 'AG' ? 'Referência' : 'Inicial',
                enabled: true,
                fisrtSort: 'desc'
              }
              }
            ></AjusteMetasTableSortLabel>
          </TableCell>

          <TableCell   align="right" >

            <AjusteMetasTableSortLabel
              actions={actions}
              options={{
                chave: actions.tipo == 'AG' ? 'Minima': 'Referencia2',
                label: actions.tipo == 'AG' ? 'Mínima': 'Referência',
                enabled: true,
                fisrtSort: 'desc'
              }
              }
            ></AjusteMetasTableSortLabel>
          </TableCell>

          {actions.tipo == 'SE' ? (
          <TableCell padding='none' align="center">
            Trocas
          </TableCell> ) :<></> }

          <TableCell padding='none' align="center">
            Trava
          </TableCell>

          <TableCell align="center">
            %
          </TableCell>

          <TableCell  align="center" >
            <Tooltip title="Trocas">
            <IconButton size="small"
              onClick={() => setshowAuxiliarInput(!showAuxiliarInput)}
              color={showAuxiliarInput ? 'primary' : 'default'} component="span">
                <ShuffleIcon fontSize="inherit" />
            </IconButton>
            </Tooltip>
            Valor
            <Tooltip title="Distribuir linear">
            <IconButton  disabled={actions.ajuste.saldo == 0}
              onClick={() => actions.handleCalc()}
              color="primary" aria-label="upload picture" component="span">
                <CalculateIcon fontSize="inherit" />
            </IconButton>
            </Tooltip>
          </TableCell>

          <TableCell padding='none'  align="right" colSpan={2}>
            <AjusteMetasTableSortLabel
              actions={actions}
              options={{
                chave: 'Ajustada',
                label: <Box sx={{ mr: '3px' }}>
                  <h3>
                  <NumberTextFormat value={actions.ajuste.metaAjustada} />
                  </h3>
                </Box>,
                enabled: true,
                fisrtSort: 'desc'
              }
              }
            ></AjusteMetasTableSortLabel>
          </TableCell>
          <TableCell align="center" padding='none'
            sx={{ backgroundColor: actions.ajuste.saldo !== 0 ? "#ffebee" : "" }}
            colSpan={3}>
            <h2>
              <NumberTextFormat value={actions.ajuste.saldo} />
            </h2>
          </TableCell>

        </TableRow>
        {showAuxiliarInput ? (
          <TableRow>
            <TableCell style={{ top: 60 }}>
            </TableCell>
            <TableCell style={{ top: 60 }}  align="center">
              {actions.ajuste.unidade.nome}
            </TableCell>

            <TableCell style={{ top: 60 }} colSpan={2} align="right">
              <NumberTextFormat value={actions.ajuste.metaReferencia} />
            </TableCell>

            <TableCell style={{ top: 60 }}  align="right" colSpan={2}>
              <NumberTextFormat value={actions.ajuste.metaReferencia2} />
            </TableCell>

            <TableCell style={{ top: 60 }} padding='none' colSpan={2}>
              <NumberInputFormat
                value={actions.ajuste.auxiliarTroca}
                handleInputChanges={(_row: undefined, value: number) => {
                  actions.handleInputAuxiliarTroca(value)
                }}
              ></NumberInputFormat>
            </TableCell>
            <TableCell style={{ top: 60}}  align="right" colSpan={2}>

              <NumberTextFormat value={actions.ajuste.metaAjustada} />
            </TableCell>
            <TableCell style={{ top: 60 }} align="center">
              <IconButton aria-label="cart" size="small" onClick={actions.handleInicial}
                disabled={actions.ajuste.unidade.tipo !== 'SR'}>
                < RestartAltIcon />
              </IconButton>
             </TableCell>

            <TableCell style={{ top: 60 }} align="right" colSpan={2}>
              <NumberTextFormat value={actions.ajuste.saldo} />
            </TableCell>
          </TableRow>
        ) : (<></>)
        }
      </TableHead>
    )
  return <></>
}
