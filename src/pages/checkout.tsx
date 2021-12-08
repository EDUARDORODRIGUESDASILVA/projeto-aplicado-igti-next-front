import React from 'react'
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Layout from '../components/Layout';
import CheckoutList from '../components/CheckoutList';

const Checkout: NextPage = () => {
  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Carrinho de compras
      </Typography>

      <CheckoutList></CheckoutList>

    </Layout>

  )
}

export default Checkout
