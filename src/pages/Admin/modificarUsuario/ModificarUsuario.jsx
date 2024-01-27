import {Container, Stack} from '@mui/material';
import UsuariosForm from '@/components/Forms/AdminForm/AdminForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectedUserData, getRols } from '@/features/users/usersSlice';
import React, { useEffect } from 'react';

const ModificarUsuario = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectedUserData);
  console.log(userData)

  const onSubmit = (values) => {
    console.log("editar",values)
  }

  useEffect(() => {
    dispatch(getRols());
  }, []);

  return (
    <Stack>
      <Container>
          <UsuariosForm values={userData} isEdit={true} onSubmit={onSubmit}></UsuariosForm>
      </Container>
    </Stack>
  );
};

export default ModificarUsuario;
