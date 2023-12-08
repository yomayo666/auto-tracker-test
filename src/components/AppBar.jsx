import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppNavbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Your App Name</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;
