import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTheme } from '@mui/material';
import {
  logoutUser,
  selectUser,
  selectMode,
  changeMode,
} from '@/features/user/userSlice';
import TemporaryDrawer from '../Sidebar/sidebar';

export default function ButtonAppBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const mode = useSelector(selectMode);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const theme = useTheme(); // Obtén el tema actual

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
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
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AsistMe
          </Typography>
          <IconButton onClick={() => dispatch(changeMode())}>
            <Brightness4Icon
              sx={{
                transition: 'transform 0.4s',
                transform:
                  mode === 'dark' ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            />
          </IconButton>
          {/* {user ? (
            <Typography variant="h7" component="div">Bienvenido, {((user.username))} </Typography>
          ) : (null)} */}
          {/* <Button
            color="inherit"
            onClick={handleLogout}
          >Salir</Button> */}
        </Toolbar>
      </AppBar>
      <TemporaryDrawer
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        username="juani"
        role="admin"
      />
    </Box>
  );
}
