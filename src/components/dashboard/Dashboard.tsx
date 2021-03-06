import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SideNav from './SideNav';
import UserAvatar from './UserAvatar';
import SignIn from '../sign-in/SignIn';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useFetchLoggedUser } from '../../hooks/useFetchLoggedUser';
import { useRouter } from 'next/router'
import { selectSidebarState } from '../../store/sidebarSlice';
import { toggleSidebar} from '../../store/sidebarSlice';
import { Alert, AlertTitle } from '@mui/material';
import json2mq from 'json2mq';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth: number = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent({ children }: LayoutProps) {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectSidebarState);
  const router = useRouter()
  const toggleDrawer = () => {
    // setOpen(!open);
    dispatch(toggleSidebar())

  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
                onClick={() => { router.push('/') }}
              sx={{ flexGrow: 1 }}
              style={{cursor: 'pointer'}}
            >
              Distribui????o de metas
            </Typography>

            <UserAvatar></UserAvatar>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <SideNav></SideNav>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
interface LayoutProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: LayoutProps) {
  const {user, isLoading, error} = useFetchLoggedUser()

  const matches = useMediaQuery(
    json2mq({
      minWidth: 1440,
    }),
  );

   if (!user) {
    return <DashboardContent>
      <SignIn isloading={isLoading} error={error} ></SignIn>
    </DashboardContent>
  }

  if (!matches) {
    return <DashboardContent>
      <Alert severity="error">
        <AlertTitle>Resolu????o n??o suportada!</AlertTitle>
        Para uma melhor experi??ncia, utilize um dispositivo com uma <strong>resolu????o m??nima de 1440px.</strong>
      </Alert>
    </DashboardContent>
  }

  if(user){
    return <>
      <DashboardContent>
        {children}
      </DashboardContent>
    </>
  }

  return <>
    <DashboardContent>
    </DashboardContent>
  </>

}
