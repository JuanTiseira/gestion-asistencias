import React, { useState, useEffect } from 'react';
import { Typography, TableContainer, Paper, Button, Stack, IconButton } from '@mui/material';
import MUIDatatable from 'mui-datatables';
import { useDispatch, useSelector } from 'react-redux';
import CustomToolbarSelect from '../AdminTable/CustomToolBarSelect';
import Spinner from '@/components/Spinners/Spinner';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { deleteAlumno, getAlumnos, getCarreras, getMaterias, loadingalumnos, selectedAlumno } from '@/features/alumnos/alumnosSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const AlumnosTable = ({ theme, data }) => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingalumnos);
  const [selectedAlumnoId, setSelectedAlumnoId] = useState(null);
  const navigate = useNavigate();
  

  const handleModificar = (alumnoId) => {
    console.log("Modificar usuafdfdrio con ID:", alumnoId);
    const selectedAlumnoData = data.find((alumno) => alumno.id === alumnoId);
    console.log("Usuario seleccionado:", selectedAlumnoData);
    dispatch(selectedAlumno(selectedAlumnoData));
    navigate(`/alumnos/editar-alumno/${alumnoId}`);
  };
  
  const handleEliminar = (alumnoId) => {
    setSelectedAlumnoId(alumnoId);
 

    Swal.fire({
      title: 'Confirmar eliminación',
      text: '¿Estás seguro de que deseas eliminar este alumno?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica de eliminación aquí
        dispatch(deleteAlumno(alumnoId)).then(() => {
          dispatch(getAlumnos());

          // Mostrar una alerta de éxito con SweetAlert2
          Swal.fire('Eliminado', `Alumno con ID ${alumnoId} eliminado con éxito.`, 'success');
        });
      }
    });
  };
  const processedData = data.map(alumno => ({
    ...alumno,
    carreras: alumno.carreras.map(carrera => carrera.nombre).join(', ')
  }));
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
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
      name: "carreras",
      label: "Carrera",
      options: {
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
            <IconButton variant="outlined" aria-label="editar" color="warning" onClick={() => handleModificar(tableMeta.rowData[0])}>
              <EditIcon />
            </IconButton>
            <IconButton variant="outlined" aria-label="eliminar" color="error" onClick={() => handleEliminar(tableMeta.rowData[0])}>
              <DeleteIcon />
            </IconButton>
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
    if (!data) {
      dispatch(getAlumnos());
      console.log(data)
    }
  }, [dispatch, data]);

  
  return (
    <Stack>
      <Paper>
      <TableContainer component={Paper}>
      
      {data ? (
        <MUIDatatable
          title={"Lista de usuarios"}
          data={processedData}
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

export default AlumnosTable;
