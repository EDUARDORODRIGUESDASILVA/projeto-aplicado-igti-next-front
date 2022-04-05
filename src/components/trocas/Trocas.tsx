import { Alert, AlertTitle, Box, CircularProgress, Divider, Paper, Stack, Tab, Tabs } from "@mui/material"
import { useRelatorioTrocas } from "../../hooks/useRelatorioTrocas"
import TrocasHeader from "./TrocasHeader"
import TrocasIncluir from "./TrocasIncluir"
import TrocasTable from "./TrocasTable"

export default function Trocas({unidadeId}: {unidadeId: number}) {
  const actions = useRelatorioTrocas(unidadeId)

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
        <AlertTitle>Falha ao consultar trocas.</AlertTitle>
        {actions.error}
      </Alert>
    </>
  }

  if (actions.relatorio) {
    return <>
      <TrocasHeader actions={actions} ></TrocasHeader>

      {/* <TrocasIncluir></TrocasIncluir> */}
      <Paper sx={{ width: '100%', height: '68vh', overflow:'auto', mt: '13px'}}>

        {/* <TrocasIncluir actions={actions}></TrocasIncluir> */}

        <TrocasTable actions={actions}></TrocasTable>
      </Paper>
    </>
  }


  return (
    <>
    </>
  )
}

