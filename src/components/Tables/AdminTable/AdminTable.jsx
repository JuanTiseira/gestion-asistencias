import React, { useState, useEffect } from 'react';
import { Typography, TableContainer, Paper, Button, Stack } from '@mui/material';
import MUIDatatable from 'mui-datatables';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers, getUsers, deleteUser, loadingUsers, selectedUser } from '@/features/users/usersSlice';
import CustomToolbarSelect from './CustomToolBarSelect';
import Spinner from '@/components/Spinners/Spinner';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminTable = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(selectUsers);
  const loading = useSelector(loadingUsers);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const handle = () => {
    dispatch(getUsers());
  }

  const handleModificar = (userId) => {
    console.log("Modificar usuafdfdrio con ID:", userId);
  
    const selectedUserData = usersData.find((user) => user.id === userId);
    console.log("Usuario seleccionado:", selectedUserData);
    dispatch(selectedUser(selectedUserData));
    // navigate("/administracion/editar-usuario");
  };
  
  const handleEliminar = (userId) => {
    setSelectedUserId(userId);
 

    Swal.fire({
      title: 'Confirmar eliminación',
      text: '¿Estás seguro de que deseas eliminar este elemento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica de eliminación aquí
        dispatch(deleteUser(userId)).then(() => {
          dispatch(getUsers());

          // Mostrar una alerta de éxito con SweetAlert2
          Swal.fire('Eliminado', `Usuario con ID ${userId} eliminado con éxito.`, 'success');
        });
      }
    });
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
            <div>
            <Button onClick={() => handleModificar(tableMeta.rowData[0])}>
              Modificar
            </Button>
            <Button onClick={() => handleEliminar(tableMeta.rowData[0])}>
              Eliminar
            </Button>
            </div>
            
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'standard',
    selectableRows: 'none',
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect
        selectedRows={selectedRows}
        displayData={displayData}
        setSelectedRows={setSelectedRows}
        handleEliminar={handleEliminar}
        handleModificar={handleModificar}
      />
    ),
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  
  return (
    <Stack>
      <Paper>
      <TableContainer component={Paper}>
      
      {usersData ? (
        <MUIDatatable
          title={"Lista de usuarios"}
          data={usersData}
          columns={columns}
          options={options}
        />
      ) : (
        <Spinner></Spinner>
      )}
    </TableContainer>
    </Paper>
    </Stack>
    
  );
};

export default AdminTable;
