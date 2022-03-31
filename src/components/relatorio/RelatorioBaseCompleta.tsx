import { Button, CircularProgress } from "@mui/material";
import { useBaseCompletaPorAgregador } from "../../hooks/useBaseCompletaPorAgregador";
import { IUseRelatorio } from "../../hooks/useRelatorioPorAgregador";

export default function RelatorioBaseCompleta({actions}: {actions: IUseRelatorio}) {


  const {isLoading, handleExcelBaseCompleta} = useBaseCompletaPorAgregador()

  const agregador = actions.relatorio?.agregador
  const produtoId = actions.produtoId
  if (agregador) {

    return (
    <Button variant="text"
      sx={{ mr: 1 }}
      onClick={() => { handleExcelBaseCompleta( agregador, produtoId)}}
      disabled={isLoading}
    >
        { isLoading ? (
          <>
                  <CircularProgress color="info" size="15px" />
                  Gerando base completa...
          </>
        ): (<>Exportar base completa</>)
        }
    </Button>
  )
  }

  return <></>

}
