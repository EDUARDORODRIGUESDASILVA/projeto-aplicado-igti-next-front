import * as React from 'react';
import type { NextPage } from 'next';
import ListProducts from '../components/ListProducts';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <ListProducts></ListProducts>
    </Layout>

  );
};

export default Home;
