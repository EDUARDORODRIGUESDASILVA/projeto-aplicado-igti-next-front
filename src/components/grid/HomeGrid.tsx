import { Box, Button,  Container,Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function HomeGrid() {

  return (
    <div>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 5,
          pb: 5,
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
            <img src='./logo.svg' alt="me" width="600" height='400'/>
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
            <Button variant="contained" href='/relatorio/2625' component={Link}>Relatório</Button>
            <Button variant="outlined">Trocas</Button>
          </Stack>
        </Container>
      </Box>
      </div >
  )
}
