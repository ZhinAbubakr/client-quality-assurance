import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import { base } from "../../api";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import PopupDialog from "./PopupUpdate";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material";
import { getCategories } from "../Question/Popup";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
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
} from "@mui/material";

export default function Question() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [singleQuestion, setSingleQuestion] = useState({});
  const [content, setContent] = useState("");

  const [listOfAnswers, setListOfAnswers] = useState([]);

  const [openPopup, setOpenPopup] = useState(false);

  const [categoryList, setCategoryList] = useState([]);

  const { t } = useTranslation();

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
      // console.log(data?.data);
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
      // console.log(data?.data, "text");
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
      // console.log(data?.data?.attributes);
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

  console.log(
    "categoryList",
    categoryList?.map((category) => category?.attributes?.name)
  );

  console.log(singleQuestion?.category_ids, "sdfghjk");

  const length = listOfAnswers.filter(
    (item) => item.attributes.question_id == id
  ).length;

  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <Grid container padding={4}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader
                action={
                  <>
                    <IconButton
                      sx={{ color: theme.palette.primary.main }}
                      onClick={() => {
                        setOpenPopup(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: theme.palette.secondary.main }}
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
                  {singleQuestion?.category_ids?.map((item) => (
                    <Chip
                      sx={{
                        color: theme.palette.primary.dark,
                        backgroundColor: "#E0FBFC",
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
                    .map((answers) => (
                      <List key={answers?.attributes?.id}>
                        <ListItem
                          secondaryAction={
                            <>
                              <IconButton edge="end">
                                <StarOutlineIcon />
                              </IconButton>
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
          <Card variant="outlined">
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
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
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
