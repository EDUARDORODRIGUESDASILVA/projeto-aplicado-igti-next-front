import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IUser } from "../core/interfaces/IUser";
import { fetchUsers } from "../services/userService";

export interface IUseUsuarios {
  isLoading: boolean
  usuarios: IUser[]
  error: string
  refetch: Dispatch<SetStateAction<{}>>
  page: number
  rowsPerPage: number
  selectedId: number | undefined
  setPage: Dispatch<SetStateAction<number>>
  setRowsPerPage: Dispatch<SetStateAction<number>>
  handleAtualizar:() => void
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const useFetchUsuarios = (unidadeId: number) => {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState('');
  const [usuarios, setUsuarios] = useState<IUser[]>([]);
  const [shouldRefetch, refetch] = useState({});


  useEffect(() => {
    async function baixarUsuarios() {
      setisLoading(true)
      try {
        const usuarios = await fetchUsers(unidadeId)
        setUsuarios(usuarios)
        setisLoading(false)

      } catch (error) {
        seterror('Não foi possível baixar a lista de usuários. Tente novamente mais tarde.')
        setisLoading(false)
      }
    }
    if (unidadeId) {
     baixarUsuarios()
    }
  }, [unidadeId, shouldRefetch]);

  return { isLoading, usuarios, error, refetch }
}


export const useUsuarios = (unidadeId: number) => {
  const { isLoading, usuarios, error, refetch }=  useFetchUsuarios(unidadeId)


  const [selectedId, setSelectedId] = useState<number>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleAtualizar = () => {
    refetch({})
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const a: IUseUsuarios = {
    isLoading,
    usuarios,
    error,
    refetch,
    page,
    rowsPerPage,
    selectedId,
    setPage,
    setRowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleAtualizar
  }
  return a
}
