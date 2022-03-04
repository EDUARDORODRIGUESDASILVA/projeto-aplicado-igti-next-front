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
import { Box, Button, Checkbox, Divider, IconButton, Link, Paper, TablePagination, Typography } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import NumberFormat from 'react-number-format';
import { useEffect, useState } from 'react';
import { AjustarProdutoRow } from '../../core/model/AjustarProdutoRow';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NumberTextFormat from '../../utils/NumberTextFormat';
import FixedTags from './Filtro';
import CheckboxesTags from './Filtro';


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


const orderRows = (rows:AjustarProdutoRow[]): AjustarProdutoRow[] => {
  const o = rows.sort((a: AjustarProdutoRow, b: AjustarProdutoRow) => {
    return b.metaAjustada - a.metaAjustada
  })
  return rows.slice(0, 15)
}



export default function AjustarMetas() {
  const unidadeId: number = 6006
  const codsidem: string = '10.05.00'

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const { isLoading, ajuste, error, refetch } = useFetchAjustePorAgregador(unidadeId, codsidem)

  const [rows, setrows] = useState<AjustarProdutoRow[]>([]);
  const [rerender, setrerender] = useState<Object>({});

  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  useEffect(() => {
    if(ajuste){
      const r = orderRows(ajuste.rows)
      setrows(r)

    }
   return () => {
      setrows([])
    };
  }, [ajuste]);
  const atualizar = (k: Object)=> {
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
      Erro: {error}
    </>
  }



  if (ajuste) {
    return <>

      <Card  sx={{px: '2px'}}>
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //     6006
          //   </Avatar>

          // }
          action={
            <>
            {/* <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
             */}

              <Button variant="text"
                sx={{ mr: 1 }}
                onClick={() => { }}
                color="secondary">
                Upload
              </Button>

              <Button variant="text"
                sx={{ mr: 1 }}
                onClick={() => { }}
                color="success">
                Exportar
              </Button>

              <Button variant="text"
                sx={{ mr: 1 }}
                onClick={() => {  }}
                color="secondary">
                Zerar
              </Button>

              <Button variant="text"

                  onClick={() => { refetch({}) }}
                  color="warning">
                  Atualizar
                </Button>





              <Button variant="contained" sx={{ ml: 1 }} color="success">
                Gravar
              </Button>

            </>
          }
          title=
          {<Title>{ajuste.produto.codsidem + ' ' + ajuste.produto.nome + ' (' + ajuste.qtdTotalizacoes + ')'}</Title>}
          // subheader={ajuste.unidade.id }
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

      <Card sx={{mt: '6px', pt: '2px'}} >
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
      <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader size="small" >
          <TableHead>
              <TableRow >
                <TableCell padding="checkbox" >
                <Checkbox
                  color="primary"
                  checked={true}
                />
              </TableCell>
                <TableCell  sx={{maxWidth:'110px'}}>
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

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <AjustarMetasRow row={row} key={row.id} rerender={atualizar}></AjustarMetasRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </Paper>
    </>
  }
  return (
    <>
    </>
  )
}

