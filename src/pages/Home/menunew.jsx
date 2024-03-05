import React from 'react';
import { Fab, useTheme } from '@mui/material';
import { Add as AddIcon, HomeOutlined as HomeIcon, SearchOutlined as ExploreIcon, FavoriteBorderOutlined as FavoriteIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
function FooterMenu() {
  const theme = useTheme();

  const styles = {
    root: {
      position: 'fixed',
    },
    iconButton: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    icon: {
      color: theme.palette.text.primary,
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
    <div style={styles.root}>
      <Fab style={styles.iconButton}>
        <AddIcon style={styles.icon} />
      </Fab>
      <Fab style={styles.iconButton}>
        <HomeIcon style={styles.icon} />
      </Fab>
      <Fab style={styles.iconButton}>
        <ExploreIcon style={styles.icon} />
      </Fab>
      <Fab style={styles.iconButton}>
        <FavoriteIcon style={styles.icon} />
      </Fab>
    </div>
    </Box>
  );
}

export default FooterMenu;
