import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MUIDatatable from 'mui-datatables';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers, errorUsers, loadingUsers, getUsers } from '@/features/users/usersSlice';

const AdminTable = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(selectUsers);
  const handle = () => {
    dispatch(getUsers());
  }
  const columns = [
 {
  name: "name",
  label: "Name",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "company",
  label: "Company",
  options: {
   filter: true,
   sort: false,
  }
 },
 {
  name: "city",
  label: "City",
  options: {
   filter: true,
   sort: false,
  }
 },
 {
  name: "state",
  label: "State",
  options: {
   filter: true,
   sort: false,
  }
 },
 
];

// const data = [
//  { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
//  { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
//  { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
//  { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
// ];

const options = {
  filterType: 'checkbox',
  responsive: 'standard',
};

  return (
    // <Container maxWidth="md" sx={{ marginTop: 4 }}>
    //   <TableContainer component={Paper}>
    //     <MUIDatatable
    //     title={"Lista de usuarios"}
    //     data={usersData}
    //     columns={columns}
    //     options={options}
    //     />
    //   </TableContainer>
    // </Container>
    <div>
    <button onClick={handle}></button>
    <div>{usersData? usersData[0]:"nothing"}</div>
    </div>
    
  );
};

export default AdminTable;
