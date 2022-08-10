import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import { base } from "../../api";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import PopupDialog from "./PopupDialog";
import {
  Button,
  Card,
  CardContent,
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

export default function Question() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [singleQuestion, setSingleQuestion] = useState({});
  const [content, setContent] = useState("");

  // const [questionTitle, setQuestionTitle] = useState("");
  // const [questionContent, setQuestionContent] = useState("");

  // const [categoryList, setCategoryList] = useState([]);
  // const [choosedCategory, setChoosedCategory] = useState(3);

  const [listOfAnswers, setListOfAnswers] = useState([]);

  const [openPopup, setOpenPopup] = useState(false);

  // function handleChange(event) {
  //   console.log(event.target.value);
  //   setChoosedCategory(event.target.value);
  // }

  // const getCategories = async () => {
  //   try {
  //     const { data } = await axiosInstance({
  //       method: "get",
  //       url: base + "/categories",
  //     });
  //     setCategoryList(data?.data);
  //     console.log(data?.data);
  //   } catch (errro) {
  //     console.log("not successful");
  //   }
  // };

  const createAnswer = async () => {
    try {
      const { data } = await axiosInstance({
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

  const getQuestions = async () => {
    try {
      await axiosInstance({
        method: "get",
        url: base + "/questions",
      });
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

  return (
    <>
      <Container sx={{ marginTop: 10, marginLeft: 2 }}>
        <CssBaseline />
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ m: 1 }} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h1">
                  Question title :
                </Typography>
                <Typography>{singleQuestion?.title}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h5" component="h1">
                  content :
                </Typography>
                <Typography>{singleQuestion?.content}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h5" component="h1">
                  category :
                </Typography>
              </CardContent>
              <CardContent>
                {/* <Typography>{singleQuestion?.category_ids[1]}</Typography> */}
                <Divider />

                <Button
                  variant="contained"
                  onClick={() => {
                    deleteQuestion();
                    navigate("/questions");
                  }}
                  sx={{ m: 2 }}
                >
                  DELETE
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenPopup(true);
                  }}
                  sx={{ m: 2 }}
                >
                  UPDATE
                </Button>
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
          <Grid container>
            <Grid item xs={8}>
              <TextField
                placeholder="Add Your Answer here............."
                multiline
                maxRows={4}
                variant="outlined"
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
            <Grid item xs={2} display="flex">
              <Button
                variant="contained"
                onClick={() => createAnswer()}
                sx={{ m: 2 }}
              >
                POST
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                {listOfAnswers
                  .filter((item) => item.attributes.question_id == id)
                  .map((answers) => (
                    <List key={answers?.attributes?.id}>
                      {/* <Grid item xs={8}> */}
                      <ListItem>
                        <ListItemText variant="h5" component="div">
                          {answers.attributes.content}
                        </ListItemText>
                        <Grid item xs={2}>
                          <ListItem>
                            <IconButton edge="end" aria-label="delete">
                              <StarOutlineIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() =>
                                deleteAnswer(answers?.attributes?.id)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItem>
                        </Grid>
                      </ListItem>
                      {/* </Grid> */}
                    </List>
                  ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
