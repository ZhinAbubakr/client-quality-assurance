import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function NotAllowd() {
  return (
    <>
      <Container sx={{ marginLeft: 5, marginTop: 12, p: 4 }}>
        <Typography variant="h3">403</Typography>
      </Container>
    </>
  );
}
