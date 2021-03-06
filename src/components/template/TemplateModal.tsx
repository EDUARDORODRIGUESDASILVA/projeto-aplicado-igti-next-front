import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Trocas from './Template';
import { createTheme, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   width: '90%',
//   height: '90%',

//   transform: 'translate(-50%, -50%)',
//   bgcolor: 'background.paper',

//   boxShadow: 10,
//   p: 3,
// };
const mdTheme = createTheme();

export default function TemplateModal( props: { unidadeId: number}) {
  const [open, setopen] = React.useState(false);

  // const open = useAppSelector(selectTrocasModalState);
  // const dispatch = useAppDispatch();

  const handleOpen = () => {
    setopen(true)
  }

  const handleClose = () => {
    //dispatch(closeTrocasModal())
    setopen(false)
  }

  return (
    <>
      <Button onClick={handleOpen}>Abrir modal</Button>
      <ThemeProvider theme={mdTheme}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              boxShadow: 10,
              position: 'absolute' as 'absolute',
              top: '10%',
              left: '10%',
              width: '80vw',
              height: '80vh',
              overflow: 'auto',
              p: 2,
            }}
          >
            <Trocas unidadeId={props.unidadeId}></Trocas>
          </Box>
        </Modal>
        </ThemeProvider>
    </>
  )
}

