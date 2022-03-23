import { Alert, AlertTitle, Box, Card, CircularProgress, Divider, Paper, Stack, TableContainer } from '@mui/material'
import { useRouter } from 'next/router'
import { useAjustePorAgregador } from '../../hooks/useAjustePorAgregador'
import  AjusteMetasHeader  from './AjusteMetasHeader'
import AjusteMetasTable from './AjusteMetasTable'
import AjustesMetasFiltro from './AjustesMetasFiltro'

export default function AjusteMetas() {
  const router = useRouter()
  let { unidadeId, produtoid } = router.query
  const unid = parseInt(unidadeId?.toString() || '0')
  const prod = parseInt(produtoid?.toString() || '0')

  const actions = useAjustePorAgregador(unid, prod)

  if (actions.isLoading) {
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

  if (actions.error) {
    return <>
      <Alert severity="warning">
        <AlertTitle>Ajuste indisponível.</AlertTitle>
        Infelizmente um erro ocorreu. {actions.error}
      </Alert>
    </>
  }

  if (actions.ajuste)

  return (
    <>
      <AjusteMetasHeader actions={actions}></AjusteMetasHeader>

      <Divider />

      <Card sx={{ mt: '6px', pt: '2px' }}>
        <AjustesMetasFiltro actions={actions}></AjustesMetasFiltro>
      </Card>



      <Paper sx={{ width: '100%', mt: '10px'  }}>
          <AjusteMetasTable actions={actions}></AjusteMetasTable>
      </Paper>
    </>
  )

  return <></>
}