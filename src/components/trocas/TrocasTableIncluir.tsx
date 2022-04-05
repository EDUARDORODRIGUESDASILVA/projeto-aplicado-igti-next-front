import { Autocomplete, Box, Button, Input, styled, TableCell, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { IUnidade } from "../../core/interfaces/IUnidade";
import { IUseRelatorioTrocas } from "../../hooks/useRelatorioTrocas";
import NumberInputFormat from "../../utils/NumberInputFormat";


const AutoCompleteInput = styled(TextField)(({ theme }) => ({
  "label + &": {
    margin: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    padding: "5px 12px",

  },
}));

export default function TrocasTableIncluir({ actions }: { actions: IUseRelatorioTrocas }) {

  const [unidadesAumentar, setUnidadesAumentar] = useState<IUnidade[]>([]);
  const [unidadesReduzir, setUnidadesReduzir] = useState<IUnidade[]>([]);


  if (actions.relatorio) {
  return (
    <TableRow>
      <TableCell padding='none' colSpan={2} sx={{ paddingLeft: '8px' }}>
      </TableCell>

      <TableCell padding='none' sx={{ paddingLeft: '5px', paddingRight: '5px' }}  align="center" >
        <Autocomplete
          disablePortal
          sx={{ width: 310 }}
          id="combo-box-demo"
          options={actions.relatorio.unidadesAumentar}
          getOptionLabel={(option) => option.id.toString()}
         fullWidth
          size="small"
          renderInput={(params) => <AutoCompleteInput
            variant="filled"
            hiddenLabel
            {...params} label="" />

          }

          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <small>{option.nome}</small>
            </Box>
          )}
        />
      </TableCell>

      <TableCell padding='none' sx={{ paddingLeft: '5px', paddingRight: '5px' }} align="center">
        <Autocomplete
          disablePortal
          sx={{ width: 310 }}
          id="combo-box-demo"
          options={actions.relatorio.unidadesAumentar}
          getOptionLabel={(option) => option.id.toString()}
          fullWidth
          size="small"
          renderInput={(params) => <AutoCompleteInput
            variant="filled"
            hiddenLabel
            {...params} label="" />

          }

          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <small>{option.nome}</small>
            </Box>
          )}
        />
      </TableCell>


      <TableCell padding='none' sx={{paddingLeft: '5px', paddingRight: '5px'}} align="center">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={actions.relatorio.produtos}
          groupBy={(option) => option.bloco}
          getOptionLabel={(option) => option.nome}
          size="small"
          fullWidth
          sx={{ width: 350 }}
          renderInput={(params) => <AutoCompleteInput
            variant="filled"
            hiddenLabel
            {...params}  />}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <small>{option.nome}</small>
            </Box>
          )}
        />
      </TableCell>

      <TableCell padding='none' sx={{ paddingLeft: '5px', paddingRight: '5px' }} align="center"
      >
        <NumberInputFormat
        handleInputChanges={()=>{}} value={0}         ></NumberInputFormat>
      </TableCell>

      <TableCell padding='none' align="center" sx={{ paddingLeft: '5px', paddingRight: '15px' }}  colSpan={2} >
        <Button variant="contained"
          color="success"
          fullWidth
          size="small"
        >
          Incluir
        </Button>

      </TableCell>


    </TableRow>
  )
  }

  return <></>
}
