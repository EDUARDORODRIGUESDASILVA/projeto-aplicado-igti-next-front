import { Button } from "@mui/material";
import { IUseRelatorio } from "../../hooks/useRelatorioPorAgregador";

export default function RelatorioBaseCompleta({ actions }: { actions: IUseRelatorio }) {
  return (
    <Button variant="text"
      sx={{ mr: 1 }}
      onClick={actions.handleExcelClick}
      disabled={true}
    >
      Exportar base completa
    </Button>

  )
}
