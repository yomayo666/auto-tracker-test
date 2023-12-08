import React, { useState, useEffect } from 'react';
import { TextField, CircularProgress } from '@mui/material';


const UseSearch = ({ onSearch, onError }) => {
  const [searchValue, setSearchValue] = useState('');
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const API_URL = 'https://gps.autotracker.group/api/devices';
    const token = 'RzBFAiEA92qN8JvTQ6BIgvjSTke8iQltj3SJf9vhkqyf5zcuUL4CIF1GRd1vLuSJrzzDqv80AF_BAiF91tCWPMvlhuRNrI0DeyJ1IjozLCJlIjoiMjAyMy0xMi0zMVQyMTowMDowMC4wMDArMDA6MDAifQ';

    const fetchDevicesData = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch devices');
        }

        const data = await response.json();
        setDevices(data);
        onSearch("", data);
      } catch (err) {
        onError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevicesData();
  }, [onError]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value, devices);
  };

  return (
    <>
      <TextField
        label="Search by ID"
        variant="outlined"
        value={searchValue}
        onChange={handleSearchChange}
      />
      {loading && <CircularProgress />}
    </>
  );
};

export default UseSearch;
