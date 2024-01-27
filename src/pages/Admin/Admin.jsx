import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import AdminTable from '@/components/Tables/AdminTable/AdminTable';
import { useDispatch, useSelector } from 'react-redux';
import { changeFormData, getFormData, loadingUsers, getRols, getUsers, selectUsers } from '@/features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/Spinners/Spinner';
import { useTheme } from '@emotion/react';

const Admin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loading = useSelector(loadingUsers);
  const usersData = useSelector(selectUsers);

  const initialData = {
    "name": "John Doe"
  };
  const [data, setData] = useState(initialData);
  const dispatch = useDispatch();
  const formData = useSelector(getFormData);

  const handleFormChange = ({ errors, data }) => {
    dispatch(changeFormData(data));
    setData(data);
  };

  const print = () => {
    console.log("dasdasd", formData);
  };
 
  useEffect(() => {
    console.log("dispachando")
    dispatch(getRols());
    dispatch(getUsers());
  }, [dispatch]);
  
  return (
    <Container>
      {loading && <Spinner />}
      {/* Contenido de la página */}
      <Box sx={{ textAlign: "center", marginY: 3 }}>
        <Typography variant="h1">
          Administracion
        </Typography>
      </Box>
      
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" onClick={() => navigate('/administracion/agregar-usuario')}>
          Agregar usuario
        </Button>
      </Box>
      
      {usersData ? <AdminTable theme={theme} usersData={usersData}/> : null}

    </Container>
  );
};

export default Admin;
