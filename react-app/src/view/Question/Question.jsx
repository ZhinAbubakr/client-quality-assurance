import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CssBaseline,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axiosInstance from "../../axios";
import { base } from "../../api";

export default function Question() {
  const { id } = useParams();
  const [singleQuestion, setSingleQuestion] = useState({});
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");

  const [categoryList, setCategoryList] = useState([]);
  const [choosedCategory, setChoosedCategory] = useState(3);

  const [listOfAnswers, setListOfAnswers] = useState([]);

  function handleChange(event) {
    console.log(event.target.value);
    setChoosedCategory(event.target.value);
  }

  const getCategories = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/categories",
      });
      setCategoryList(data?.data);
    } catch (errro) {
      console.log("not successful");
    }
  };

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
      console.log(data?.data);
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
      console.log(data?.data, "text");
      setListOfAnswers(data?.data);
    } catch {
      console.log("error getting answers");
    }
  };

  const getQuestions = async () => {
    try {
      const { data } = await axiosInstance({
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
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjE5NTE1MzZ9.PFcypt2fLglYT-xunOtBVKrmu8xFdl7yxbpVUcjkBo4`,
        },
      });
      console.log(data?.data?.attributes);
      setSingleQuestion(data?.data?.attributes);
    } catch (errro) {
      console.log("not successful");
    }
  };

  const deleteQuestion = async () => {
    try {
      const { data } = await axiosInstance({
        method: "delete",
        url: base + "/questions/" + id,
      });
      getQuestions();
    } catch (errro) {
      console.log("not successful");
    }
  };

  const updateQuestion = async () => {
    try {
      const { data } = await axiosInstance({
        method: "PUT",
        url: base + "/questions/" + id,
        data: {
          question: {
            title: questionTitle,
            content: questionContent,
            category_ids: [1],
          },
        },
      });
      getSingleQuestion();
    } catch (errro) {
      console.log("not successful");
    }
  };

  // const deleteAnswer = async () => {
  //   try {
  //     const { data } = await axiosInstance({
  //       method: "delete",
  //       url: base + "/answers/" + id,
  //     });
  //     getAnswers();
  //   } catch (errro) {
  //     console.log("not successful");
  //   }
  // };

  useEffect(() => {
    getSingleQuestion();
    getCategories();
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
                {/* <Typography>{singleQuestion?.category_ids[0]}</Typography> */}
                <Divider />
                <Grid item xs={12} sx={{ m: 2 }}>
                  <Typography sx={{ fontWeight: "bold" }} variant="h6">
                    UPDATE the Question
                  </Typography>
                  <TextField
                    label="Title"
                    variant="outlined"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                  />
                  <TextField
                    label="Content"
                    variant="outlined"
                    // defaultValue={singleQuestion}
                    value={questionContent}
                    onChange={(e) => setQuestionContent(e.target.value)}
                  />
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  {categoryList.length > 0 && (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={choosedCategory}
                      label="role"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      fullWidth
                    >
                      {categoryList?.map((role, index) => (
                        <MenuItem key={index} value={role?.attributes?.id}>
                          {role?.attributes?.id} : {role?.attributes?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </Grid>

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
                    updateQuestion();
                    navigate("/questions");
                  }}
                  sx={{ m: 2 }}
                >
                  UPDATE
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid container>
            {console.log(id)}
            {listOfAnswers
              .filter((item) => item.attributes.question_id == id)
              .map((answers) => (
                <ul key={answers?.attributes?.id}>
                  <li>{answers.attributes.content}</li>
                </ul>
              ))}

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
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => createAnswer()}
                sx={{ m: 2 }}
              >
                POST
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
