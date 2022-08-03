import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Cards from "../../components/Card";
import Popup from "./Popup";
import Form from "../../components/Form";
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
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjE5NTE1MzZ9.PFcypt2fLglYT-xunOtBVKrmu8xFdl7yxbpVUcjkBo4`,
        },
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
      <Container sx={{ marginTop: 8, marginLeft: 2 }}>
        <Grid container>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Typography variant="h4" component="h1">
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
        // getQuestions={getQuestions()}
      ></Popup>
    </>
  );
}
