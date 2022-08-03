import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axiosInstance from "../../axios";
import { base } from "../../api";

export default function Question() {
  const { id } = useParams();
  const [singleQuestion, setSingleQuestion] = useState();

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

  useEffect(() => {
    getSingleQuestion();
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
                  content :{" "}
                </Typography>
                <Typography>{singleQuestion?.content}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h5" component="h1">
                  category :{" "}
                </Typography>
                <Typography>{singleQuestion?.category_ids[0]}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={8}>
            <div>
              {/* {ans.map((a) => (
                <Card key={a.id} sx={{ m: 1 }} variant="outlined">
                  <CardContent>
                    {a.answer}
                    <CardActions disableSpacing sx={{ float: "right", p: 1 }}>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                    </CardActions>
                  </CardContent>
                </Card>
              ))} */}
            </div>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={8}>
            <TextField
              placeholder="Answer here............."
              multiline
              maxRows={4}
              // value={value}
              // onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => console.log("hello")}
              sx={{ m: 2 }}
            >
              POST
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
