import { Box, Button,  Container,Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Logo from './logo.svg';
import { selectUser } from '../../store/userSlice';
import { useAppSelector } from '../../store/hooks';
export default function HomeGrid() {
  const router = useRouter()
  const user = useAppSelector(selectUser);

  function go() {
    router.push(`/relatorio/${user?.unidadeId}`)
  }

  function goTrocas() {
    router.push('/trocas')
  }
  return (
    <div>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 10,
          pb: 10,
          height: 'calc(100vh - 100px)'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h3"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Sistema de Apoio a Distribuição de Metas
          </Typography>
          <Box sx={{ml: 'auto', mr: 'auto', maxWidth:'580px', maxHeight:'400px'}}>
            <Image src={Logo} alt="me" width="600" height='400'/>
          </Box>

          <Typography variant="h5" sx={{mt: '10px'}} align="center" color="text.secondary" paragraph>
          Bem vindo!
          O prazo de ajustes é ate <b>08/05 - 14hs</b>
          </Typography>
          <Stack
            sx={{ pt: 1 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" onClick={go} >Relatório</Button>
            <Button variant="outlined" onClick={goTrocas}>Trocas</Button>
          </Stack>
        </Container>
      </Box>
      </div >
  )
}
