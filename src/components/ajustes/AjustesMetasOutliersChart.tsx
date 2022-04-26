import { Avatar, Box, Button, Card, CardHeader, Divider, Grid, IconButton, Paper } from "@mui/material";
import { red } from "@mui/material/colors";
import { IUseAjuste } from "../../hooks/useAjustePorAgregador";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    y: {
      grid: {
        offset: false
      }
    }
  },
  responsive: true,
  plugins: {
    title: {
      display: false,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

import { Bar } from 'react-chartjs-2';
import TitleHead from "../dashboard/Title";

const labels: string[] = [];
const dataPoints: number[] =[]
export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: dataPoints,
      minBarLength: 5,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => 1 ),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      hidden: true
    },
  ],
};


export default function AjustesMetasOutliersChart({ actions }: { actions: IUseAjuste }) {

  if (actions.ajuste) {
    const labels = actions.ajuste.rows.map(r => r.Unidade.nome)
    const values = actions.ajuste.rows.map(r => r.metaAjustada)

    const values1 = actions.ajuste.rows.map(r => r.metaReferencia)
    data.labels = labels
    data.datasets[0].label = 'Meta ajustada'
    data.datasets[0].data = values

    data.datasets[1].label = 'Meta inicial'
    data.datasets[1].data = values1

    return (
      <>
        <Card sx={{ px: '2px' }}>
          <CardHeader
            avatar={
              <IconButton
                onClick={() => { actions.handleAtualizar() }}
              >
                <Avatar sx={{ bgcolor: red[500] }}
                  aria-label="recipe">
                  <small>{actions.ajuste.unidade.id}</small>
                </Avatar>
              </IconButton>
            }
            action={
              <>
                <Box sx={{ mt: '13px' }}>
                  <Button variant="text"
                    onClick={() => { actions.handleGerarExcelOutliers() }}
                  >
                    EXCEL
                  </Button>
                </Box>
              </>}
          title={<TitleHead>{actions.ajuste.produto.nome}</TitleHead>}
            subheader={   <span>{actions.ajuste.unidade.nome}   |   {actions.ajuste.produto.codsidem}   </span>}
          />
        </Card>

        <Paper sx={{ width: '100%', mt: '10px', height: '70vh', padding: '10px'}}>
          <Grid container justifyContent="center">
            <Box sx={{ width: '70%', mt: '10px', maxHeight: '65vh', overflow: 'auto', padding: '1px' }}>
              <Bar options={options} data={data} />
            </Box>

          </Grid>
        </Paper>
      </>
    )
  }
  return <></>
}
