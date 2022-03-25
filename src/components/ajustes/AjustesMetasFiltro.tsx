import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { IUseAjuste } from "../../hooks/useAjustePorAgregador";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AjusteMetasFiltroOption } from "../../core/model/ajustar-objetivos/AjusteMetasFiltroFunctions";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



export default function AjustesMetasFiltro({ actions }: { actions: IUseAjuste }) {


  const handleChange = (event: object, value: AjusteMetasFiltroOption[], reason: string) => {
    if(value){
      actions.handleFiltro(value)
    }

  }

  return (
    <Autocomplete
      multiple
      size="small"
      id="checkboxes-tags-demo"
      options={actions.filterOptions}
      groupBy={(option) => option.group}
      disabled={false}
      value={actions.filterValue}
      selectOnFocus
      clearOnBlur
      disableCloseOnSelect
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}
          style={{ height: '1.3rem' }}
        >
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 4, height: '1.3rem' }}
            checked={selected}

            disabled={false}
          />
          {option.label}
        </li>
      )}

      renderInput={(params) => (
        <TextField {...params} placeholder="Pesquisa" />
      )}
    />
  );
}
