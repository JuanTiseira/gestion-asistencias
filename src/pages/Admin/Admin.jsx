import React from 'react';
import {Paper, Container, Typography, Box, Stack} from '@mui/material';
import AdminTable from '@/components/Tables/AdminTable/AdminTable';

const Admin = () => {
  return (
    <Stack>
      {/* Contenido de la página */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1">
          Administracion
        </Typography>
      </Box>

      <AdminTable />
    </Stack>
  );
};

export default Admin;
