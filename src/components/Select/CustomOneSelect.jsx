import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const CustomOneSelect = ({ options, label, value, onChange, valueKey, labelKey }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomOneSelect;
