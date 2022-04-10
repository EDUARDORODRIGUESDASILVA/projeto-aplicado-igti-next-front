import Button from '@mui/material/Button';
import { useAppDispatch } from '../../store/hooks';
import { openTrocasModal } from '../../store/sidebarSlice';
import TrocasModal from './TrocasModal';
export default function TrocasButton(props: { unidadeId: number }) {
  const dispatch = useAppDispatch();

  const handleOpen = () =>{
      dispatch(openTrocasModal())
  }
  return (
    <><Button onClick={handleOpen}>Negociações</Button>
      <TrocasModal unidadeId={props.unidadeId}></TrocasModal></>
  )
}
