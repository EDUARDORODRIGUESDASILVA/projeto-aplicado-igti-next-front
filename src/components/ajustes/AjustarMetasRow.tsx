import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { AjustarProdutoRow } from '../../core/model/AjustarProdutoRow';
import { useState } from 'react';
import { Checkbox, Input, styled, Typography } from '@mui/material';
import NumberTextFormat from '../../utils/NumberTextFormat';
import NumberInputFormat from '../../utils/NumberInputFormat';

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

export default function AjustarMetasRow(props: { row: AjustarProdutoRow, rerender: Function }) {
  const row = props.row
  const sincronizar = props.rerender
  const [inputPct, setInputPct] = useState(row.inputPct);
  const [inputValor, setInputValor] = useState(row.inputValor);
  // const [metaAjustada, setMetaAjustada] = useState(row.metaAjustada);

  const handleInputValorChanges = (row: AjustarProdutoRow, valor: number) => {
    row.inputValor = valor
    setInputValor(valor)
    sincronizar({})
  }

  const handleInputPctrChanges = (row: AjustarProdutoRow, pct: number) => {
    row.inputPct = pct
    setInputPct(pct)
    sincronizar({})
  }

  return (
    <TableRow style={{ height: 18 }}
      sx={{ backgroundColor: row.erros > 0 ? "#ffebee" : "" }}
    >
      <TableCell padding="checkbox">
        <Checkbox
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
      <TableCell padding='none' align="center">
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
        {/* <NumberFormat
     //     disabled={true}

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
        /> */}

      </TableCell>

      <TableCell align="right" padding='none'
        sx={{ minWidth: '100px', maxWidth: '150px', fontWeight: 'bold'}}
      >
        <NumberTextFormat value={row.metaAjustada} />
       </TableCell>

      <TableCell padding='none' sx={{ paddingLeft: '13px' }}align="right">
        <NumberTextFormat value={row.pctChange} />%
        {/* <NumberFormat
          value={row.pctChange}
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
        />% */}
      </TableCell>

      <TableCell align="right">
        <NumberTextFormat value={row.shareRef} />
        {/* <NumberFormat
          value={row.shareRef}
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
        /> */}
      </TableCell>

      <TableCell  align="right">
        <NumberTextFormat value={row.shareAjustado}/>
      </TableCell>
    </TableRow>
  )
}
