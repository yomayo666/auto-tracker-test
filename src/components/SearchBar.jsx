import React, { useState, useEffect } from "react";
import { TextField, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchDevices } from "../api";
import { useCallback } from "react";

const SearchBar = ({ onSearch, onError }) => {
  const [searchValue, setSearchValue] = useState("");
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevicesData = async () => {
      try {
        setLoading(true);
        const data = await fetchDevices();
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

  const handleSearchChange = useCallback(
    async (event) => {
      {
        setSearchValue(event.target.value);

        try {
          setLoading(true);
          const data = await fetchDevices();
          setDevices(data);

          if (onSearch) {
            onSearch(event.target.value, data);
          }

          const searchIds = event.target.value
            .split(" ")
            .filter((id) => id.trim() !== "")
            .map((id) => encodeURIComponent(id));

          navigate(`/devices`, { state: { ids: searchIds } });
        } catch (err) {
          if (onError) {
            onError(err);
          }
        } finally {
          setLoading(false);
        }
      }
    },
    [navigate, onSearch, onError]
  );

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

export default SearchBar;
