import { Autocomplete, Button, TableCell, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { IUnidade } from "../../core/interfaces/IUnidade";
import { IUseRelatorioTrocas } from "../../hooks/useRelatorioTrocas";
import NumberInputFormat from "../../utils/NumberInputFormat";

export default function TrocasTableIncluir({ actions }: { actions: IUseRelatorioTrocas }) {

  const [unidadesAumentar, setUnidadesAumentar] = useState<IUnidade[]>([]);
  const [unidadesReduzir, setUnidadesReduzir] = useState<IUnidade[]>([]);


  if (actions.relatorio) {
  return (
    <TableRow>
      <TableCell padding='none' colSpan={2} sx={{ paddingLeft: '8px' }}>
      </TableCell>

      <TableCell align="center" >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={actions.relatorio.unidadesAumentar}
          getOptionLabel={(option) => option.nome}
          sx={{ width: 300 }}
          size="small"
          renderInput={(params) => <TextField   {...params} label="Aumentar" />}
        />
      </TableCell>

      <TableCell align="center">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={actions.relatorio.unidadesReduzir}
          getOptionLabel={(option) => option.nome}
          sx={{ width: 300 }}
          size="small"
          renderInput={(params) => <TextField {...params} label="Reduzir" />}
        />
      </TableCell>

      <TableCell align="center">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={actions.relatorio.produtos}
          getOptionLabel={(option) => option.codsidem + '- ' + option.nome}
          sx={{ width: 300 }}
          size="small"
          renderInput={(params) => <TextField {...params} label="Produto" />}
        />
      </TableCell>

      <TableCell align="center"
      >
        <NumberInputFormat
        handleInputChanges={()=>{}} value={0}         ></NumberInputFormat>
      </TableCell>

      <TableCell align="center" >
        <Button variant="contained"
          color="success"
        >
          Incluir
        </Button>

      </TableCell>

      <TableCell align="center" >

      </TableCell>
    </TableRow>
  )
  }

  return <></>
}
