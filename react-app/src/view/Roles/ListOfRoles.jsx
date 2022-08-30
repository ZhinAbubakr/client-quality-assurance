import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { base } from "../../api";
import { Grid, Typography } from "@mui/material";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export default function ListOfRoles() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const { t } = useTranslation();

  const cols = useMemo(
    () => [
      {
        name: "id",
        label: t("listOfRoles.id"),
      },
      {
        name: "name",
        label: t("listOfRoles.Name"),
      },
    ],
    []
  );

  const getRoles = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/roles",
      });
      // console.log(data?.data?.attributes, "llllllllllllll");
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
      <Grid container padding={4}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {t("listOfRoles.ListOfRoles")}
        </Typography>
        <Grid item xs={12} paddingTop={4}>
          <Table
            items={roles}
            cols={cols}
            SelectedRow={SelectedRow}
            hasEditing={false}
          />
        </Grid>
      </Grid>
    </>
  );
}
