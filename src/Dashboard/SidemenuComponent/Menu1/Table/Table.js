import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './Table.css'; // Create a CSS file for styling

const MyTable = () => {
  // Example data
  const rows = [
    { id: 1, periodinfo: 'period', from: '08:45', to: '09:40' },
    { id: 2, periodinfo: 'period', from: '09:40', to: '10:35' },
    { id: 3, periodinfo: 'period', from: '10:35', to: '11:30' },
    { id: 4, periodinfo: 'period', from: '11:30', to: '12:25' },
    { id: 5, periodinfo: 'period', from: '11:30', to: '11:30' },
    { id: 6, periodinfo: 'period', from: '11:30', to: '11:30' },
    // { id: 3, periodinfo: 'period, from: 22, to: 'UK' },
  ];

  return (
    <TableContainer component={Paper} className="custom-scrollbar">
      <Table>
        <TableHead>
        <TableRow className="sticky-header">
            <TableCell colSpan={3}>My Table Header</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Period Info</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            {/* <TableCell>Country</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.map((row) => (
            <TableRow key={row.id} >
              {/* <TableCell>{row.id}</TableCell> */}
              <TableCell >{row.periodinfo}</TableCell>
              <TableCell >{row.from}</TableCell>
              <TableCell >{row.to}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
