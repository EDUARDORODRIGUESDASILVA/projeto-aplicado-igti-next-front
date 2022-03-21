import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { RelatorioPorAgregador } from '../../core/model/RelatorioPorAgregador';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState } from 'react';
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function RelatorioFilterErrosBadge(props:
  { relatorio: RelatorioPorAgregador,
    handleFilterChange: Function }) {
  const relatorio = props.relatorio
  const handleFilterChange = props.handleFilterChange
  const [checked, setchecked] = useState(relatorio.filter.comErros);
  const toggleChecked = () => {
    setchecked(!checked)
    const f = relatorio.filter
    f.comErros = checked
    handleFilterChange(f)
  }
  if (relatorio)
    return (
      <IconButton aria-label="cart" onClick={toggleChecked} color={checked ? 'primary' : 'default'}>
        <StyledBadge badgeContent={relatorio.erros} color="error">
          <ErrorOutlineIcon />
        </StyledBadge>
      </IconButton>
    )

  return <></>
}
