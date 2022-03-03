import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../dashboard/Title';
import GridOnIcon from '@mui/icons-material/GridOn';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useFetchAjustePorAgregador } from '../../hooks/useFetchAjustePorAgregador';
import AjustarMetasRow from './AjustarMetasRow';
import { Box, Button, Checkbox, Divider, IconButton, Link, Paper, Typography } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AjustarMetas() {
  const unidadeId: number = 6006
  const codsidem: string = '10.05.00'

  const { isLoading, ajuste, error, refetch } = useFetchAjustePorAgregador(unidadeId, codsidem)
  if (isLoading) {
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

  if (error) {
    return <>
      Erro: {error}
    </>
  }
  if (ajuste) {
    return <>

      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Item>
          <Title>{ajuste.produto.codsidem} - {ajuste.produto.nome}</Title>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {ajuste.unidade.id} {ajuste.unidade.nome}
          </Typography>
          </Item>
        </Grid>

        <Grid item xs={6} md={4}>
          <Item>
          <Button variant="contained"

            onClick={() => { refetch({}) }}
            color="warning">
            Atualizar
          </Button>

           <Button variant="contained"  sx={{ ml: 1 }} color="success">
            Gravar
          </Button></Item>
        </Grid>


        <Grid item xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={6} md={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>




      <Box display="flex" sx={{ pb: 1 }}>
        <Box flexGrow={1}>

        </Box>
        <Box>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >



          </Stack>
        </Box>
      </Box>

      <Divider />

      <TableContainer component={Paper} sx={{ maxHeight: '72vh' }}>

        <Table stickyHeader size="small" >
          <TableHead>
            <TableRow >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={true}
                />
               </TableCell>
              <TableCell>
                <span style={{ marginRight: '10px' }}>Unidade</span>
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <  FileUploadIcon />
                  </IconButton>

                  <IconButton color="primary" aria-label="upload picture" component="span">
                    < GridOnIcon />
                  </IconButton>


              </TableCell>
              <TableCell align="center">Porte</TableCell>
              <TableCell align="center">Referência</TableCell>
              <TableCell align="center">Mínima</TableCell>
              <TableCell align="center">Trava</TableCell>
              <TableCell align="center">%</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Ajustada</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ajuste.rows.map((row, i) => (
              <AjustarMetasRow row={row} key={i}></AjustarMetasRow>


            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  }
  return (
    <>
    </>
  )
}



// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}





