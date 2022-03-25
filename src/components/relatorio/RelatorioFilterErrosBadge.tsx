import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState } from 'react';
import { IUseRelatorio } from '../../hooks/useRelatorioPorAgregador';
import { RelatorioPorAgregadorFilter } from '../../core/model/relatorio-objetivos/RelatorioPorAgregador';
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function RelatorioFilterErrosBadge({ actions }: { actions: IUseRelatorio }) {

  const [checked, setchecked] = useState(false);

  const toggleChecked = () => {
    if(actions.relatorio) {
      const j: RelatorioPorAgregadorFilter = {
        comErros: false,
        produtos: actions.relatorio.filter.produtos,
        unidades: []
      }
      j.comErros = !checked
      setchecked(j.comErros)
      actions.handleFilterChange(j)
      actions.setPage(0)
    }

  }
  if (actions.relatorio)
    return (
      <IconButton aria-label="cart" onClick={toggleChecked}
        disabled={actions.relatorio.erros === 0 && checked==false}
      color={checked ? 'primary' : 'default'}>
        <StyledBadge badgeContent={actions.relatorio.erros} color="error">
          <ErrorOutlineIcon />
        </StyledBadge>
      </IconButton>
    )

  return <></>
}
