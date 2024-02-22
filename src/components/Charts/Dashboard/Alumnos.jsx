import { useTheme } from '@emotion/react';
import { Typography, Box } from '@mui/material';
import React from 'react';
import { Chart } from 'react-google-charts';

function AlumnosCircularChart() {
  // Datos de ejemplo (cantidad de alumnos por día de la semana)
  const theme = useTheme();
  const data = [
    ['Día', 'Cantidad de Alumnos'],
    ['Lunes', 30],
    ['Martes', 25],
    ['Miércoles', 35],
    ['Jueves', 40],
    ['Viernes', 20],
  ];
  const options = {
    pieSliceText: 'value',
    slices: {
      1: { offset: 0.1 },
      3: { offset: 0.2 },
      4: { offset: 0.3 },
    },
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main, // Fondo del gráfico toma el color de fondo predeterminado del tema
  };
  return (
    <Box>
      <Chart
        width="100%"
        height="400px"
        chartType="PieChart"
        loader={<div>Cargando gráfico...</div>}
        data={data}
        options={options}
        legendToggle
      />
    </Box>
  );
}

export default AlumnosCircularChart;
