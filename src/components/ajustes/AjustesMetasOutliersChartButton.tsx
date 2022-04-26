import Button from '@mui/material/Button';
import { IUseAjuste } from '../../hooks/useAjustePorAgregador';
import { useAppDispatch } from '../../store/hooks';
import { openTrocasModal } from '../../store/sidebarSlice';
import AjusteMetasOutliersChartModal from './AjustesMetasOutliersChartModal';
export default function AjustesMetasOutliersChartButton({actions}: { actions: IUseAjuste }) {
  const dispatch = useAppDispatch();

  const handleOpen = () =>{
      dispatch(openTrocasModal())
  }
  return (
    <><Button onClick={handleOpen}>Gráfico</Button>
      <AjusteMetasOutliersChartModal actions={actions} ></AjusteMetasOutliersChartModal></>
  )
}
