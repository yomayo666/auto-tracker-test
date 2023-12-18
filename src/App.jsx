import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import AppBar from "./components/AppBar";
import DeviceList from "./components/DeviceList";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useCallback } from "react";
import Home from "./components/Home";
const ErrorPage = () => (
  <div>
    <h2>404 - Not Found</h2>
    <p>The requested page does not exist.</p>
  </div>
);
const App = () => {
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [error, setError] = useState(null);
  const isDevicesPage = useMatch("/devices");

  const handleDeleteDevice = useCallback(
    (deviceId) => {
      const updatedDevices = filteredDevices.filter(
        (device) => device.id !== deviceId
      );
      setFilteredDevices(updatedDevices);
    },
    [filteredDevices]
  );

  const handleAddDevice = useCallback(
    (newDevice) => {
      setFilteredDevices((prevDevices) => [...prevDevices, newDevice]);
    },
    []
  );

  const handleSearch = useCallback(
    (devices) => {
      setFilteredDevices(devices);
    },
    []
  );

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div>
      <AppBar />
      {isDevicesPage && (
        <SearchBar onSearch={handleSearch} onError={setError} />
      )}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error?.message || "An unexpected error occurred"}
        </Alert>
      </Snackbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/devices"
          element={
            <DeviceList
              devices={filteredDevices}
              onDeleteDevice={handleDeleteDevice}
              onAddDevice={handleAddDevice}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
