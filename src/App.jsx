import React, { useState } from 'react';
import AppBar from './components/AppBar';
import DeviceList from './components/DeviceList';
import UseSearch from './components/UseSearch';
import { Snackbar, Alert } from '@mui/material';

const App = () => {
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = (searchValue, devices) => {
    if (!searchValue) {
      setFilteredDevices(devices);
      return;
    }

    const searchIds = searchValue
      .split(' ')
      .filter((id) => id.trim() !== '');

    if (searchIds.length === 0) {
      setFilteredDevices([]);
      return;
    }

    const filtered = devices.filter((device) =>
      searchIds.some((id) => device.id.toString().toLowerCase().includes(id.toLowerCase()))
    );
    setFilteredDevices(filtered);
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div>
      <AppBar />
      <UseSearch onSearch={handleSearch} onError={setError} />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error?.message || 'An unexpected error occurred'}
        </Alert>
      </Snackbar>
      <DeviceList devices={filteredDevices} />
    </div>
  );
};

export default App;
