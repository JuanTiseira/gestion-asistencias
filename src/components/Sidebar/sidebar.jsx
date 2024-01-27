import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function TemporaryDrawer({ isOpen, toggleDrawer, username, role }) {

  const menuItems = [
    { text: 'Inicio', path: '/home', icon: <HomeIcon /> },
    { text: 'Asistencias', path: '/asistencias', icon: <EventIcon /> },
    { text: 'Administracion', path: '/administracion', icon: <BusinessIcon /> },
    { text: 'Alumnos', path: '/alumnos', icon: <PersonIcon /> },
  ];

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding sx={{ color: 'inherit', textDecoration: 'none' }}>
          <ListItemText primary={username} secondary={role} />
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
        </ListItem>
        <Divider />
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding component={Link} to={item.path} sx={{ color: 'inherit', textDecoration: 'none' }}>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding sx={{ color: 'inherit', textDecoration: 'none' }}>
          <ListItemButton>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={isOpen}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
