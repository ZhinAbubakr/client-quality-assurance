import React from "react";
import { useState } from "react";
import Tables from "../../components/Table";

import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { Checkbox } from "@mui/material";

const ListOfUsers = () => {
  const navigate = useNavigate();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [cols] = useState([
    {
      name: "role",
      label: "Role",
    },
    {
      name: "firstName",
      label: "First Name",
    },
    {
      name: "lastName",
      label: "Last Name",
    },
    {
      name: "displayName",
      label: "Display Name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      action: "action",
      label: "Action",
    },
  ]);
  const [users] = useState([
    {
      id: 1,
      role: "Admin",
      firstName: "Zhin",
      lastName: "Abubakr",
      displayName: "Zhin Abubakr",
      email: "zhin@gmail.com",
      // action: <Checkbox {...label}  /> ,
    },
    {
      id: 2,
      role: "Admin",
      firstName: "Zhin",
      lastName: "Abubakr",
      displayName: "Zhin Abubakr",
      email: "zhin@gmail.com",
      
    },
    {
      id: 3,
      role: "Admin",
      firstName: "Zhin",
      lastName: "Abubakr",
      displayName: "Zhin Abubakr",
      email: "zhin@gmail.com", 
      
      
    },
    
  ]);
  const n = users[0].firstName;
  console.log(n + "hhhhh");

  const SelectedRow = (n) => {
    navigate("/users/" + n);
  };

  return (
    <>
      <Container sx={{ marginTop: 8, marginLeft: 2 }}>
        <Tables users={users} cols={cols} SelectedRow={SelectedRow} />
      </Container>
    </>
  );
};

export default ListOfUsers;
