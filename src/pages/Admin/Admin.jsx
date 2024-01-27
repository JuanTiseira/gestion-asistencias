import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import AdminTable from '@/components/Tables/AdminTable/AdminTable';
import { useDispatch, useSelector } from 'react-redux';
import { changeFormData, getFormData, loadingUsers, getRols, getUsers } from '@/features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/Spinners/Spinner';

const Admin = () => {
  const navigate = useNavigate();
  const loading = useSelector(loadingUsers);
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
    dispatch(getRols());
    dispatch(getUsers());
  }, []);
  
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
      
      <AdminTable />

    </Container>
  );
};

export default Admin;
