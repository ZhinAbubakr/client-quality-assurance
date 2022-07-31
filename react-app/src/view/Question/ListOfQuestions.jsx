import {
  // Box,
  // Card,
  // CardContent,
  Container,
  Grid,
  // Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../../components/Card";

export default function ListOfQuestions() {
  const [questions] = useState([
    {
      id: 1,
      name: "Questions one",
      description:
        "Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the questionAnswer of the question Answer of the question",
    },
    {
      id: 2,
      name: "Questions Two",
      description:
        "Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the questionAnswer of the question Answer of the question",
    },
    {
      id: 3,
      name: "Questions Three",
      description:
        "Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the questionAnswer of the question Answer of the question",
    },
    {
      id: 4,
      name: "Questions Four",
      description:
        "Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the questionAnswer of the question Answer of the question",
    },
    {
      id: 5,
      name: "Questions Five",
      description:
        "Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the questionAnswer of the question Answer of the question",
    },
  ]);

  // const navigate = useNavigate();

  return (
    <>
      {/* <Cards  questions={questions}/> */}

      <Container sx={{marginTop:8, marginLeft:2}}>
        <Grid container>
          <Grid item xs={12}>
            <Cards questions = {questions}/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
