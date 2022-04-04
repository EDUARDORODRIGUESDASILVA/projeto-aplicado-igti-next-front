import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IRelatorioTrocas, ITroca } from "../services/trocasService"
import {fetchRelatorioTrocas} from "../services/trocasService"
export interface IUseRelatorioTrocas {
  isLoading: boolean
  relatorio: IRelatorioTrocas | undefined
  rows: ITroca[]
  error: string
  page: number
  rowsPerPage: number
  handleAtualizar: () => void
  handleExcelClick: () => void
  // handleFilterChange: (filter: RelatorioPorAgregadorFilter) => void
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  setPage: Dispatch<SetStateAction<number>>
  setRowsPerPage: Dispatch<SetStateAction<number>>
}

const useFetchRelatorioTrocas = (unidadeId: number) => {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState('');
  const [relatorio, setrelatorio] = useState<IRelatorioTrocas>();
  const [shouldRefetch, refetch] = useState({});

  useEffect(() => {
    async function fetchRelatorio() {
      setisLoading(true)
      try {
        const relatorio = await fetchRelatorioTrocas(unidadeId)
        setrelatorio(relatorio)
        setisLoading(false)

      } catch (error) {
        seterror('Não foi possível baixar o ajuste')
        setisLoading(false)
      }
    }
    if (unidadeId) {
      fetchRelatorio()
    }
  }, [unidadeId, shouldRefetch]);

  return { isLoading, relatorio, error, refetch }
}


export const useRelatorioTrocas = (unidadeId: number) => {
  const { isLoading, relatorio, error, refetch } = useFetchRelatorioTrocas(unidadeId)
  const [rows, setrows] = useState<ITroca[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (relatorio) {
      setrows(relatorio.trocas)
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

    }
  }

  // const handleFilterChange = (filter: RelatorioPorAgregadorFilter) => {
  //   if (relatorio) {
  //     relatorio.filter = filter;
  //     setrows(relatorio.rows)
  //     setPage(0);
  //   }
  // }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const a: IUseRelatorioTrocas = {
    isLoading,
    relatorio,
    error,
    rows,
    page,
    rowsPerPage,
    handleAtualizar,
    handleExcelClick,
    handleChangePage,
    handleChangeRowsPerPage,
    setPage,
    setRowsPerPage
  }
  return a
}
