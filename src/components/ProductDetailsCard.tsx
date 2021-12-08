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
import { useRouter } from 'next/router'

export default function ProductDetailsCard({ id }: { id: string }) {
  const [productDetails, setProductDetails] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter()

  useEffect(() => {
    async function fetchProductDetails() {
      setIsLoading(true)
      try {
        const parsedId = parseInt(id)
        const product = await loadProductById(parsedId)
        setProductDetails(product)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    fetchProductDetails()

  }, [id]);

  const onResumeShopping = () => {
    router.push(`/`)
  }

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
                margin: 'auto',
                objectFit: 'scale-down'
              }}
              image={productDetails?.image}
              alt={ productDetails?.title}
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
                {productDetails?.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL' })}
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {productDetails?.description}
              </Typography>


              <div style={{display: 'flex'}}>
                <Rating name="half-rating-read" defaultValue={productDetails?.rating.rate} precision={0.5} readOnly />
                <Typography sx={{ mb: 1.5, ml: 2 }} color="text.secondary">
                  <strong>{productDetails?.rating.count} vendas</strong>
                </Typography>
              </div>


            </CardContent>
          </Box>
          <Box sx={{ display: 'flex' }}>

          </Box>
        </Box>


        <CardActions>
          <Button size="small" onClick={onAddToShoppingCart}>Adicionar ao carrinho</Button>
          <Button size="small" onClick={onResumeShopping}>Voltar ao shopping</Button>
        </CardActions>
      </Card>
    </>
  );
}
