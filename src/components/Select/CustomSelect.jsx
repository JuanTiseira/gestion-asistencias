import React from 'react';
import { Select, MenuItem, InputLabel, FormControl, ListItemText } from '@mui/material';

const CustomMultipleSelect = ({ options, label, value, onChange, valueKey, labelKey }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple  // Habilita la selección múltiple
        value={value}
        onChange={onChange}
        label={label}
        renderValue={(selected) => {
          return selected.map((s, index) => (
            <div key={index}>
              <MenuItem key={"menuItem" + index} value={s.id}>
                <ListItemText
                  key={"listItemText" + index}
                  primary={s.nombre}
                />
              </MenuItem>
            </div>
            ));
          }}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.nombre}>
            <ListItemText primary={option.nombre} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomMultipleSelect;
