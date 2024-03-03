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
import AsistenciasForm from '@/components/Forms/Asistencias/AsistenciaForm/AsistenciasForm';

function AgregarAsistencia() {
  const dispatch = useDispatch();
  const values = {
    fecha: '',
    carrera: null,
    materia: null,
    alumnos: null,
  };
  const onSubmit = (values) => {
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
        <AsistenciasForm values={values} isEdit={false} onSubmit={onSubmit} />
      </Container>
    </Stack>
  );
}

export default AgregarAsistencia;
