import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  ]);
  const navigat = useNavigate();
  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            {questions.map((ques) => (
              <Box
                component="span"
                sx={{ p: 1 }}
                key={ques.id}
                onClick={() => {
                  return navigat("/questions/" + ques.id);
                }}
              >
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {ques.name}
                    </Typography>
                    <Typography variant="body2">{ques.description}</Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
