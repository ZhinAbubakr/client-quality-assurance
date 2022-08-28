import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import img from "../Assets/undraw_access_denied_re_awnf.svg";
import { Link as RouterLink } from "react-router-dom";

export default function NotAllowd() {

  // ----------------------------------------------------------------------

  const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    // padding: theme.spacing(12, 0),
  }));

  // ----------------------------------------------------------------------


  return (
    <>
        <Container sx={{ textAlign: "center", alignItems: "center" }}>
          <ContentStyle >
            <Typography variant="h3" paragraph>
              403
            </Typography>
            <Typography variant="h4" paragraph>
              Access denied
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {
                "Sorry, You are not authorized to access this page."
              }
            </Typography>

            <Box
              component="img"
              src={img}
              sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
            />

            <Button
              to="/"
              size="large"
              variant="contained"
              component={RouterLink}
            >
              Go to Home
            </Button>
          </ContentStyle>
        </Container>

      {/* <Container  sx={{ position: "relative" ,display: "flex", justifyContent: "space-around" , marginLeft: 5, marginTop: 12, p: 4 }} >
      <Typography variant="h3">403</Typography>
        <Typography variant="h3">You are not authorized to access this page.</Typography>
      </Container> */}
    </>
  );
}
