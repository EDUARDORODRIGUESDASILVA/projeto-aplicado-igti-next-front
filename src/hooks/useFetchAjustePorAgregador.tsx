import { useEffect, useState } from 'react';
import { AjusteMetas } from '../core/model/AjusteMetas';
import {criarAjustePorAgregador} from '../services/ajustesService'

export const useFetchAjustePorAgregador = (unidadeId: number, produtoId: number) => {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState('');
  const [ajuste, setajuste] = useState<AjusteMetas>();
  const [shouldRefetch, refetch] = useState({});
  useEffect(() => {
    async function fetchAjuste() {
      setisLoading(true)
      try {
        const ajuste = await criarAjustePorAgregador(unidadeId, produtoId)
        setajuste(ajuste)
        setisLoading(false)

      } catch (error) {
        seterror('Não foi possível baixar o ajuste')
        setisLoading(false)
      }

    }
    if (unidadeId && produtoId){
      fetchAjuste()
    }

  }, [unidadeId, produtoId, shouldRefetch]);

  return { isLoading, ajuste, error, refetch }
}
