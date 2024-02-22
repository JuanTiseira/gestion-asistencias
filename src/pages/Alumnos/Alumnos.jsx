import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import Spinner from '@/components/Spinners/Spinner';
import AlumnosTable from '@/components/Tables/AlumnosTable/AlumnosTable';
import {
  getAlumnos,
  selectAlumnos,
  selectedAlumnoData,
} from '@/features/alumnos/alumnosSlice';
import AlumnosForm from '@/components/Forms/AlumnosForm/AlumnosForm';
import AgregarAlumno from './AgregarAlumno/AgregarAlumno';

function Alumnos() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alumnos = useSelector(selectAlumnos);
  const alumnoSeleccionado = useSelector(selectedAlumnoData);
  const [alumnoValues, setAlumnoValues] = useState('');

  useEffect(() => {
    console.log('dispachando');
    dispatch(getAlumnos());
  }, [dispatch]);

  useEffect(() => {
    console.log('cambiando');

    if (alumnoSeleccionado) {
      setAlumnoValues(alumnoSeleccionado);
    }
  }, [alumnoSeleccionado]);

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
      {/* {loading && <Spinner />} */}
      {/* Contenido de la página */}
      <Box sx={{ textAlign: 'center', marginY: 3 }}>
        <Typography variant="sectionTitle">Gestion de Alumnos</Typography>
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
          onClick={() => navigate('/alumnos/agregar-alumno')}
        >
          Agregar Alumno
        </Button>
      </Box>
      <Stack
        sx={{
          boxShadow: 3,
          backgroundColor: 'grey.200',
          color: 'white',
        }}
      >
        {alumnos ? <AlumnosTable theme={theme} data={alumnos} /> : null}
      </Stack>
    </Container>
  );
}

export default Alumnos;
