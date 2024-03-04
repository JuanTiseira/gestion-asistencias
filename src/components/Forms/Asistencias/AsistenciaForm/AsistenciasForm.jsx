import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack, Container, Paper, Typography, Box, Grid } from '@mui/material';
import { Autocomplete } from '@mui/material';
import ListaAlumnos from './ListaAlumnos';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Save, Home, Clear } from '@mui/icons-material';
import {
  errorAlumnos,
  getAlumnosByCarrera,
  loadingalumnos,
  selectAlumnos,
} from '@/features/alumnos/alumnosSlice';
import {
  getCarreras,
  getMateriasByCarrera,
  selectCarreras,
  selectMaterias,
} from '@/features/asistencias/asistenciasSlice';

const validationSchema = Yup.object({
  fecha: Yup.date().nullable().required('La fecha es requerida'),
  carrera: Yup.object().nullable().required('La carrera es requerida'),
  materia: Yup.object().nullable().required('La materia es requerida'),
});

function AsistenciasForm({ values, isEdit, onSubmit }) {
  const dispatch = useDispatch();
  const carreras = useSelector(selectCarreras);
  const materias = useSelector(selectMaterias);
  const [carrera, setCarrera] = useState(null);
  const navigate = useNavigate();
  const error = useSelector(errorAlumnos);
  const loading = useSelector(loadingalumnos);
  const alumnos = useSelector(selectAlumnos);

  const formik = useFormik({
    initialValues: values,
    validationSchema,
    onSubmit,
  });

  const handleReset = () => {
    formik.resetForm();
  };

  useEffect(() => {
    dispatch(getCarreras());
  }, []);

  useEffect(() => {
    formik.setFieldValue('alumnos', alumnos);
  }, [alumnos]);

  useEffect(() => {
    if (carrera !== null) {
      dispatch(getMateriasByCarrera({ carrera: carrera.id }));
      dispatch(getAlumnosByCarrera({ carrera: carrera.id }));
    }
  }, [carrera]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
      });
    }
  }, [error]);

  return (
    <Stack>
      <Box sx={{ textAlign: 'center', margin: '25px' }}>
        <Typography variant="h1">
          {isEdit ? 'Editar Asistencia' : 'Registrar Asistencia '}
        </Typography>
      </Box>

      <Container>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Typography variant="h2">Datos de asistencia</Typography>
              <Button
                startIcon={<Home />}
                variant="contained"
                color="secondary"
                onClick={() =>
                  console.log(
                    formik.values.fecha,
                    formik.values.carrera,
                    formik.values.materia,
                    formik.values.alumnos
                  )
                }
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                Imprimir
              </Button>
              <TextField
                InputLabelProps={{
                  ...(formik.values.fecha == '' && { shrink: true }),
                }}
                label="Fecha"
                id="fecha"
                name="fecha"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fecha}
                error={formik.touched.fecha && Boolean(formik.errors.fecha)}
                helperText={formik.touched.fecha && formik.errors.fecha}
              />
              {carreras && (
                <Autocomplete
                  disablePortal
                  id="carrera"
                  name="carrera"
                  options={carreras}
                  getOptionLabel={(option) => option.nombre}
                  value={formik.values.carrera}
                  onChange={(event, value) => {
                    formik.setFieldValue('carrera', value);
                    setCarrera(value);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Carrera" />
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                />
              )}
              {materias && (
                <Autocomplete
                  disablePortal
                  id="materia"
                  name="materia"
                  options={materias}
                  getOptionLabel={(option) => option.nombre}
                  value={formik.values.materia}
                  onChange={(event, value) =>
                    formik.setFieldValue('materia', value)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Materia" />
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                />
              )}
              {alumnos !== null ? (
                <ListaAlumnos listaAlumnos={alumnos} />
              ) : null}
              <Grid
                container
                sx={{
                  gap: 2,
                  display: 'flex',
                  justifyContent: { xs: 'start', sm: 'center' },
                }}
                direction={{ xs: 'column', sm: 'row' }}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<Save />}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                  >
                    Guardar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Clear />}
                    onClick={handleReset}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                  >
                    Limpiar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    startIcon={<Home />}
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/asistencias')}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                  >
                    Volver
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Stack>
  );
}

export default AsistenciasForm;
