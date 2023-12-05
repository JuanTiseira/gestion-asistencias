import React, { useState} from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode, selectMode } from '@/features/user/userSlice';
import Brightness4Icon from '@mui/icons-material/Brightness4';
function SimpleMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<MenuIcon />}
      >
        Open Menu
      </Button>
      <IconButton
        onClick={() => dispatch(changeMode())}
        sx={{ position: 'absolute', top: 20, right: 40 }}
      >
        <Brightness4Icon
          sx={{
            transition: 'transform 0.4s',
            transform: mode === 'dark' ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Item 1</MenuItem>
        <MenuItem onClick={handleClose}>Item 2</MenuItem>
        <MenuItem onClick={handleClose}>Item 3</MenuItem>
      </Menu>
    </div>
  );
}

export default SimpleMenu;
