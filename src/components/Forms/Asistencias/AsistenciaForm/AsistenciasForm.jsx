import React, { useEffect, useState } from 'react';
import { useFormik, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  Stack,
  Container,
  Paper,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Save, Home, Clear, BackHand, CheckBox } from '@mui/icons-material';
import {
  errorAlumnos,
  getAlumnos,
  getAlumnosByCarrera,
  loadingalumnos,
  resultAlumnos,
  selectAlumnos,
} from '@/features/alumnos/alumnosSlice';
import { getCarreras, getMaterias, getMateriasByCarrera, 
  selectMaterias, selectCarreras } from '@/features/asistencias/asistenciasSlice';
import { Autocomplete } from '@mui/material';
import ListaAlumnos from './ListaAlumnos';

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es requerido'),
  apellido: Yup.string().required('El apellido es requerido'),
  dni: Yup.number().required('El DNI es requerido'),
  direccion: Yup.string().required('La dirección es requerida'),
  fecha_nacimiento: Yup.date()
    .nullable()
    .required('La fecha de nacimiento es requerida'),
  email: Yup.string()
    .email('Formato de correo electrónico no válido')
    .required('El correo electrónico es requerido'),
  telefono: Yup.string().required('El teléfono es requerido'),
});

function AsistenciasForm({ values, isEdit, onSubmit }) {
  const dispatch = useDispatch();
  const carreras = useSelector(selectCarreras);
  const materias = useSelector(selectMaterias);
  const [carrera, setCarrera] = useState(null);
  const navigate = useNavigate();
  const error = useSelector(errorAlumnos);
  const loading = useSelector(loadingalumnos);
  const result = useSelector(resultAlumnos);
  const alumnos = useSelector(selectAlumnos);
  const formik = useFormik({
    initialValues: values,
    validationSchema,
    onSubmit,
  });

  const handleReset = () => {
    formik.resetForm();
  };
  const theme = useTheme();


  const customHandleChange = (event, value, name) => {
    console.log(name, value)
    formik.setFieldValue(name, value.value);
    if (name === "carrera"){
      setCarrera(value.value)
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const params = {};
    console.log(searchValues)
    if (searchValues.fecha) {
      params.fecha = searchValues.fecha;
    }
    if (searchValues.carrera && searchValues.carrera.value) {
      params.carrera = searchValues.carrera.value;
    }
    if (searchValues.materia && searchValues.materia.value) {
      params.materia = searchValues.materia.value;
    }
    if (searchValues.alumno && searchValues.alumno.value) {
      params.alumno = searchValues.alumno.value;
    }
    dispatch(filterAsistencias(params)).then((result) => {
      if (result.payload) {
        console.log("sddsdsd",result);
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: "Cargando resultado!",
        });
      }
    });
  };
  const mapOptions = (data) => {
    return data.map(item => ({
      label: item.nombre,
      value: item.id
    }));
  };

  useEffect(() => {
    dispatch(getCarreras());
  }, []);
  useEffect(() => {
    formik.setFieldValue("alumnos", alumnos)
  }, [alumnos]);
  

  useEffect(() => {
    if (carrera !== null){
      console.log("ahora", {carrera: carrera})
      dispatch(getMateriasByCarrera({carrera: carrera}))
      dispatch(getAlumnosByCarrera({carrera: carrera}))
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
        <Typography variant="h1" sx={{ color: theme.palette.warning.main }}>
          {isEdit ? 'Editar Asistencia' : 'Registrar Asistencia '}
        </Typography>
      </Box>

      <Container>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Typography variant="h2">
                Datos de asistencia
              </Typography>
                  <Button
                    startIcon={<Home />}
                    variant="contained"
                    color="secondary"
                    onClick={() => console.log(formik.values.fecha, formik.values.carrera, formik.values.materia, formik.values.alumnos)}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                  >
                    imprimir
                  </Button>
              <TextField
                InputLabelProps={{
                  ...(formik.values.fecha == '' && { shrink: true }),
                }}
                label="Fecha"
                id="fecha"
                name="fecha"
                type='date'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fecha}
                error={formik.touched.fecha && Boolean(formik.errors.fecha)}
                helperText={formik.touched.fecha && formik.errors.fecha}
              />
              {carreras &&
                <Autocomplete
                  disablePortal
                  id="carrera"
                  name="carrera"
                  options={mapOptions(carreras)}
                  value={formik.values.carrera?.id}
                  onChange={(event, value) => customHandleChange(event, value, 'carrera')}
                  renderInput={(params) => <TextField {...params} label="Carrera" />}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                />}
              {materias &&
                <Autocomplete
                  disablePortal
                  id="materia"
                  name="materia"
                  options={mapOptions(materias)}
                  value={formik.values.materia?.id}
                  onChange={(event, value) => customHandleChange(event, value, 'materia')}
                  renderInput={(params) => <TextField {...params} label="Materia" />}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
              />}
              {alumnos !== null ? (<ListaAlumnos listaAlumnos={alumnos}/>) : null}
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
                    color="success"
                    type="submit"
                    startIcon={<Save />}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                  >
                    Guardar
                  </Button>
                </Grid>
                <Grid item>
                  {isEdit ? (
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Clear />}
                      disabled
                      onClick={handleReset}
                      sx={{ width: { xs: '100%', sm: 'auto' } }}
                    >
                      Limpiar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Clear />}
                      onClick={handleReset}
                      sx={{ width: { xs: '100%', sm: 'auto' } }}
                    >
                      Limpiar
                    </Button>
                  )}
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
