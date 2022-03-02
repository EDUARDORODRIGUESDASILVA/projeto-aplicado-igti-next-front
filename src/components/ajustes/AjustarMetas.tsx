import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../dashboard/Title';

import { useFetchAjustePorAgregador } from '../../hooks/useFetchAjustePorAgregador';
import { AjustarProdutoRow } from '../../core/interfaces/model/AjustarProdutoRow';
import { useReducer } from 'react';
import AjustarMetasRow from './AjustarMetasRow';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}



export default function AjustarMetas() {
  const unidadeId: number = 6006
  const codsidem: string = '10.05.00'
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const { isLoading, ajuste, error } = useFetchAjustePorAgregador(unidadeId, codsidem)
  if (isLoading) {
    return <>
      Loading..
    </>
  }

  if (error) {
    return <>
      Erro: {error}
    </>
  }
  if (ajuste) {
    return <>
      <Title>{ajuste.produto.codsidem} - {ajuste.produto.nome}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Unidade</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Porte</TableCell>
            <TableCell>Referência</TableCell>
            <TableCell>Mínima</TableCell>
            <TableCell>Trava</TableCell>
            <TableCell align="center">%</TableCell>
            <TableCell align="center">Valor</TableCell>
            <TableCell>Ajustada</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ajuste.rows.map((row, i) => (
            <AjustarMetasRow row={row} key={i}></AjustarMetasRow>


          ))}
        </TableBody>
      </Table>
    </>
  }
  return (
    <>
    </>
  )
}



// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}





