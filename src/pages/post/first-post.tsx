import React from 'react'
import Layout from '../../components/Layout'
import Typography from '@mui/material/Typography';
import HorizontalBarChart from '../../components/charts/HorizontalBarChart';
export default function FirstPost() {
  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Gráfico
      </Typography>
      <HorizontalBarChart />
    </Layout>

  )
}
