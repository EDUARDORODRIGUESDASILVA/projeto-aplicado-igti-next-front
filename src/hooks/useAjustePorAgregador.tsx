import { AlertColor } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { AjusteMetasFiltroOption, getOptions } from "../core/model/AjusteMetasFiltroFunctions";
import { AjustarProdutoRow } from "../core/model/AjustarProdutoRow";
import { AjusteMetas, IAjusteMetasFiltro } from "../core/model/AjusteMetas"
import { AjusteMetasExportaExcel } from "../core/model/AjusteMetasExportaExcel";
import { atualizarObjetivosLote } from "../services/ajustesService";
import { useFetchAjustePorAgregador } from "./useFetchAjustePorAgregador"

export interface IUseAjuste {
  isLoading: boolean
  isUploading: boolean
  ajuste: AjusteMetas | undefined
  error: string
  handleMainCheckbox: () => void
  handleGerarExcel: () => void
  handleZerar: () => void
  handleAtualizar: () => void
  handleGravar: (referencia: boolean) => void
  handleCalc: () => void
  handleFiltro: (value: AjusteMetasFiltroOption[]) => void
  handleToggleCheckBox: (row: AjustarProdutoRow) => void
  handleInputPct: (row: AjustarProdutoRow, pct: number) => void
  handleInputValor: (row: AjustarProdutoRow, valor: number) => void
  handleSnackClose: (event: any, reason: any) => void
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  rows: AjustarProdutoRow[]
  page: number
  rowsPerPage: number
  snack: { open: Boolean, message: string, severity: AlertColor}
  filterValue: AjusteMetasFiltroOption[]
  filterOptions: AjusteMetasFiltroOption[]
  setPage: Dispatch<SetStateAction<number>>
  setFilterValue: Dispatch<SetStateAction<AjusteMetasFiltroOption[]>>
  setRowsPerPage: Dispatch<SetStateAction<number>>

}

const orderRows = (rows: AjustarProdutoRow[]): AjustarProdutoRow[] => {
  const o = rows.sort((a: AjustarProdutoRow, b: AjustarProdutoRow) => {
    return b.metaAjustada - a.metaAjustada
  })
  return rows.slice(0, 150)
}


export const useAjustePorAgregador = (unidadeId: number, produtoId: number): IUseAjuste => {
  const { isLoading, ajuste, error, refetch } = useFetchAjustePorAgregador(unidadeId, produtoId)
  const [filterValue, setFilterValue] = useState<AjusteMetasFiltroOption[]>([]);
  // const [inputValue, setInputValue] = useState('');

  const [snack, setSnack] = useState<{ open: Boolean, message: string, severity: AlertColor }>({ open: false, message: '', severity: 'success' });
  const [isUploading, setIsUploading] = useState(false);
  const [rows, setrowsState] = useState<AjustarProdutoRow[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterOptions, setfilterOptions] = useState < AjusteMetasFiltroOption[] >([]);

  useEffect(() => {
    if (ajuste) {
      const r = orderRows(ajuste.rows)
      setrows(r)
      const options: AjusteMetasFiltroOption[] = getOptions(r)
      setfilterOptions(options)
    }
    return () => {
      setrows([])
    };
  }, [ajuste]);

  const setrows = (rows: AjustarProdutoRow[]) => {
    if(ajuste) {
      ajuste.rows = rows
      setrowsState(rows)
    }
  }

  const handleZerar = () => {
    if (ajuste) {
      ajuste?.zerar()
      const r = orderRows(ajuste.rows)
      setrows(r)
    }
  }

  const handleGerarExcel = () => {
    if (ajuste) {
      const gerador = new AjusteMetasExportaExcel(ajuste)
      gerador.gerarExcel()
    }
  }

  const handleMainCheckbox = () => {
    if (ajuste) {
      ajuste.toggleCheckbox()
      const r = orderRows(ajuste.rows)
      setrows(r)
    }
  }

  const handleCalc = () => {
    if (ajuste) {
      ajuste.distribuirProporcional()
      const r = orderRows(ajuste.rows)
      setrows(r)
    }
  }

  const handleFiltro = (value: AjusteMetasFiltroOption[]) => {
    const filtro = getFiltro(value)
    if (ajuste) {
      setFilterValue(value);
      ajuste.filter = filtro
      setrows([...ajuste.rows])
      setPage(0);
    }
  }

  const getFiltro = (options: AjusteMetasFiltroOption[]): IAjusteMetasFiltro => {
    const f: IAjusteMetasFiltro = {
      sevs: [],
      unidades: [],
      cluster: []
    }
    if (options.length > 0)
    options.forEach(op => {
      switch (op.group) {
        case 'Cluster':
          if (typeof op.item === 'string')
            f.cluster.push(op.item)
          break
        case 'SEV':
          if (typeof op.item === 'number')
            f.sevs.push(op.item)
        case 'Unidades':
          if (typeof op.item === 'object')
            f.unidades.push(op.item)
          break
      }
    })

    return f
  }

  const handleInputValor = (row: AjustarProdutoRow, valor: number) => {
    row.inputValor = valor ? valor : 0
    setrows([...rows])
  }

  const handleInputPct = (row: AjustarProdutoRow, pct: number) => {
    row.inputPct = pct ? pct : 0
    setrows([...rows])
  }


    const handleToggleCheckBox = (row: AjustarProdutoRow) => {
      row.toggleChecked()
      setrows([...rows])
   }

  const handleAtualizar = () => {
    refetch({})
  }
  const handleGravar =  (referencia: boolean) => {
    if(ajuste) {
      try {
        setIsUploading(true)
        atualizarObjetivosLote(unidadeId, produtoId, ajuste, referencia).then(
          () => {
            setSnack({ open: true, message: 'Gravado com sucesso!', severity: 'success' })
            setIsUploading(false)

            if (referencia){
              handleAtualizar()
            }
          }
        )

      } catch (error) {
        setIsUploading(false)
        setSnack({ open: true, message: 'Falha ao gravar!', severity: 'error' })
      }
    }
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



  const a: IUseAjuste = {
    isLoading,
    isUploading,
    handleAtualizar,
    handleGerarExcel,
    handleZerar,
    handleGravar,
    handleMainCheckbox,
    handleCalc,
    handleToggleCheckBox,
    handleInputPct,
    handleInputValor,
    handleSnackClose,
    handleChangePage,
    handleFiltro,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
    snack,
    ajuste,
    rows,
    error,
    filterOptions,
    filterValue,
    setFilterValue,
    setPage,
    setRowsPerPage

  }
  return a
}
