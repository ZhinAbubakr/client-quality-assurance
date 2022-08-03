import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import { base } from "../../api";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";

const User = () => {
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState([]);

  const getSingleUser = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + `/users/` + id,
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjE5NTE1MzZ9.PFcypt2fLglYT-xunOtBVKrmu8xFdl7yxbpVUcjkBo4`,
        },
      });
      console.log(data?.data?.attributes);
      setSingleUser(data?.data?.attributes);
    } catch (errro) {
      console.log("not successful");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <>
      <Container sx={{ marginTop: 10, marginLeft: 2 }}>
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Grid container sx={{ p: 4 }}>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Typography variant="h4">User {id}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ p: 4 }}>
              <Typography>ID : {id}</Typography>
              <Typography>First Name : {singleUser.first_name}</Typography>
              <Typography>Last Name : {singleUser.last_name}</Typography>

              <Typography>Email : {singleUser.email}</Typography>
              <Typography>Role : {singleUser.role_ids}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row" justifyContent="end">
              <Button variant="contained">DELETE</Button>
              <Button variant="contained">EDIT</Button>
            </Stack>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default User;
