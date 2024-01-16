import React, { useState, useEffect } from "react";
import { TextField, CircularProgress } from "@mui/material";
import { fetchDevices, fetchDeviceById } from "../api";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log(handler, '2')
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
      console.log(handler, '1')
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchBar = ({ onSearch, onError }) => {
  const [searchValue, setSearchValue] = useState("");
  const [trimmedValuesString, setTrimmedValuesString] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearchValue = useDebounce(trimmedValuesString, 300);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);
        let data;
        console.log(debouncedSearchValue);
        if (debouncedSearchValue !== "") {
          const deviceIds = debouncedSearchValue.split(' ');
          console.log(deviceIds);
          data = await fetchDeviceById(deviceIds);
        } else {
          data = await fetchDevices();
        }

        onSearch(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error during search:", err);
        onError(err);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [debouncedSearchValue, onError, onSearch]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^0-9 ]/g , "");
    setSearchValue(filteredValue);
    setTrimmedValuesString([...new Set(filteredValue.split(" ").filter(Boolean))].join(" "));
  };

  return (
    <>
      <TextField
        label="Поиск по ID"
        variant="outlined"
        value={searchValue}
        onChange={handleInputChange}
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9 ]*"
        }}
      />
      {loading && <CircularProgress />}
    </>
  );
};

export default SearchBar;
