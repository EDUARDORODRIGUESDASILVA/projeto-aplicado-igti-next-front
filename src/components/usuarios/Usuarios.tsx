import { Alert, AlertTitle, CircularProgress, Paper, Stack } from "@mui/material";
import { useUsuarios } from "../../hooks/useUsuarios";
import UsuariosHeader from "./UsuariosHeader";
import UsuariosTable from "./UsuariosTable";

export default function Usuarios() {
  const actions = useUsuarios(2625)

  if (actions.isLoading) {
    return <>
      <Stack
        sx={{ mt: '26px' }}
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
        <AlertTitle>Falha ao consultar usuários.</AlertTitle>
        {actions.error}
      </Alert>
    </>
  }

  if (actions.usuarios) {
  return (
    <>
      <UsuariosHeader actions={actions}></UsuariosHeader>
      <Paper sx={{ width: '100%', height: '68vh', overflow: 'auto', mt: '13px' }}>
        <Alert severity="warning">
          <AlertTitle>Integração com RH</AlertTitle>
          Os usuários são incluídos automaticamente a partir do sistema de RH.
          Em caso de divergências ou casos excepcionais solicite a SR de vinculação.

        </Alert>

        {actions.usuarios.length == 0 ?
          <Alert severity="warning" sx={{ mb: '13px' }}>
            <AlertTitle>Sem usuários cadastrados.</AlertTitle>
            {actions.error}
          </Alert>
          : <UsuariosTable actions={actions}></UsuariosTable>
        }
      </Paper>
    </>
  )
 }

 return <></>
}
