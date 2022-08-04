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
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjIxMTc3Njd9.ZqVtcTiODMehfaq_9UtXVlM88ubL7dK1ZFqS1E6imBI`,
        },
      });
      console.log(data?.data?.attributes + "llllllllllllll");
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
