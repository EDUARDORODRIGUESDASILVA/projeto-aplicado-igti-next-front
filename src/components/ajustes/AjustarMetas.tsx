import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useFetchAjustePorAgregador } from '../../hooks/useFetchAjustePorAgregador';
import AjustarMetasRow from './AjustarMetasTableRow';
import { Alert, AlertColor, AlertTitle, Box, Button, Checkbox, Divider, IconButton, Link, Paper, Snackbar, TablePagination, Typography } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { AjustarProdutoRow } from '../../core/model/AjustarProdutoRow';
import { atualizarObjetivosLote } from "../../services/ajustesService";
import Card from '@mui/material/Card';

import NumberTextFormat from '../../utils/NumberTextFormat';
import CheckboxesTags from './Filtro';
import { useRouter } from 'next/router';
import CalculateIcon from '@mui/icons-material/Calculate';
import AjusteMetasHeader from './AjusteMetasHeader';
import { AjusteMetas } from '../../core/model/AjusteMetas';

const orderRows = (rows: AjustarProdutoRow[]): AjustarProdutoRow[] => {
  const o = rows.sort((a: AjustarProdutoRow, b: AjustarProdutoRow) => {
    return b.metaAjustada - a.metaAjustada
  })
  return o
}

export default function AjustarMetas() {
  const router = useRouter()
  let { unidadeId, produtoid } = router.query
  const unid = parseInt(unidadeId?.toString() || '0')
  const prod = parseInt(produtoid?.toString() || '0')

  const { isLoading, ajuste, error, refetch } = useFetchAjustePorAgregador(unid, prod)
  const [rows, setrows] = useState<AjustarProdutoRow[]>([]);
  const [rerender, setrerender] = useState<Object>({});
  const [isUploading, setIsUploading] = React.useState(false);

  const handleCheckbox = () => {
    if (ajuste) {
      ajuste.toggleCheckbox()
      const r = orderRows(ajuste.rows)
      setrows(r)
    }
  }

  const handleCalc = () => {
    if (ajuste) {
      ajuste.distribuirProporcional()
      const r = orderRows(ajuste.rows)
      setrows(r)
    }

  }

  const [snack, setSnack] = React.useState<{ open: Boolean, message: string, severity: AlertColor }>({ open: false, message: '', severity: 'success' });

  const handleGravar = async (unid: number, prod: number, ajuste: AjusteMetas, referencia: boolean) => {
    try {
      setIsUploading(true)
      const res = await atualizarObjetivosLote(unid, prod, ajuste, referencia)
      setSnack({ open: true, message: 'Gravado com sucesso!', severity: 'success' })
      setIsUploading(false)
      refetch({})
    } catch (error) {
      setIsUploading(false)
      setSnack({ open: true, message: 'Falha ao gravar!', severity: 'error' })
    }
  }

  const handleZerar = () => {
    if (ajuste) {
      ajuste?.zerar()
      const r = orderRows(ajuste.rows)
      setrows(r)
    }
  }

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack({ open: false, message: '', severity: 'success' })
  };


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
    setrerender(k)
  }
  if (isLoading) {
    return <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={5}
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
      <>
        <Snackbar open={(snack.open ? true : false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1500} onClose={handleClose}>
          <Alert severity={snack.severity} sx={{ width: '100%' }}>
            {snack.message}
          </Alert>
        </Snackbar>


        <AjusteMetasHeader ajuste={ajuste} unid={unid} prod={prod}
        refetch={refetch} isUploading={false}
        handleZerar={handleZerar}
         handleGravar={handleGravar}></AjusteMetasHeader>
        {/* <Card sx={{ mt: '6px', pt: '2px' }}>
          <CheckboxesTags></CheckboxesTags>
        </Card> */}

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
          <TableContainer sx={{ maxHeight: '66vh' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={ajuste.checked}
                      onChange={handleCheckbox}
                      disabled={false} />
                  </TableCell>
                  <TableCell sx={{ maxWidth: '110px' }}>
                    Unidade

                  </TableCell>
                  <TableCell align="center">Cluster</TableCell>
                  <TableCell align="center">Referência</TableCell>
                  <TableCell align="center">Mínima</TableCell>
                  <TableCell align="center">Trava</TableCell>
                  <TableCell align="center">%</TableCell>
                  <TableCell align="center">Valor
                    <IconButton disabled={ajuste.saldo == 0}
                      onClick={handleCalc}
                      color="primary" aria-label="upload picture" component="span">
                      <CalculateIcon />
                    </IconButton>

                  </TableCell>
                  <TableCell align="right" colSpan={3}>
                    <h2>
                      <NumberTextFormat value={ajuste.metaAjustada} />
                    </h2>
                  </TableCell>
                  <TableCell align="center" padding='none'
                    sx={{ backgroundColor: ajuste.saldo !== 0 ? "#ffebee" : "" }}
                    colSpan={2}>
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
        </Paper>
      </></>
  }
  return (
    <>
    </>
  )
}

