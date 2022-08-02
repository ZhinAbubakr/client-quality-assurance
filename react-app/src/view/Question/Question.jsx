import { Container } from "@mui/system";
import React, { useState } from "react";
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

export default function Question() {
  const { id } = useParams();
  const [ans] = useState([
    { id: 1, answer: "the aswer of this question is blah blah blahhhh......" },
    { id: 2, answer: "the aswer of this question is blah blah blahhhh......" },
    { id: 3, answer: "the aswer of this question is blah blah blahhhh......" },
  ]);

  return (
    <>
      <Container sx={{ marginTop: 10, marginLeft: 2 }}>
        <CssBaseline />
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ m: 1 }} variant="outlined">
              <CardContent>
                <Typography>Question {id}</Typography>
                <br />
                <br />
                <br />
                <Typography>
                  Answer of the question Answer of the question Answer of the
                  question Answer of the question Answer of the question Answer
                  of the question Answer of the question Answer of the question
                  Answer of the question Answer of the question Answer of the
                  questionAnswer of the question Answer of the question
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <div>
              {ans.map((a) => (
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
              ))}
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
