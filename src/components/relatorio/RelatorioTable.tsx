import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { RelatorioPorAgregador, RelatorioPorAgregadorFilter } from "../../core/model/RelatorioPorAgregador";
import RelatorioFilterErrosBadge from "./RelatorioFilterErrosBadge";
import RelatorioFilterProduto from "./RelatorioFilterProduto";
import RelatorioTableRow from "./RelatrioTableRow";

export default function RelatorioTable(props: { relatorio: RelatorioPorAgregador }) {
  const relatorio = props.relatorio

  const [rows, setrows] = useState(relatorio.rows);

  const handleFilterChange = (filter: RelatorioPorAgregadorFilter) => {
    relatorio.filter = filter;
    setrows(relatorio.rows)
  }


  return (
    <div>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              Unidade
            </TableCell>
            <TableCell >
              Produto
              {/* <RelatorioFilterProduto relatorio={relatorio}></RelatorioFilterProduto> */}

            </TableCell>
            <TableCell>

            </TableCell>

            <TableCell align="center" >
              Inicial
            </TableCell>

            <TableCell align="center">
              Referência
            </TableCell>

            <TableCell align="center">
              Ajustada
            </TableCell>

            <TableCell align="center" >
              Saldo
            </TableCell>

            <TableCell align="center" >
              <RelatorioFilterErrosBadge relatorio={relatorio}
                handleFilterChange={handleFilterChange}></RelatorioFilterErrosBadge>
            </TableCell>

          </TableRow>
        </TableHead>

       { rows.length > 0 ? (
          <TableBody>
            {rows.map((row, i) => (
              <RelatorioTableRow row={row} key={row.id}></RelatorioTableRow>
            ))}
          </TableBody>
       ): <></>
       }


      </Table>
    </div>
  )
}
