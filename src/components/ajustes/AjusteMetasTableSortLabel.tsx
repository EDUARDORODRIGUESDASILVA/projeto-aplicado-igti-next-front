import { Box, TableSortLabel } from "@mui/material"
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from "react";
import { IUseAjuste } from "../../hooks/useAjustePorAgregador";

type Order = 'asc' | 'desc';
type IAjusteMetasSortKey = 'Ajustada' | 'Referencia' | 'Referencia2' | 'Cluster' | 'Minima' | 'Unidade'
export interface IAjusteMetasSortOptions {
  chave: IAjusteMetasSortKey,
  label: React.ReactFragment,
  fisrtSort: Order
  enabled: boolean
}
export interface IAjusteMetasSortSelected {
  chave: IAjusteMetasSortKey,
  sortOrder: Order
}

export default function AjusteMetasTableSortLabel({ actions, options }:
  { actions: IUseAjuste, options: IAjusteMetasSortOptions }) {

  const [sortOrder, setsortOrder] = useState<Order>(options.fisrtSort );
  // useEffect(() => {
  //    const op = actions.sortOptions
  //    if (op.chave == options.chave && op.sortOrder != sortOrder) {
  //      handleSortChange(op.sortOrder)
  //    }
  // }, [actions.sortOptions]);

  const handleSortChange = (newOrder: Order) => {

    const sortOption = {
        chave: options.chave,
        sortOrder: newOrder
    }
    actions.handleSortChange(sortOption)

  }

  const toggleSortOrder = () => {
    let newOrder = sortOrder
    // if (actions.sortOptions.chave == options.chave)
    //   newOrder = actions.sortOptions.sortOrder

    newOrder = (newOrder === 'asc' ?  'desc': 'asc')
    setsortOrder(newOrder)
    handleSortChange(newOrder)
  }

  if (options && options.enabled)
  return (
    <TableSortLabel
      active={actions.sortOptions.chave === options.chave}
      // active = {true}
      direction={sortOrder}
      onClick={toggleSortOrder}
    >
      {options.label}
      {actions.sortOptions.chave === options.chave ? (
        <Box component="span" sx={visuallyHidden}>
          {sortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
        </Box>
      ) : null}
    </TableSortLabel>
  )

  return <></>
}
