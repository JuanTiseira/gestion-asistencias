import { Container, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import {
  alumnoData,
  getAlumnoById,
  getAlumnos,
  getCarreras,
  modifyAlumno,
  selectedAlumnoData,
} from '@/features/alumnos/alumnosSlice';
import AlumnosForm from '@/components/Forms/AlumnosForm/AlumnosForm';

function ModificarAlumno() {
  const dispatch = useDispatch();
  // const alumnoData = useSelector(selectedAlumnoData);
  const { alumnoId } = useParams();
  const alumno = useSelector(alumnoData);

  const onSubmit = (values) => {
    console.log('editar', values);
    dispatch(modifyAlumno(values)).then((result) => {
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

  useEffect(() => {
    dispatch(getCarreras());
    dispatch(getAlumnoById(alumnoId));
  }, []);

  return (
    <Stack>
      <Container>
        {alumno && <AlumnosForm values={alumno} isEdit onSubmit={onSubmit} />}
      </Container>
    </Stack>
  );
}

export default ModificarAlumno;
