import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import GroupIcon from '@mui/icons-material/Group';
import { useRouter } from 'next/router';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
export default function SideNav() {
  const router = useRouter();
  const pathname = router.pathname
  return (
    <>
    <List component="nav">
      <List>
          <ListItemButton
            selected={router.pathname == '/relatorio'}
            component="a" onClick={() => router.push('/relatorio/2625')} >
            <ListItemIcon>
              <AppRegistrationIcon />
            </ListItemIcon>
            <ListItemText primary="Ajustes" />
          </ListItemButton>

        <ListItemButton
            disabled={true}
            selected={pathname == '/trocas'}
            component="a" onClick={() => router.push('/trocas')} >
          <ListItemIcon>
              <SwapHorizIcon />
          </ListItemIcon>
          <ListItemText primary="Negociações" />
        </ListItemButton>

          <ListItemButton
            disabled={true}
            selected={pathname == '/Outliers'}
            component="a" onClick={() => router.push('/Outliers')} >
            <ListItemIcon>
              <ErrorOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Outliers" />
          </ListItemButton>


          <ListItemButton
            disabled={true}
            selected={pathname == '/unidades'}
            component="a" onClick={() => router.push('/unidades')} >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItemButton>
          {/* <ListItemButton
            selected={pathname == '/about'}
            component="a"  onClick={() => router.push('/about')} >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton> */}
    </List>

      <Divider sx={{ my: 1 }} />
      {/* {secondaryListItems} */}
    </List>
    </>
  )
}
