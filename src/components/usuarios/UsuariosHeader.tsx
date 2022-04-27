import { Avatar, Box, Button, Card, CardHeader, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { IUseUsuarios } from "../../hooks/useUsuarios";
import Title from "../dashboard/Title";

export default function UsuariosHeader({ actions }: { actions: IUseUsuarios }) {

  return (
    <Card sx={{ px: '2px' }}>
      <CardHeader
        avatar={
          <IconButton
            onClick={() => { actions.handleAtualizar() }}
          >
            <Avatar sx={{ bgcolor: red[500] }}
              aria-label="recipe">
              <small>2625</small>
            </Avatar>
          </IconButton>
        }

        action={<Box sx={{ mt: '13px' }}>
          <Button variant="text"  onClick={() => { actions.handleAtualizar() }}
          >
            Atualizar
          </Button>
        </Box>}

        title={<Title>Usuários autorizados</Title>}
        subheader={'SR 2625 FLORIANOPOLIS, SC'}
      />
    </Card>
  )
}
