import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import { base } from "../../api";
import PopupDialog from "./PopupUpdate";
import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox, useTheme } from "@mui/material";
import { getCategories } from "../Question/Popup";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  // useTheme
} from "@mui/material";

const compareAnswersFn = (a, b) => {
  if (a.attributes.id < b.attributes.id) {
    return -1;
  }
  if (a.attributes.id > b.attributes.id) {
    return 1;
  }
  // a must be equal to b
  return 0;
};

export default function Question() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [singleQuestion, setSingleQuestion] = useState({});
  const [content, setContent] = useState("");

  const [listOfAnswers, setListOfAnswers] = useState([]);

  const [openPopup, setOpenPopup] = useState(false);

  const [categoryList, setCategoryList] = useState([]);

  const { t } = useTranslation();

  const bestAnswer = async (answerId) => {
    try {
      const { data } = await axiosInstance({
        method: "put",
        url: base + "/questions/" + id + "/choose-the-best-answer",
        data: {
          answer_id: answerId,
        },
      });
      console.log(data?.data, "besttttttttttt");
      getAnswers();
    } catch {
      console.log("error choosing best answer");
    }
  };

  const deselectBestAnswer = async (answerId) => {
    try {
      const { data } = await axiosInstance({
        method: "put",
        url: base + "/questions/" + id + "/choose-the-best-answer",
      });
      console.log(data?.data, "besttttttttttt");
    } catch {
      console.log("error choosing best answer");
    } finally {
      getAnswers();
    }
  };

  const createAnswer = async () => {
    try {
      await axiosInstance({
        method: "post",
        url: base + "/answers",
        data: {
          answer: {
            content: content,
            question_id: id,
          },
        },
      });
      getAnswers();
    } catch {
      console.log("error posting questions");
    }
  };

  const getAnswers = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/answers",
      });
      console.log(data);
      setListOfAnswers(data?.data);
    } catch {
      console.log("error getting answers");
    }
  };

  // const [listOfQuestions, setListOfQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/questions",
      });
      console.log(data);
      // setListOfQuestions(data?.data);
    } catch (errro) {
      console.log("not successful");
    }
  };

  const getSingleQuestion = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + `/questions/` + id,
      });
      setSingleQuestion(data?.data?.attributes);
    } catch (errro) {
      console.log("not successful");
    }
  };

  const deleteQuestion = async () => {
    try {
      await axiosInstance({
        method: "delete",
        url: base + "/questions/" + id,
      });
      getQuestions();
      navigate("/questions");
    } catch (errro) {
      console.log("not successful");
    }
  };

  const deleteAnswer = async (id) => {
    try {
      await axiosInstance({
        method: "delete",
        url: base + "/answers/" + id,
      });
      getAnswers();
    } catch (errro) {
      console.log("not successful");
    }
  };

  useEffect(() => {
    getSingleQuestion();
    getAnswers();
  }, []);

  useEffect(() => {
    getCategories(setCategoryList);
  }, []);

  // console.log(
  //   "categoryList",
  //   categoryList?.map((category) => category?.attributes?.name)
  // );

  // console.log(singleQuestion?.category_ids, "sdfghjk");

  const length = listOfAnswers.filter(
    (item) => item.attributes.question_id == id
  ).length;

  const theme = useTheme();

  console.log(listOfAnswers);

  return (
    <>
      <CssBaseline />
      <Grid container padding={4}>
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{ boxShadow: "0px 15px 25px rgba(50, 50, 50, 0.1)" }}
          >
            <CardContent>
              <CardHeader
                action={
                  <>
                    <IconButton
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                      onClick={() => {
                        setOpenPopup(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={
                        {
                          // color: theme.palette.secondary.main
                        }
                      }
                      color="secondary"
                      onClick={() => deleteQuestion()}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
                subheader={new Date(singleQuestion.created_at).toDateString()}
                title={singleQuestion?.title}
              />
              <CardContent>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  {t("question.Content")}
                </Typography>
                <Typography paragraph sx={{ mb: 2 }}>
                  {singleQuestion?.content}
                </Typography>

                {/* <Typography paragraph sx={{ mb: 2 }}>
                  {singleQuestion?.category_ids}
                </Typography> */}

                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  {t("question.Category")}
                </Typography>
                <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                  {singleQuestion?.category_ids?.map((item, i) => (
                    <Chip
                      key={i}
                      sx={{
                        color: theme.palette.primary.dark,
                        backgroundColor: "#E0FBFC",
                        marginTop: 1,
                        marginRight: 1,
                      }}
                      label={
                        categoryList.find(
                          (category) => category?.attributes?.id == item
                        )?.attributes.name
                      }
                    />
                  ))}
                </Typography>
              </CardContent>

              {length > 0 ? (
                <>
                  <CardHeader
                    title={t("question.Answers")}
                    sx={{ fontWeight: "bold" }}
                  ></CardHeader>
                  <Divider />
                  {listOfAnswers
                    .filter((item) => item.attributes.question_id == id)
                    .sort(compareAnswersFn)
                    .map((answers, i, arr) => (
                      <List key={answers?.attributes?.id}>
                        <ListItem
                          key={answers?.attributes?.id}
                          secondaryAction={
                            <>
                              {console.log(
                                "answers-best",
                                answers?.attributes?.is_the_best,
                                "answerID",
                                answers?.attributes?.id
                              )}
                              {/* {answers?.attributes?.is_the_best === false  ? */}
                              <IconButton
                                edge="end"
                                onClick={() => {
                                  if (answers.attributes.is_the_best) {
                                    deselectBestAnswer(answers?.attributes?.id);
                                  } else bestAnswer(answers?.attributes?.id);
                                }}
                                disabled={
                                  arr.find((ans) => ans.attributes.is_the_best)
                                    ? answers.attributes.is_the_best
                                      ? false
                                      : true
                                    : false
                                }
                              >
                                <Checkbox
                                  value={answers?.attributes?.is_the_best}
                                  // defaultChecked={
                                  //   answers?.attributes?.is_the_best
                                  // }
                                  icon={<StarBorderIcon />}
                                  checkedIcon={<StarRateIcon />}
                                />
                              </IconButton>
                              {/* } */}
                              <IconButton
                                edge="end"
                                onClick={() =>
                                  deleteAnswer(answers?.attributes?.id)
                                }
                                sx={{ color: theme.palette.error.main }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          }
                        >
                          <ListItemText variant="h5" component="div">
                            {answers.attributes.content}
                          </ListItemText>
                        </ListItem>
                        <Divider />
                      </List>
                    ))}
                </>
              ) : (
                <>
                  <CardHeader
                    title={t("question.Answers")}
                    subheader={t("question.info")}
                  ></CardHeader>
                </>
              )}
              <PopupDialog
                id={id}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                getSingleQuestion={getSingleQuestion}
                singleQuestion={singleQuestion}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ my: 2 }}>
          <Card
            variant="outlined"
            sx={{ boxShadow: "0px 15px 25px rgba(50, 50, 50, 0.1)" }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    {t("question.YourAnswer")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Add Your Answer here............."
                    multiline={true}
                    minRows={10}
                    maxRows={10}
                    variant="outlined"
                    fullWidth
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      createAnswer();
                      setContent("");
                    }}
                    sx={{
                      boxShadow: "0px 15px 25px rgba(50, 50, 50, 0.1)",
                      // backgroundColor: theme.palette.primary.main,
                      color: "white",
                      "&:hover": {
                        // backgroundColor: theme.palette.primary.main,
                        color: "white",
                      },
                      float: "right",
                    }}
                  >
                    {t("question.postAnswer")}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
