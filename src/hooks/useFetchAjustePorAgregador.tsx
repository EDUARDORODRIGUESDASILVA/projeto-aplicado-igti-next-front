import { useEffect, useState } from 'react';
import { AjusteMetas } from '../core/model/AjusteMetas';
import {criarAjustePorAgregador} from '../services/ajustesService'

export const useFetchAjustePorAgregador = (unidadeId: number, codsidem: string) => {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState('');
  const [ajuste, setajuste] = useState<AjusteMetas>();
  const [shouldRefetch, refetch] = useState({});
  useEffect(() => {
    async function fetchAjuste() {
      setisLoading(true)
      const ajuste = await criarAjustePorAgregador(unidadeId, codsidem)
      console.log(ajuste)
      setajuste(ajuste)
      setisLoading(false)
    }
    fetchAjuste()
  }, [unidadeId, codsidem, shouldRefetch]);

  return { isLoading, ajuste, error, refetch }
}
