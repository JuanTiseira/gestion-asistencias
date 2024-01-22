import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TemporaryDrawer from '../Sidebar/sidebar';
import { useLocation } from 'react-router-dom';
import { logoutUser, selectUser } from '@/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ButtonAppBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () =>{
    dispatch(logoutUser());
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };
  if (location.pathname === '/login') {
    return null;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestion de asistencias
          </Typography>
          {user?(
            <Typography variant="h7" component="div">Bienvenido, {user.rol} {user.username} </Typography>
            
          ):(null)}

          <Button 
            color="inherit"
            onClick={handleLogout}
          >Salir</Button>
        </Toolbar>
      </AppBar>
      <TemporaryDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </Box>
  );
}
