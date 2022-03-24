import { Avatar, Box, Button, Card, CardHeader, IconButton, LinearProgress } from "@mui/material";
import { red } from '@mui/material/colors';
import Title from '../dashboard/Title';
import { useRouter } from 'next/router'
import { useAppSelector } from "../../store/hooks";
import { selectUser } from '../../store/userSlice';
import { IUseRelatorio } from "../../hooks/useRelatorioPorAgregador";
import RelatorioBaseCompleta from "./RelatorioBaseCompleta";


export default function RelatorioHeader({actions}: {actions: IUseRelatorio}) {
  const router = useRouter()
  const user = useAppSelector(selectUser);


  const handleAvatarClick = () => {
    if (actions.relatorio){
      if (user?.unidadeId == actions.relatorio.agregador.sr
        && actions.relatorio.agregador.sr !== actions.relatorio.agregador.id) {
        router.push(`/relatorio/${actions.relatorio.agregador.sr}`)
      } else {
        actions.handleAtualizar()
      }
    }
  }


  if(actions.relatorio) {
    return (
      <Card sx={{ px: '2px' }}>
        <CardHeader
          avatar={
            <IconButton
              onClick={handleAvatarClick}
            >
              <Avatar sx={{ bgcolor: red[500] }}

                aria-label="recipe">
                <small>{actions.relatorio.agregador.id}</small>
              </Avatar>
            </IconButton>
          }
          action={<Box sx={{ mt: '13px' }}>

            <RelatorioBaseCompleta actions={actions}></RelatorioBaseCompleta>

            <Button variant="text"
              sx={{ mr: 1 }}
              onClick={actions.handleExcelClick}
              disabled={false}
            >
              Excel
            </Button>


            <Button variant="text"

              onClick={() => { actions.handleAtualizar() }}
            >
              Atualizar
            </Button>
          </Box>}
          title={<Title>Relatório de ajustes por agregador</Title>}
          subheader={actions.relatorio.agregador.nome}
        />
        <LinearProgress variant="determinate" value={actions.relatorio?.progresso} />
      </Card>
    )
  }

  return <></>


}
