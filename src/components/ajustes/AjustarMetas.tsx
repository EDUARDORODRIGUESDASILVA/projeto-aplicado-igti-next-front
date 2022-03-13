import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../dashboard/Title';
import GridOnIcon from '@mui/icons-material/GridOn';
import { useFetchAjustePorAgregador } from '../../hooks/useFetchAjustePorAgregador';
import AjustarMetasRow from './AjustarMetasRow';
import { Alert, AlertTitle, Box, Button, Checkbox, Divider, IconButton, Link, Paper, Snackbar, TablePagination, Typography } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { AjustarProdutoRow } from '../../core/model/AjustarProdutoRow';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import NumberTextFormat from '../../utils/NumberTextFormat';
import CheckboxesTags from './Filtro';
import { useRouter } from 'next/router';
import CalculateIcon from '@mui/icons-material/Calculate';
import { atualizarObjetivosLote } from '../../services/ajustesService';
import { AjusteMetas } from '../../core/model/AjusteMetas';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}


// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const orderRows = (rows: AjustarProdutoRow[]): AjustarProdutoRow[] => {
  const o = rows.sort((a: AjustarProdutoRow, b: AjustarProdutoRow) => {
    return b.metaAjustada - a.metaAjustada
  })
  return rows.slice(0, 150)
}

export default function AjustarMetas() {
  const router = useRouter()
  let { unidadeId, produtoid} = router.query
  const unid = parseInt(unidadeId?.toString() || '0')
  const prod = parseInt(produtoid?.toString() || '0')

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const { isLoading, ajuste, error, refetch } = useFetchAjustePorAgregador(unid, prod)


  const [rows, setrows] = useState<AjustarProdutoRow[]>([]);
  const [rerender, setrerender] = useState<Object>({});

  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [snack, setSnack] = React.useState(false);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 15));
    setPage(0);
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack(false)
};

  const handleGravar = async (unid: number, prod: number, ajuste: AjusteMetas) => {
    try {
      const res = await atualizarObjetivosLote(unid, prod, ajuste)
      setSnack(true)
    } catch (error) {

    }

  }


  useEffect(() => {
    if (ajuste) {
      const r = orderRows(ajuste.rows)
      setrows(r)

    }
    return () => {
      setrows([])
    };
  }, [ajuste]);


  const atualizar = (k: Object) => {
    console.log('vamos atualizar...')
    setrerender(k)
  }
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
      <Alert severity="warning">
        <AlertTitle>Ajuste indisponível.</AlertTitle>
        Infelizmente um erro ocorreu. {error}
      </Alert>
    </>
  }



  if (ajuste) {
    return <>
      <Snackbar open={snack}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={1000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Gravado com sucesso!
        </Alert>
      </Snackbar>

      <Card sx={{ px: '2px' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <small>{ajuste.unidade.id}</small>
            </Avatar>

          }
          action={
             <Box sx={{mt: '13px'}}>
            {/* //   <IconButton aria-label="settings">
            //   <MoreVertIcon />
            // </IconButton> */}


              <Button variant="text"
                sx={{ mr: 1 }}
                onClick={() => { }}
                disabled={true}
              >
                Incluir troca
              </Button>

              <Button variant="text"
                sx={{ mr: 1 }}
                onClick={() => { }}
                disabled={true}
              >
                Upload
              </Button>

              <Button variant="text"
                sx={{ mr: 1 }}
                onClick={() => { }}
                disabled={true}
              >
                Exportar
              </Button>

              <Button variant="text"
                sx={{ mr: 1 }}
                onClick={() => { }}
                disabled={true}
              >
                Zerar
              </Button>

              <Button variant="text"

                onClick={() => { refetch({}) }}
              >
                Atualizar
              </Button>

              <Button variant="contained" sx={{ ml: 1 }}
               onClick={() => {handleGravar(unid, prod, ajuste)}}
                disabled={ajuste.erros > 0 || ajuste.saldo !== 0}
              color="success">
                Gravar
              </Button>

            </Box>
          }
          title=
          {<Title>{ajuste.produto.codsidem + ' ' + ajuste.produto.nome + ' (' + ajuste.qtdTotalizacoes + ')'}</Title>}
          subheader={ajuste.unidade.nome + ' (' + ajuste.erros + ' erros)'}
        />
        {/* <CardContent>
          {/* <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
          <CheckboxesTags></CheckboxesTags>
        </CardContent> */}
        {/* <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions> */}
      </Card>

      <Card sx={{ mt: '6px', pt: '2px' }} >
        <CheckboxesTags></CheckboxesTags>
      </Card>

      {/* <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Title>
          </Title>

         </Grid>

        <Grid item xs={6} md={4}>

        </Grid>


        <Grid item xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={6} md={8}>
          <Item><h1></h1></Item>
        </Grid>
      </Grid> */}

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
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: '62vh' }}>
          <Table stickyHeader size="small" >
            <TableHead>
              <TableRow >
                <TableCell padding="checkbox" >
                  <Checkbox
                    color="primary"
                    checked={true}
                    disabled={true}
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: '110px' }}>
                  Unidade

                </TableCell>
                <TableCell align="center" >Cluster</TableCell>
                <TableCell align="center">Referência</TableCell>
                <TableCell align="center">Mínima</TableCell>
                <TableCell align="center">Trava</TableCell>
                <TableCell align="center">%</TableCell>
                <TableCell align="center">Valor
                  <IconButton disabled={true} color="primary" aria-label="upload picture" component="span">
                    <CalculateIcon  />
                  </IconButton>

                </TableCell>
                <TableCell align="right" colSpan={3}>
                  <h2>
                    <NumberTextFormat value={ajuste.metaAjustada} />
                  </h2>
                </TableCell>
                <TableCell align="center" padding='none' colSpan={2}>
                  <h2>
                    <NumberTextFormat value={ajuste.saldo} />
                  </h2>
                </TableCell>

              </TableRow>
              {/* <TableRow >
                <TableCell padding="checkbox" >
                  <Checkbox
                    color="primary"
                    checked={true}
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: '110px' }}>
                  Unidade

                </TableCell>
                <TableCell align="center" >Cluster</TableCell>
                <TableCell align="center">Referência</TableCell>
                <TableCell align="center">Mínima</TableCell>
                <TableCell align="center">Trava</TableCell>
                <TableCell align="center">%</TableCell>
                <TableCell align="center">Valor
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    < GridOnIcon />
                  </IconButton>

                </TableCell>
                <TableCell align="right" colSpan={2}>
                  <h2>
                    <NumberTextFormat value={ajuste.metaAjustada} />
                  </h2>
                </TableCell>
                <TableCell align="center" padding='none' colSpan={2}>
                  <h2>
                    <NumberTextFormat value={ajuste.saldo} />
                  </h2>
                </TableCell>

              </TableRow> */}
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <AjustarMetasRow row={row} key={row.id} rerender={atualizar}></AjustarMetasRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}

      </Paper>
    </>
  }
  return (
    <>
    </>
  )
}

