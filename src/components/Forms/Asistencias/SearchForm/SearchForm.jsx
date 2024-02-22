import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack, Container, Paper, Typography, Box, Grid } from '@mui/material';

function SearchForm() {
  const [searchValues, setSearchValues] = useState({
    nombre: '',
    apellido: '',
    dni: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
                label="Nombre"
                id="nombre"
                name="nombre"
                onChange={handleInputChange}
                value={searchValues.nombre}
              />

              <TextField
                label="Apellido"
                id="apellido"
                name="apellido"
                onChange={handleInputChange}
                value={searchValues.apellido}
              />

              <TextField
                label="DNI"
                id="dni"
                name="dni"
                onChange={handleInputChange}
                value={searchValues.dni}
              />

              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Buscar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      setSearchValues({ nombre: '', apellido: '', dni: '' })
                    }
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
