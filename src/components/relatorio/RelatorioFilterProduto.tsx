import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { RelatorioPorAgregador } from '../../core/model/RelatorioPorAgregador';
import { IProduto } from '../../core/interfaces/IProduto';
import { IUseRelatorio } from '../../hooks/useRelatorioPorAgregador';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function RelatorioFilterProduto({ actions }: { actions: IUseRelatorio }) {

  const handleChange = (event: object, value: IProduto | IProduto[], reason: string) => {
    console.log({event, value, reason})

  }

  if (actions.relatorio)
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      size="small"
      options={actions.relatorio.produtos}
      disableCloseOnSelect
      getOptionLabel={(option) => option.codsidem}
      onChange={handleChange}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.nome}
        </li>
      )}
      style={{ width: 400 }}
      renderInput={(params) => (
        <TextField {...params} label="Produtos" placeholder="Produtos" />
      )}
    />
  );

  return <></>
}


