import { Grid, Paper } from '@mui/material';
import UnidadesList from './UnidadesList';

export default function UnidadesGrid() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <UnidadesList/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
