import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image'

export default function HomeGrid() {

  return (
    <div>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
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
            <Image src="/objetivos.jpg" alt="me" width="600" height='400' layout='responsive'/>
          </Box>


          <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Bem vindo!
          O prazo de ajustes é ate <b>08/05 - 14hs</b>
          </Typography>
          <Stack
            sx={{ pt: 1 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" href ='/relatorio/2625' component={Link}>Relatório</Button>
            <Button variant="outlined">Trocas</Button>
          </Stack>
        </Container>
      </Box>
      </div >
  )
}
