import { Container, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import {
  getAlumnos,
  createAlumno,
  changeAlumnos,
} from '@/features/alumnos/alumnosSlice';
import { 
  changeFormData,
  createAsistencia,
  getAsistencias,
} from '@/features/asistencias/asistenciasSlice';
import AsistenciasForm from '@/components/Forms/Asistencias/AsistenciaForm/AsistenciasForm';
import Formulario from './Form';

function AgregarAsistencia() {
  const dispatch = useDispatch();
  const values = {
    fecha: '',
    carrera: null,
    materia: null,
    alumnos: null,
  };
  const onSubmit = (values) => {
    console.log('agregar', values);
    dispatch(changeFormData(values));
    dispatch(createAsistencia(values)).then((result) => {
      if (result.payload) {
        console.log("asasa",result.payload.message);
        dispatch(getAsistencias());
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: result.payload.message,
        });
      }
    });
    
  };
  dispatch(changeAlumnos(null))
  return (
    <Stack>
      <Container>
        <AsistenciasForm values={values} isEdit={false} onSubmit={onSubmit} />
        {/* <Formulario></Formulario> */}
      </Container>
    </Stack>
  );
}

export default AgregarAsistencia;
