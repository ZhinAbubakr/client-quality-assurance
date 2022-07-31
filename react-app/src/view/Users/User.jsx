import { Container, Grid, Paper } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { n } = useParams();

  return (
    <>
      <Container sx={{ marginTop: 8, marginLeft: 2 }}>
        <Grid container>
          <Grid item xs={12} sx={{display: 'flex'}}>
            <Paper>
              
            </Paper>
          </Grid>
        </Grid>
        <h1>User {n}</h1>
      </Container>
    </>
  );
};

export default User;
