import {Container, Stack} from '@mui/material';
import UsuariosForm from '@/components/Forms/AdminForm/AdminForm';
import { useDispatch, useSelector } from 'react-redux';
import {getUsers,selectedUserData, getRols, selectUsers, modifyUser } from '@/features/users/usersSlice';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const ModificarUsuario = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectedUserData);
  const onSubmit = (values) => {
    console.log("editar",values)
    dispatch(modifyUser(values)).then((result)=>{
      if(result.payload){
        console.log(result.payload.message)
        dispatch(getUsers());
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: result.payload.message,
        });
      }
    })
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