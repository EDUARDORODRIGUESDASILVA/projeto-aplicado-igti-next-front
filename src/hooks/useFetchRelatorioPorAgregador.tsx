import { useEffect, useState } from 'react';
import { RelatorioPorAgregador } from '../core/model/relatorio-objetivos/RelatorioPorAgregador';
import { criarRelatorioPorAgregador } from '../services/relatorioService';

export const useFetchRelatorioPorAgregador = (unidadeId: number, produtoId: number) => {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState('');
  const [relatorio, setrelatorio] = useState<RelatorioPorAgregador>();
  const [shouldRefetch, refetch] = useState({});

  useEffect(() => {
    async function fetchRelatorio() {
      setisLoading(true)
      try {
        const relatorio = await criarRelatorioPorAgregador(unidadeId, produtoId)
        setrelatorio(relatorio)
        setisLoading(false)

      } catch (error) {
        console.log(error)
        seterror('Não foi possível baixar o ajuste')
        setisLoading(false)
      }

    }
    if (unidadeId ) {
      fetchRelatorio()
    }

  }, [unidadeId, produtoId, shouldRefetch]);

  return { isLoading, relatorio, error, refetch }
}
