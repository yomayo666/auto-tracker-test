// DeviceList.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeviceTable from './DeviceTable';
import DeviceForm from './DeviceForm';
import SnackbarAlert from './SnackbarAlert';
import { addDevice, updateDevice, deleteDevice } from '../api';
import CircularProgress from '@mui/material/CircularProgress';

const DeviceList = ({ devices, onAddDevice }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newDeviceData, setNewDeviceData] = useState({
    name: '',
    uniqueId: '',
    status: 'offline',
    lastUpdate: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingDeviceId, setEditingDeviceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const resetDialogState = () => {
    setIsEditing(false);
    setEditingDeviceId(null);
    setNewDeviceData({
      name: '',
      uniqueId: '',
      status: 'offline',
      lastUpdate: new Date().toISOString().slice(0, 19) + 'Z',
    });
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
      console.error('Error adding device:', error);
      setError('Error adding device: ' + error.message);
      showSnackbar(`Failed to add device. Details:\n${error.message}`, 'error');
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
      console.error('Error updating device:', error);
      setError('Error updating device: ' + error.message);
      showSnackbar(`Failed to update device. Details:\n${error.message}`, 'error');
    }
  };

  const handleDeleteDevice = async (deviceId) => {
    console.log(deviceId)
    try {
      await deleteDevice(deviceId);
      const updatedDevices = devices.filter((device) => device.id !== deviceId);
      onAddDevice(updatedDevices);
      showSnackbar('Device deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting device:', error);
      setError('Error deleting device: ' + error.message);
      showSnackbar(`Failed to delete device. Details:\n${error.message}`, 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
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
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
      {loading && <CircularProgress />}
    </>
  );
};

export default DeviceList;
