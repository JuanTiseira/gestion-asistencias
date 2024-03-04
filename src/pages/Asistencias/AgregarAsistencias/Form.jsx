import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

// Validación del esquema utilizando Yup
const validationSchema = Yup.object().shape({
  carrera: Yup.string().required('Selecciona una carrera'),
  materia: Yup.string().required('Selecciona una materia'),
});

// Datos simulados de carreras y materias
const carreras = [
  { id: 1, nombre: 'Carrera 1' },
  { id: 2, nombre: 'Carrera 2' },
  { id: 3, nombre: 'Carrera 3' },
];



const initialValues = {
  carrera: '',
};

const Formulario = () => {
  const handleSubmit = (values, { resetForm }) => {
    // Envía los datos al servidor o realiza otras acciones con los valores
    console.log('Datos enviados:', values);
    // Reinicia el formulario después de enviar los datos
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => (
        <Form>
          <Field name="carrera">
            {({ field }) => (
              <Autocomplete
                {...field}
                options={carreras}
                getOptionLabel={(option) => option?.nombre}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Carrera"
                    error={touched.carrera && Boolean(errors.carrera)}
                    helperText={touched.carrera && errors.carrera}
                    value={values.carrera}
                  />
                )}
              />
            )}
          </Field>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Formulario;
