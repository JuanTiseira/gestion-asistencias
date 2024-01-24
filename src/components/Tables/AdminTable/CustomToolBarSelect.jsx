import React from "react";
import { Button } from "@mui/material";
const CustomToolbarSelect = ({ selectedRows, displayData, setSelectedRows, handleModificar }) => {
  const selectedRowsIds = selectedRows.data.map(item => displayData[item.index].data[0]);

  const handleModificarClick = () => {
    // Puedes realizar acciones específicas para la modificación aquí
    handleModificar(selectedRowsIds);
    setSelectedRows([]);
  };

  return (
    <div>
      <Button onClick={handleModificarClick}>Eliminar seleccionados</Button>
    </div>
  );
};

export default CustomToolbarSelect;