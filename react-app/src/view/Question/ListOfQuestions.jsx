import {
  Button,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
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

  const theme = useTheme();

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
      <Grid container padding={4}>
        <Typography component={"span"} variant="h5" sx={{ fontWeight: "bold" }}>
          {t("dashboard.Listofquestions")}
        </Typography>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{
              float: "right",
              // backgroundColor: theme.palette.primary.main,
              color: "white",
              "&:hover": {
                // backgroundColor: theme.palette.primary.main,
                color: "white",
              },
            }}
            onClick={() => {
              setOpenPopup(true);
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
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        getQuestions={getQuestions}
      ></Popup>
    </>
  );
}
