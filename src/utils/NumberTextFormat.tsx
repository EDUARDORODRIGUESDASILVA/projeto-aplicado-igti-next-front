import { useEffect } from "react";
import NumberFormat from "react-number-format"

export default function NumberTextFormat({value}:{value: number}) {
  return (
    <NumberFormat
      value={value}
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
  )
}
