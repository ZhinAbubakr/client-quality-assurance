import React, { useState, useEffect } from "react";
import Tables from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import axiosInstance from "../../axios";
import { base } from "../../api";
import { Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const ListOfUsers = () => {
  const navigate = useNavigate();
  const [listOfUser, setListOfUser] = useState([]);
  const { t } = useTranslation();

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

  const cols = useMemo(
    () => [
      {
        name: "role_ids",
        label: t("listOfUser.Role"),
      },
      {
        name: "first_name",
        label: t("listOfUser.firstName"),
      },
      {
        name: "last_name",
        label: t("listOfUser.lastName"),
      },
      {
        name: "email",
        label: t("listOfUser.Email"),
      },
    ],
    []
  );

  const SelectedRow = (id) => {
    navigate("/users/" + id);
  };

  return (
    <>
      <Grid container padding={4}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {t("listOfUser.ListOfUsers")}
        </Typography>
        <Grid item xs={12} paddingTop={4}>
          {/* <Paper
            sx={{
              border: "1px solid grey",
              flex: { xs: "100%", sm: "cal(50% - 20px)", md: "cal(33% - 20px)" },
            }}
          > */}
          <Tables items={listOfUser} cols={cols} SelectedRow={SelectedRow} />
          {/* </Paper> */}
        </Grid>
      </Grid>
    </>
  );
};

export default ListOfUsers;

//test
