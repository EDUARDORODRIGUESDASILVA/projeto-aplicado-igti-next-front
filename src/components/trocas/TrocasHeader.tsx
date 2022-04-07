import { Alert, Avatar, Box, Button, Card, CardHeader, IconButton, LinearProgress, Snackbar } from "@mui/material";
import { red } from '@mui/material/colors';
import { IUseRelatorioTrocas } from "../../hooks/useRelatorioTrocas";
import Title from '../dashboard/Title';
import CloseIcon from '@mui/icons-material/Close';

export default function TrocasHeader({ actions, closeModal }: { actions: IUseRelatorioTrocas, closeModal?: Function }) {

  function onCloseModal() {
    if (closeModal)
      closeModal()
  }

  if (actions.relatorio) {
    return (
      <>
         <Snackbar open={(actions.snack.open ? true : false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1500} onClose={actions.handleSnackClose}>
          <Alert severity={actions.snack.severity} sx={{ width: '100%' }}>
            {actions.snack.message}
          </Alert>
        </Snackbar>

    <Card sx={{ px: '2px' }}>
      <CardHeader
        avatar={
          <IconButton
                onClick={() => { actions.handleAtualizar() }}
          >
            <Avatar sx={{ bgcolor: red[500] }}

              aria-label="recipe">
              <small>{actions.relatorio?.agregador.id}</small>
            </Avatar>
          </IconButton>
        }

        action={
          <>


        <Box sx={{ mt: '13px' }}>


          <Button variant="text"
          onClick={()=> {actions.handleExcelClick()}}
          >
            Excel
          </Button>




          <Button variant="text"
            onClick={() => { actions.handleAtualizar() }}
          >
            Atualizar
          </Button>

              {closeModal ?
              <IconButton onClick={onCloseModal} aria-label="settings">
                <CloseIcon></CloseIcon>
              </IconButton>
              : <></>
              }
        </Box>

          </>}

        title={<Title>Negociações registradas</Title>}
        subheader={actions.relatorio.agregador.nome}
      />
    </Card>
      </>
    )
  }

  return <></>
}
