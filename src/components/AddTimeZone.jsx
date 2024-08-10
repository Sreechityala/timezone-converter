// components/AddTimezone.jsx
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Autocomplete,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import moment from 'moment-timezone';

const AddTimezone = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);

  const timezones = moment.tz.names();

  const handleAdd = () => {
    if (selectedZone) {
      onAdd({ id: uuid(), name: selectedZone });
      setSelectedZone(null);
      setOpen(false);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ margin: 1 }}>
        Add Timezone
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add a New Timezone</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={timezones}
            renderInput={(params) => <TextField {...params} label="Timezone" />}
            value={selectedZone}
            onChange={(e, newValue) => setSelectedZone(newValue)}
            sx={{ width: 300, mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} disabled={!selectedZone}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTimezone;
