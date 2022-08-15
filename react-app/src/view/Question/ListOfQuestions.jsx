import {
  Button,
  Container,
  createTheme,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Cards from "../../components/Card";
import Popup from "./Popup";
import { useEffect } from "react";
import axiosInstance from "../../axios";
import { base } from "../../api";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider } from "@emotion/react";
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

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            "&:hover": {
              backgroundColor: " #f2f2f2",
              color: "#333333",
            },
            backgroundColor: " #100F0F",
            float: "right",
            color: "#00",
          },
        },
      },
    },
  });

  const { t } = useTranslation();

  return (
    <>
      <Container sx={{ my: 12 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" component="h1">
              {t("dashboard.Listofquestions")}
            </Typography>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenPopup(true);
                  console.log("add question");
                }}
              >
                {t("dashboard.AskQuestion")}
              </Button>
            </ThemeProvider>
          </Grid>
          <Grid item xs={12}>
            <Cards questions={visibleQuestions} />
          </Grid>
          <Grid item xs={12}>
            <Pagination
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
