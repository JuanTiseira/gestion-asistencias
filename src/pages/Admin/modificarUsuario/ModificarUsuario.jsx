import { Container, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  getUsers,
  selectedUserData,
  getRols,
  selectUsers,
  modifyUser,
  getUserById,
  userData,
} from '@/features/users/usersSlice';
import UsuariosForm from '@/components/Forms/AdminForm/AdminForm';
import { useParams } from 'react-router-dom';

function ModificarUsuario() {
  const dispatch = useDispatch();
  const user = useSelector(userData);
  const { userId } = useParams();

  const onSubmit = (values) => {
    console.log('editar', values);
    dispatch(modifyUser(values)).then((result) => {
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

  useEffect(() => {
    dispatch(getRols());
    console.log("fdfd")
    dispatch(getUserById(userId));
  }, []);

  return (
    <Stack>
      <Container>
        {user && <UsuariosForm values={user} isEdit onSubmit={onSubmit} />}
      </Container>
    </Stack>
  );
}

export default ModificarUsuario;
