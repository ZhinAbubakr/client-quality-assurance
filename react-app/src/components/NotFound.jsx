import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import img from "./illustration_404.svg";

import Page from "./Page";

export default function NotFound() {
  // ----------------------------------------------------------------------

  const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0),
  }));

  // ----------------------------------------------------------------------

  return (
    <>
      <Page title="404 Page Not Found">
        <Container>
          <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
            <Typography variant="h3" paragraph>
              Sorry, page not found!
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              {
                "Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL? Be sure to check your spelling."
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
      </Page>
    </>
  );
}
