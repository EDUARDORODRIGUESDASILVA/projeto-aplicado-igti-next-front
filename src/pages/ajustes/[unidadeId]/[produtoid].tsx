import Dashboard from "../../../components/dashboard/Dashboard";
import AjusteMetas from "../../../components/ajustes/AjusteMetas";

export default function index() {
  return (
    <div>
      <Dashboard>
        <div>
          {/* Chart */}
          <AjusteMetas></AjusteMetas>
          {/* <Grid container spacing={1} maxWidth="xl" xl={12}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <AjustarMetas></AjustarMetas>
              </Paper>
            </Grid>
          </Grid> */}
        </div>

      </Dashboard>
    </div>
  )
}
