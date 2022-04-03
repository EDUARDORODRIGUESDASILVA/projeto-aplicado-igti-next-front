import { Button, Checkbox, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AjustarProdutoRow } from "../../core/model/ajustar-objetivos/AjustarProdutoRow";
import { IUseAjuste } from "../../hooks/useAjustePorAgregador";
import NumberInputFormat from "../../utils/NumberInputFormat";
import NumberTextFormat from "../../utils/NumberTextFormat";

export default function AjusteMetasTableRow({row, actions}: { row: AjustarProdutoRow, actions: IUseAjuste }) {

   return (
    <TableRow style={{ height: 18 }}
      hover={true && row.erros===0}
      selected={row.checked || (row.id === actions.selectedRow?.id && row.erros === 0) }
      onClick={() => actions.setSelectedRow(row)}
      sx={{ backgroundColor: row.erros > 0 ? '#ffebee' : '' }}
    >
      <TableCell padding="checkbox" sx={{ paddingRight: '0px', paddingLeft: '0px', marginLeft: '0px' }}>
        <Checkbox
          disabled={false}
          checked={row.checked}
          onChange={() => { actions.handleToggleCheckBox(row) }}
          color="primary"
        />
      </TableCell>


      <TableCell padding='none'
        sx={{ minWidth: '300px', maxWidth: '300px'}}
      >
        <Typography variant="caption" display="block" >
          {actions.ajuste && actions.ajuste.unidade.tipo == 'SR' ? (
            <Button size="small" sx={{paddingRight: '0px', paddingLeft: '0px', marginLeft: '0px'}}
              onClick={() => actions.handleToogleSEV(row.Unidade.se)}
              color='secondary'>{row.Unidade.se}</Button>

          ) : (<></>)}
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
      <TableCell padding='checkbox' align="right" sx={{
        paddingLeft: '2px',
        fontWeight: row.erroPiso ? 'bold' : '',
        color: (row.erroPiso ? 'red' : '')
      }}

      >
        <NumberTextFormat value={(actions.tipo == 'AG'? row.metaMinima : row.metaReferencia2)} />
      </TableCell>
      <TableCell padding='none' align="center"
        sx={{ fontWeight: 'bold', color: 'gray' }}
      >
        {row.trava}</TableCell>
      <TableCell padding='none' sx={{ minWidth: '85px', maxWidth: '85px' }}>
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
        sx={{ minWidth: '100px', maxWidth: '100px', fontWeight: 'bold' }}
      >
        <NumberTextFormat value={row.metaAjustada} />
      </TableCell>

      <TableCell padding='none' sx={{ paddingLeft: '13px',
             fontWeight: row.erroTrava ? 'bold': '',
             color: (row.erroTrava ?  'red' : '')
      }}     align="right">
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
        sx={{ paddingLeft: '5px', fontWeight: 'italic', color: 'gray' }}
      >
        <Tooltip title={row.Usuario.nome} placement="left">
        <small>{row.userId}</small>
        </Tooltip>
      </TableCell>
   </TableRow>
  )
}
