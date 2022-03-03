import Dashboard from "../../components/dashboard/Dashboard";
import { Grid, Paper } from '@mui/material';
import AjustarMetas2 from "../../components/ajustes/AjustarMetas2";
import AjustarMetas from "../../components/ajustes/AjustarMetas";

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

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <AjustarMetas2></AjustarMetas2>
            </Paper>
          </Grid>

        </div>

      </Dashboard>
    </div>
  )
}
