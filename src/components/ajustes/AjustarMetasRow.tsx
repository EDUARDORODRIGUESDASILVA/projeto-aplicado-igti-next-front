import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { AjustarProdutoRow } from '../../core/model/AjustarProdutoRow';
import { useState } from 'react';
import { alpha, Checkbox, Input, InputBase, styled } from '@mui/material';


const PcInput = styled(Input)(({ theme }) => ({
  'label + &': {
    margin: theme.spacing(0),
  },
  '& .MuiInputBase-input': {
    padding: '5px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    textAlign: 'right'
  },
}));

const ValorInput = styled(Input)(({ theme }) => ({
  'label + &': {
    margin: theme.spacing(0),
  },
  '& .MuiInputBase-input': {
    padding: '5px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    textAlign: 'right'

  },
}));

export default function AjustarMetasRow(props: { row: AjustarProdutoRow }) {
  const row = props.row

  const [inputPct, setInputPct] = useState(row.inputPct);
  const [inputValor, setInputValor] = useState(row.inputValor);
  const [metaAjustada, setMetaAjustada] = useState(row.metaAjustada);

  const handleInputValorChanges = (row: AjustarProdutoRow, valor: number) => {
    row.inputValor = valor
    setInputValor(valor)
  }

  const handleInputPctrChanges = (row: AjustarProdutoRow, pct: number) => {
    row.inputPct = pct
    setInputPct(pct)
  }

  return (
    <TableRow style={{ height: 25 }}
      sx={{ backgroundColor: row.erros > 0 ? "#ffebee" : "" }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
        />
      </TableCell>
      <TableCell >{row.iUnidade.id} - {row.iUnidade.tipo} {row.iUnidade.nome}</TableCell>
      <TableCell align="center" sx={{ fontWeight: 'bold', color:'purple' }}>{row.iUnidade.porte}</TableCell>
      <TableCell align="right" >
           <NumberFormat
          value={row.metaReferencia}
          thousandSeparator="."
          decimalSeparator=","
          prefix=""
          fixedDecimalScale={true}
          allowLeadingZeros={false}
          displayType="text"
          allowNegative={true}
          decimalScale={2}
          suffix=""
          isNumericString={false}
        />
       </TableCell>
      <TableCell align="right" >
        <NumberFormat
          value={row.metaMinima}
          thousandSeparator="."
          decimalSeparator=","
          prefix=""
          fixedDecimalScale={true}
          allowLeadingZeros={false}
          displayType="text"
          allowNegative={true}
          decimalScale={2}
          suffix=""
          isNumericString={false}
        />



      </TableCell>
      <TableCell align="center">
        {row.trava}</TableCell>
      <TableCell sx={{ maxWidth: '90px' }}>
        <NumberFormat
          margin="dense"
          size="small"
          value={row.inputPct}
          thousandSeparator="."
          decimalSeparator=","
          prefix=""
          fixedDecimalScale={true}
          allowLeadingZeros={false}
          customInput={PcInput}
          onValueChange={(values, sourceInfo) => {
            const { floatValue } = values;
            if (typeof floatValue == 'undefined') {
              handleInputPctrChanges(row, 0)
            } else {
              handleInputPctrChanges(row, floatValue | 0)
            }
            // const { event, source } = sourceInfo;
          }}

          displayType="input"
          allowNegative={true}
          decimalScale={2}
          suffix=""
          isNumericString={false}
        />
      </TableCell>
      <TableCell align="right" sx={{ maxWidth: '120px' }}>
        <NumberFormat
          size="small"
          value={row.inputValor}
          thousandSeparator="."
          decimalSeparator=","
          prefix=""
          fixedDecimalScale={true}
          allowLeadingZeros={false}
          customInput={ValorInput}
          onValueChange={(values, sourceInfo) => {
            const { floatValue } = values;
            if (typeof floatValue == 'undefined') {
              handleInputValorChanges(row, 0)
            } else {
              handleInputValorChanges(row, floatValue | 0)
            }
            // const { event, source } = sourceInfo;
          }}

          displayType="input"
          allowNegative={true}
          decimalScale={2}
          suffix=""
          isNumericString={false}
        />

      </TableCell>

      <TableCell align="right" sx={{fontWeight: 'bold'}}>
        <NumberFormat
          value={row.metaAjustada}
          thousandSeparator="."
          decimalSeparator=","
          prefix=""
          fixedDecimalScale={true}
          allowLeadingZeros={false}
          displayType="text"
          allowNegative={true}
          decimalScale={2}
          suffix=""
          isNumericString={false}
        />
      </TableCell>
    </TableRow>
  )
}
