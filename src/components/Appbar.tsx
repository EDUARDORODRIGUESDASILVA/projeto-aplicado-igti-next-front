import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import { Box, IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import ShoppingCartCount from './ShoppingCartCount';
import Link from './Link'
import SearchBar from './SearchBar';




export default function Appbar() {
  const [tabindex, settabindex] = useState(0);
  const handleChange = () => {

  }
  return (
    <React.Fragment>
      <Box>
        <AppBar position="fixed" >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <Link href="/" style={{textDecoration: 'none'}} color="inherit">
                <strong> Amazonas</strong>
              </Link>
            </Typography>
            {/*
            <SearchBar/>

           <Tabs
              value={tabindex}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Item One"  />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs> */}




            <ShoppingCartCount></ShoppingCartCount>




            <Avatar sx={{ bgcolor: deepOrange[500] }}>ERS</Avatar>

          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  )
}
