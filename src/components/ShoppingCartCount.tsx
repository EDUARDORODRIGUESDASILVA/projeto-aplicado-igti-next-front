import React, { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {IconButton } from '@mui/material'
import Badge from '@mui/material/Badge';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectShoppingCartCount } from '../store/shoppingCartSlice';
import { useRouter } from 'next/router'
export default function ShoppingCartCount() {
  const router = useRouter()
  const count = useAppSelector(selectShoppingCartCount);
  const onShoppingChartClick = () => {
    router.push(`/checkout`)
  }
  return (
    <IconButton
      size="large"
      aria-label="show 17 new notifications"
      color="inherit"
      onClick={onShoppingChartClick}
    >
      <Badge badgeContent={count} color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  )
}
