import CircularProgress from '@mui/material/CircularProgress';
import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid';
import { useFetchProductList } from '../hooks/useFetchProductList';


const ListProducts = () => {

  const {isLoading, productsList} = useFetchProductList()

  if (isLoading) {
    return <CircularProgress />
  }
  return (
    <div>
      <Grid container spacing={1}>
        {productsList.map(product =>
        (
          <Grid key={product.id} item xs={3}>
            <ProductCard  product={product} />
          </Grid>
        )
        )}
      </Grid>
    </div>
  );
}

export default ListProducts;





