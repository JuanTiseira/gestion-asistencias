import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import AdminTable from '@/components/Tables/AdminTable/AdminTable';

const Admin = () => {
  return (
    <Container fixed sx={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {/* Contenido de la página */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1">
          Administracion
        </Typography>
      </Box>

      <Box>
        <AdminTable />
      </Box>
    </Container>
  );
};

export default Admin;
