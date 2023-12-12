import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import AppBar from "./components/AppBar";
import DeviceList from "./components/DeviceList";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
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

  const handleDeleteDevice = (deviceId) => {
    const updatedDevices = filteredDevices.filter(
      (device) => device.id !== deviceId
    );
    setFilteredDevices(updatedDevices);
  };

  const handleAddDevice = (newDevice) => {
    setFilteredDevices((prevDevices) => [...prevDevices, newDevice]);
  };

  const handleSearch = (searchValue, devices) => {
    const filteredDevices = filterDevices(searchValue, devices);
    setFilteredDevices(filteredDevices);
  };
  const filterDevices = (searchValue, devices) => {
    if (!searchValue) {
      return devices;
    }

    const searchIds = searchValue.split(" ").filter((id) => id.trim() !== "");
    const uniqueIdsSet = new Set(searchIds);

    return devices.filter((device) =>
      uniqueIdsSet.has(device.id.toString().toLowerCase())
    );
  };

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
