import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../axios";
import { base } from "../../api";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import PopupDialog from "./PopupUpdate";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { theme } from "../../theme";
import { getCategories } from "../Question/Popup";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";

export default function Question() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [singleQuestion, setSingleQuestion] = useState({});
  const [content, setContent] = useState("");

  const [listOfAnswers, setListOfAnswers] = useState([]);

  const [openPopup, setOpenPopup] = useState(false);

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
    // getCategories();
    getAnswers();
  }, []);

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategories(setCategoryList);
  }, []);

  const length = listOfAnswers.filter(
    (item) => item.attributes.question_id == id
  ).length;


  const { t } = useTranslation();

  return (
    <>
      <CssBaseline />
      <Grid container padding={4}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              {/* <Typography sx={{ fontSize: 12 }} color="text.secondary">
                Question title
              </Typography> */}
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
                // disableTypography={false}
              />

              {/* <Typography
                variant="h5"
                component="div"
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                {singleQuestion?.title}
              </Typography> */}
              <CardContent>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  {t("question.Content")}
                </Typography>
                <Typography paragraph sx={{ mb: 2 }}>
                  {singleQuestion?.content}
                </Typography>

                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  {t("question.Category")}
                </Typography>
                <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                  {/* {singleQuestion?.category_ids} */}
                  {/* {singleQuestion?.category_ids.map((id, i) => ( */}
                  <Chip
                    // color="secondary"
                    sx={{
                      color: theme.palette.primary.dark,
                      backgroundColor: "#E0FBFC",
                    }}
                    // key={i}
                    label={
                      categoryList.find(
                        (category) =>
                          category.attributes.id ===
                          singleQuestion?.category_ids
                      )?.attributes.name
                    }
                  />
                  {/* ))} */}
                </Typography>
              </CardContent>

              {/* <Grid item xs={12}> */}
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
                        <ListItem>
                          <Grid item xs={10}>
                            <ListItemText variant="h5" component="div">
                              {answers.attributes.content}
                            </ListItemText>
                          </Grid>
                          <Grid
                            display={"flex"}
                            item
                            xs={2}
                            justifyContent="space-between"
                          >
                            <ListItem>
                              <IconButton edge="end" aria-label="delete">
                                <StarOutlineIcon />
                              </IconButton>
                              <IconButton
                                onClick={() =>
                                  deleteAnswer(answers?.attributes?.id)
                                }
                                sx={{ color: theme.palette.error.main }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItem>
                          </Grid>
                        </ListItem>
                      </List>
                    ))}
                </>
              ) : (
                <>
                  <CardHeader
                    title="Answers"
                    subheader="There is no answers!"
                  ></CardHeader>
                  {/* <Divider />
                    <List>
                      <ListItem>
                        <ListItemText variant="h5" component="div">
                          Ther is no answers!
                        </ListItemText>
                      </ListItem>
                    </List> */}
                </>
              )}
              {/* </Grid> */}

              {/* <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                sx={{
                  m: 2,
                  float: "right",
                  backgroundColor: theme.palette.error.main,
                  color: "white",
                  "&:hover": {
                    backgroundColor: theme.palette.error.main,
                    color: "white",
                  },
                }}
                onClick={() => deleteQuestion()}
              >
                DELETE
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenPopup(true);
                }}
                sx={{
                  m: 2,
                  float: "right",
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                  },
                }}
              >
                UPDATE
              </Button> */}
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
                  <Typography
                    fullwidth
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                  >
                    {t("question.YourAnswer")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Add Your Answer here............."
                    multiline={true}
                    minRows={3}
                    maxRows={10}
                    variant="outlined"
                    fullwidth
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

                {/* <Grid item xs={12}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 16, mt: 5, fontWeight: "bold" }}
                    >
                      Answers
                    </Typography>
                  </CardContent>
                  <Divider />
                  
                </Grid> */}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

// {listOfAnswers
//                     .filter((item) => item.attributes.question_id == id)
//                     .map((answers) => (
//                       <List key={answers?.attributes?.id}>
//                         <Grid item xs={8}>
//                         <ListItem>
//                           <ListItemText variant="h5" component="div">
//                             {answers.attributes.content}
//                           </ListItemText>
//                           <Grid item xs={2}>
//                             <ListItem>
//                               <IconButton edge="end" aria-label="delete">
//                                 <StarOutlineIcon />
//                               </IconButton>
//                               <IconButton
//                                 onClick={() =>
//                                   deleteAnswer(answers?.attributes?.id)
//                                 }
//                                 sx={{ color: theme.palette.error.main }}
//                               >
//                                 <DeleteIcon />
//                               </IconButton>
//                             </ListItem>
//                           </Grid>
//                         </ListItem>
//                         </Grid>
//                       </List>
// ))}
