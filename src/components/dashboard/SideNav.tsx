import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import GroupIcon from '@mui/icons-material/Group';
import { useRouter } from 'next/router';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { selectTrocasModalState } from '../../store/sidebarSlice';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/userSlice';

export default function SideNav() {
  const router = useRouter();

  const user = useAppSelector(selectUser);
  const unidadeId =  user ? user.unidadeId :  2625

  const pathname = router.pathname
  const openedTrocasModal = useAppSelector(selectTrocasModalState);
  return (
    <>
    <List component="nav">
      <List>
          <ListItemButton
            selected={router.pathname.startsWith('/relatorio') || router.pathname.startsWith('/ajustes')  }
            component="a" onClick={() => router.push(`/relatorio/${unidadeId}`)} >
            <ListItemIcon>
              <AppRegistrationIcon />
            </ListItemIcon>
            <ListItemText primary="Ajustes" />
          </ListItemButton>

        <ListItemButton
            disabled={false}
            selected={router.pathname == '/trocas'}
            component="a" onClick={() => router.push('/trocas/')} >
          <ListItemIcon>
              <SwapHorizIcon />
          </ListItemIcon>
          <ListItemText primary="Negociações" />
        </ListItemButton>

          {/* <ListItemButton
            disabled={true}
            selected={pathname == '/Outliers'}
            component="a" onClick={() => router.push('/outliers/')} >
            <ListItemIcon>

            </ListItemIcon>


            <ListItemText primary="Outliers" />
          </ListItemButton> */}

          <ListItemButton
            selected={pathname == '/usuarios'}
            component="a" onClick={() => router.push('/usuarios/')} >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItemButton>
    </List>
      <Divider sx={{ my: 1 }} />
    </List>
    </>
  )
}
