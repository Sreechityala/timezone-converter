// components/DateSelector.jsx
import React from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';

const DateSelector = ({ baseTime, setBaseTime }) => {
  const handleChange = (newValue) => {
    const updatedTime = baseTime
      .clone()
      .year(newValue.year())
      .month(newValue.month())
      .date(newValue.date());
    setBaseTime(updatedTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label="Select Date"
        value={baseTime}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} sx={{ width: 300, margin: 1 }} />}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
