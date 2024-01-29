import * as React from 'react';
import Box from '@mui/material/Box';
import { Chart } from "react-google-charts";
// Datos de ejemplo: cantidad de alumnos por día de la semana
const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const alumnosPorDia = [20, 25, 18, 22, 30]; // Ejemplo: reemplaza con tus datos reales
const data = [
  ['Día', 'Cantidad de Alumnos'],
  ['Lunes', 30],
  ['Martes', 25],
  ['Miércoles', 35],
  ['Jueves', 40],
  ['Viernes', 20],
];
export default function AlumnosPorDiaChart() {
  return (
    <Box>
      <Chart
        chartType="Bar"
        data={data}
        width="100%"
        height="400px"
        legendToggle
      />
    </Box>
  );
}