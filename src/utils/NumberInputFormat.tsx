import { DebounceInput } from 'react-debounce-input'
import { Input, styled } from '@mui/material';
import NumberFormat from 'react-number-format';
import { AjustarProdutoRow } from '../core/model/AjustarProdutoRow';
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


export default function NumberInputFormat(props: {handleInputChanges: Function, value: number, row: AjustarProdutoRow} ) {
  const handleInputChanges = props.handleInputChanges
  const value = props.value
  const row = props.row
  return (
    <div>
      <NumberFormat
        minLength={1}
        margin="dense"
        size="small"
        value={value}
        thousandSeparator="."
        decimalSeparator=","
        prefix=""
        fixedDecimalScale={true}
        allowLeadingZeros={false}
        customInput={PcInput}
        onValueChange={(values, sourceInfo) => {
          const { floatValue } = values;
          if (typeof floatValue == 'undefined') {
            handleInputChanges(row, 0)
          } else {
            handleInputChanges(row, floatValue | 0)
          }
          // const { event, source } = sourceInfo;
        }}
        displayType="input"
        allowNegative={true}
        decimalScale={2}
        suffix=""
        isNumericString={false}
      />
    </div>
  )
}

