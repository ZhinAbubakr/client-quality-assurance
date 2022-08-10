import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";

export default function Role() {
  const { id } = useParams();

  return (
    <>
      <Container sx={{ marginLeft: 5, marginTop: 12, p: 4 }}>
        <Typography variant="h5">Role {id}</Typography>
      </Container>
    </>
  );
}
