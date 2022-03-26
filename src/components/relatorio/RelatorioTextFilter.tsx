import { Box, IconButton, InputAdornment, TextField } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { IUseRelatorio } from "../../hooks/useRelatorioPorAgregador";
import { useState } from "react";
export default function RelatorioTextFilter({ actions }: { actions: IUseRelatorio }) {

  const [filtro, setfiltro] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setTextFilter(value)
  }

  const handleClear = () => {
    setTextFilter('')
  }

  const setTextFilter = (value: string) => {
    if (actions.relatorio) {
      const filtro = actions.relatorio.filter
      filtro.textSearch = value
      setfiltro(value)
      actions.handleFilterChange(filtro)
    }
  };


  if (actions.relatorio) {
    return (
      <TextField id="input-with-sx"
        sx={{ width: '100%' }}
        value={filtro}
        onChange={handleChange}
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {
                (filtro) ? (
                  <IconButton onClick={handleClear}>
                    <ClearIcon />
                  </IconButton>
                ) : (<></>)
              }
            </InputAdornment>
          )
        }}
        placeholder="Pesquisa" size="small" variant="outlined" />

    )
  }

  return <></>




}
