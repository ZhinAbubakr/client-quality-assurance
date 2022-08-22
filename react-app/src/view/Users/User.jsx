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
import { useTranslation } from "react-i18next";

const User = () => {
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [choosedRole, setChoosedRole] = useState(3);
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleChange(event) {
    // handle change for select input (role)
    console.log(event.target.value);
    setChoosedRole(event.target.value);
  }

  async function handleFunc() {
    await deleteUser();
  }

  //get the roles from api
  const getRoles = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/roles",
      });
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
      });
    } catch (errro) {
      console.log("not successful");
    }
  };

  const deleteUser = async () => {
    try {
      const { data } = await axiosInstance({
        method: "delete",
        url: base + `/users/` + id,
      });
      getListOfUsers();
      navigate("/users");
      console.log(data?.data?.attributes);
    } catch (errro) {
      console.log("not successful");
    }
  };

  const updateUser = async () => {
    try {
      const { data } = await axiosInstance({
        method: "put",
        url: base + `/users/` + id,
        data: {
          user: {
            ...singleUser,
            role_ids: [choosedRole],
          },
        },
      });
      getSingleUser();
      console.log(data?.data?.attributes);
    } catch (errro) {
      console.log("not successful");
    }
  };

  useEffect(() => {
    getSingleUser();
    getRoles();
  }, []);
  return (
    <>
      <Container>
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Grid container sx={{ p: 4 }}>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Typography variant="h4">{t("listOfUser.User")} {id}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ p: 4 }}>
              <Typography>{t("listOfUser.firstName")} : {singleUser.first_name}</Typography>
              <Typography>{t("listOfUser.lastName")} : {singleUser.last_name}</Typography>
              <Typography>{t("listOfUser.Email")} : {singleUser.email}</Typography>
              <Typography>{t("listOfUser.Role")} : {singleUser.role_ids}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ p: 4 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            {roleList.length > 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={choosedRole}
                label="role"
                onChange={(e) => {
                  handleChange(e);
                }}
                fullWidth
              >
                {roleList?.map((role, index) => (
                  <MenuItem key={index} value={role?.attributes?.id}>
                    {role?.attributes?.id} : {role?.attributes?.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row" justifyContent="end">
              <Button variant="contained" onClick={handleFunc}>
              {t("listOfUser.Delete")}
              </Button>
              <Button variant="contained" onClick={() => updateUser()}>
              {t("listOfUser.Update")}
              </Button>
            </Stack>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default User;
