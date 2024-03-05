import React, {useEffect} from 'react';
import { Grid, Paper, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, Container, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAsistencia, getAsistenciaById } from '@/features/asistencias/asistenciasSlice';
import { useDispatch } from 'react-redux';
import Home from '@mui/icons-material/Home';
import { ArrowBack } from '@mui/icons-material';
function AsistenciaDetail() {
  const dispatch = useDispatch();
  const { asistenciaId } = useParams();
  const asistencia = useSelector(getAsistencia);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(asistenciaId)
    dispatch(getAsistenciaById(asistenciaId));
  }, []);
  
  return (
      <Stack
        sx={{
          p: 2,
          m: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'grey.100',
          color: 'white',
          marginBottom: '20px',

        }}
      >
      <Container>
        <Grid item sx={{p:2}}>
          <Button
            startIcon={<ArrowBack />}
            variant="contained"
            color="secondary"
            onClick={() => navigate('/asistencias')}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Volver
          </Button>
        </Grid>
        {asistencia && <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
      <Typography variant="h2" gutterBottom>
        Detalle de Asistencia
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="h4" gutterBottom>
        Información General:
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">Fecha:</TableCell>
              <TableCell>{asistencia.fecha}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Carrera:</TableCell>
              <TableCell>{asistencia.carrera.nombre}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Materia:</TableCell>
              <TableCell>{asistencia.materia.nombre}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Alumnos Presentes:</TableCell>
              <TableCell>{asistencia.cantidad_presentes}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Alumnos Ausentes:</TableCell>
              <TableCell>{asistencia.cantidad_ausentes}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Alumnos en Tardanza:</TableCell>
              <TableCell>{asistencia.cantidad_tardanza}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Alumnos Justificados:</TableCell>
              <TableCell>{asistencia.cantidad_justificados}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 3 }}>
        Detalles de Alumnos:
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Estado de Asistencia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {asistencia.alumnos.map((alumno) => (
              <TableRow key={alumno.id}>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>{alumno.apellido}</TableCell>
                <TableCell>{alumno.estado_asistencia}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>}
      </Container>
    </Stack>
  );
}

export default AsistenciaDetail;
