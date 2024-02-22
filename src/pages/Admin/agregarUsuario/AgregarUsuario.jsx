import { Container, Stack } from '@mui/material';

import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import UsuariosForm from '@/components/Forms/AdminForm/AdminForm';
import {
  changeFormData,
  createUser,
  getUsers,
} from '@/features/users/usersSlice';

function AgregarUsuario() {
  const dispatch = useDispatch();
  const values = {
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    fecha_nacimiento: '',
    email: '',
    telefono: '',
    rol: '',
    username: '',
    password: '',
  };
  const onSubmit = (values) => {
    console.log('agregar', values);
    dispatch(changeFormData(values));
    dispatch(createUser(values)).then((result) => {
      if (result.payload) {
        console.log(result.payload.message);
        dispatch(getUsers());
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
        <UsuariosForm values={values} isEdit={false} onSubmit={onSubmit} />
      </Container>
    </Stack>
  );
}

export default AgregarUsuario;
