import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AppBarComponent = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">GPS Tracker App</Typography>
        <div style={{ marginLeft: "auto" }}>
          <Button color="inherit" component={Link} to="/devices">
            Devices
          </Button>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
