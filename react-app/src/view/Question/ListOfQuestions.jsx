import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Cards from "../../components/Card";
import Popup from "./Popup";
import { useEffect } from "react";
import axiosInstance from "../../axios";
import { base } from "../../api";

export default function ListOfQuestions() {
  const [openPopup, setOpenPopup] = useState(false);
  const [listOfQuestions, setListOfQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/questions",
      });

      setListOfQuestions(data?.data);
    } catch (errro) {
      console.log("not successful");
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <Container sx={{ marginLeft: 5, marginTop: 12, p: 4 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" component="h1">
              List of Questions
            </Typography>
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
          </Grid>
          <Grid item xs={12}>
            <Cards questions={listOfQuestions} />
          </Grid>
        </Grid>
      </Container>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        getQuestions={getQuestions}
      ></Popup>
    </>
  );
}
