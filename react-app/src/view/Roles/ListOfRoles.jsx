import React, { useEffect, useState } from "react";
import axiosInstance, { setAxiosToken } from "../../axios";
import { base } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

export default function ListOfRoles() {
  const [roles, setRoles] = useState([]);

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

  console.log(roles[0]?.attributes);

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <>
      <Container sx={{ marginLeft: 5, marginTop: 12, p: 4 }}>
        <Typography>List of Roles</Typography>
        {roles.map((role) => (
          <Typography key={role.attributes.id}>
            {role.attributes.name}
          </Typography>
        ))}
      </Container>
    </>
  );
}
