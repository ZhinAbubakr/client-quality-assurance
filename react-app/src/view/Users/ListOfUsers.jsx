import React from "react";
import { useState } from "react";
import Tables from "../../components/Table";

import { useNavigate } from "react-router-dom";

const ListOfUsers = () => {
  const navigate = useNavigate();

  const [cols] = useState([
    {
      name: "role",
    },
    {
      name: "firstName",
      label: "First Name",
    },
    {
      name: "last name",
    },
    {
      name: "display name",
    },
    {
      name: "email",
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

  const SelectedRow = () => {
    // selected row function to navigate to user details page with id as parameter and passing id to user details page
    navigate("/users/" + users.firstName);
  };

  return (
    <>
      <Tables users={users} cols={cols} SelectedRow={SelectedRow} />
    </>
  );
};

export default ListOfUsers;
