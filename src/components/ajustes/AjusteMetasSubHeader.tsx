import { Chip } from "@mui/material";
import { IUseAjuste } from "../../hooks/useAjustePorAgregador";

export default function AjusteMetasSubHeader({ actions }: { actions: IUseAjuste }) {
  if (actions.ajuste ) {
    let erroString = `${actions.ajuste.erros} erro${actions.ajuste.erros > 1 ? 's': ''}`

    return (
    <div>
        <span>{actions.ajuste.unidade.nome}</span>

        {actions.ajuste.erros}
        {actions.ajuste.erros !== 0 ? (
          <Chip color="error" size="small" label={erroString}
           variant="outlined" sx={{marginLeft: '15px'}}/>
        ): (<></>) }

        {actions.ajuste.saldo !== 0 ? (
          <Chip color="error" size="small" label={'Diferença de saldo'}
           variant="outlined" sx={{ marginLeft: '15px' }} />
        ) : (<></>)}

        {actions.isActive == 0 ? (<>
          <Chip color="error" size="small" label={'Produto fechado'}
             sx={{ marginLeft: '15px' }} />
        </>): (<></>)}
    </div>
  )
  }
  return <></>
}
