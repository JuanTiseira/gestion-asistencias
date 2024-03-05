import React, { useState, useEffect } from 'react';
import {
  Typography,
  TableContainer,
  Paper,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import MUIDatatable from 'mui-datatables';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Spinner from '@/components/Spinners/Spinner';
import CustomToolbarSelect from '../AdminTable/CustomToolBarSelect';

import { loadingAsistencias, selectedAsistencia, getAsistencias, deleteAsistencia, selectMaterias, selectCarreras, getAsistenciaById, getAsistencia } from '@/features/asistencias/asistenciasSlice';

function AsistenciasTable({ theme, asistenciasData }) {
  const dispatch = useDispatch();
  const loading = useSelector(loadingAsistencias);
  const navigate = useNavigate();
  const materias = useSelector(selectMaterias);
  const carreras = useSelector(selectCarreras);

  const handleModificar = (asistenciaId) => {
    console.log('Modificar asistencia con ID:', asistenciaId);

    const selectedAsistenciaData = asistenciasData.find((asistencia) => asistencia.id === asistenciaId);
    console.log('asistencia seleccionada:', selectedAsistenciaData);
    dispatch(selectedAsistencia(selectedAsistenciaData));
    navigate('/administracion/editar-asistencia');
  };
  const handleView = (asistenciaId) => {
    navigate(`/asistencias/detalle-asistencia/${asistenciaId}`);    
  };
  const handleEliminar = (asistenciaId) => {
    // setSelectedUserId(asistenciaId);

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
          dispatch(deleteAsistencia(asistenciaId)).then(() => {
          dispatch(getAsistencias());

          // Mostrar una alerta de éxito con SweetAlert2
          Swal.fire(
            'Eliminado',
            `Asistencia con ID ${asistenciaId} eliminada con éxito.`,
            'success',
          );
        });
      }
    });
  };
  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'fecha',
      label: 'Fecha',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'carrera',
      label: 'Carrera',
      options: {
        customBodyRender: (value) => value.nombre,
        filter: true,
        sort: false,
      },
    },
    {
      name: 'materia',
      label: 'Materia',
      options: {
        customBodyRender: (value) => value.nombre,
        filter: true,
        sort: false,
      },
    },
    {
      name: 'acciones',
      label: 'Acciones',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <div>
            <IconButton
              variant="outlined"
              aria-label="editar"
              color="warning"
              onClick={() => handleView(tableMeta.rowData[0])}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              variant="outlined"
              aria-label="eliminar"
              color="error"
              onClick={() => handleEliminar(tableMeta.rowData[0])}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
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

  // useEffect(() => {
  //   if (!asistenciasData) {
  //     dispatch(getAsistencias());
  //   }
  // }, [dispatch, asistenciasData]);
  
  return (
    <Stack>
      <Paper>
        <TableContainer component={Paper}>
          {asistenciasData ? (
            <MUIDatatable
              title="Lista de Asistencias"
              data={asistenciasData}
              columns={columns}
              options={options}
            />
          ) : (
            <Spinner />
          )}
        </TableContainer>
      </Paper>
    </Stack>
  );
}

export default AsistenciasTable;
