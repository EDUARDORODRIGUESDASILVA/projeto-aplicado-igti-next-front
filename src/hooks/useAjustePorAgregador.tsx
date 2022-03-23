import { AlertColor } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { AjustarProdutoRow } from "../core/model/AjustarProdutoRow";
import { AjusteMetas } from "../core/model/AjusteMetas"
import { AjusteMetasExportaExcel } from "../core/model/AjusteMetasExportaExcel";
import { atualizarObjetivosLote } from "../services/ajustesService";
import { useFetchAjustePorAgregador } from "./useFetchAjustePorAgregador"

export interface IUseAjuste {
  isLoading: boolean
  isUploading: boolean
  ajuste: AjusteMetas | undefined
  error: string
  handleMainCheckbox: Function
  handleGerarExcel: Function
  handleZerar: Function
  handleAtualizar: Function
  handleGravar: Function
  handleCalc: Function
  handleToggleCheckBox: Function
  handleInputPct: Function
  handleInputValor: Function
  handleSnackClose: Function
  rows: AjustarProdutoRow[]
  snack: { open: Boolean, message: string, severity: AlertColor }
}

const orderRows = (rows: AjustarProdutoRow[]): AjustarProdutoRow[] => {
  const o = rows.sort((a: AjustarProdutoRow, b: AjustarProdutoRow) => {
    return b.metaAjustada - a.metaAjustada
  })
  return rows.slice(0, 150)
}


export const useAjustePorAgregador = (unidadeId: number, produtoId: number): IUseAjuste => {
  const { isLoading, ajuste, error, refetch } = useFetchAjustePorAgregador(unidadeId, produtoId)

  const [snack, setSnack] = useState<{ open: Boolean, message: string, severity: AlertColor }>({ open: false, message: '', severity: 'success' });
  const [isUploading, setIsUploading] = useState(false);
  const [rows, setrows] = useState<AjustarProdutoRow[]>([]);

  useEffect(() => {
    if (ajuste) {
      const r = orderRows(ajuste.rows)
      setrows(r)

    }
    return () => {
      setrows([])
    };
  }, [ajuste]);


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

  const handleSnackClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

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
    snack,
    ajuste,
    rows,
    error }
  return a
}
