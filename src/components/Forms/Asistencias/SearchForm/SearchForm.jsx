import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack, Container, Paper, Typography, Box, Grid } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectCarreras, selectMaterias } from '@/features/asistencias/asistenciasSlice';
import { getCarreras, getMaterias } from '@/features/asistencias/asistenciasSlice';

function SearchForm() {
  const dispatch = useDispatch();
  const carreras = useSelector(selectCarreras);
  const materias = useSelector(selectMaterias);
  const options = ['Programacion y analisis', 'gestion de Pymes'];
  const [searchValues, setSearchValues] = useState({
    fecha: '',
    carrera: null,
    materia: null,
    modulo: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchValues({
      ...searchValues,
      [name]: value,
    });
  };
  const handleautoAutocompleteChange = (event, value, name) => {
    setSearchValues({
      ...searchValues,
      [name]: value,
    });
  };
  const handleSearch = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica de búsqueda, por ejemplo, enviar los valores a un backend
    // y manejar la respuesta, o imprimir los valores directamente
    console.log('Valores de búsqueda:', searchValues);
  };
  const mapOptions = (data) => {
    return data.map(item => ({
      label: item.nombre,
      value: item.id
    }));
  };
  const mapOption = (item) => {
    if (item === null) return null;
    return ({
      label: item.nombre,
      value: item.id
    })
  };
    useEffect(() => {
    dispatch(getCarreras());
    dispatch(getMaterias());
  }, []);
  return (
    <Stack>
      {/* Contenido de la página */}
      <Box sx={{ textAlign: 'center', margin: '25px' }}>
        <Typography variant="h1">Buscar Asistencias</Typography>
      </Box>

      <Container>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <form onSubmit={handleSearch}>
            <Stack spacing={2}>
              <TextField
                InputLabelProps={{
                  ...(searchValues.fecha === '' && { shrink: true }),
                }}
                label="Fecha"
                id="fecha"
                name="fecha"
                onChange={handleInputChange}
                type="date"
                value={searchValues.fecha}
              />
              {carreras && 
              <Autocomplete
                disablePortal
                id="carrera"
                name="carrera"
                options={mapOptions(carreras)}
                value={searchValues.carrera}
                onChange={(event, value) => handleautoAutocompleteChange(event, value, 'carrera')}
                renderInput={(params) => <TextField {...params} label="Carrera" />}
                isOptionEqualToValue={(option, value) => option.value === value.value}
              />}
              {materias && 
              <Autocomplete
              disablePortal
              id="materia"
              name="materia"
              options={mapOptions(materias)}
              value={searchValues.materia}
              onChange={(event, value) => handleautoAutocompleteChange(event, value, 'materia')}
              renderInput={(params) => <TextField {...params} label="Materia" />}
              isOptionEqualToValue={(option, value) => option.value === value.value}
            />}
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Buscar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => setSearchValues({ fecha: '', carrera: null, materia: null, modulo: '' })}
                  >
                    Limpiar
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Stack>
  );
}

export default SearchForm;
