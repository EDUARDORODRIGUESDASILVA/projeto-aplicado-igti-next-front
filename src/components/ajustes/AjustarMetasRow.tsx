import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { AjustarProdutoRow } from '../../core/interfaces/model/AjustarProdutoRow';
import { useState } from 'react';
import styles from './AjustarMetasRow.module.css';

export default function AjustarMetasRow( props: {row: AjustarProdutoRow}) {
  const row = props.row

  const [inputPct, setInputPct] = useState(row.inputPct);
  const [inputValor, setInputValor] = useState(row.inputValor);
  const [metaAjustada, setMetaAjustada] = useState(row.metaAjustada);

  const handleInputValorChanges = (row: AjustarProdutoRow, valor: number) => {
    row.inputValor = valor
    setInputValor(valor)
  //  setMetaAjustada(row.metaAjustada)
  }

  const handleInputPctrChanges = (row: AjustarProdutoRow, pct: number) => {
    row.inputPct = pct
    setInputPct(pct)
    // setMetaAjustada(row.metaAjustada)

  }

  return (
    <TableRow  >
      <TableCell >{row.iUnidade.nome}</TableCell>
      <TableCell>{row.iUnidade.tipo}</TableCell>
      <TableCell>{row.iUnidade.porte}</TableCell>
      <TableCell >{row.metaReferencia}</TableCell>
      <TableCell >{row.metaMinima}</TableCell>
      <TableCell>{row.trava}</TableCell>
      <TableCell>
        <NumberFormat
          variant="filled"
          size="small"
          value={row.inputPct}
          thousandSeparator="."
          decimalSeparator=","
          prefix=""
          fixedDecimalScale={true}
          allowLeadingZeros={false}
          customInput={TextField}
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
      <TableCell align="right">
        <NumberFormat
          variant="filled"
          size="small"
          value={row.inputValor}
          thousandSeparator="."
          decimalSeparator=","
          prefix=""
          fixedDecimalScale={true}
          allowLeadingZeros={false}
          customInput={TextField}
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

      <TableCell>
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
      <TableCell >
        <div className={styles.error}>
          {row.erros}
        </div>

      </TableCell>
    </TableRow>
  )
}
