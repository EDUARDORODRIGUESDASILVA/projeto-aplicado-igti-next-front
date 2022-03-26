import { Alert, AlertTitle, Card, CircularProgress, Divider, Paper, Stack, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/router";
import { useRelatorioPorAgregador } from "../../hooks/useRelatorioPorAgregador";
import RelatorioHeader from "./RelatorioHeader";
import RelatorioTable from "./RelatorioTable";

export default function Relatorio() {
  const router = useRouter()
  let { unidadeId } = router.query
  let { produtoId } = router.query
  const unid = parseInt(unidadeId?.toString() || '0')
  const prod = parseInt(produtoId?.toString() || '0')
  const actions = useRelatorioPorAgregador(unid, prod)

  if (actions.isLoading) {
    return <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="secondary" />
      </Stack>
    </>
  }

  if (actions.error) {
    return <>
      <Alert severity="warning">
        <AlertTitle>Falha ao consultar o relatório.</AlertTitle>
        {actions.error}
      </Alert>
    </>
  }

  if (actions.relatorio) {
    return <>
      <RelatorioHeader actions={actions}></RelatorioHeader>
      <Paper sx={{ width: '100%', mt: '6px' }}>
        <RelatorioTable actions={actions}></RelatorioTable>
      </Paper>
    </>
  }

  return (
    <div>
    </div>
  )
}
