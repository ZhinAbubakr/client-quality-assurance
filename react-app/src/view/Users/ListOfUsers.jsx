import React, { useState, useEffect } from "react";
import Tables from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import axiosInstance from "../../axios";
import { base } from "../../api";
import { Typography } from "@mui/material";

const ListOfUsers = () => {
  const navigate = useNavigate();
  const [listOfUser, setListOfUser] = useState([]);

  const getListOfUsers = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/users",
      });
      // console.log(data?.data);
      setListOfUser(data?.data);
    } catch (errro) {
      console.log("not successful");
    }
  };

  useEffect(() => {
    getListOfUsers();
  }, []);

  const [cols] = useState([
    {
      name: "role_ids",
      label: "Role",
    },
    {
      name: "first_name",
      label: "First Name",
    },
    {
      name: "last_name",
      label: "Last Name",
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

  const SelectedRow = (id) => {
    navigate("/users/" + id);
  };

  return (
    <>
      <Container sx={{ marginLeft: 5, marginTop: 12, p: 4 }}>
        <Typography variant="h5" sx={{ py: 2 }}>
          List of Users
        </Typography>
        <Tables users={listOfUser} cols={cols} SelectedRow={SelectedRow} />
      </Container>
    </>
  );
};

export default ListOfUsers;

//test
