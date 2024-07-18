import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination, Button, Modal, Box } from '@mui/material';

import { AddRecordForm } from './components';

const App = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [filter, setFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, order, orderBy, filter]);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:5000/data', {
      params: {
        page: page + 1,
        per_page: rowsPerPage,
        sort_by: orderBy,
        sort_order: order,
        filter: filter
      }
    });
    setData(response.data.data);
    setTotal(response.data.total);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (row) => {
    setSelectedData(row.data);
    setModalOpen(true);
  };

  const handleAdd = async (newItem) => {
    await axios.post('http://localhost:5000/data', newItem);
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/data/${id}`);
    fetchData();
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleRequestSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'description'}
                  direction={orderBy === 'description' ? order : 'asc'}
                  onClick={() => handleRequestSort('description')}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'create_date'}
                  direction={orderBy === 'create_date' ? order : 'asc'}
                  onClick={() => handleRequestSort('create_date')}
                >
                  Create Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} onClick={() => handleRowClick(row)}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.create_date}</TableCell>
                <TableCell>
                  <Button onClick={(e) => { e.stopPropagation(); handleDelete(row.id); }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', top: '20%', left: '30%', width: '40%' }}>
          <pre>{JSON.stringify(selectedData, null, 2)}</pre>
        </Box>
      </Modal>
    </Paper>
    <AddRecordForm onAdd={handleAdd} />
    </>
  );
};

export default App;
