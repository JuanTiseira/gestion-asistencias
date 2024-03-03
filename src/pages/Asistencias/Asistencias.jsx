import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import AdminTable from '@/components/Tables/AdminTable/AdminTable';
import Spinner from '@/components/Spinners/Spinner';
import SearchForm from '@/components/Forms/Asistencias/SearchForm/SearchForm';
import { loadingAsistencias, selectAsistencias, getFormData, changeFormData, getAsistencias, getAsistencia } from '@/features/asistencias/asistenciasSlice';
import AsistenciasTable from '@/components/Tables/AsistenciasTable/AsistenciasTable';
import AsistenciaDetail from '@/components/Forms/Asistencias/AsistenciaDetail/AsistenciaDetail';

function Admin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const loading = useSelector(loadingAsistencias);
  const asistenciasData = useSelector(selectAsistencias);
  const asistencia = useSelector(getAsistencia);

  const dispatch = useDispatch();
  const formData = useSelector(getFormData);

  const handleFormChange = ({ errors, data }) => {
    dispatch(changeFormData(data));
    setData(data);
  };

  useEffect(() => {
    
    dispatch(getAsistencias());
  
  }, [dispatch]);

  return (
    <Container
      sx={{
        marginTop: '55px',
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'grey.100',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {loading && <Spinner />}
      {/* Contenido de la página */}
      <Box sx={{ textAlign: 'center', marginY: 3 }}>
        <Typography variant="sectionTitle">Asistencias</Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'grey.200',
          marginBottom: '20px',
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/asistencias/agregar-asistencia')}
        >
          Agregar asistencias
        </Button>
      </Box>
      <Box
        sx={{
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'grey.200',
          marginBottom: '20px',
        }}
      >
        <SearchForm />
      </Box>
      <Stack
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'grey.200',
          color: 'white',
        }}
      >
        {asistenciasData ? <AsistenciasTable theme={theme} asistenciasData={asistenciasData} /> : null}
      </Stack>
      
    </Container>
  );
}

export default Admin;
