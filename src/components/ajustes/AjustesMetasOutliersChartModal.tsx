import * as React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeTrocasModal, selectTrocasModalState, toggleTrocasModal } from '../../store/sidebarSlice';
import { createTheme, ThemeProvider } from '@mui/material';
import { IUseAjuste } from '../../hooks/useAjustePorAgregador';
import HorizontalBarChart from '../charts/HorizontalBarChart';
import AjustesMetasOutliersChart from './AjustesMetasOUtliersChart';

const mdTheme = createTheme();

export default function AjusteMetasOutliersChartModal({ actions }: { actions: IUseAjuste }) {
  const open = useAppSelector(selectTrocasModalState);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeTrocasModal())
  }

  return (
    <>
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
              top: '5%',
              left: '5%',
              width: '90vw',
              height: '90vh',
              overflow: 'auto',
              p: 2,
            }}
          >
            <AjustesMetasOutliersChart actions={actions}></AjustesMetasOutliersChart>

          </Box>
        </Modal>
        </ThemeProvider>
    </>
  )
}

