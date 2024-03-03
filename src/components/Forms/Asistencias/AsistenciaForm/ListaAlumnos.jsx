import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, IconButton, Select, MenuItem, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { changeAlumnos } from '@/features/alumnos/alumnosSlice';

const estadosAsistencia = ['Presente', 'Ausente', 'Tardanza', 'Justificado'];

function ListaAlumnos({ listaAlumnos }) {
  const [alumnos, setAlumnos] = useState(listaAlumnos.map(alumno => ({...alumno, estado_asistencia: 'Presente'})));
  const dispatch = useDispatch();

  const handleChangeEstado = (alumno, estado_asistencia) => {
    setAlumnos(alumnos.map(a => (a.id === alumno.id ? { ...a, estado_asistencia } : a)));
    dispatch(changeAlumnos(alumnos.map(a => (a.id === alumno.id ? { ...a, estado_asistencia } : a))));
  };

  return (
    <Stack
      sx={{
        p: 2,
        m: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'grey.100',
        marginBottom: '20px',
      }}
    >
      <h2>Lista de Alumnos</h2>
      <List>
        {alumnos.map(alumno => (
          <ListItem key={alumno.id}>
            <ListItemText primary={`${alumno.nombre} ${alumno.apellido}`} />
            <Select
              value={alumno.estado_asistencia}
              onChange={(e) => handleChangeEstado(alumno, e.target.value)}
            >
              {estadosAsistencia.map(estado_asistencia => (
                <MenuItem key={estado_asistencia} value={estado_asistencia}>{estado_asistencia}</MenuItem>
              ))}
            </Select>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

export default ListaAlumnos;