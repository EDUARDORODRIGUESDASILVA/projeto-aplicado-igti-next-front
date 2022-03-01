import * as React from 'react';
import type { NextPage } from 'next';
import Dashboard from '../components/dashboard/Dashboard';
import HomeGrid from '../components/grid/HomeGrid';

const Home: NextPage = () => {
  return (
    <>
      <Dashboard>
        <>
          <HomeGrid></HomeGrid>
        </>
      </Dashboard>

    </>


  );
};

export default Home;
