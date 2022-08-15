import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { base } from "../../api";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";

export default function ListOfRoles() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  const [cols] = useState([
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      action: "action",
      label: "Action",
    },
  ]);

  const getRoles = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/roles",
      });
      console.log(data?.data?.attributes, "llllllllllllll");
      setRoles(data?.data);
    } catch (errro) {
      console.log("not successful");
    }
  };

  // console.log(roles[0]?.attributes);

  useEffect(() => {
    getRoles();
  }, []);

  const SelectedRow = (id) => {
    navigate("/role/" + id);
  };

  return (
    <>
      <Container sx={{ marginLeft: 5, marginTop: 12, p: 4 }}>
        <Typography variant="h5">List of Roles</Typography>

        <Table items={roles} cols={cols} SelectedRow={SelectedRow} />
      </Container>
    </>
  );
}
