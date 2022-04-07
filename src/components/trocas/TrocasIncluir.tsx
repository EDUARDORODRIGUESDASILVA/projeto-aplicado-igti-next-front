import {
  Autocomplete, Avatar, Box, Button, Card, CardActions, CardContent,
  CardHeader, Grid, IconButton, TextField, Typography
} from "@mui/material"
import { IUseRelatorioTrocas } from "../../hooks/useRelatorioTrocas"
import { red } from '@mui/material/colors';

import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import CloseIcon from '@mui/icons-material/Close';
import Title from "../dashboard/Title";
import { IProduto } from "../../core/interfaces/IProduto";
import { IUnidade } from "../../core/interfaces/IUnidade";
import { Input, styled } from "@mui/material";
import { Troca } from "../../core/model/troca/Trocas";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";

const ValorInput = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    textAlign: "right",
  },
}));

export default function TrocasIncluir({ actions, closeModal }: { actions: IUseRelatorioTrocas, closeModal?: Function }) {

  const user = useAppSelector(selectUser);
  const [valor, setvalor] = useState(0)
  const [produto, setproduto] = useState<IProduto | null>()
  const [aumentar, setaumentar] = useState<IUnidade | null>()
  const [reduzir, setreduzir] = useState<IUnidade | null>()
  const [liberado, setliberado] = useState(false);

  const handleChangeProduto = (event: object, value: IProduto | null, reason: string) => {
    setproduto(value)
  }

  const handleChangeAumentar = (event: object, value: IUnidade | null, reason: string) => {
    setaumentar(value)
  }

  const handleChangeReduzir = (event: object, value: IUnidade | null, reason: string) => {
    setreduzir(value)
  }

  const handleIncluirNegociacao = () => {
    if(actions.relatorio && aumentar && reduzir && produto && valor > 0 && user) {
    const troca: Troca = new Troca({
      id: 0,
      incrementaId: aumentar?.id,
      reduzId: reduzir?.id,
       produtoId: produto?.id,
      userId: user.matricula,
       valor,
      status: 'OK',
      Usuario: user
    }, actions.relatorio)


    console.log('started', troca)
    actions.handleGravar(troca)

    }
  }

  useEffect(() => {
    if (valor > 0 &&
      produto &&
      aumentar &&
      reduzir &&
      actions.isLoading == false &&
      !(aumentar.id == reduzir.id)
    ) {
      setliberado(true)
    } else {
      setliberado(false)
    }
  }, [valor, produto, aumentar, reduzir,actions.isLoading]);

  function onCloseModal() {
    if (closeModal)
      closeModal()
  }

  if (actions.relatorio)
    return (
      <Card sx={{ mt: 1 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <small>{actions.relatorio?.agregador.id}</small>
            </Avatar>
          }
          action={
            closeModal ? (
              <IconButton onClick={onCloseModal} aria-label="settings">
                <CloseIcon></CloseIcon>
              </IconButton>
            ) : <></>
          }
          title={<Title>Incluir Negociação</Title>}
        />

        <CardContent sx={{ minHeight: '54vh' }}  >
          <>
            <Typography paragraph variant="body2" color="text.secondary" >
              Registre abaixo a negociação efetivada.<br></br>
              <b>Apenas a unidade que receberá o objetivo poderá cadastrar a transação.</b>
              <br></br> Caso necessário estornar a negociação, solicite a SR de vinculação.
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  clearOnBlur
                  onChange={handleChangeProduto}
                  value={produto}
                  id="combo-box-demo"
                  options={actions.relatorio.produtos}
                  groupBy={(option) => option.bloco}
                  getOptionLabel={(option) => option.nome}
                  size="small"
                  fullWidth
                  renderInput={(params) => <TextField
                    error={produto ? false : true}
                    helperText={!produto ? 'Produto é obrigatório' : ' '}
                    label="Produto"
                    variant="filled"
                    {...params} />}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <small>{option.nome}</small>
                    </Box>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Autocomplete
                  clearOnBlur
                  disablePortal
                  openOnFocus
                  onChange={handleChangeAumentar}
                  value={aumentar}
                  id="combo-box-demo"
                  options={actions.relatorio.unidadesAumentar}
                  getOptionLabel={(option) => option.nome}
                  fullWidth
                  size="small"
                  renderInput={(params) => <TextField
                    label="Aumentar"
                    variant="filled"
                    error={!aumentar}
                    helperText={!aumentar ? 'Unidade a aumentar é obrigatório' : ' '}
                    {...params} />
                  }
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <small>{option.nome}</small>
                    </Box>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  clearOnBlur
                  onChange={handleChangeReduzir}
                  value={reduzir}
                  id="combo-box-demo"
                  options={actions.relatorio.unidadesReduzir}
                  getOptionLabel={(option) => option.nome}
                  fullWidth
                  size="small"
                  renderInput={(params) => <TextField
                    label="Reduzir"
                    variant="filled"
                    error={!reduzir || aumentar?.id === reduzir.id}
                    helperText={!reduzir ? 'Unidade a reduzir obrigatório' :
                      (aumentar?.id === reduzir.id ? 'As unidades a aumentar e reduzir devem ser diferentes' : ' ')}
                    {...params} />
                  }

                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <small>{option.nome}</small>
                    </Box>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <NumberFormat
                  error={valor === 0}
                  minLength={1}
                  margin="dense"
                  size="small"
                  variant="filled"
                  customInput={TextField}
                  value={valor}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix=""
                  fixedDecimalScale={true}
                  allowLeadingZeros={false}
                  label="Valor negociado"
                  sx={{ textAlign: "right" }}

                  helperText={valor === 0 ? 'Valor negociado é obrigatório' : ' '}

                  onValueChange={(values, sourceInfo) => {
                    const { floatValue } = values;
                    setvalor(floatValue ? floatValue : 0)
                    // const { event, source } = sourceInfo;
                  }}
                  displayType="input"
                  allowNegative={false}
                  decimalScale={2}
                  allowEmptyFormatting={false}
                  suffix=""
                  isNumericString={false}
                />
              </Grid>
            </Grid>
          </>

        </CardContent>
        <CardActions >
          <Grid item xs={4}>
          </Grid>

          <Grid item xs={4}>
            <Button variant="contained"
              color="success"
              onClick={handleIncluirNegociacao}
              fullWidth
              disabled={!liberado}
            >
              Incluir
            </Button>
          </Grid>

          <Grid item xs={4}>
          </Grid>
        </CardActions>

        <Grid item xs={12} sx={{ height: '5vh' }}>
        </Grid>
      </Card>
    )

  return <></>
}
