import { Alert, AlertTitle, CircularProgress, Paper, Stack } from "@mui/material"
import TrocasHeader from "./TemplateHeader"

export default function Trocas(props: {unidadeId: number}) {
  const isLoading = false
  const erros = ''
  const relatorio = true
  if (isLoading) {
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

  if (erros) {
    return <>
      <Alert severity="warning">
        <AlertTitle>Falha ao consultar trocas.</AlertTitle>
        {erros}
      </Alert>
    </>
  }

  if (relatorio) {
    return <>
      <TrocasHeader></TrocasHeader>
      <Paper sx={{ width: '100%', height: '60vh', overflow:'auto', mt: '13px'}}>
      </Paper>
    </>
  }


  return (
    <>
    </>
  )
}

