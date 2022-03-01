import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import AppBar from './Appbar'

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Container maxWidth="xl">
        <AppBar></AppBar>
        {/* <Box sx={{
          my: 10,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        </Box> */}
        <Box
          sx={{
            my: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}

        </Box>
      </Container>
    </>
  )
}
