import { useState } from 'react';
import { IUnidade } from '../core/interfaces/IUnidade';
import { AjusteMetasExportaExcel } from '../core/model/ajustar-objetivos/AjusteMetasExportaExcel';
import { fetchBaseCompleta, IFetchBaseCompletaQuery } from '../services/ajustesService';

export const useBaseCompletaPorAgregador = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState('');

  async function fetchRelatorio(agregador: IUnidade, produtoId?: number) {
    setisLoading(true)
    try {

      const query: IFetchBaseCompletaQuery = {}

      if (agregador.tipo == 'SR') {
        query.sr = agregador.id
      }

      if (agregador.tipo == 'SEV') {
        query.vinc = agregador.id
      }

      if(produtoId) {
        query.produtoId = produtoId
      }

       const base = await fetchBaseCompleta(query)
      setisLoading(false)
      return base
    } catch (error) {
      console.log(error)
      seterror('Não foi possível baixar os ajustes!')
      setisLoading(false)
    }

  }

    const handleExcelBaseCompleta = async (agregador: IUnidade, produtoId?: number) => {
    const base = await fetchRelatorio(agregador, produtoId)
    if (base) {
      setisLoading(true)
      const nome = 'Ajustes_' + agregador.nome
      const titulo = 'Base Completa - Ajustes - ' + agregador.nome
      const planame = 'BaseCompleta'
      const gerador: AjusteMetasExportaExcel =  new AjusteMetasExportaExcel()
      await gerador.gerarExcel(nome, planame, titulo, base)
      setisLoading(false)

    } else {
       setisLoading(false)
    }
  }

return { isLoading, error, fetchRelatorio, handleExcelBaseCompleta }
}
