import { Input, styled } from "@mui/material";
import NumberFormat from "react-number-format";
import { AjustarProdutoRow, SituacaoAtivo } from "../core/model/ajustar-objetivos/AjustarProdutoRow";
const PcInput = styled(Input)(({ theme }) => ({
  "label + &": {
    margin: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    padding: "5px 12px",
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    textAlign: "right",
  },
}));

export default function NumberInputFormat(props: {
  handleInputChanges: Function;
  value: number;
  row?: AjustarProdutoRow;
}) {
  const handleInputChanges = props.handleInputChanges;
  const value = props.value;
  const row = props.row;
  const fechado = row?.ativo === SituacaoAtivo.Fechado

  return (
    <>
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
          handleInputChanges(row, floatValue);
          // const { event, source } = sourceInfo;
        }}
        displayType="input"
        allowNegative={true}
        decimalScale={2}
        disabled={fechado}
        allowEmptyFormatting={false}
        suffix=""
        isNumericString={false}
      />
    </>
  );
}
