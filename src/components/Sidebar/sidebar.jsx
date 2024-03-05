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
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/features/user/userSlice';
import { Grid, Typography } from '@mui/material';
export default function TemporaryDrawer({
  isOpen,
  toggleDrawer,
  username,
  role,
}) {
  const dispatch = useDispatch();
  const menuItems = [
    { text: 'Inicio', path: '/home', icon: <HomeIcon /> },
    { text: 'Asistencias', path: '/asistencias', icon: <EventIcon /> },
    { text: 'Administracion', path: '/administracion', icon: <BusinessIcon /> },
    { text: 'Alumnos', path: '/alumnos', icon: <PersonIcon /> },
  ];
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <Grid container direction="column" alignItems="center" spacing={2} sx={{marginTop:2, marginBottom:2}}>
      <Grid item>
        <PersonIcon fontSize="large" />
      </Grid>
      <Grid item>
        <Typography variant="h1" align="center">
          {username}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" align="center">
          {role}
        </Typography>
      </Grid>
    </Grid>
        <Divider />
        <Grid container direction="column" alignItems="center" spacing={2} sx={{p:3, marginBlock:2}}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            component={Link}
            to={item.path}
            sx={{ color: 'inherit', textDecoration: 'none' }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        </Grid>
        <Divider />
        <ListItem
          disablePadding
          sx={{ color: 'inherit', textDecoration: 'none' }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Salir" onClick={handleLogout} />
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
