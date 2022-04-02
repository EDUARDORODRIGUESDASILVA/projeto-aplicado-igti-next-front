import { AlertColor } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IAjusteMetasSortSelected } from "../components/ajustes/AjusteMetasTableSortLabel";
import { AjustarProdutoRow, SituacaoAtivo } from "../core/model/ajustar-objetivos/AjustarProdutoRow";
import { AjusteMetas, IAjusteMetasFiltro } from "../core/model/ajustar-objetivos/AjusteMetas";
import { AjusteMetasExportaExcel } from "../core/model/ajustar-objetivos/AjusteMetasExportaExcel";
import { AjusteMetasFiltroOption, getOptions } from "../core/model/ajustar-objetivos/AjusteMetasFiltroFunctions";
import { AjusteMetasImportaExcel } from "../core/model/ajustar-objetivos/AjusteMetasImportaExcel";
import { atualizarObjetivosLote } from "../services/ajustesService";
import { useFetchAjustePorAgregador } from "./useFetchAjustePorAgregador";

export interface IUseAjuste {
  tipo: 'AG' | 'SE'
  isLoading: boolean
  isUploading: boolean
  isActive: SituacaoAtivo
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
  handleToogleCluster: (cluster: string) => void
  handleToogleErros: () => void
  handleToogleSEV: (sev: number) => void
  handleSortChange:(sort: IAjusteMetasSortSelected) => void
  handleInputPct: (row: AjustarProdutoRow, pct: number) => void
  handleInputValor: (row: AjustarProdutoRow, valor: number) => void
  handleSnackClose: (event: any, reason: any) => void
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleInputAuxiliarTroca: (valor: number) => void
  handleImportarExcel: (arquivo: File) => void
  rows: AjustarProdutoRow[]
  sortOptions: IAjusteMetasSortSelected
  page: number
  rowsPerPage: number
  snack: { open: Boolean, message: string, severity: AlertColor}
  filterValue: AjusteMetasFiltroOption[]
  filterOptions: AjusteMetasFiltroOption[]
  selectedRow: AjustarProdutoRow | undefined
  setSelectedRow: Dispatch<SetStateAction<AjustarProdutoRow | undefined>>
  setPage: Dispatch<SetStateAction<number>>
  setFilterValue: Dispatch<SetStateAction<AjusteMetasFiltroOption[]>>
  setRowsPerPage: Dispatch<SetStateAction<number>>

}

