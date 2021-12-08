import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { IProduct } from '../interfaces/IProduct';
import { loadProductById } from '../services/shoppingService';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { addProduct } from '../store/shoppingCartSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function ProductDetailsCard({ id }: { id: string }) {
  const [productDetails, setProductDetails] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchProductDetails() {
      setIsLoading(true)
      try {
        const product = await loadProductById(parseInt(id))
        setProductDetails(product)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    fetchProductDetails()

  }, [id]);

  const onAddToShoppingCart = () => {
    if(productDetails){
      dispatch(addProduct({ id: productDetails.id, amount: 1 }))
    }

  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (productDetails == null) {
    return <div> erro</div>
  }

  return (
    <>
      <Card sx={{ minWidth: 275, mt: 1 }}>
        <Box sx={{ display: 'flex' }}>
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
                {productDetails?.price}
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {productDetails?.description}
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <Rating name="half-rating-read" defaultValue={productDetails?.rating.rate} precision={0.5} readOnly />
                <strong>{productDetails?.rating.count} vendas</strong>
              </Typography>

            </CardContent>
          </Box>
          <Box sx={{ display: 'flex' }}>

          </Box>
        </Box>


        <CardActions>
          <Button size="small" onClick={onAddToShoppingCart}>Adicionar ao carrinho</Button>
        </CardActions>
      </Card>
    </>
  );
}
