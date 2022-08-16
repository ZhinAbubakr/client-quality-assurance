import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Cards from "../../components/QuestionCards";
import Popup from "./Popup";
import { useEffect } from "react";
import axiosInstance from "../../axios";
import { base } from "../../api";
import Pagination from "@mui/material/Pagination";
import { useTranslation } from "react-i18next";
import "../../i18n";

const limit = 3;
const getTotalNumberOfPages = (dataLength) => Math.ceil(dataLength / limit);

const paginateList = (unPaginatedList, page, limit) => {
  const paginatedList = [];
  const startingItemIndex = (page - 1) * limit;
  const endingItemIndex = startingItemIndex + (limit - 1);

  for (let i = startingItemIndex; i < unPaginatedList.length; i++) {
    paginatedList.push(unPaginatedList[i]);
    if (i === endingItemIndex) break;
  }

  return paginatedList;
};

export default function ListOfQuestions() {
  const [openPopup, setOpenPopup] = useState(false);
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [visibleQuestions, setVisibleQuestions] = useState([]);
  const [page, setPage] = useState(1);

  const getQuestions = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/questions",
      });
      console.log(data?.data, "data?.data");
      setListOfQuestions(data?.data);
      setVisibleQuestions(paginateList(data?.data, page, limit));
    } catch (errro) {
      console.log("not successful");
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Container sx={{ my: 12 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" component="h1">
              {t("dashboard.Listofquestions")}
            </Typography>
            <Button
              variant="contained"
              sx={{ float: "right" }}
              onClick={() => {
                setOpenPopup(true);
                console.log("add question");
              }}
            >
              {t("dashboard.AskQuestion")}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Cards questions={visibleQuestions} />
          </Grid>
          <Grid item xs={12}>
            <Pagination
              sx={{ float: "right", m: 2 }}
              page={page}
              onChange={(event, page) => {
                console.log("page", page);
                setPage(page);
                setVisibleQuestions(paginateList(listOfQuestions, page, limit));
              }}
              color="primary"
              count={getTotalNumberOfPages(listOfQuestions.length)}
            />
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
