import AjustarMetas from "../../components/ajustes/ajustarMetas";
import Dashboard from "../../components/dashboard/Dashboard";
import { Grid, Paper } from '@mui/material';

export default function index() {
  return (
    <div>
      <Dashboard>
        <div>
          {/* Chart */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <AjustarMetas></AjustarMetas>
              </Paper>
            </Grid>
          </Grid>
        </div>

      </Dashboard>
    </div>
  )
}
