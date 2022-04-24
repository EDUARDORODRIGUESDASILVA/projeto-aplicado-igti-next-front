import { Alert, Avatar, Box, Button, Card, CardHeader, CircularProgress, IconButton, LinearProgress, Snackbar } from "@mui/material";
import Title from '../dashboard/Title';
import { red } from '@mui/material/colors';
import { IUseAjuste } from "../../hooks/useAjustePorAgregador";
import { useRouter } from "next/router";
import AjustesUploadButton from "./AjustesUploadButton";
import AjusteMetasSubHeader from "./AjusteMetasSubHeader";
import { useAppSelector } from "../../store/hooks";
import { selectSidebarState } from '../../store/sidebarSlice';
export default function AjusteMetasHeader({ actions }: { actions: IUseAjuste }) {

  const router = useRouter()
  const sidebarOpen = useAppSelector(selectSidebarState);

  const handleAvatarClick = () => {
    router.push(`/relatorio/${actions.ajuste?.unidade.id}`)
  }

  const handleChangeTipo = (tipo: 'AG' | 'SE') => {
    router.push(`/ajustes/${tipo}/${actions.ajuste?.unidade.id}/${actions.ajuste?.produto.id}`)
  }

  if (actions.ajuste) {
    return (
      <>
        <Snackbar open={(actions.snack.open ? true : false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1500} onClose={actions.handleSnackClose}>
          <Alert severity={actions.snack.severity} sx={{ width: '100%' }}>
            {actions.snack.message}
          </Alert>
        </Snackbar>

        <Card sx={{ px: '2px' }}>
          <CardHeader
            avatar={
              <IconButton
                onClick={handleAvatarClick}
              >
                <Avatar sx={{ bgcolor: red[500] }}
                  aria-label="recipe">
                  <small>{actions.ajuste.unidade.id}</small>
                </Avatar>
              </IconButton>
            }
            action={<Box sx={{ mt: '13px' }}>
              {
                actions.ajuste.unidade.tipo == 'SR' ? (
                  <>
                    {actions.tipo == 'AG' ? (
                      <>
                        <Button variant="text"
                          sx={{ mr: 1 }}
                          disabled={false}
                          onClick={() => { handleChangeTipo('SE') }}
                        >
                          IR SEV
                        </Button>

                        <Button variant="text"
                          sx={{ mr: 1 }}
                          disabled={false}
                          onClick={() => { actions.handleGerarExcelOutliers() }}
                        >
                          OUTLIERS
                        </Button>
                      </>


                    ) : <></>
                    }

                    {actions.tipo == 'SE' ? (
                      <Button variant="text"
                        sx={{ mr: 1 }}
                        disabled={false}
                        onClick={() => handleChangeTipo('AG')}
                      >
                        IR AGÊNCIA
                      </Button>
                    ) : <></>
                    }
                    {/* <Button variant="text"
                      sx={{ mr: 1 }}
                      disabled={
                        actions.ajuste.saldo !== 0 //||  -- temporiamente desabilitado para testes
                        || actions.ajuste.auxiliarTroca !== 0
                        || actions.isActive == 0
                        || actions.isUploading}
                      onClick={() => { actions.handleGravar(true); }}
                    >
                      Gravar Ref.
                    </Button> */}

                    {/* <Button variant="text"
                      sx={{ mr: 1 }}
                      disabled={true}
                    >
                      OUTLIERS
                    </Button> */}
                  </>
                ) : <></>
              }

              {/* {
                actions.ajuste.unidade.tipo == 'SEV' ? (

                  <Button variant="text"
                    sx={{ mr: 1 }}
                    disabled={true}
                  >
                    Negociações
                  </Button>

                ) : <></>
              } */}
              <Button variant="text"
                sx={{ mr: 1 }}
                onClick={() => actions.handleGerarExcel()}
                disabled={false}
              >
                Excel
              </Button>
              <AjustesUploadButton actions={actions} />

              <Button variant="text"
                sx={{ mr: 1 }}
                onClick={() => { actions.handleZerar() }}
                disabled={actions.isUploading || actions.isActive == 0}
              >
                Zerar
              </Button>

              <Button variant="text"
                onClick={() => { actions.handleAtualizar() }}
              >
                Atualizar
              </Button>

              <Button variant="contained" sx={{ ml: 1, width: '100px' }}
                onClick={() => { actions.handleGravar(false); }}
                disabled={actions.ajuste.erros > 0 || actions.ajuste.saldo !== 0
                  || actions.ajuste.auxiliarTroca !== 0
                  || actions.isActive == 0
                  || actions.isUploading}
                color="success">
                {actions.isUploading ? (
                  <small>
                    <CircularProgress color="info" size="15px" />
                  </small>
                ) : (<>Gravar </>)
                }
              </Button>
            </Box>}
            title={
              <>
                <Title>{actions.ajuste.produto.nome}</Title>
              </>
            }
            subheader={<AjusteMetasSubHeader actions={actions}></AjusteMetasSubHeader>}
          />
          {actions.isUploading ? (
            <LinearProgress />
          ) : <></>}
        </Card>
      </>
    )
  }

  return <></>
}
