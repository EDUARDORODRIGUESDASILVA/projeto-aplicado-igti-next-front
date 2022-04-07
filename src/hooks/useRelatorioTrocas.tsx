import { AlertColor } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { RelatorioTrocas } from "../core/model/troca/RelatorioTrocas"
import { RelatorioTrocasExportaExcel } from "../core/model/troca/RelatorioTrocasExportaExcel"
import { Troca } from "../core/model/troca/Trocas"
import { criarRelatorioTrocas, gravarTroca} from "../services/trocasService"
export interface IUseRelatorioTrocas {
  isLoading: boolean
  isUploading: boolean
  selectedId: number | undefined
  relatorio: RelatorioTrocas | undefined
  rows: Troca[]
  error: string
  page: number
  rowsPerPage: number
  snack: {
    open: Boolean;
    message: string;
    severity: AlertColor;
  }
  handleAtualizar: () => void
  handleExcelClick: () => void
  handleGravar: (troca: Troca) => Promise<void>
  handleSelecionaLinha: (troca: Troca) => void
  handleSnackClose: (event: any, reason: any) => void
  // handleFilterChange: (filter: RelatorioPorAgregadorFilter) => void
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  setPage: Dispatch<SetStateAction<number>>
  setRowsPerPage: Dispatch<SetStateAction<number>>
}

const useFetchRelatorioTrocas = (unidadeId: number) => {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState('');
  const [relatorio, setrelatorio] = useState<RelatorioTrocas>();
  const [shouldRefetch, refetch] = useState({});

  useEffect(() => {
    async function fetchRelatorio() {
      setisLoading(true)
      try {
        const relatorio = await criarRelatorioTrocas(unidadeId)
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
  const [isUploading, setIsUploading] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const [rows, setrows] = useState<Troca[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snack, setSnack] = useState<{ open: Boolean, message: string, severity: AlertColor }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (relatorio) {
      setrows(relatorio.trocas.sort( (r1, r2) => r2.id - r1.id ))
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
      const gerador = new RelatorioTrocasExportaExcel(relatorio)
      gerador.gerarExcel('trocas')

    }
  }

  const handleSelecionaLinha = (troca: Troca) => {
    setSelectedId(troca.id)
  }
  const handleGravar = async (troca: Troca) => {
    setIsUploading(true)

    gravarTroca(troca).then((troca) => {
      console.log(troca.id)
      setSelectedId(troca.id)
      handleAtualizar()
      setSnack({ open: true, message: 'Gravado com sucesso!', severity: 'success' })
      setIsUploading(false)

    }).catch((err) => {
      setIsUploading(false)
      setSnack({ open: true, message: 'Falha ao gravar!', severity: 'error' })
    });
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleSnackClose = (event: any, reason: any) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    setSnack({ open: false, message: '', severity: 'success' })
  };

  const a: IUseRelatorioTrocas = {
    isLoading,
    selectedId,
    isUploading,
    relatorio,
    error,
    rows,
    page,
    rowsPerPage,
    snack,
    handleAtualizar,
    handleGravar,
    handleExcelClick,
    handleChangePage,
    handleSelecionaLinha,
    handleSnackClose,
    handleChangeRowsPerPage,
    setPage,
    setRowsPerPage
  }
  return a
}
