import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { IProduct } from '../../interfaces/IProduct';
import { addProduct, reduceAmount, removeProduct, ShoppingCartProduct } from '../../store/_old/shoppingCartSlice';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Badge, { BadgeProps } from '@mui/material/Badge';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useAppDispatch } from '../../store/hooks';

interface CheckoutItemCardProps {
  productDetails: IProduct | undefined,
  product: ShoppingCartProduct
}
const CheckoutItemCard = ({ product, productDetails }: CheckoutItemCardProps) => {
  const dispatch = useAppDispatch();

  const onAddToShoppingCart = () => {
    dispatch(addProduct({ id: product.id, amount: 1 }))
  }
  const onReduceAmount = () => {
    dispatch(reduceAmount({id: product.id, amount: 1}))
  }

  const onRemoveItem = () => {
    dispatch(removeProduct({id: product.id, amount: 0}))
  }

  return (
    <Card sx={{ minWidth: 275, mt: 1 }}>
      <Box sx={{display: 'flex'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="img"
            sx={{
              width: 201,
              height: 151,
              marginLeft: 'auto',
              marginRight: 'auto',
              objectFit: 'scale-down'
            }}
            image={productDetails?.image}
            alt="Paella dish"
          />

        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent>

            <Typography variant="h5" component="div">
              {productDetails?.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {productDetails?.category}
            </Typography>

            <Typography variant="h6">
              {productDetails?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
               x
              <IconButton aria-label="cart">
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={product.amount} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </IconButton>
              <IconButton color="primary" onClick={onAddToShoppingCart} aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
              <IconButton color="primary" disabled={product.amount==0}
              onClick={onReduceAmount} aria-label="add to shopping cart">
                <RemoveShoppingCartIcon />
              </IconButton>

            </Typography>

          </CardContent>
        </Box>
        <Box sx={{display: 'flex'}}>

        </Box>
      </Box>


      <CardActions>
        <Button size="small" onClick={onRemoveItem}>Remover Item</Button>
      </CardActions>
    </Card>
  );
}

export default CheckoutItemCard;