export const useAjustePorAgregador = (tipo: 'AG' | 'SE', unidadeId: number, produtoId: number): IUseAjuste => {
  const { isLoading, ajuste, error, refetch } = useFetchAjustePorAgregador(tipo, unidadeId, produtoId)
  const [filterValue, setFilterValue] = useState<AjusteMetasFiltroOption[]>([]);
  const [snack, setSnack] = useState<{ open: Boolean, message: string, severity: AlertColor }>({ open: false, message: '', severity: 'success' });
  const [isUploading, setIsUploading] = useState(false);
  const [rows, setrowsState] = useState<AjustarProdutoRow[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterOptions, setfilterOptions] = useState < AjusteMetasFiltroOption[] >([]);
  const [isActive, setIsActive] = useState<SituacaoAtivo>(SituacaoAtivo.Fechado);
  const [sortOptions, setsortOptions] = useState <IAjusteMetasSortSelected>( {chave: 'Ajustada', sortOrder: 'desc'});
  const [selectedRow, setSelectedRow] = useState <AjustarProdutoRow>();
  useEffect(() => {
    if (ajuste) {
      const r = orderRows(ajuste.rows, sortOptions)
      const isActive = verificaAtivo(ajuste.rows)
      setIsActive(isActive)
      setrows(r)
      const options: AjusteMetasFiltroOption[] = getOptions(r)
      setfilterOptions(options)
    }
    return () => {
      setrows([])
    };
  }, [ajuste]);


  useEffect(() => {
    refetch({})
    return () => {

    };
  }, [tipo]);

  const verificaAtivo = (rows: AjustarProdutoRow[]): SituacaoAtivo => {

    if (ajuste && ajuste.rows.length > 0){
      const t = rows.map(r => r.ativo).reduce((p, n) => Math.max(p, n))

        if (t == SituacaoAtivo.ApenasSR && ajuste.unidade.tipo == 'SR' ) {
          setSnack({ open: true, message: 'Produto aberto para ajustes - SR', severity: 'success' })
          return SituacaoAtivo.Ativo
        }

        if (t == SituacaoAtivo.ApenasSEV && ajuste.unidade.tipo == 'SEV') {
          setSnack({ open: true, message: 'Produto aberto para ajustes - SEV', severity: 'success' })
          return SituacaoAtivo.Ativo
        }

      if (t == SituacaoAtivo.Ativo) {
        setSnack({ open: true, message: 'Produto aberto para ajustes', severity: 'success' })
        return SituacaoAtivo.Ativo
      }
    }

    setSnack({ open: true, message: 'Produto fechado! ' + error, severity: 'error' })
    return SituacaoAtivo.Fechado

  }
  const setrows = (rows: AjustarProdutoRow[]) => {
       if(ajuste) {
      ajuste.rows = rows
      setrowsState([...rows])
    }
  }

  const handleZerar = () => {
    if (ajuste) {
      ajuste.zerar()
      const r = orderRows(ajuste.rows, sortOptions)
      setrows(r)
       }
  }

  const handleGerarExcel = () => {
    if (ajuste) {
      const sidem = ajuste.produto.codsidem
      const produto = ajuste.produto.nome
      const unidade = ajuste.unidade.nome

      const gerador = new AjusteMetasExportaExcel()
      const nome = `${sidem} - ${produto} - ${unidade}`
      const titulo = ajuste.produto.codsidem + '  -  ' + ajuste.produto.nome + '  -  ' + ajuste.unidade.nome
      const planame = ajuste.produto.codsidem + '_' + ajuste.unidade.id
      gerador.gerarExcel(nome, planame, titulo,ajuste.rows)
    }
  }

  const handleSortChange = (sortOptions: IAjusteMetasSortSelected) => {
    if (ajuste) {

      const rows = ajuste.rows
      setrows(orderRows(rows, sortOptions))
      setsortOptions(sortOptions)
    }
  }

  const orderRows = (rows: AjustarProdutoRow[], options: IAjusteMetasSortSelected ): AjustarProdutoRow[] => {
    const order = options.sortOrder == 'asc' ? -1 : 1
    const field = options.chave

    const sortedRows = rows.sort((a: AjustarProdutoRow, b: AjustarProdutoRow) => {

      if (field === 'Unidade'){
        return (a.unidadeId < b.unidadeId ? order : (a.unidadeId > b.unidadeId? -order: 0))
      }

      if (field === 'Cluster') {
        return (a.Unidade.cluster < b.Unidade.cluster ? order : (a.Unidade.cluster > b.Unidade.cluster ? -order : 0))
      }

      if (field === 'Ajustada') {
        return (a.metaAjustada < b.metaAjustada ? order : (a.metaAjustada > b.metaAjustada ? -order : 0))
      }

      if (field === 'Referencia'){
        return (a.metaReferencia < b.metaReferencia ? order : (a.metaReferencia > b.metaReferencia ? -order : 0))
      }

      if (field === 'Minima') {
        return (a.metaMinima < b.metaMinima ? order : (a.metaMinima > b.metaMinima ? -order : 0))
      }

      return 0

    }).slice( 0, 9999)

    return sortedRows
  }

  const handleImportarExcel = async (arquivo: File) => {
    if (ajuste) {
      const leitor = new AjusteMetasImportaExcel(ajuste)
      try {
        const res = await leitor.importarExcel(arquivo)
        if (res == true) {
          const r = orderRows(ajuste.rows, sortOptions)
          //const r= ajuste.rows
          setSnack({ open: true, message: 'Arquivo importado com sucesso!', severity: 'success' })
          setrows(r)

        }

      } catch (error) {
        console.log(error)
        setSnack({ open: true, message: 'Arquivo com layout incorreto! ' + error, severity: 'error' })
      }
    }
  }

  const handleMainCheckbox = () => {
    if (ajuste) {
      ajuste.toggleCheckbox()
      //const r = orderRows(ajuste.rows, sortOptions)
      const r = [...ajuste.rows]
      setrows(r)
    }
  }

  const handleCalc = () => {
    if (ajuste) {
      ajuste.distribuirProporcional()
      const r = orderRows(ajuste.rows, sortOptions)
      setrows(r)
    }
  }

  const handleFiltro = (value: AjusteMetasFiltroOption[]) => {
    const filtro = getFiltro(value)
    if (ajuste) {
      ajuste.checked = false
      setFilterValue(value);
      ajuste.filter = filtro
      setrows([...ajuste.rows])
      setPage(0);
    }
  }

  const handleToogleCluster = (cluster: string) => {
    if(ajuste) {

      let value =filterValue.filter( fv => fv.group == 'Cluster' && fv.label==cluster)
      if (value.length > 0) {
        value = filterValue.filter(fv => fv.label != cluster)
      } else {

        value = filterOptions.filter(fv => fv.group == 'Cluster' && fv.label == cluster)
        filterValue.push(...value)
      }
      handleFiltro(value)
    }
  }

  const handleToogleErros = () => {
    if (ajuste) {

      let value = filterValue.filter(fv => fv.group == 'Erros' )
      if (value.length > 0) {
        value = filterValue.filter(fv => fv.group !== 'Erros')
      } else {

        value = filterOptions.filter(fv => fv.group == 'Erros' )
        filterValue.push(...value)
      }
      handleFiltro(value)
    }

  }

    const handleToogleSEV = (sev: number) => {
      if (ajuste) {

        let value = filterValue.filter(fv => fv.group == 'SEV' && fv.label == sev.toString())
        if (value.length > 0) {
          value = filterValue.filter(fv => fv.label != sev.toString())
        } else {

          value = filterOptions.filter(fv => fv.group == 'SEV' && fv.label == sev.toString())
          filterValue.push(...value)
        }
        handleFiltro(value)
      }
  }

  const getFiltro = (options: AjusteMetasFiltroOption[]): IAjusteMetasFiltro => {
    const f: IAjusteMetasFiltro = {
      sevs: [],
      unidades: [],
      cluster: [],
      erros: false
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
        case 'Erros' :
            f.erros = true
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

  const handleInputAuxiliarTroca = (valor: number ) => {
    if (ajuste) {
      ajuste.auxiliarTroca = valor ? valor : 0
    }
    setrows([...rows])
  }

  const handleToggleCheckBox = (row: AjustarProdutoRow) => {
      row.toggleChecked()
      setrows([...rows])
   }

   const handleAtualizar = () => {
    refetch({})
  }

  const handleGravar =  async (referencia: boolean) => {
    if(ajuste) {
      try {
        setIsUploading(true)
         await  atualizarObjetivosLote(tipo, unidadeId, produtoId, ajuste, referencia).then(
          (user) => {
            setSnack({ open: true, message: 'Gravado com sucesso!', severity: 'success' })
            setIsUploading(false)
            handleGerarExcel()
            ajuste.updateUser(user)
            setrows([...rows])

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
    tipo,
    isLoading,
    isUploading,
    isActive,
    handleAtualizar,
    handleGerarExcel,
    handleImportarExcel,
    handleSortChange,
    handleZerar,
    handleGravar,
    handleMainCheckbox,
    handleCalc,
    handleToggleCheckBox,
    handleToogleCluster,
    handleToogleErros,
    handleToogleSEV,
    handleInputPct,
    handleInputValor,
    handleInputAuxiliarTroca,
    handleSnackClose,
    handleChangePage,
    handleFiltro,
    handleChangeRowsPerPage,
    page,
    sortOptions,
    rowsPerPage,
    snack,
    ajuste,
    rows,
    error,
    filterOptions,
    filterValue,
    selectedRow,
    setSelectedRow,
    setFilterValue,
    setPage,
    setRowsPerPage

  }
  return a
}
