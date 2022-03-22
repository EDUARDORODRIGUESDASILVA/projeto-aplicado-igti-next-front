import Dashboard from "../../../components/dashboard/Dashboard";
import AjustarMetasV1 from "../../../components/ajustes/AjustarMetasV1";

export default function index() {
  return (
    <div>
      <Dashboard>
        <div>
          {/* Chart */}
          <AjustarMetasV1></AjustarMetasV1>
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
