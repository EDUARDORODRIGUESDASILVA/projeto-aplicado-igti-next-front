import { Button, Checkbox, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AjustarProdutoRow } from "../../core/model/ajustar-objetivos/AjustarProdutoRow";
import { IUseAjuste } from "../../hooks/useAjustePorAgregador";
import NumberInputFormat from "../../utils/NumberInputFormat";
import NumberTextFormat from "../../utils/NumberTextFormat";

export default function AjusteMetasTableRow({row, actions}: { row: AjustarProdutoRow, actions: IUseAjuste }) {
  const [backgroundColor, setbackgroundColor] = useState('');
  useEffect(() => {

    const backgroundColor =  row.erros > 0 ? '#ffebee' : ''
    setbackgroundColor(backgroundColor)
  }, [row.erros]);
  return (
    <TableRow style={{ height: 18 }}
      hover={true && row.erros===0}
      selected={row.checked}
      sx={{ backgroundColor:backgroundColor}}
    >
      <TableCell padding="checkbox">
        <Checkbox
          disabled={false}
          checked={row.checked}
          onChange={() => { actions.handleToggleCheckBox(row) }}
          color="primary"
        />
      </TableCell>

      {actions.ajuste && actions.ajuste.unidade.tipo == 'SR' ? (
        <TableCell padding="none" >
          <Button size="small"
            onClick={() => actions.handleToogleSEV(row.Unidade.se)}
          color='secondary'>{row.Unidade.se}</Button>
      </TableCell>
    ):(<></>)}
      <TableCell padding='none'  >
        <Typography variant="caption" display="block" >
          {row.Unidade.nome}

        </Typography>
      </TableCell>

      <TableCell padding='none' align="center">
        <Button size="small"
         onClick={() => actions.handleToogleCluster(row.Unidade.cluster)}
        color='secondary'>{row.Unidade.cluster}</Button>
        </TableCell>
      <TableCell padding='none' align="right" >
        <NumberTextFormat value={row.metaReferencia} />
      </TableCell>
      <TableCell padding='checkbox' align="right" >
        <NumberTextFormat value={row.metaMinima} />
      </TableCell>
      <TableCell padding='none' align="center"
        sx={{ fontWeight: 'bold', color: 'gray' }}
      >
        {row.trava}</TableCell>
      <TableCell padding='none' sx={{ minWidth: '90px', maxWidth: '90px' }}>
        <NumberInputFormat
          value={row.inputPct}
          handleInputChanges={actions.handleInputPct}
          row={row}        ></NumberInputFormat>
      </TableCell>
      <TableCell align="right" padding='none'
        sx={{ minWidth: '140px', maxWidth: '140px', paddingLeft: '10px' }}>
        <NumberInputFormat
          value={row.inputValor}
          handleInputChanges={actions.handleInputValor}
          row={row}
          ></NumberInputFormat>
      </TableCell>

      <TableCell align="right" padding='none'
        sx={{ minWidth: '100px', maxWidth: '150px', fontWeight: 'bold' }}
      >
        <NumberTextFormat value={row.metaAjustada} />
      </TableCell>

      <TableCell padding='none' sx={{ paddingLeft: '13px' }} align="right">
        <NumberTextFormat value={row.pctChange} />%
      </TableCell>

      <TableCell align="right"
        sx={{ fontWeight: 'bold', color: 'gray' }}
      >
        <NumberTextFormat value={row.shareRef} />
      </TableCell>

      <TableCell padding='none'  align="right"
        sx={{ fontWeight: 'bold', color: 'gray' }}
      >
        <NumberTextFormat value={row.shareAjustado} />
      </TableCell>
      <TableCell  align="right"
        sx={{ fontWeight: 'italic', color: 'gray' }}
      >
        <Tooltip title={row.Usuario.nome} placement="left">
        <small>{row.userId}</small>
        </Tooltip>
      </TableCell>
   </TableRow>
  )
}
