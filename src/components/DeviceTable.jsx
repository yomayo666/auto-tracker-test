import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const DeviceTable = ({ devices, handleEditDevice, handleDeleteDevice }) => {
  const tableHeaders = ['ID', 'Name', 'Unique ID', 'Status', 'Last Update', 'Actions'];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell>{device.uniqueId}</TableCell>
              <TableCell>{device.status}</TableCell>
              <TableCell>{device.lastUpdate}</TableCell>
              <TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEditDevice(device.id)}
                    variant="outlined"
                    color="primary"
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteDevice(device.id)}
                    variant="outlined"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeviceTable;
