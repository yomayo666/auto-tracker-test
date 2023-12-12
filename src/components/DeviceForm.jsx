import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';

const DeviceForm = ({
  open,
  handleClose,
  isEditing,
  newDeviceData,
  handleInputChange,
  handleAddDevice,
  handleUpdateDevice,
  error,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditing ? 'Edit Device' : 'Add New Device'}</DialogTitle>
      <DialogContent>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <TextField
          label="Name"
          name="name"
          value={newDeviceData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Unique ID"
          name="uniqueId"
          value={newDeviceData.uniqueId}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Status"
          name="status"
          value={newDeviceData.status}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="online">online</MenuItem>
          <MenuItem value="offline">offline</MenuItem>
        </TextField>
        <TextField
          label="Last Update"
          name="lastUpdate"
          value={newDeviceData.lastUpdate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          helperText="Leave it empty for the current date"
        />
        {isEditing ? (
          <Button onClick={handleUpdateDevice} variant="outlined" color="primary">
            Update
          </Button>
        ) : (
          <Button onClick={handleAddDevice} variant="outlined" color="primary">
            Add
          </Button>
        )}
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceForm;