import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack, Container, Paper, Typography, Box, Grid} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import CustomMultipleSelect from '@/components/Select/CustomSelect';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/Spinners/Spinner';
import Swal from 'sweetalert2';
import { Save } from '@mui/icons-material';
import { Home } from '@mui/icons-material';
import { Clear } from '@mui/icons-material';
import { BackHand } from '@mui/icons-material';
import { FieldArray } from 'formik';
import { selectCarreras, getCarreras, errorAlumnos, loadingalumnos, resultAlumnos } from '@/features/alumnos/alumnosSlice';
import { Field } from 'formik';
import { InputLabel } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import MultipleAddSelect from '@/components/Select/MultipleAddSelect';



const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es requerido'),
  apellido: Yup.string().required('El apellido es requerido'),
  dni: Yup.number().required('El DNI es requerido'),
  direccion: Yup.string().required('La dirección es requerida'),
  fecha_nacimiento: Yup.date().nullable().required('La fecha de nacimiento es requerida'),
  email: Yup.string().email('Formato de correo electrónico no válido').required('El correo electrónico es requerido'),
  telefono: Yup.string().required('El teléfono es requerido'),
});

const AlumnosForm = ({ values, isEdit, onSubmit }) => {
    const dispatch = useDispatch();
    const carreras = useSelector(selectCarreras);
    // const formData = useSelector(getFormData);
    const navigate = useNavigate();
    const error = useSelector(errorAlumnos);
    const loading = useSelector(loadingalumnos);
    const result = useSelector(resultAlumnos);

    const [carrerasAlumno, setCarrerasAlumno] = React.useState(values.carreras);
    const formik = useFormik({
    initialValues: values,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const handleReset = () => {
    formik.resetForm();
  };
  const theme = useTheme();  // Obtén el tema actual


  useEffect(() => {
    dispatch(getCarreras());
  }, []);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
      });
    }
  }, [error]);

  const handleChange = (event) => {
    const nombre = event.target.value.slice(-1).pop();
    const selectedCarrera = carreras.find((u) => u.nombre === nombre);
    if (
      selectedCarrera &&
      !carrerasAlumno.some((carrera) => carrera.nombre === nombre)
    ) {
      console.log("if")
      setCarrerasAlumno((prevArray) => [...prevArray, selectedCarrera]);
      formik.setFieldValue("carreras", [...formik.values.carreras, selectedCarrera])
    } else {
      const updatedArray = carrerasAlumno.filter((p) => p.nombre !== nombre);
      console.log("else")
      setCarrerasAlumno((prevArray) => [...updatedArray]);
      formik.setFieldValue("carreras", [...updatedArray])

    }
  };
  const select = () =>{
    if (isEdit) {
      return (<CustomMultipleSelect
         options={carreras}
         label="Selecciona una o varias carreras"
         value={carrerasAlumno} // Asegúrate de que el valor sea un array
         onChange={handleChange}
         valueKey="id"
         labelKey="nombre"
         />
      )

    }else{
      return (<MultipleAddSelect
        options={carreras}
        label="Selecciona una o varias carreras"
        id="carreras"
        name="carreras"
        value={Array.isArray(formik.values.carreras) ? formik.values.carreras : []}
        onChange={(event) => {
          formik.setFieldValue('carreras', event.target.value);
        }}
        valueKey="id"
        labelKey="nombre"
      />)
    }
  }
  return (
    <Stack>
      {/* Contenido de la página */}
      <Box sx={{ textAlign: "center", margin: "25px" }}>
        <Typography variant="h1" sx={{ color: theme.palette.warning.main }}>
          {isEdit? "Editar Alumno": "Agregar Alumno "}
        </Typography>
      </Box>

      <Container>

        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Nombre"
                id="nombre"
                name="nombre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />

              <TextField
                label="Apellido"
                id="apellido"
                name="apellido"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
                error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                helperText={formik.touched.apellido && formik.errors.apellido}
              />

              <TextField
                label="DNI"
                id="dni"
                name="dni"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dni}
                error={formik.touched.dni && Boolean(formik.errors.dni)}
                helperText={formik.touched.dni && formik.errors.dni}
              />

              <TextField
                label="Dirección"
                id="direccion"
                name="direccion"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.direccion}
                error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                helperText={formik.touched.direccion && formik.errors.direccion}
              />

              <TextField
                InputLabelProps={{ ...(formik.values.fecha_nacimiento == "" && { shrink: true }) }}
                label="Fecha de Nacimiento"
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fecha_nacimiento}
                error={formik.touched.fecha_nacimiento && Boolean(formik.errors.fecha_nacimiento)}
                helperText={formik.touched.fecha_nacimiento && formik.errors.fecha_nacimiento}

              />

              <TextField
                label="Correo Electrónico"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                label="Teléfono"
                id="telefono"
                name="telefono"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
                error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                helperText={formik.touched.telefono && formik.errors.telefono}
              />


                { carreras && select()}
              <Grid container
                sx={{
                    gap:2,
                    display: 'flex',
                    justifyContent:{xs: 'start', sm: 'center' },}}
                direction={{ xs: 'column', sm: 'row' }}>

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
                      sx={{ width: { xs: '100%', sm: 'auto' } }}>
                      Limpiar
                    </Button>
                  ) : (
                    <Button variant="contained" color="error" startIcon={<Clear />} onClick={handleReset} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                      Limpiar
                    </Button>
                  )}
                </Grid>
                <Grid item>
                  <Button
                    startIcon={<Home />}
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/alumnos")}
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
};

export default AlumnosForm;
