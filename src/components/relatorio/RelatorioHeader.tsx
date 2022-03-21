import { Avatar, Box, Button, Card, CardHeader, IconButton, LinearProgress } from "@mui/material";
import { red } from '@mui/material/colors';
import Title from '../dashboard/Title';
import { useRouter } from 'next/router'
import { useAppSelector } from "../../store/hooks";
import { selectUser } from '../../store/userSlice';
import { RelatorioPorAgregador } from "../../core/model/RelatorioPorAgregador";
import { RelatorioPorAgregadorExportaExcel } from "../../core/model/RelatorioPorAgregadorExportaExcel";
export default function RelatorioHeader(props: { refetch: Function, relatorio: RelatorioPorAgregador}) {
  const relatorio = props.relatorio
  const agregador = props.relatorio.agregador
  const refetch = props.refetch
  const router = useRouter()
  const user = useAppSelector(selectUser);
  const progress = relatorio.progresso

  const handleAvatarClick = () => {
    if (user?.unidadeId == agregador.sr && agregador.sr !== agregador.id) {
      router.push(`/relatorio/${agregador.sr}`)
    } else {
      refetch({})
    }
  }

  const handleExcelClick = () => {
    const gerador: RelatorioPorAgregadorExportaExcel = new RelatorioPorAgregadorExportaExcel(relatorio)
    gerador.gerarExcel()
  }

      return (
      <Card sx={{ px: '2px' }}>
        <CardHeader
          avatar={
            <IconButton
                onClick={handleAvatarClick}
            >
              <Avatar sx={{ bgcolor: red[500] }}

                aria-label="recipe">
                <small>{agregador.id}</small>
              </Avatar>
            </IconButton>
          }
          action={<Box sx={{ mt: '13px' }}>

            <Button variant="text"
              sx={{ mr: 1 }}
              onClick={handleExcelClick}
              disabled={false}
            >
              Excel
            </Button>

            <Button variant="text"

              onClick={() => { refetch({}) }}
            >
              Atualizar
            </Button>
          </Box>}
          title={<Title>Relatório de ajustes por agregador</Title>}
          subheader={agregador.nome}
           />
          <LinearProgress variant="determinate" value={progress} />
      </Card>
    )

}
