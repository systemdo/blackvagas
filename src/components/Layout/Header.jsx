import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import { Link as LinkRouter } from 'react-router-dom';


const Header = ()  =>  {
  return (
    <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Link component={LinkRouter} to="/cadastrar-empresa" style={{color: '#fff'}}>
        <Typography variant="h6">
          BlackVagas
        </Typography>
      </Link>
      <Button component={LinkRouter} to="/cadastrar-empresa" style={{color: '#fff'}}>
        Cadastro Empresa
      </Button>
    </Toolbar>
  </AppBar>
  );
}

export default Header;