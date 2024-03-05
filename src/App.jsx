import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import ButtonAppBar from './components/Navbar/navbar';
import TemporaryDrawer from './components/Sidebar/sidebar';
import FooterMenu from './pages/Home/menunew';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ButtonAppBar />
      <Routing />
    </BrowserRouter>
  );
}

export default App;
