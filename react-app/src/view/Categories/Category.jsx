import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import { base } from "../../api";
import PopupUpdate from "./PopupUpdate";
import { useTranslation } from "react-i18next";

export default function Category() {
  const { id } = useParams();
  const [singleCategory, setSingleCategory] = useState({});
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();
  const {t}=useTranslation();

  const getSingleCategory = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/categories/" + id,
      });
      // console.log(data?.data?.attributes);
      setSingleCategory(data?.data?.attributes);
    } catch (error) {
      console.log("not successful");
    }
  };

  const deleteCategory = async () => {
    try {
      const { data } = await axiosInstance({
        method: "delete",
        url: base + "/categories/" + id,
      });
      // console.log(data?.data?.attributes);
      getSingleCategory();
    } catch (error) {
      console.log("not successful");
    }
  };

  useEffect(() => {
    getSingleCategory();
  }, []);

  return (
    <>
      <Container >
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Grid container sx={{ p: 4 }}>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Typography variant="h5">{t("listOfCategory.Category")} {id}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ p: 4 }}>
              <Typography>ID : {singleCategory.id}</Typography>
              <Typography>{t("listOfCategory.Name")} : {singleCategory.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => {
                  deleteCategory();
                  navigate("/category");
                }}
                sx={{ m: 2 }}
              >
                {t("listOfCategory.Delete")}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenPopup(true);
                }}
                sx={{ m: 2 }}
              >
                {t("listOfCategory.Update")}
              </Button>
              <PopupUpdate
                id={id}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                getSingleCategory={getSingleCategory}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
