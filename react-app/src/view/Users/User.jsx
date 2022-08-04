import React, { useEffect, useState } from "react";
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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [choosedRole, setChoosedRole] = useState([]);
  const navigate = useNavigate();

  function handleChange(event) {
    // handle change for select input (role)
    console.log(event.target);
    setChoosedRole(event.target.value);
    console.log([...choosedRole] + "kboeihgpwrjpf");
  }

  function handleFunc() {
    deleteUser();
    navigate("/users");
  }

  //get the roles from api
  const getRoles = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/roles",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjIxMTc3Njd9.ZqVtcTiODMehfaq_9UtXVlM88ubL7dK1ZFqS1E6imBI`,
        },
      });
      // console.log(data?.data?.attributes);
      setRoleList(data?.data);
    } catch (errro) {
      console.log("not successful");
    }
  };

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

  const getListOfUsers = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/users",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjE5NTE1MzZ9.PFcypt2fLglYT-xunOtBVKrmu8xFdl7yxbpVUcjkBo4`,
        },
      });
      // console.log(data?.data);
      // setListOfUser(data?.data);
    } catch (errro) {
      console.log("not successful");
    }
  };

  const deleteUser = async () => {
    try {
      const { data } = await axiosInstance({
        method: "delete",
        url: base + `/users/` + id,
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjE5NTE1MzZ9.PFcypt2fLglYT-xunOtBVKrmu8xFdl7yxbpVUcjkBo4`,
        },
      });
      getListOfUsers();
      console.log(data?.data?.attributes);
    } catch (errro) {
      console.log("not successful");
    }
  };

  const updateUser = async () => {
    try {
      const { data } = await axiosInstance({
        method: "put",
        url: base + `/users/` + 2,
        body: {
          user: {
            role_ids: [3],
          },
        },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjE5NTE1MzZ9.PFcypt2fLglYT-xunOtBVKrmu8xFdl7yxbpVUcjkBo4`,
        },
      });
      console.log(data?.data?.attributes);
    } catch (errro) {
      console.log("not successful");
    }
  };

  useEffect(() => {
    getSingleUser();
    getRoles();
  }, []);
  // console.log(roleList[0]?.attributes?.id + "roleeeeeeeeeee");
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
          <Grid item xs={12} sx={{ p: 4 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choosedRole}
              label="role"
              onChange={handleChange}
              fullWidth
            >
              {roleList?.map((role, index) => (
                <MenuItem key={index} value={role?.attributes?.name}>
                  {role?.attributes?.id} : {role?.attributes?.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row" justifyContent="end">
              <Button variant="contained" onClick={handleFunc}>
                DELETE
              </Button>
              <Button variant="contained">UPDATE</Button>
            </Stack>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default User;
