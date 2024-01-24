import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import MUIDatatable from 'mui-datatables';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers, errorUsers, loadingUsers, getUsers } from '@/features/users/usersSlice';
import CustomToolbarSelect from './CustomToolBarSelect';
const AdminTable = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(selectUsers);
  
  const handle = () => {
    dispatch(getUsers());
  }

  const handleModificar = (userId) => {
    // Lógica para manejar la acción de modificar, puedes redirigir a una página de edición, mostrar un modal, etc.
    console.log("Modificar usuario con ID:", userId);
  };
  
  const handleEliminar = (userId) => {
    // Lógica para manejar la acción de modificar, puedes redirigir a una página de edición, mostrar un modal, etc.
    console.log("Eliminar usuario con ID:", userId);
  };
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nombre",
      label: "Nombre",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "apellido",
      label: "Apellido",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "telefono",
      label: "Telefono",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "rol",
      label: "Rol",
      options: {
        customBodyRender: (value) => value.nombre,
        filter: true,
        sort: false,
      },
    },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <Button onClick={() => handleModificar(tableMeta.rowData[0])}>
              Modificar
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'standard',
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect
        selectedRows={selectedRows}
        displayData={displayData}
        setSelectedRows={setSelectedRows}
        handleModificar={handleEliminar}
      />
    ),
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);


  return (
    <Container>
      <Paper
        sx={{
          padding: 3,
          marginBottom: 3,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
        }}
      >
      <TableContainer component={Paper}>
      {usersData ? (
        <MUIDatatable
          title={"Lista de usuarios"}
          data={usersData}
          columns={columns}
          options={options}
        />
      ) : (
        <Typography variant="body1">Cargando datos...</Typography>
      )}
    </TableContainer>
    </Paper>
    </Container>
    
  );
};

export default AdminTable;
