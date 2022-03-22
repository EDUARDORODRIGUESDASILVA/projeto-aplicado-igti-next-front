import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { AjustarProdutoRow } from '../../core/model/AjustarProdutoRow';
import { Checkbox, Typography } from '@mui/material';
import NumberTextFormat from '../../utils/NumberTextFormat';
import NumberInputFormat from '../../utils/NumberInputFormat';

export default function AjustarMetasTableRow(props: { row: AjustarProdutoRow, rerender: Function }) {
  const row = props.row
  const sincronizar = props.rerender

  const handleInputValorChanges = (row: AjustarProdutoRow, valor: number) => {
    row.inputValor = valor ? valor: 0
    sincronizar({})
  }

  const handleInputPctrChanges = (row: AjustarProdutoRow, pct: number) => {
    row.inputPct = pct ? pct : 0
    sincronizar({})
  }

  const handleCheck = (row: AjustarProdutoRow) => {
    row.toggleChecked()
    sincronizar({})
  }

  return (
    <TableRow style={{ height: 18 }}
      sx={{ backgroundColor: row.erros > 0 ? "#ffebee" : "" }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          disabled={false}
          checked={row.checked}
          onChange={() => {handleCheck(row)}}
          color="primary"
        />
      </TableCell>
      <TableCell  >
        <Typography variant="caption" display="block" gutterBottom>
          {row.Unidade.tipo} {row.Unidade.nome}
        </Typography>
        </TableCell>
      <TableCell padding='none' align="center" sx={{ fontWeight: 'bold', color:'purple' }}>
        {row.Unidade.cluster}</TableCell>
      <TableCell padding='none'align="right" >
        <NumberTextFormat value={row.metaReferencia} />
       </TableCell>
      <TableCell padding='none' align="right" >
        <NumberTextFormat value={row.metaMinima} />
      </TableCell>
      <TableCell padding='none' align="center"
        sx={{ fontWeight: 'bold', color: 'gray' }}
      >
        {row.trava}</TableCell>
      <TableCell padding='none' sx={{ minWidth: '90px' , maxWidth: '90px' }}>
        <NumberInputFormat
          value={row.inputPct}
          handleInputChanges={handleInputPctrChanges}
          row={row}        ></NumberInputFormat>
      </TableCell>
      <TableCell align="right" padding='none'
       sx={{ minWidth: '140px', maxWidth: '140px', paddingLeft: '10px' }}>
        <NumberInputFormat
          value={row.inputValor}
          handleInputChanges={handleInputValorChanges}
          row={row}        ></NumberInputFormat>
       </TableCell>

      <TableCell align="right" padding='none'
        sx={{ minWidth: '100px', maxWidth: '150px', fontWeight: 'bold'}}
      >
        <NumberTextFormat value={row.metaAjustada} />
       </TableCell>

      <TableCell padding='none' sx={{ paddingLeft: '13px' }}align="right">
        <NumberTextFormat value={row.pctChange} />%
      </TableCell>

      <TableCell align="right"
        sx={{ fontWeight: 'bold', color: 'gray' }}
      >
        <NumberTextFormat value={row.shareRef} />
      </TableCell>

      <TableCell  align="right"
        sx={{ fontWeight: 'bold', color: 'gray' }}
      >
        <NumberTextFormat value={row.shareAjustado}/>
      </TableCell>
      <TableCell align="right"
        sx={{ fontWeight: 'italic', color: 'gray' }}
      >
        <small>{row.userId}</small>
      </TableCell>
    </TableRow>
  )
}
