import { Alert, AlertTitle, CircularProgress, Paper, Stack, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/router";
import { useFetchRelatorioPorAgregador } from "../../hooks/useFetchRelatorioPorAgregador";
import RelatorioHeader from "./RelatorioHeader";
import RelatorioTable from "./RelatorioTable";

export default function Relatorio() {
  const router = useRouter()
  let { unidadeId } = router.query
  let { produtoId} = router.query
  const unid = parseInt(unidadeId?.toString() || '0')
  const prod = parseInt(produtoId?.toString() || '0')

  const { isLoading, relatorio, error, refetch } = useFetchRelatorioPorAgregador(unid, prod)

  if (isLoading) {
    return <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <CircularProgress color="secondary" />
      </Stack>
    </>
  }

  if (error) {
    return <>
      <Alert severity="warning">
        <AlertTitle>Falha ao consultar o relatório.</AlertTitle>
        {error}
      </Alert>
    </>
  }

  if (relatorio) {

    return <>
      <RelatorioHeader relatorio={relatorio} refetch={refetch}></RelatorioHeader>
      <Paper sx={{ width: '100%' , mt: '6px' }}>
        <TableContainer sx={{ maxHeight: '66vh' }}>
        <RelatorioTable relatorio={relatorio}></RelatorioTable>
        </TableContainer>
      </Paper>

    </>
  }

  return (
    <div>
    </div>
  )
}
