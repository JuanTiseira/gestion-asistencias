import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Spinner() {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowSpinner(false);
    }, 2000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearTimeout(timerId);
  }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

  return showSpinner ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </div>
  ) : null;
}

export default Spinner;
