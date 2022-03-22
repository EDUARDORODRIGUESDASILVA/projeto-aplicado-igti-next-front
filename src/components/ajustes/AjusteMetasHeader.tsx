import { Alert, AlertColor, Avatar, Box, Button, Card, CardHeader, CircularProgress, IconButton, Snackbar } from "@mui/material";
import { red } from '@mui/material/colors';
import { useRouter } from "next/router";
import React from "react";
import { AjusteMetas } from "../../core/model/AjusteMetas";
import { AjusteMetasExportaExcel } from '../../core/model/AjusteMetasExportaExcel';

import Title from '../dashboard/Title';

export default function AjusteMetasHeader(props: {
  ajuste: AjusteMetas, isUploading: boolean, unid: number,
  handleZerar: Function,
  prod: number, handleGravar: Function, refetch: Function
}) {
  const router = useRouter()
  const ajuste = props.ajuste
  const refetch = props.refetch
  const unid = props.unid
  const prod = props.prod
  const isUploading = props.isUploading
  const handleGravar = props.handleGravar
  const handleZerar = props.handleZerar

  const handleAvatarClick = () => {
    router.push(`/relatorio/${ajuste?.unidade.id}`)
  }


  const handleGerarExcel = () => {
    if (ajuste) {
      const gerador = new AjusteMetasExportaExcel(ajuste)
      gerador.gerarExcel()
    }
  }


  if (ajuste) {
    return (
      <>
        <Card sx={{ px: '2px' }}>
          <CardHeader
            avatar={
              <IconButton
                onClick={handleAvatarClick}
              >
                <Avatar sx={{ bgcolor: red[500] }}

                  aria-label="recipe">
                  <small>{ajuste.unidade.id}</small>
                </Avatar>
              </IconButton>
            }
            action={<Box sx={{ mt: '13px' }}>
              {
                ajuste.unidade.tipo == 'SR' ? (<Button variant="text"
                  sx={{ mr: 1 }}
                  onClick={() => { handleGravar(unid, prod, ajuste, true); }}

                >
                  {isUploading ? (
                    <small>
                      <CircularProgress color="info" size="15px" />
                    </small>
                  ) : (<> Grava Referência </>)
                  }


                </Button>) : (<></>)
              }


              <Button variant="text"
                sx={{ mr: 1 }}
                onClick={() => { }}
                disabled={true}
              >
                Upload
              </Button>

              <Button variant="text"
                sx={{ mr: 1 }}
                onClick={handleGerarExcel}
                disabled={false}
              >
                Excel
              </Button>

              <Button variant="text"
                sx={{ mr: 1 }}
                onClick={() => handleZerar()}
                disabled={isUploading}
              >
                Zerar
              </Button>

              <Button variant="text"

                onClick={() => { refetch({}); }}
              >
                Atualizar
              </Button>

              <Button variant="contained" sx={{ ml: 1, width: '100px' }}
                onClick={() => { handleGravar(unid, prod, ajuste, false); }}
                disabled={ajuste.erros > 0 || ajuste.saldo !== 0 || isUploading}
                color="success">
                {isUploading ? (
                  <small>
                    <CircularProgress color="info" size="15px" />
                  </small>
                ) : (<>Gravar </>)
                }


              </Button>

            </Box>}
            title={<Title>{ajuste.produto.codsidem + ' ' + ajuste.produto.nome + ' (' + ajuste.qtdTotalizacoes + ')'}</Title>}
            subheader={ajuste.unidade.nome + ' (' + ajuste.erros + ' erros)'} />

        </Card>
      </>
    )
  }

  return <></>
}
