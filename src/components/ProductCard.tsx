import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Rating from '@mui/material/Rating';
import { IProduct } from '../interfaces/IProduct';
import { addProduct } from '../store/shoppingCartSlice';
export default function ProductCard({product}: {product: IProduct}) {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const styles = {

    card: {
      maxWidth: 345,
      maxHeight: 400
    },
    media: {
      height: "120px",
      paddingTop: '56.25%', // 16:9
    },
  };

  const onAddToShoppingCart = () => {
    dispatch(addProduct({ id: product.id, amount: 1 }))
  }
  const onDetails = () => {
    router.push(`/product/${product.id}`)
  }

  return (
    <Card style={styles.card}>
      <CardActionArea onClick={onDetails}>
      <CardMedia
        component="img"
        sx={{ width: 201,
              height: 151,
              marginLeft: 'auto',
              marginRight: 'auto',
              objectFit: 'scale-down'
            }}
        image={product.image}
        alt={product.title}
      />
      <CardContent sx={{ height: 181}}>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {props.product.description}

        </Typography> */}
          <Typography variant="subtitle2" color="text.secondary">
            <strong>R$ {product.price}</strong>
            <Rating name="half-rating-read" defaultValue={product.rating.rate} precision={0.5} readOnly />
          </Typography>

      </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" onClick={onAddToShoppingCart}>Adicionar ao carrinho</Button>
        <Button size="small" onClick={onDetails}>Detalhes</Button>
      </CardActions>
    </Card>

  )
}
