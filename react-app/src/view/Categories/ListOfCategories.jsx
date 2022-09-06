import { Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect, useMemo } from "react";
// import axiosInstance from "../../axios";
// import { base } from "../../api";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import PopupCreate from "./PopupCreate";
import { getCategories } from "../../service";
import { useTranslation } from "react-i18next";

const ListOfCategories = () => {
  const [listOfCategories, setListOfCategories] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const {t} = useTranslation()

  // const [cols] = useState([
  //   {
  //     name: "id",
  //     label: "ID",
  //   },
  //   {
  //     name: "name",
  //     label: "Name",
  //   },
  // ]);

  const cols = useMemo(
    () => [
      {
        name: "id",
        label: t("listOfCategory.id"),
      },
      {
        name: "name",
        label: t("listOfCategory.Name"),
      },
      
    ],
    []
  );

  const navigate = useNavigate();

  // const getCategories = async () => {
  //   try {
  //     const { data } = await axiosInstance({
  //       method: "get",
  //       url: base + "/categories",
  //     });
  //     console.log(data?.data);
  //   } catch (errro) {
  //     console.log("not successful");
  //   }
  // };

  const gettingCategories = async () => {
    const data = await getCategories();
    console.log(data.data);
    setListOfCategories(data?.data);
  };

  useEffect(() => {
    gettingCategories();
  }, []);

  const SelectedRow = (id) => {
    navigate("/category/" + id);
    console.log("go to category page");
  };

 

  return (
    <>
      <Grid container padding={4}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {t("listOfCategory.ListOfCatogries")}
        </Typography>
        <Grid item xs={12} marginBottom={2}>
          <Button
            sx={{ float: "right" , my: 4}}
            variant="contained"
            onClick={() => {
              setOpenPopup(true);
              console.log("add question");
            }}
          >
            {t("listOfCategory.AddCategory")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Table
            items={listOfCategories}
            cols={cols}
            SelectedRow={SelectedRow}
          />
        </Grid>
        <PopupCreate
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          getCategories={gettingCategories}
        />
      </Grid>
    </>
  );
};

export default ListOfCategories;
