import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeviceTable from './DeviceTable';
import DeviceForm from './DeviceForm';
import SnackbarAlert from './SnackbarAlert';
import { addDevice, updateDevice, deleteDevice } from '../api';
import CircularProgress from '@mui/material/CircularProgress';

const initialDeviceData = {
  name: '',
  uniqueId: '',
  status: 'offline',
  lastUpdate: '',
};

const DeviceList = ({ devices, onAddDevice }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newDeviceData, setNewDeviceData] = useState(initialDeviceData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDeviceId, setEditingDeviceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const resetDialogState = () => {
    setIsEditing(false);
    setEditingDeviceId(null);
    setNewDeviceData(initialDeviceData);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    resetDialogState();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetDialogState();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeviceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDevice = async () => {
    try {
      setLoading(true);
      const newDevice = { ...newDeviceData };
      const addedDevice = await addDevice(newDevice);
      onAddDevice([...devices, addedDevice]);
      handleCloseDialog();
      showSnackbar('Device added successfully', 'success');
    } catch (error) {
      handleRequestError(error, 'Error adding device');
    } finally {
      setLoading(false);
    }
  };

  const handleEditDevice = (deviceId) => {
    const deviceToEdit = devices.find((device) => device.id === deviceId);
    setNewDeviceData(deviceToEdit);
    setIsEditing(true);
    setEditingDeviceId(deviceId);
    setOpenDialog(true);
  };

  const handleUpdateDevice = async () => {
    try {
      const updatedDevice = await updateDevice(editingDeviceId, newDeviceData);
      const updatedDevices = devices.map((device) =>
        device.id === editingDeviceId ? updatedDevice : device
      );
      onAddDevice(updatedDevices);
      handleCloseDialog();
      showSnackbar('Device updated successfully', 'success');
    } catch (error) {
      handleRequestError(error, 'Error updating device');
    }
  };

  const handleDeleteDevice = async (deviceId) => {
    try {
      await deleteDevice(deviceId);
      const updatedDevices = devices.filter((device) => device.id !== deviceId);
      onAddDevice(updatedDevices);
      showSnackbar('Device deleted successfully', 'success');
    } catch (error) {
      handleRequestError(error, 'Error deleting device');
    }
  };

  const handleRequestError = (error, defaultMessage) => {
    console.error(defaultMessage, error);
    setError(`${defaultMessage}: ${error.message}`);
    showSnackbar(`Failed to perform the operation. Details:\n${error.message}`, 'error');
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      severity: severity,
      message: message,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      open: false,
      severity: 'success',
      message: '',
    });
  };

  return (
    <>
      <DeviceTable
        devices={devices}
        handleEditDevice={handleEditDevice}
        handleDeleteDevice={handleDeleteDevice}
      />
      <Button onClick={handleOpenDialog} variant="outlined" color="primary">
        Add Device
      </Button>
      <DeviceForm
        open={openDialog}
        handleClose={handleCloseDialog}
        isEditing={isEditing}
        newDeviceData={newDeviceData}
        handleInputChange={handleInputChange}
        handleAddDevice={handleAddDevice}
        handleUpdateDevice={handleUpdateDevice}
        error={error}
      />
      <SnackbarAlert
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        handleClose={handleCloseSnackbar}
      />
      {loading && <CircularProgress />}
    </>
  );
};

export default DeviceList;
