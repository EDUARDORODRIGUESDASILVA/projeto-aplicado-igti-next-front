import * as React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import { Button, createTheme, TextField, ThemeProvider } from '@mui/material';
import { IUseRelatorioTrocas } from '../../hooks/useRelatorioTrocas';
import TrocasIncluir from './TrocasIncluir';

const mdTheme = createTheme();



export default function TrocasModalIncluir({ actions }: { actions: IUseRelatorioTrocas }) {
    const handleOpen = () => {
    setopen(true)
  }

  const handleClose = () => {
    setopen(false)
  }

  const [open, setopen] = React.useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={handleOpen}
      >
        Incluir Negociação
      </Button>


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
              top: '7%',
              left: '25%',
              width: '50vw',
              height: '86vh',
              overflow: 'auto',
              p: 2,
            }}
          >
            <TrocasIncluir actions={actions} closeModal={handleClose}></TrocasIncluir>

          </Box>
        </Modal>
      </ThemeProvider>
    </>
  )
}

