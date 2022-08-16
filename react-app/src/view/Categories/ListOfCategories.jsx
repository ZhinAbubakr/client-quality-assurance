import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect, useMemo } from "react";
// import axiosInstance from "../../axios";
// import { base } from "../../api";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import PopupCreate from "./PopupCreate";
import { getCategories } from "../../service";

const ListOfCategories = () => {
  const [listOfCategories, setListOfCategories] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  // const [cols] = useState([
  //   {
  //     name: "id",
  //     label: "ID",
  //   },
  //   {
  //     name: "name",
  //     label: "Name",
  //   },
  //   {
  //     action: "action",
  //     label: "Action",
  //   },
  // ]);

  const cols = useMemo(
    () => [
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
      <Container sx={{ marginTop: 12, p: 4 }}>
        <Typography variant="h5">List of Categories</Typography>
        <Button
          sx={{ float: "right" }}
          variant="contained"
          onClick={() => {
            setOpenPopup(true);
            console.log("add question");
            //cally aw functiona bkawa ka list of questiont nishandadat!
          }}
        >
          ADD
        </Button>
        <Table items={listOfCategories} cols={cols} SelectedRow={SelectedRow} />
        <PopupCreate
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          getCategories={gettingCategories}
        />
      </Container>
    </>
  );
};

export default ListOfCategories;
