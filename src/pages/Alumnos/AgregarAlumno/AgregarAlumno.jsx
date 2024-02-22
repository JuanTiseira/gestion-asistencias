import { Container, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import {
  changeFormData,
  getAlumnos,
  createAlumno,
  getCarreras,
} from '@/features/alumnos/alumnosSlice';
import AlumnosForm from '@/components/Forms/AlumnosForm/AlumnosForm';

function AgregarAlumno() {
  const dispatch = useDispatch();
  const values = {
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    fecha_nacimiento: '',
    email: '',
    telefono: '',
    carreras: '',
  };
  const onSubmit = (values) => {
    console.log('agregar', values);
    dispatch(changeFormData(values));
    dispatch(createAlumno(values)).then((result) => {
      if (result.payload) {
        console.log(result.payload.message);
        dispatch(getAlumnos());
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: result.payload.message,
        });
      }
    });
  };

  return (
    <Stack>
      <Container>
        <AlumnosForm values={values} isEdit={false} onSubmit={onSubmit} />
      </Container>
    </Stack>
  );
}

export default AgregarAlumno;
