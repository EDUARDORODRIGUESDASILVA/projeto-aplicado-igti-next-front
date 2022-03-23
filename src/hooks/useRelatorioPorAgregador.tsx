import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { RelatorioPorAgregador, RelatorioPorAgregadorFilter } from "../core/model/RelatorioPorAgregador"
import { RelatorioPorAgregadorExportaExcel } from "../core/model/RelatorioPorAgregadorExportaExcel"
import { RelatorioPorAgregadorRow } from "../core/model/RelatorioPorAgregadorRow"
import { useFetchRelatorioPorAgregador } from "./useFetchRelatorioPorAgregador"

export interface IUseRelatorio {
  isLoading: boolean
  relatorio: RelatorioPorAgregador | undefined
  rows: RelatorioPorAgregadorRow[]
  error: string
  page: number
  rowsPerPage: number
  handleAtualizar: () => void
  handleExcelClick: () => void
  handleFilterChange: (filter: RelatorioPorAgregadorFilter) => void
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  setPage: Dispatch<SetStateAction<number>>
  setRowsPerPage: Dispatch<SetStateAction<number>>
}
export const useRelatorioPorAgregador = (unidadeId: number, produtoId: number) => {
  const { isLoading, relatorio, error, refetch } = useFetchRelatorioPorAgregador(unidadeId, produtoId)

  const [rows, setrows] = useState<RelatorioPorAgregadorRow[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (relatorio) {
      setrows(relatorio.rows)
      setPage(0)

    }
    return () => {
      setrows([])
    };
  }, [relatorio]);

  const handleAtualizar = () => {
    refetch({})

  }

  const handleExcelClick = () => {
    if (relatorio) {
      const gerador: RelatorioPorAgregadorExportaExcel = new RelatorioPorAgregadorExportaExcel(relatorio)
      gerador.gerarExcel()
    }
  }

  const handleFilterChange = (filter: RelatorioPorAgregadorFilter) => {
    if(relatorio) {
      relatorio.filter = filter;
      setrows(relatorio.rows)
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };




  const a: IUseRelatorio = {
    isLoading,
    relatorio,
    error,
    rows,
    page,
    rowsPerPage,
    handleAtualizar,
    handleExcelClick,
    handleFilterChange,
    handleChangePage,
    handleChangeRowsPerPage,
    setPage,
    setRowsPerPage


  }
  return a
}
