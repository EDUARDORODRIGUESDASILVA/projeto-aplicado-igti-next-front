import { Button, Card, CardActions, CardContent, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { IUseRelatorioTrocas } from "../../hooks/useRelatorioTrocas"
import TrocasTableIncluir from "./TrocasTableIncluir"

export default function TrocasIncluir({ actions }: { actions: IUseRelatorioTrocas }) {
  const relatorio = true
  if (relatorio)
    return (
      <Card sx={{ mt: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Incluir troca
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )

  return <></>
}
