import { Avatar, Box, Button, Card, CardHeader, IconButton, LinearProgress } from "@mui/material";
import { red } from '@mui/material/colors';
import { IUseRelatorioTrocas } from "../../hooks/useRelatorioTrocas";
import Title from '../dashboard/Title';


export default function TrocasHeader({actions}: { actions: IUseRelatorioTrocas }) {
  const handleAvatarClick = () => {
  }
  if (actions.relatorio) {
  return (
    <Card sx={{ px: '2px' }}>
      <CardHeader
        avatar={
          <IconButton
            onClick={handleAvatarClick}
          >
            <Avatar sx={{ bgcolor: red[500] }}

              aria-label="recipe">
              <small>{actions.relatorio?.agregador.id}</small>
            </Avatar>
          </IconButton>
        }

        action={<Box sx={{ mt: '13px' }}>

          <Button variant="text"
          >
            Excel
          </Button>


          <Button variant="text"
            onClick={() => { actions.handleAtualizar() }}
          >
            Atualizar
          </Button>
        </Box>}

        title={<Title>Negociações registradas</Title>}
        subheader={actions.relatorio.agregador.nome}
      />
    </Card>
  )
  }

  return <></>
}
