import { Alert, AlertTitle, Box, CircularProgress, Divider, Grid, Paper, Stack, Tab, Tabs } from "@mui/material"
import { useRelatorioTrocas } from "../../hooks/useRelatorioTrocas"
import TrocasHeader from "./TrocasHeader"
import TrocasModalIncluir from "./TrocasModalIncluir"
import TrocasTable from "./TrocasTable"

export default function Trocas({unidadeId, closeModal }: { unidadeId: number, closeModal?: Function }) {
  const actions = useRelatorioTrocas(unidadeId)

  if (actions.isLoading) {
    return <>
      <Stack
        sx={{mt: '26px'}}
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
      <TrocasHeader actions={actions} closeModal={closeModal} ></TrocasHeader>

      <Paper sx={{ width: '100%', height: '68vh', overflow:'auto', mt: '13px'}}>
        { actions.relatorio.trocas.length == 0 ?
        <Alert severity="warning" sx={{mb: '13px'}}>
          <AlertTitle>Nenhuma negociação localizada.</AlertTitle>
          {actions.error}
        </Alert>
        :     <TrocasTable actions={actions}></TrocasTable>
        }
        <Grid container spacing={2} >
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
            <TrocasModalIncluir actions={actions} ></TrocasModalIncluir>
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </Paper>
    </>
  }
  return (
    <></>
  )
}

