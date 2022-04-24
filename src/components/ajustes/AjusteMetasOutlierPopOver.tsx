import { Alert, AlertTitle, Button, Card, CardActions, CardContent, CardMedia, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { AjustarProdutoRow } from "../../core/model/ajustar-objetivos/AjustarProdutoRow";
import { IUseAjuste } from "../../hooks/useAjustePorAgregador";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import NumberTextFormat from "../../utils/NumberTextFormat";

export default function AjusteMetasOutlierPopOver({ row, actions }: { row: AjustarProdutoRow, actions: IUseAjuste }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>       <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <PriorityHighIcon color="warning" fontSize="small"
        style={{ display: (row.isOutlier() ? '' : 'none'), marginLeft: '7px', }} />
      </Typography>

    <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: 'none',
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
                  <Alert severity="warning">
                    <AlertTitle>Outlier</AlertTitle>
                    Essa unidade é outlier de <strong>{row.isMaxOutlier() ? 'Máximo': 'Mínimo'}</strong> em seu cluster<br />
                    {row.isMinOutlier() ? <h4>Aumentar valor: <NumberTextFormat value={row.outlierValorAumentar()} /></h4> : <></>}
                    {row.isMaxOutlier() ?<h4>Reduzir valor: <NumberTextFormat value={row.outlierValorReduzir()} /></h4>: <></>}
                  </Alert>
            </Typography>
          </CardContent>
        </Card>
    </Popover>
  </>
  )
}
