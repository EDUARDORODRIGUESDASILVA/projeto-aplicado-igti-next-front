import React, {useState, useEffect} from 'react'
import { useAppSelector } from '../store/hooks';
import { selectShoppingCartProducts, ShoppingCartProduct } from '../store/shoppingCartSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { useFetchProductList } from '../hooks/useFetchProductList';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Grid from '@mui/material/Grid';
import CheckoutItemCard from './CheckoutItemCard';
import Link from './Link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function CheckoutList() {
  const products = useAppSelector(selectShoppingCartProducts);
  const { isLoading, productsList } = useFetchProductList()


  const [total, setTotal] = useState(0);

  useEffect(() => {
    let acumulador = 0
    products.forEach( p => {
      const f = productsList.find(pl => pl.id === p.id)
      if (f) {
        acumulador += f.price * p.amount
      }
    })
    setTotal(acumulador)

}, [products, productsList]);


  if (products.length == 0) {
    return (
      <Alert severity="warning">
        <AlertTitle>Sem produtos no carrinho</AlertTitle>

        <Link href="/" color="secondary">
          Ir para <strong>shopping</strong>
        </Link>
      </Alert>
    )
  }

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        {products.map((product) => {
          console.log(product)
          const productDetails = productsList.find(pli => pli.id === product.id)
          return (
            <CheckoutItemCard key={product.id} product={product} productDetails={productDetails} />
          )
        }
        )
        }
      </Grid>
      <Grid item xs={4}>

        <Card sx={{ minWidth: 275, mt: 1 }}>
          <CardContent>
            <Typography variant="h1" sx={{ fontSize: 14 }}>
              <ShoppingCartIcon></ShoppingCartIcon>

            </Typography>

            <Typography variant="h1" sx={{ fontSize: 14 }} color="text.secondary">
              Total
            </Typography>
            <Typography variant="h5" component="div">

              {total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </Typography>

          </CardContent>
          <CardActions>
            <Button size="small">Finalizar compra</Button>
          </CardActions>
        </Card>

      </Grid>
    </Grid>
  )

}
