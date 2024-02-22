import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import AdminTable from '@/components/Tables/AdminTable/AdminTable';
import {
  changeFormData,
  getFormData,
  loadingUsers,
  getRols,
  getUsers,
  selectUsers,
} from '@/features/users/usersSlice';
import Spinner from '@/components/Spinners/Spinner';
import SearchForm from '@/components/Forms/Asistencias/SearchForm/SearchForm';

function Admin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const loading = useSelector(loadingUsers);
  const usersData = useSelector(selectUsers);

  const initialData = {
    name: 'John Doe',
  };
  const [data, setData] = useState(initialData);
  const dispatch = useDispatch();
  const formData = useSelector(getFormData);

  const handleFormChange = ({ errors, data }) => {
    dispatch(changeFormData(data));
    setData(data);
  };

  const print = () => {
    console.log('dasdasd', formData);
  };

  useEffect(() => {
    console.log('dispachando');
    dispatch(getRols());
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Container
      sx={{
        marginTop: '55px',
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'grey.100',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {loading && <Spinner />}
      {/* Contenido de la página */}
      <Box sx={{ textAlign: 'center', marginY: 3 }}>
        <Typography variant="sectionTitle">Asistencias</Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'grey.200',
          marginBottom: '20px',
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/administracion/agregar-usuario')}
        >
          Agregar asistencias
        </Button>
      </Box>
      <Box
        sx={{
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'grey.200',
          marginBottom: '20px',
        }}
      >
        <SearchForm />
      </Box>
      <Stack
        sx={{
          boxShadow: 3,
          backgroundColor: 'grey.200',
          color: 'white',
        }}
      >
        {usersData ? <AdminTable theme={theme} usersData={usersData} /> : null}
      </Stack>
    </Container>
  );
}

export default Admin;
